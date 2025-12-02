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
├── .specify/specs/001-admin-panel/  # GitHub Spec Kit仕様書
│   ├── spec.md                      # 機能仕様（常に最新化）
│   ├── tasks.md                     # タスクリスト
│   └── contracts/                   # 技術契約
├── src/
│   ├── chains/               # チェーン店リソース（List, Edit, Create）
│   ├── campaigns/            # キャンペーンリソース
│   ├── providers/            # DataProvider, AuthProvider
│   ├── lib/                  # Firebase設定、バリデータ、ユーティリティ
│   └── auth/                 # 認証コンポーネント
├── scripts/                  # データ管理スクリプト
│   ├── seed-test-data.js     # テストデータ投入
│   └── clear-test-data.js    # テストデータ削除
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

## GitHub Spec Kit 運用ルール

このプロジェクトは **Spec-Driven Development** を採用

### 基本原則

- **仕様が王様、コードは従者**: spec.mdが唯一の信頼できる情報源
- **spec.mdは生きたドキュメント**: 常に現在の実装を反映

### 仕様変更時のワークフロー

```
1. spec.md を修正（要件を更新）
2. 実装を仕様に合わせて修正
3. コミット時に両方を含める
```

### 禁止事項

- spec.mdを更新せずに仕様変更を実装することは禁止
- spec.mdと実装の乖離を放置することは禁止

### 仕様ファイルの場所

- **spec.md**: `.specify/specs/001-admin-panel/spec.md`
- **tasks.md**: `.specify/specs/001-admin-panel/tasks.md`
- **constitution.md**: `.specify/memory/constitution.md`（不変の原則）

## 関連リポジトリ

- **limimeshi-docs**: 企画・設計ドキュメント（ガバナンス）
- **limimeshi-android**: Androidアプリ（Phase2で作成予定）
