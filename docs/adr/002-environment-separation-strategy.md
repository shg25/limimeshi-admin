# ADR-002: Environment separation strategy

## Status

Accepted

## Context

管理画面（limimeshi-admin）を本番環境にデプロイするにあたり、開発環境と本番環境の分離方針を決定する必要がある。

### 要件

**機能要件**:
- 本番環境（limimeshi-prod）で管理画面を運用できる
- 開発環境（limimeshi-dev）で安全に開発・テストできる
- 本番データと開発データが混在しない

**非機能要件**:
- 運用シンプル化（1名運用）
- コスト最小化（Firebase無料枠内）
- 誤デプロイ防止

### 検討した選択肢

**Option 1: 両環境をHostingにデプロイ**

概要: dev環境もprod環境もFirebase Hostingにデプロイする

- limimeshi-dev.web.app（開発用）
- limimeshi-prod.web.app（本番用）

利点:
- 対称的な構成で理解しやすい
- 開発環境の共有が容易

欠点:
- Hosting費用が2倍（無料枠内なら問題なし）
- 開発途中のものが誤って公開されるリスク
- 運用が複雑化（どちらにデプロイするか毎回確認）

**Option 2: dev=ローカルのみ、prod=Hostingのみ**

概要: 開発環境はローカル開発専用、本番環境はFirebase Hosting専用

- 開発: `npm run dev`（localhost:3000、limimeshi-dev Firestore）
- 本番: limimeshi-prod.web.app（limimeshi-prod Firestore）

利点:
- シンプルな運用（ローカルかデプロイか明確）
- 開発途中のものが公開されない
- コスト最小化（Hosting 1つのみ）
- 誤デプロイ防止（本番デプロイは意図的な操作が必要）

欠点:
- 開発環境を他者と共有できない
- 本番デプロイ前のステージング確認ができない（ローカルで `npm run build && npm run preview` で代替可能）

**Option 3: dev=Hostingのみ、prod=Hostingのみ**

概要: 両環境ともHostingのみでローカル開発しない

- 開発: limimeshi-dev.web.app
- 本番: limimeshi-prod.web.app

利点:
- 開発環境の共有が容易
- 本番と同じ環境でテストできる

欠点:
- ローカル開発できない（開発効率低下）
- 変更のたびにデプロイが必要
- 開発フローが非効率

## Decision

**Option 2: dev=ローカルのみ、prod=Hostingのみ** を採用する

### 構成

| 環境 | Project ID | 用途 |
|------|------------|------|
| 開発 | limimeshi-dev | ローカル開発専用（`npm run dev`） |
| 本番 | limimeshi-prod | Firebase Hosting（https://limimeshi-prod.web.app） |

### 環境変数ファイル

```
.env.development.local  # ローカル開発用（limimeshi-dev設定）
.env.production.local   # 本番ビルド参照用（limimeshi-prod設定）
```

- 両ファイルとも `.gitignore` に含まれ、コミット対象外
- 本番ビルドは環境変数を明示的に指定: `VITE_FIREBASE_PROJECT_ID=limimeshi-prod npm run build`

### デプロイ手順

```bash
# 1. 本番用ビルド
VITE_FIREBASE_PROJECT_ID=limimeshi-prod npm run build

# 2. 本番プロジェクトに切り替え
firebase use production

# 3. デプロイ
firebase deploy --only hosting
```

## Consequences

### 利点

- **シンプルな運用**: ローカル=開発、デプロイ=本番と明確
- **安全性**: 開発途中のものが公開されない
- **コスト効率**: Firebase Hosting 1つのみ
- **誤デプロイ防止**: 本番デプロイには明示的なコマンド実行が必要

### 欠点・制約

- **開発環境の共有不可**: 他の開発者と開発環境を共有できない（1名運用では問題なし）
- **ステージング環境なし**: 本番デプロイ前の最終確認は `npm run preview` で代替

### 将来の拡張

- 開発環境のHostingデプロイが必要になった場合、本ADRを更新し、[002-production-deploy spec](../.specify/specs/002-production-deploy/spec.md) を修正して対応
- CI/CD導入時は、GitHub Actionsからの自動デプロイを検討

## References

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Firebase CLI Multiple Environments](https://firebase.google.com/docs/cli#project_aliases)
- [002-production-deploy spec](../.specify/specs/002-production-deploy/spec.md)
