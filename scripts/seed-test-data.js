/**
 * テストデータ投入スクリプト
 *
 * 使用方法:
 *   node scripts/seed-test-data.js
 *
 * 事前準備:
 *   1. ADC設定: gcloud auth application-default login
 */

import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

// Firebase Admin SDK 初期化
if (getApps().length === 0) {
  initializeApp({
    projectId: 'limimeshi-dev',
  });
}

const db = getFirestore();

// テスト用チェーン店データ（初期登録想定の16店舗）
const chains = [
  // ハンバーガー
  { name: 'マクドナルド', furigana: 'まくどなるど', officialUrl: 'https://www.mcdonalds.co.jp/' },
  { name: 'モスバーガー', furigana: 'もすばーがー', officialUrl: 'https://www.mos.jp/' },
  // ファストフード
  { name: 'ケンタッキーフライドチキン', furigana: 'けんたっきーふらいどちきん', officialUrl: 'https://www.kfc.co.jp/' },
  // 牛丼
  { name: '吉野家', furigana: 'よしのや', officialUrl: 'https://www.yoshinoya.com/' },
  { name: '松屋', furigana: 'まつや', officialUrl: 'https://www.matsuyafoods.co.jp/' },
  { name: 'すき家', furigana: 'すきや', officialUrl: 'https://www.sukiya.jp/' },
  { name: 'なか卯', furigana: 'なかう', officialUrl: 'https://www.nakau.co.jp/' },
  // うどん
  { name: '丸亀製麺', furigana: 'まるがめせいめん', officialUrl: 'https://www.marugame-seimen.com/' },
  // カレー
  { name: 'CoCo壱番屋', furigana: 'ここいちばんや', officialUrl: 'https://www.ichibanya.co.jp/' },
  // とんかつ
  { name: 'かつや', furigana: 'かつや', officialUrl: 'https://www.arclandservice.co.jp/katsuya/' },
  // ファミレス
  { name: 'サイゼリヤ', furigana: 'さいぜりや', officialUrl: 'https://www.saizeriya.co.jp/' },
  { name: 'ガスト', furigana: 'がすと', officialUrl: 'https://www.skylark.co.jp/gusto/' },
  { name: 'デニーズ', furigana: 'でにーず', officialUrl: 'https://www.dennys.jp/' },
  // カフェ
  { name: 'スターバックス', furigana: 'すたーばっくす', officialUrl: 'https://www.starbucks.co.jp/' },
  { name: 'ミスタードーナツ', furigana: 'みすたーどーなつ', officialUrl: 'https://www.misterdonut.jp/' },
  { name: 'コメダ珈琲店', furigana: 'こめだこーひーてん', officialUrl: 'https://www.komeda.co.jp/' },
];

// テスト用キャンペーンデータ（chainIdは後で設定）
const campaignTemplates = [
  {
    name: '冬の特別メニュー',
    description: '期間限定の冬メニューが登場',
    saleStartTime: Timestamp.fromDate(new Date('2025-12-01')),
    saleEndTime: Timestamp.fromDate(new Date('2026-01-31')),
  },
  {
    name: '新春キャンペーン',
    description: 'お正月限定の特別セット',
    saleStartTime: Timestamp.fromDate(new Date('2025-12-25')),
    saleEndTime: Timestamp.fromDate(new Date('2026-01-15')),
  },
];

async function seedData() {
  console.log('🌱 テストデータ投入開始...\n');

  const chainIds = [];

  // チェーン店データ投入
  console.log('📦 チェーン店データ投入中...');
  for (const chain of chains) {
    const docRef = await db.collection('chains').add({
      ...chain,
      favoriteCount: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    chainIds.push(docRef.id);
    console.log(`   ✅ ${chain.name} (${docRef.id})`);
  }

  // キャンペーンデータ投入（半数のチェーンに対して）
  const campaignChainCount = Math.ceil(chainIds.length / 2);
  console.log('\n📦 キャンペーンデータ投入中...');
  for (let i = 0; i < campaignChainCount; i++) {
    const chainId = chainIds[i];
    const chainName = chains[i].name;

    for (const template of campaignTemplates) {
      const docRef = await db.collection('campaigns').add({
        ...template,
        chainId,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      console.log(`   ✅ ${chainName}: ${template.name} (${docRef.id})`);
    }
  }

  console.log('\n✨ テストデータ投入完了！');
  console.log(`   チェーン店: ${chainIds.length}件`);
  console.log(`   キャンペーン: ${campaignChainCount * campaignTemplates.length}件`);
}

seedData().catch((error) => {
  console.error('❌ エラー:', error.message);
  process.exit(1);
});
