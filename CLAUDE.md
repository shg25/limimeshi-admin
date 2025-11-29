# AI Agent Context: 期間限定めし（リミメシ）管理画面

このファイルはClaude CodeなどのAIエージェントがプロジェクトを効率的に理解するための情報です。

## プロジェクト概要

**正式名称**: 期間限定めし（リミメシ）管理画面
**リポジトリ**: limimeshi-admin
**役割**: チェーン店・キャンペーンデータの管理（CRUD操作）

## 技術スタック

- **言語**: TypeScript 5.x
- **フレームワーク**: React 19.x + Vite 6.x
- **UIフレームワーク**: React Admin 5.x
- **バックエンド**: Firebase (Firestore, Authentication, Hosting)
- **データプロバイダー**: react-admin-firebase

## ディレクトリ構造

```
limimeshi-admin/
├── .specify/                  # GitHub Spec Kit仕様書
│   ├── specs/001-admin-panel/ # 管理画面機能仕様
│   ├── memory/constitution.md # 開発原則
│   ├── templates/             # Spec Kitテンプレート
│   └── .claude/commands/      # スラッシュコマンド
├── src/
│   ├── components/           # Reactコンポーネント
│   ├── resources/            # React Adminリソース（chains, campaigns）
│   ├── providers/            # DataProvider, AuthProvider
│   └── firebase/             # Firebase設定
├── public/                   # 静的ファイル
├── firestore.rules           # Firestoreセキュリティルール
└── firestore.indexes.json    # Firestoreインデックス
```

## 重要なドキュメント

1. **[.specify/specs/001-admin-panel/spec.md](.specify/specs/001-admin-panel/spec.md)**: 機能仕様書
2. **[.specify/specs/001-admin-panel/tasks.md](.specify/specs/001-admin-panel/tasks.md)**: タスクリスト
3. **[.specify/memory/constitution.md](.specify/memory/constitution.md)**: 開発原則（憲法）

## 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# Firebase デプロイ
firebase deploy --only hosting

# Firestore ルールデプロイ
firebase deploy --only firestore:rules
```

## 関連リポジトリ

- **limimeshi-docs**: 企画・設計ドキュメント（ガバナンス）
- **limimeshi-android**: Androidアプリ（Phase2で作成予定）
