# Tasks: 本番環境デプロイ（Production Deploy）

**Date**: 2025-12-09  
**Feature**: [spec.md](./spec.md)  
**Plan**: [plan.md](./plan.md)  

## Task Status Legend

- [ ] 未着手
- [x] 完了
- [~] 進行中
- [!] ブロック中

---

## Phase 1: 環境変数の整理

- [x] Viteの環境変数読み込み動作を調査
- [x] `.env.development.local` と `.env.production.local` を作成
- [x] 本番ビルドコマンドを確定（全環境変数を明示的に指定）
- [x] 本番ビルド時に正しく環境変数が読み込まれることを確認

## Phase 2: 本番デプロイ

- [x] `.firebaserc` に本番プロジェクト（limimeshi-prod）を追加
- [x] 本番用ビルドを実行
- [x] Firebase Hostingにデプロイ
- [x] 本番URLでログインを確認
- [x] 本番URLでデータ操作（CRUD）を確認

## Phase 3: Firestoreルール適用

- [x] limimeshi-infraから本番Firestoreにセキュリティルールをデプロイ
- [x] 本番環境で権限エラーが解消されることを確認
- [x] 本番管理者にCustom Claims（admin: true）を設定

## Phase 4: ドキュメント整備

- [x] ADR作成（環境分離方針）
- [x] README更新（デプロイ手順）
- [x] 001-admin-panel/spec.mdからEnvironment Configurationセクション削除
- [x] roadmap.md、CHANGELOG.md更新

## Phase 5: コミット・完了

- [x] セキュリティチェック（シークレットがコミット対象に含まれていないか）
- [x] コミット作成
- [x] 本specのStatusをDraft → Completeに更新

---

## Notes

### 発生した問題

1. **Vite環境変数読み込み問題**: `.env.production.local` が正しく読み込まれない
   - 原因: `VITE_FIREBASE_PROJECT_ID` のみを指定すると、他の環境変数が `.env.development.local` から読み込まれる
   - 対策: 全ての環境変数を明示的に指定
   - 詳細: [research.md](./research.md)

2. **Firestoreルール未適用**: 本番Firestoreにルールがデプロイされていない
   - 対策: limimeshi-infraから `GCLOUD_PROJECT=limimeshi-prod` を指定してデプロイ

3. **Custom Claims未設定**: 本番環境のユーザーに管理者権限が設定されていない
   - 対策: `GCLOUD_PROJECT=limimeshi-prod node scripts/set-admin-claim.js <UID>`

### 依存関係

- Phase 3（Firestoreルール適用、Custom Claims設定）は limimeshi-infra リポジトリでの作業が必要
