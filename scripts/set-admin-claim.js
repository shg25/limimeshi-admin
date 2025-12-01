/**
 * 管理者ユーザーに Custom Claims を設定するスクリプト
 *
 * 使用方法:
 *   node scripts/set-admin-claim.js <USER_UID>
 *
 * 事前準備:
 *   1. Firebase CLI をインストール: npm install -g firebase-tools
 *   2. ログイン: firebase login
 *   3. プロジェクト選択: firebase use limimeshi-dev
 *   4. ADC設定: gcloud auth application-default login
 *
 * 例:
 *   node scripts/set-admin-claim.js XXXXXXXXXXXXXXXXXXXXXXXXXXXX
 */

import { initializeApp, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const uid = process.argv[2];

if (!uid) {
  console.error('Usage: node scripts/set-admin-claim.js <USER_UID>');
  process.exit(1);
}

// Firebase Admin SDK 初期化（ADC: Application Default Credentials を使用）
if (getApps().length === 0) {
  initializeApp({
    projectId: 'limimeshi-dev',
  });
}

const auth = getAuth();

async function setAdminClaim() {
  try {
    // Custom Claims を設定
    await auth.setCustomUserClaims(uid, { admin: true });

    // 確認のためユーザー情報を取得
    const user = await auth.getUser(uid);
    console.log('✅ Custom Claims 設定完了');
    console.log('   UID:', user.uid);
    console.log('   Email:', user.email);
    console.log('   Claims:', user.customClaims);
  } catch (error) {
    console.error('❌ エラー:', error.message);
    process.exit(1);
  }
}

setAdminClaim();
