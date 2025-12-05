# AI Agent Context: 期間限定めし（リミメシ）管理画面

このファイルはClaude CodeなどのAIエージェントがプロジェクトを効率的に理解するための情報です。

## 前提条件

このリポジトリは limimeshi-docs と同じ親ディレクトリに配置する必要がある：
```
parent-directory/
├── limimeshi-docs/    ← 必須
└── limimeshi-admin/
```

## ディレクトリ構成（ガバナンス関連）

本リポジトリは limimeshi-docs のガバナンスルールに従う

### docs/
- `roadmap.md`：ロードマップ（実体、リポジトリ固有）
- `CHANGELOG.md`：変更履歴（実体、リポジトリ固有）
- `README.md`：ディレクトリ説明（コピー、編集不可）

### docs/adr/
- リポジトリ固有のADR（実体）
- `README.md`：ADR説明（コピー、編集不可）

### docs/governance/
- `docs-style-guide.md`：ドキュメント記述ルール（シンボリックリンク）
- `shared-rules.md`：複数リポジトリ共通ルール（シンボリックリンク）
- `README.md`：ガバナンス説明（コピー、編集不可）

### .claude/
Claude Code設定（シンボリックリンク）：
- `settings.json`：Hooks設定
- `commands/suggest-claude-md.md`
- `skills/`：Agent Skills

### .specify/
GitHub Spec Kit（仕様駆動開発）：
- `memory/constitution.md`：プロジェクトの憲法（実体、カスタマイズ可）
- `specs/`：機能仕様書（実体、リポジトリ固有）
- `.claude/commands/`：speckit-*コマンド（シンボリックリンク）
- `templates/`：仕様書テンプレート（シンボリックリンク）
- `README.md`：Spec Kit説明（コピー、編集不可）

### 同期について
- **シンボリックリンク**: limimeshi-docs更新で自動反映
- **READMEコピー**: limimeshi-docsから`/sync-shared-rules [リポジトリ名]`で同期
- **リポジトリ固有**: constitution.md、roadmap.md、CHANGELOG.md、specs/、adr/

---

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
