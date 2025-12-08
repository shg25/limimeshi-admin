# Roadmap: limimeshi-admin

管理画面リポジトリ固有のロードマップ

> 詳細なタスクは `.specify/specs/001-admin-panel/tasks.md` を参照

---

## 現在のステータス

| フェーズ | 状態 | 進捗 |
|----------|------|------|
| 初期セットアップ | ✅ 完了 | 100% |
| 基盤構築 | ✅ 完了 | 100% |
| チェーン店管理 | ✅ 完了 | 100% |
| キャンペーン管理 | ✅ 完了 | 100% |
| 本番環境デプロイ | ✅ 完了 | 100% |
| テスト・仕上げ | 📋 未着手 | 0% |

---

## 完了済み

### 2025年12月

- [x] プロジェクト初期化（Vite + React + TypeScript + React Admin）
- [x] Firebase連携（Firestore、Authentication）
- [x] 管理者認証（Custom Claims）
- [x] チェーン店管理機能（一覧・登録・編集）
- [x] キャンペーン管理機能（一覧・登録・編集・削除）
- [x] ステータス自動計算（販売前/販売中/販売終了）
- [x] チェーン店ソート順選択機能（ふりがな順/新着順）
- [x] Claude Code設定導入（Hooks、Agent Skills、Slash Commands）
- [x] 本番環境デプロイ（limimeshi-prod）
- [x] 環境分離（dev=ローカル、prod=Hosting）

---

## 今後の予定

### テスト・仕上げ

- [ ] E2Eテスト作成（Playwright）
- [ ] 統合テスト作成（React Testing Library）
- [ ] パフォーマンス最適化（ページネーション）
- [ ] コードクリーンアップ
- [ ] 最終検証（spec.md全シナリオ）

### 運用準備

- [x] 本番環境用Firebaseプロジェクト設定
- [x] 本番デプロイ（Firebase Hosting）
- [ ] CI/CD設定（GitHub Actions） → [spec準備済み](.specify/specs/003-ci-cd-pipeline/spec.md)

---

## 更新履歴

| 日付 | 更新内容 |
|------|----------|
| 2025/12/09 | CI/CD spec作成（003-ci-cd-pipeline）、次回着手予定 |
| 2025/12/09 | 本番環境デプロイ完了（limimeshi-prod）、環境分離方針をADRに記録 |
| 2025/12/05 | 共有ファイルをシンボリックリンク方式に移行、README/CLAUDE.mdに前提条件・ガバナンス構成を追加 |
| 2025/12/05 | roadmap.md作成、Claude Code設定導入追記 |
| 2025/12/03 | チェーン店ソート順選択機能追加 |
| 2025/12/01 | 管理画面MVP機能実装完了 |

---

**最終更新**: 2025/12/09
