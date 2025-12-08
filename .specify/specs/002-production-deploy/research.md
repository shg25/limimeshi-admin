# Research: 本番環境デプロイ（Production Deploy）

**Date**: 2025-12-09  
**Feature**: [spec.md](./spec.md)  

## 調査項目

### 1. Vite環境変数の読み込み動作

**問題**: `npm run build` 実行時に `.env.production` や `.env.production.local` が読み込まれず、開発環境の設定（limimeshi-dev）でビルドされてしまう

**調査結果**:

Viteの環境変数ファイル優先順位（[公式ドキュメント](https://vitejs.dev/guide/env-and-mode.html)）：

```
.env                # 全環境で読み込み
.env.local          # 全環境で読み込み（gitignore推奨）
.env.[mode]         # 指定modeで読み込み
.env.[mode].local   # 指定modeで読み込み（gitignore推奨）
```

- `npm run build` は `--mode production` がデフォルト
- `.env.local` は **全環境で読み込まれる**（modeに関係なく）
- `.env.local` が存在すると `.env.production` より優先される

**発見した問題**:
- 以前 `.env.local` に開発環境の設定があり、これが本番ビルド時も優先されていた
- `.env.local` を `.env.development.local` にリネームしても、まだ問題が解消しなかった
- 環境変数を明示的にコマンドラインで渡すと正しく動作した

**決定**: 本番ビルド時は**全ての**環境変数を明示的に指定する

```bash
source .env.production.local && \
VITE_FIREBASE_API_KEY=$VITE_FIREBASE_API_KEY \
VITE_FIREBASE_AUTH_DOMAIN=$VITE_FIREBASE_AUTH_DOMAIN \
VITE_FIREBASE_PROJECT_ID=$VITE_FIREBASE_PROJECT_ID \
VITE_FIREBASE_STORAGE_BUCKET=$VITE_FIREBASE_STORAGE_BUCKET \
VITE_FIREBASE_MESSAGING_SENDER_ID=$VITE_FIREBASE_MESSAGING_SENDER_ID \
VITE_FIREBASE_APP_ID=$VITE_FIREBASE_APP_ID \
npm run build
```

**重要**: `VITE_FIREBASE_PROJECT_ID` だけを指定すると、他の環境変数（API_KEY、APP_ID等）は `.env.development.local` から読み込まれ、認証トークンが不正になる

**Rationale**:
- Viteの環境変数読み込みの挙動が複雑で、ファイルベースの切り替えは予期しない動作を招く
- 明示的な指定は意図が明確で、誤った環境でのビルドを防げる
- CIなど自動化環境でも一貫した動作が保証される

**Alternatives considered**:
1. `.env.production.local` のみを使用 → Viteの読み込み順序が複雑で信頼性に欠ける
2. vite.config.tsで環境変数を直接設定 → シークレットがコードに含まれるリスク
3. `--mode` フラグの使用 → `production` はViteのデフォルトであり、追加の設定が必要

---

### 2. Firebase Hosting複数環境の管理

**調査結果**:

`.firebaserc` でプロジェクトエイリアスを定義：

```json
{
  "projects": {
    "default": "limimeshi-dev",
    "production": "limimeshi-prod"
  }
}
```

環境切り替え：

```bash
firebase use production  # limimeshi-prodに切り替え
firebase use default     # limimeshi-devに切り替え
```

**決定**: `.firebaserc` に両環境を定義し、`firebase use` で切り替える

**Rationale**: Firebase CLIの標準的な複数環境管理方法

---

### 3. Firestoreセキュリティルールのデプロイ

**調査結果**:

- Firestoreルールは `limimeshi-infra` リポジトリで管理されている
- 本番環境（limimeshi-prod）にルールがデプロイされていないため、`Missing or insufficient permissions` エラーが発生

**決定**: limimeshi-infraから本番Firestoreにルールをデプロイする

**手順**:
1. limimeshi-infraリポジトリに移動
2. `firebase use production`（または該当するエイリアス）
3. `firebase deploy --only firestore:rules`

---

### 4. 環境変数ファイルの命名規則

**決定**:

| ファイル | 用途 | gitignore |
|---------|------|-----------|
| `.env.development.local` | ローカル開発用（limimeshi-dev） | ✅ |
| `.env.production.local` | 本番ビルド参照用（バックアップ目的） | ✅ |

**注意**: 本番ビルドは環境変数を明示的に指定するため、`.env.production.local` は参照用・バックアップ目的

---

## 未解決の課題

### Vite環境変数の根本原因

`.env.production.local` が正しく読み込まれない根本原因は特定できていない。以下の可能性がある：

1. Viteのキャッシュ問題
2. TypeScript（tsc）のキャッシュ問題
3. node_modules/.vite のキャッシュ問題
4. macOSのファイルシステムキャッシュ

**暫定対策**: 環境変数を明示的に指定することで回避

**今後の対応**: 時間があれば根本原因を調査し、ファイルベースの環境切り替えが動作するようにする（優先度低）
