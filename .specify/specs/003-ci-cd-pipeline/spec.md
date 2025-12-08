# Feature Specification: CI/CDパイプライン構築

**Feature Branch**: `003-ci-cd-pipeline`
**Created**: 2025-12-09
**Status**: Draft
**Input**: User description: "GitHub Actionsを使用してCI/CDパイプラインを構築する。環境変数はGitHub Secretsで管理し、mainブランチへのマージ時に本番環境（limimeshi-prod）へ自動デプロイする"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 本番環境への自動デプロイ (Priority: P1)

開発者がmainブランチにマージすると、自動的に本番環境にデプロイされる

**Why this priority**: 手動デプロイの手間を削減し、デプロイの一貫性を確保するために必須

**Independent Test**: mainブランチにマージ後、GitHub Actionsが実行され、本番URLで変更が反映されていれば、この機能は独立して価値を提供できる

**Acceptance Scenarios**:

1. **Given** PRがmainブランチにマージされた, **When** GitHub Actionsワークフローが実行される, **Then** 本番用ビルドが作成される
2. **Given** ビルドが成功した, **When** デプロイステップが実行される, **Then** Firebase Hosting（limimeshi-prod）にデプロイされる
3. **Given** デプロイが完了した, **When** 本番URL（https://limimeshi-prod.web.app）にアクセス, **Then** 最新の変更が反映されている

---

### User Story 2 - PRのビルド・lint確認 (Priority: P2)

開発者がPRを作成すると、自動的にビルドとlintが実行され、問題があれば通知される

**Why this priority**: コード品質を保ち、マージ前に問題を検出するために重要

**Independent Test**: PRを作成後、GitHub Actionsでビルド・lintが実行され、結果がPRに表示されれば、この機能は独立して価値を提供できる

**Acceptance Scenarios**:

1. **Given** PRが作成された, **When** GitHub Actionsワークフローが実行される, **Then** npm run lintとnpm run buildが実行される
2. **Given** lint/buildが失敗した, **When** ワークフローが完了, **Then** PRにエラーが表示される
3. **Given** lint/buildが成功した, **When** ワークフローが完了, **Then** PRにチェックマークが表示される

---

### Edge Cases

- **Secrets未設定**: GitHub Secretsが設定されていない場合、ワークフローが失敗し、エラーメッセージを表示
- **Firebase認証エラー**: サービスアカウントキーが無効な場合、デプロイが失敗し、エラーメッセージを表示
- **並行実行**: 複数のPRが同時にマージされた場合、デプロイが順次実行される（または最新のみ）

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: システムはmainブランチへのマージ時に自動デプロイを実行しなければならない
- **FR-002**: システムはPR作成時にビルド・lintを実行しなければならない
- **FR-003**: システムは環境変数をGitHub Secretsから取得しなければならない
- **FR-004**: システムはビルド・デプロイの結果をGitHub上で確認できるようにしなければならない

### Key Entities

- **GitHub Actions Workflow**: `.github/workflows/`配下のYAMLファイル
- **GitHub Secrets**: Firebase環境変数（VITE_FIREBASE_*）、Firebase認証情報
- **Firebase Service Account**: Firebase CLIでのデプロイ認証に使用

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: mainマージから本番反映まで5分以内に完了する
- **SC-002**: PR作成からビルド・lint結果表示まで3分以内に完了する
- **SC-003**: 手動でのビルドコマンド実行が不要になる
- **SC-004**: 環境変数がGitHub Secretsで安全に管理される

## Assumptions *(optional)*

- GitHubリポジトリに対するActions権限がある
- Firebase CLIのサービスアカウント認証を使用する
- 現時点ではE2Eテストは含めない（別specで対応）

## Out of Scope *(optional)*

- develop環境への自動デプロイ（dev=ローカルのみの方針を維持）
- E2Eテストの自動実行
- Slack/Discord通知
- ロールバック機能
