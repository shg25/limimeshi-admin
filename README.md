# 期間限定めし（リミメシ）管理画面

チェーン店の期間限定キャンペーン管理画面

## 技術スタック

- React 18.x + TypeScript 5.x
- Vite 6.x
- React Admin 5.x + MUI 7
- Firebase (Firestore, Authentication, Hosting)
- Vitest + Playwright（テスト）

## セットアップ

### 前提条件

- Node.js 20以上
- Firebase プロジェクト（limimeshi-dev）へのアクセス権

### 1. 依存パッケージのインストール

```bash
npm install
```

### 2. Firebase設定

```bash
# .env.exampleをコピー
cp .env.example .env.local

# .env.localにFirebase設定を入力
```

### 3. 開発サーバー起動

```bash
npm run dev
# http://localhost:3000 でアクセス
```

## 利用可能なスクリプト

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバー起動（ポート3000） |
| `npm run build` | 本番ビルド |
| `npm run lint` | ESLint によるコード検査 |
| `npm run test` | ユニットテスト実行 |
| `npm run test:e2e` | E2E テスト実行 |

## 機能

### チェーン店管理

- 一覧表示（ふりがな昇順ソート）
- 新規作成（名前、ふりがな必須）
- 編集（ふりがな検証: ひらがなのみ）
- 削除: Firebase Console から実施（管理画面では無効化）

### キャンペーン管理

- 一覧表示（販売開始日降順ソート）
- 新規作成（チェーン店、キャンペーン名、販売開始日時必須）
- 編集（日付バリデーション: 終了日 > 開始日）
- 削除（確認ダイアログあり）
- ステータス自動計算

### ステータス自動計算

| ステータス | 条件 |
|-----------|------|
| 予定 | 販売開始前 |
| 販売中 | 販売期間中（終了日設定あり） |
| 開始から◯日経過 | 終了日未設定で1ヶ月未満 |
| 開始から◯ヶ月経過 | 終了日未設定で1ヶ月以上 |
| 終了 | 販売終了後 |

## 管理者設定

### 新規管理者の追加

1. Firebase Console で Authentication からユーザーを作成
2. Custom Claims を設定:

```bash
node scripts/set-admin-claim.js <USER_UID>
```

### テストデータ投入

```bash
node scripts/seed-test-data.js
```

## デプロイ

```bash
npm run build
firebase deploy --only hosting:admin
```

## 関連ドキュメント

- [機能仕様書](.specify/specs/001-admin-panel/spec.md)
- [タスクリスト](.specify/specs/001-admin-panel/tasks.md)
- [クイックスタート](.specify/specs/001-admin-panel/quickstart.md)

## 関連リポジトリ

- [limimeshi-docs](https://github.com/shg25/limimeshi-docs): 企画・設計ドキュメント

## Post-MVP改善項目

本格運用前に対応を検討する技術的負債

| 項目 | 内容 | 優先度 |
|------|------|--------|
| Custom Claims検知 | `onAuthStateChanged` → `onIdTokenChanged` + 強制リフレッシュ | 中 |
| Timestamp配列変換 | `convertTimestamps` で配列内のTimestampも再帰処理 | 低 |
| ページネーション | 全件取得 → カーソル型（`orderBy` + `limit` + `startAfter`） | 中 |
| 型安全性強化 | `Record<string, unknown>` → Chain/Campaign型定義 | 中 |
| テスト拡充 | E2E テスト有効化、Provider統合テスト追加 | 高 |
