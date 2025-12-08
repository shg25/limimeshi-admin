# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/ja/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/lang/ja/).

## [Unreleased]

### Added
- 本番環境デプロイ機能（limimeshi-prod）
  - Firebase Hosting設定（`.firebaserc`にproductionエイリアス追加）
  - 環境変数分離（`.env.development.local`、`.env.production.local`）
  - デプロイ手順をREADMEに追記
- ADR-002: 環境分離方針（dev=ローカル、prod=Hosting）
- 002-production-deploy spec（GitHub Spec Kit）
- Claude Code設定を追加（`.claude/settings.json`、Agent Skills、Slash Commands）
- ガバナンスドキュメントを追加（`docs/governance/`）
- プロジェクト管理ファイルを追加（`docs/roadmap.md`、`docs/CHANGELOG.md`）

### Changed
- README.mdにデプロイ手順と環境構成を追記

## [0.1.0] - 2025-12-03

### Added
- 管理画面MVP機能
  - チェーン店管理（一覧・登録・編集）
  - キャンペーン管理（一覧・登録・編集・削除）
  - 管理者認証（Firebase Authentication + Custom Claims）
  - ステータス自動計算（販売前/販売中/販売終了）
- チェーン店ソート順選択機能（ふりがな順/新着順）
- Firestore Security Rules
- テストデータ投入・削除スクリプト
- GitHub Spec Kit導入（`.specify/`）
