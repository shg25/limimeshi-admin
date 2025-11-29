# 期間限定めし（リミメシ）管理画面

チェーン店の期間限定キャンペーン管理画面

## 技術スタック

- React 19.x + TypeScript 5.x
- Vite 6.x
- React Admin 5.x
- Firebase (Firestore, Authentication, Hosting)

## セットアップ

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
```

## 関連ドキュメント

- [機能仕様書](.specify/specs/001-admin-panel/spec.md)
- [タスクリスト](.specify/specs/001-admin-panel/tasks.md)
- [クイックスタート](.specify/specs/001-admin-panel/quickstart.md)

## 関連リポジトリ

- [limimeshi-docs](https://github.com/shg25/limimeshi-docs): 企画・設計ドキュメント
