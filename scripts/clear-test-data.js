/**
 * テストデータ削除スクリプト
 *
 * 使用方法:
 *   node scripts/clear-test-data.js
 *
 * 事前準備:
 *   1. ADC設定: gcloud auth application-default login
 *
 * 注意:
 *   - chains, campaigns コレクションの全データを削除します
 *   - 本番環境では絶対に実行しないでください
 */

import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Firebase Admin SDK 初期化
if (getApps().length === 0) {
  initializeApp({
    projectId: 'limimeshi-dev',
  });
}

const db = getFirestore();

async function deleteCollection(collectionPath) {
  const collectionRef = db.collection(collectionPath);
  const snapshot = await collectionRef.get();

  if (snapshot.empty) {
    console.log(`   ⚪ ${collectionPath}: 0件（スキップ）`);
    return 0;
  }

  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
  console.log(`   🗑️  ${collectionPath}: ${snapshot.size}件削除`);
  return snapshot.size;
}

async function clearData() {
  console.log('🧹 テストデータ削除開始...\n');
  console.log('⚠️  対象プロジェクト: limimeshi-dev\n');

  let totalDeleted = 0;

  // キャンペーンを先に削除（chainIdへの参照があるため）
  console.log('📦 データ削除中...');
  totalDeleted += await deleteCollection('campaigns');
  totalDeleted += await deleteCollection('chains');

  console.log(`\n✨ 削除完了！ 合計: ${totalDeleted}件`);
}

clearData().catch((error) => {
  console.error('❌ エラー:', error.message);
  process.exit(1);
});
