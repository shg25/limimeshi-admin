import type { AuthProvider } from 'react-admin';
import type { User } from 'firebase/auth';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';

// Custom Claims付きのユーザー情報を取得
const getIdTokenResult = async (user: User) => {
  return user.getIdTokenResult();
};

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);

      // Custom Claimsでadmin権限を確認
      const idTokenResult = await getIdTokenResult(userCredential.user);
      if (!idTokenResult.claims.admin) {
        await signOut(auth);
        throw new Error('管理者権限がありません');
      }

      return Promise.resolve();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'ログインに失敗しました';
      return Promise.reject(new Error(message));
    }
  },

  logout: async () => {
    await signOut(auth);
    return Promise.resolve();
  },

  checkAuth: async () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        unsubscribe();

        if (!user) {
          reject(new Error('ログインが必要です'));
          return;
        }

        // Custom Claimsでadmin権限を確認
        try {
          const idTokenResult = await getIdTokenResult(user);
          if (!idTokenResult.claims.admin) {
            await signOut(auth);
            reject(new Error('管理者権限がありません'));
            return;
          }
          resolve();
        } catch {
          reject(new Error('認証エラー'));
        }
      });
    });
  },

  checkError: async (error) => {
    const status = error?.status;
    if (status === 401 || status === 403) {
      await signOut(auth);
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getIdentity: async () => {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('ログインが必要です');
    }

    return {
      id: user.uid,
      fullName: user.displayName || user.email || 'Admin',
      avatar: user.photoURL || undefined,
    };
  },

  getPermissions: async () => {
    const user = auth.currentUser;
    if (!user) {
      return [];
    }

    const idTokenResult = await getIdTokenResult(user);
    return idTokenResult.claims.admin ? ['admin'] : [];
  },
};
