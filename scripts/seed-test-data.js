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
// id: 固定ID（URL用、英数字小文字）
const chains = [
  // ハンバーガー
  { id: 'mcdonalds', name: 'マクドナルド', furigana: 'まくどなるど', officialUrl: 'https://www.mcdonalds.co.jp/' },
  { id: 'mos-burger', name: 'モスバーガー', furigana: 'もすばーがー', officialUrl: 'https://www.mos.jp/' },
  // ファストフード
  { id: 'kfc', name: 'ケンタッキーフライドチキン', furigana: 'けんたっきーふらいどちきん', officialUrl: 'https://www.kfc.co.jp/' },
  // 牛丼
  { id: 'yoshinoya', name: '吉野家', furigana: 'よしのや', officialUrl: 'https://www.yoshinoya.com/' },
  { id: 'matsuya', name: '松屋', furigana: 'まつや', officialUrl: 'https://www.matsuyafoods.co.jp/' },
  { id: 'sukiya', name: 'すき家', furigana: 'すきや', officialUrl: 'https://www.sukiya.jp/' },
  { id: 'nakau', name: 'なか卯', furigana: 'なかう', officialUrl: 'https://www.nakau.co.jp/' },
  // うどん
  { id: 'marugame-seimen', name: '丸亀製麺', furigana: 'まるがめせいめん', officialUrl: 'https://www.marugame-seimen.com/' },
  // カレー
  { id: 'coco-ichibanya', name: 'CoCo壱番屋', furigana: 'ここいちばんや', officialUrl: 'https://www.ichibanya.co.jp/' },
  // とんかつ
  { id: 'katsuya', name: 'かつや', furigana: 'かつや', officialUrl: 'https://www.arclandservice.co.jp/katsuya/' },
  // ファミレス
  { id: 'saizeriya', name: 'サイゼリヤ', furigana: 'さいぜりや', officialUrl: 'https://www.saizeriya.co.jp/' },
  { id: 'gusto', name: 'ガスト', furigana: 'がすと', officialUrl: 'https://www.skylark.co.jp/gusto/' },
  { id: 'dennys', name: 'デニーズ', furigana: 'でにーず', officialUrl: 'https://www.dennys.jp/' },
  // カフェ
  { id: 'starbucks', name: 'スターバックス', furigana: 'すたーばっくす', officialUrl: 'https://www.starbucks.co.jp/' },
  { id: 'mister-donut', name: 'ミスタードーナツ', furigana: 'みすたーどーなつ', officialUrl: 'https://www.misterdonut.jp/' },
  { id: 'komeda', name: 'コメダ珈琲店', furigana: 'こめだこーひーてん', officialUrl: 'https://www.komeda.co.jp/' },
];

