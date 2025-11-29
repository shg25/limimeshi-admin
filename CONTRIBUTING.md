# コントリビューションガイド

このドキュメントは、limimeshi-admin（期間限定めし 管理画面）への貢献方法を説明します。

## git-flowを採用

このリポジトリでは**git-flow**を採用しています。

### git-flowとは

Vincent Driessen氏が提唱したブランチモデルで、リリース管理とCI/CDに適した戦略です。

### ブランチ構成

| ブランチ | 用途 | マージ先 |
|---------|------|---------|
| `main` | 本番環境（安定版） | - |
| `develop` | 開発環境（次期リリース準備） | main |
| `feature/*` | 機能開発 | develop |
| `release/*` | リリース準備 | main + develop |
| `hotfix/*` | 緊急修正 | main + develop |

### ワークフロー

```
main ────────────────────────────────────→ 本番リリース
  ↑                                    ↑
  │                              release/1.0
  │                                    ↑
develop ─┬─ feature/add-chain-crud ────┘
         │
         └─ feature/add-campaign-list ─→ develop

hotfix/security-fix ─────────────────→ main + develop
```

### 通常の開発フロー

1. `develop`から`feature/xxx`ブランチを作成
2. 機能を実装
3. `develop`へプルリクエストを作成
4. レビュー後、`develop`にマージ

```bash
# featureブランチ作成
git checkout develop
git pull origin develop
git checkout -b feature/add-chain-crud

# 作業後
git push -u origin feature/add-chain-crud
# → PRを作成してdevelopにマージ
```

### リリースフロー

1. `develop`から`release/x.x`ブランチを作成
2. リリース準備（バージョン番号更新、最終テスト）
3. `main`と`develop`の両方にマージ
4. `main`にタグを付与

```bash
# releaseブランチ作成
git checkout develop
git checkout -b release/1.0

# リリース準備後
git checkout main
git merge release/1.0
git tag -a v1.0.0 -m "Release 1.0.0"
git push origin main --tags

git checkout develop
git merge release/1.0
git push origin develop
```

### 緊急修正フロー

1. `main`から`hotfix/xxx`ブランチを作成
2. 修正を実装
3. `main`と`develop`の両方にマージ

```bash
# hotfixブランチ作成
git checkout main
git checkout -b hotfix/security-fix

# 修正後
git checkout main
git merge hotfix/security-fix
git tag -a v1.0.1 -m "Hotfix 1.0.1"
git push origin main --tags

git checkout develop
git merge hotfix/security-fix
git push origin develop
```

---

## Firebase環境との対応

| ブランチ | Firebase環境 | URL |
|---------|-------------|-----|
| `main` | 本番（prod） | limimeshi-admin.web.app |
| `develop` | 開発（dev） | limimeshi-admin-dev.web.app |

---

## ブランチ命名規則

```
feature/<機能名>     # 例: feature/add-chain-crud
release/<バージョン> # 例: release/1.0
hotfix/<修正内容>    # 例: hotfix/security-fix
```

- 英語小文字、ハイフン区切り
- 簡潔で分かりやすい名前

---

## コミットメッセージ規則

[Conventional Commits](https://www.conventionalcommits.org/)に従います。

```
<type>: <description>

[optional body]
```

### Type一覧

| Type | 用途 |
|------|------|
| `feat` | 新機能 |
| `fix` | バグ修正 |
| `docs` | ドキュメント |
| `style` | フォーマット（動作に影響なし） |
| `refactor` | リファクタリング |
| `test` | テスト追加・修正 |
| `chore` | ビルド、設定変更 |

### 例

```
feat: チェーン店CRUD機能を追加

- チェーン店一覧表示
- チェーン店作成・編集・削除
- ふりがな必須バリデーション
```

---

## 関連ドキュメント

- [機能仕様書](.specify/specs/001-admin-panel/spec.md)
- [タスクリスト](.specify/specs/001-admin-panel/tasks.md)
- [開発原則](.specify/memory/constitution.md)
