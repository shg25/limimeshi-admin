import type { DataProvider } from 'react-admin';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
  documentId,
  Timestamp,
} from 'firebase/firestore';
import { firestore } from '../lib/firebase';

// FirestoreのTimestampをDate文字列に変換
const convertTimestamps = (data: Record<string, unknown>): Record<string, unknown> => {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (value instanceof Timestamp) {
      result[key] = value.toDate().toISOString();
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      result[key] = convertTimestamps(value as Record<string, unknown>);
    } else {
      result[key] = value;
    }
  }
  return result;
};

// Date文字列をFirestore Timestampに変換し、undefinedを除外
const convertDatesToTimestamps = (data: Record<string, unknown>): Record<string, unknown> => {
  const result: Record<string, unknown> = {};
  const dateFields = ['saleStartTime', 'saleEndTime'];

  for (const [key, value] of Object.entries(data)) {
    // undefinedはFirestoreでサポートされないためスキップ
    if (value === undefined) {
      continue;
    }
    if (dateFields.includes(key) && typeof value === 'string') {
      result[key] = Timestamp.fromDate(new Date(value));
    } else if (key === 'createdAt' || key === 'updatedAt') {
      // これらのフィールドはスキップ（serverTimestampで処理）
      continue;
    } else {
      result[key] = value;
    }
  }
  return result;
};

// Firestoreドキュメントをreact-admin形式に変換
const toRecord = (id: string, data: Record<string, unknown>) => {
  return {
    id,
    ...convertTimestamps(data),
  };
};

// パラメータ型定義
interface ListParams {
  pagination?: { page?: number; perPage?: number };
  sort?: { field?: string; order?: string };
}

interface OneParams {
  id: string | number;
}

interface ManyParams {
  ids: (string | number)[];
}

interface ManyReferenceParams {
  target: string;
  id: string | number;
  pagination?: { page?: number; perPage?: number };
  sort?: { field?: string; order?: string };
}

interface CreateParams {
  data: Record<string, unknown>;
}

interface UpdateParams {
  id: string | number;
  data: Record<string, unknown>;
}

interface DeleteParams {
  id: string | number;
}

interface DeleteManyParams {
  ids: (string | number)[];
}

interface UpdateManyParams {
  ids: (string | number)[];
  data: Record<string, unknown>;
}

// react-adminのDataProvider型はジェネリクスが厳密すぎるため、キャストで回避
const firestoreDataProvider = {
  getList: async (resource: string, params: ListParams) => {
    const { pagination, sort } = params;
    const { page = 1, perPage = 10 } = pagination || {};
    const { field: sortField = 'createdAt', order = 'DESC' } = sort || {};

    // 'id'ソートはFirestoreでサポートされないため、createdAtに変換
    const field = sortField === 'id' ? 'createdAt' : sortField;

    const q = query(
      collection(firestore, resource),
      orderBy(field, order.toLowerCase() as 'asc' | 'desc')
    );
    const snapshot = await getDocs(q);

    const allData = snapshot.docs.map((docSnap) => toRecord(docSnap.id, docSnap.data()));

    // クライアントサイドでページネーション（小規模データのため）
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const data = allData.slice(start, end);

    return {
      data,
      total: allData.length,
    };
  },

  getOne: async (resource: string, params: OneParams) => {
    const docRef = doc(firestore, resource, String(params.id));
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      throw new Error(`Document ${params.id} not found in ${resource}`);
    }

    return {
      data: toRecord(snapshot.id, snapshot.data()),
    };
  },

  getMany: async (resource: string, params: ManyParams) => {
    const { ids } = params;

    // Firestoreの'in'クエリは最大30件まで
    const chunks: string[][] = [];
    for (let i = 0; i < ids.length; i += 30) {
      chunks.push(ids.slice(i, i + 30).map(String));
    }

    const results = await Promise.all(
      chunks.map(async (chunk) => {
        const q = query(collection(firestore, resource), where(documentId(), 'in', chunk));
        const snapshot = await getDocs(q);
        return snapshot.docs.map((docSnap) => toRecord(docSnap.id, docSnap.data()));
      })
    );

    return {
      data: results.flat(),
    };
  },

  getManyReference: async (resource: string, params: ManyReferenceParams) => {
    const { target, id, pagination, sort } = params;
    const { page = 1, perPage = 10 } = pagination || {};
    const { field = 'createdAt', order = 'DESC' } = sort || {};

    const q = query(
      collection(firestore, resource),
      where(target, '==', id),
      orderBy(field, order.toLowerCase() as 'asc' | 'desc')
    );
    const snapshot = await getDocs(q);

    const allData = snapshot.docs.map((docSnap) => toRecord(docSnap.id, docSnap.data()));

    const start = (page - 1) * perPage;
    const end = start + perPage;
    const data = allData.slice(start, end);

    return {
      data,
      total: allData.length,
    };
  },

  create: async (resource: string, params: CreateParams) => {
    const { id: customId, ...restData } = params.data;
    const data = convertDatesToTimestamps(restData);

    let docId: string;

    // カスタムIDが指定されている場合はsetDocを使用
    if (customId && typeof customId === 'string') {
      const docRef = doc(firestore, resource, customId);
      await setDoc(docRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      docId = customId;
    } else {
      // 自動ID生成
      const docRef = await addDoc(collection(firestore, resource), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      docId = docRef.id;
    }

    // 作成したドキュメントを取得して返す
    const snapshot = await getDoc(doc(firestore, resource, docId));

    return {
      data: toRecord(docId, snapshot.data() || {}),
    };
  },

  update: async (resource: string, params: UpdateParams) => {
    const docRef = doc(firestore, resource, String(params.id));
    const data = convertDatesToTimestamps(params.data);

    // id, createdAtは更新しない
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _id, createdAt: _createdAt, ...updateData } = data;

    await updateDoc(docRef, {
      ...updateData,
      updatedAt: serverTimestamp(),
    });

    // 更新後のドキュメントを取得
    const snapshot = await getDoc(docRef);

    return {
      data: toRecord(String(params.id), snapshot.data() || {}),
    };
  },

  delete: async (resource: string, params: DeleteParams) => {
    const docRef = doc(firestore, resource, String(params.id));

    // 削除前にデータを取得
    const snapshot = await getDoc(docRef);
    const data = snapshot.exists() ? snapshot.data() : {};

    await deleteDoc(docRef);

    return {
      data: toRecord(String(params.id), data),
    };
  },

  deleteMany: async (resource: string, params: DeleteManyParams) => {
    const { ids } = params;

    await Promise.all(ids.map((id) => deleteDoc(doc(firestore, resource, String(id)))));

    return {
      data: ids,
    };
  },

  updateMany: async (resource: string, params: UpdateManyParams) => {
    const { ids, data } = params;
    const updateData = convertDatesToTimestamps(data);

    await Promise.all(
      ids.map((id) =>
        updateDoc(doc(firestore, resource, String(id)), {
          ...updateData,
          updatedAt: serverTimestamp(),
        })
      )
    );

    return {
      data: ids,
    };
  },
};

export const dataProvider = firestoreDataProvider as unknown as DataProvider;