// テスト用キャンペーンデータ（chainIdで紐づけ）
// description: 任意（空可）、saleEndTime: 任意（空=終了日未定）
const campaigns = [
  // マクドナルド（通常データ）
  { chainId: 'mcdonalds', name: '冬の特別メニュー', description: '期間限定の冬メニューが登場', saleStartTime: Timestamp.fromDate(new Date('2025-12-01')), saleEndTime: Timestamp.fromDate(new Date('2026-01-31')) },
  { chainId: 'mcdonalds', name: '新春キャンペーン', description: 'お正月限定の特別セット', saleStartTime: Timestamp.fromDate(new Date('2025-12-25')), saleEndTime: Timestamp.fromDate(new Date('2026-01-15')) },
  // モスバーガー（description空）
  { chainId: 'mos-burger', name: '冬の特別メニュー', saleStartTime: Timestamp.fromDate(new Date('2025-12-01')), saleEndTime: Timestamp.fromDate(new Date('2026-01-31')) },
  { chainId: 'mos-burger', name: '新春キャンペーン', saleStartTime: Timestamp.fromDate(new Date('2025-12-25')), saleEndTime: Timestamp.fromDate(new Date('2026-01-15')) },
  // ケンタッキー（saleEndTime空=終了日未定）
  { chainId: 'kfc', name: '冬の特別メニュー', description: '期間限定の冬メニューが登場', saleStartTime: Timestamp.fromDate(new Date('2025-12-01')) },
  { chainId: 'kfc', name: '新春キャンペーン', description: 'お正月限定の特別セット', saleStartTime: Timestamp.fromDate(new Date('2025-12-25')) },
  // 吉野家（両方空）
  { chainId: 'yoshinoya', name: '冬の特別メニュー', saleStartTime: Timestamp.fromDate(new Date('2025-12-01')) },
  { chainId: 'yoshinoya', name: '新春キャンペーン', saleStartTime: Timestamp.fromDate(new Date('2025-12-25')) },
  // 松屋（通常データ）
  { chainId: 'matsuya', name: '冬の特別メニュー', description: '期間限定の冬メニューが登場', saleStartTime: Timestamp.fromDate(new Date('2025-12-01')), saleEndTime: Timestamp.fromDate(new Date('2026-01-31')) },
  { chainId: 'matsuya', name: '新春キャンペーン', description: 'お正月限定の特別セット', saleStartTime: Timestamp.fromDate(new Date('2025-12-25')), saleEndTime: Timestamp.fromDate(new Date('2026-01-15')) },
  // すき家（description空）
  { chainId: 'sukiya', name: '冬の特別メニュー', saleStartTime: Timestamp.fromDate(new Date('2025-12-01')), saleEndTime: Timestamp.fromDate(new Date('2026-01-31')) },
  { chainId: 'sukiya', name: '新春キャンペーン', saleStartTime: Timestamp.fromDate(new Date('2025-12-25')), saleEndTime: Timestamp.fromDate(new Date('2026-01-15')) },
  // なか卯（saleEndTime空）
  { chainId: 'nakau', name: '冬の特別メニュー', description: '期間限定の冬メニューが登場', saleStartTime: Timestamp.fromDate(new Date('2025-12-01')) },
  { chainId: 'nakau', name: '新春キャンペーン', description: 'お正月限定の特別セット', saleStartTime: Timestamp.fromDate(new Date('2025-12-25')) },
  // 丸亀製麺（通常データ）
  { chainId: 'marugame-seimen', name: '冬の特別メニュー', description: '期間限定の冬メニューが登場', saleStartTime: Timestamp.fromDate(new Date('2025-12-01')), saleEndTime: Timestamp.fromDate(new Date('2026-01-31')) },
  { chainId: 'marugame-seimen', name: '新春キャンペーン', description: 'お正月限定の特別セット', saleStartTime: Timestamp.fromDate(new Date('2025-12-25')), saleEndTime: Timestamp.fromDate(new Date('2026-01-15')) },
  // CoCo壱番屋（両方空）
  { chainId: 'coco-ichibanya', name: '冬の特別メニュー', saleStartTime: Timestamp.fromDate(new Date('2025-12-01')) },
  { chainId: 'coco-ichibanya', name: '新春キャンペーン', saleStartTime: Timestamp.fromDate(new Date('2025-12-25')) },
  // かつや（通常データ）
  { chainId: 'katsuya', name: '冬の特別メニュー', description: '期間限定の冬メニューが登場', saleStartTime: Timestamp.fromDate(new Date('2025-12-01')), saleEndTime: Timestamp.fromDate(new Date('2026-01-31')) },
  { chainId: 'katsuya', name: '新春キャンペーン', description: 'お正月限定の特別セット', saleStartTime: Timestamp.fromDate(new Date('2025-12-25')), saleEndTime: Timestamp.fromDate(new Date('2026-01-15')) },
  // サイゼリヤ（description空）
  { chainId: 'saizeriya', name: '冬の特別メニュー', saleStartTime: Timestamp.fromDate(new Date('2025-12-01')), saleEndTime: Timestamp.fromDate(new Date('2026-01-31')) },
  { chainId: 'saizeriya', name: '新春キャンペーン', saleStartTime: Timestamp.fromDate(new Date('2025-12-25')), saleEndTime: Timestamp.fromDate(new Date('2026-01-15')) },
  // ガスト（saleEndTime空）
  { chainId: 'gusto', name: '冬の特別メニュー', description: '期間限定の冬メニューが登場', saleStartTime: Timestamp.fromDate(new Date('2025-12-01')) },
  { chainId: 'gusto', name: '新春キャンペーン', description: 'お正月限定の特別セット', saleStartTime: Timestamp.fromDate(new Date('2025-12-25')) },
  // デニーズ（通常データ）
  { chainId: 'dennys', name: '冬の特別メニュー', description: '期間限定の冬メニューが登場', saleStartTime: Timestamp.fromDate(new Date('2025-12-01')), saleEndTime: Timestamp.fromDate(new Date('2026-01-31')) },
  { chainId: 'dennys', name: '新春キャンペーン', description: 'お正月限定の特別セット', saleStartTime: Timestamp.fromDate(new Date('2025-12-25')), saleEndTime: Timestamp.fromDate(new Date('2026-01-15')) },
  // スターバックス（両方空）
  { chainId: 'starbucks', name: '冬の特別メニュー', saleStartTime: Timestamp.fromDate(new Date('2025-12-01')) },
  { chainId: 'starbucks', name: '新春キャンペーン', saleStartTime: Timestamp.fromDate(new Date('2025-12-25')) },
  // ミスタードーナツ（通常データ）
  { chainId: 'mister-donut', name: '冬の特別メニュー', description: '期間限定の冬メニューが登場', saleStartTime: Timestamp.fromDate(new Date('2025-12-01')), saleEndTime: Timestamp.fromDate(new Date('2026-01-31')) },
  { chainId: 'mister-donut', name: '新春キャンペーン', description: 'お正月限定の特別セット', saleStartTime: Timestamp.fromDate(new Date('2025-12-25')), saleEndTime: Timestamp.fromDate(new Date('2026-01-15')) },
  // コメダ珈琲店（description空）
  { chainId: 'komeda', name: '冬の特別メニュー', saleStartTime: Timestamp.fromDate(new Date('2025-12-01')), saleEndTime: Timestamp.fromDate(new Date('2026-01-31')) },
  { chainId: 'komeda', name: '新春キャンペーン', saleStartTime: Timestamp.fromDate(new Date('2025-12-25')), saleEndTime: Timestamp.fromDate(new Date('2026-01-15')) },
];

async function seedData() {
  console.log('🌱 テストデータ投入開始...\n');

  // チェーン店データ投入（固定ID使用）
  console.log('📦 チェーン店データ投入中...');
  for (const chain of chains) {
    const { id, ...chainData } = chain;
    await db.collection('chains').doc(id).set({
      ...chainData,
      favoriteCount: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    console.log(`   ✅ ${chain.name} (${id})`);
  }

  // キャンペーンデータ投入
  console.log('\n📦 キャンペーンデータ投入中...');
  for (const campaign of campaigns) {
    const docRef = await db.collection('campaigns').add({
      ...campaign,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    console.log(`   ✅ ${campaign.chainId}: ${campaign.name} (${docRef.id})`);
  }

  console.log('\n✨ テストデータ投入完了！');
  console.log(`   チェーン店: ${chains.length}件`);
  console.log(`   キャンペーン: ${campaigns.length}件`);
}

seedData().catch((error) => {
  console.error('❌ エラー:', error.message);
  process.exit(1);
});
