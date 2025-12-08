# Feature Specification: 本番環境デプロイ（Production Deploy）

**Feature Branch**: `002-production-deploy`  
**Created**: 2025-12-09  
**Status**: Complete  
**Input**: User description: "管理画面を本番環境（limimeshi-prod）にデプロイする機能。開発環境（limimeshi-dev）はローカル開発専用、本番環境はFirebase Hosting専用という運用方針を採用。Viteの環境変数切り替え、Firestoreセキュリティルールの本番適用を含む"  

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 本番環境へのデプロイ (Priority: P1)

開発者が管理画面を本番環境（limimeshi-prod）にデプロイし、管理者が本番URLからアクセスしてデータ管理できるようにする

**Why this priority**: 本番環境がなければサービスを公開できない。管理画面の本番運用に必須

**Independent Test**: 本番URL（https://limimeshi-prod.web.app）にアクセスしてログイン・データ操作ができれば、この機能は独立して価値を提供できる

**Acceptance Scenarios**:

1. **Given** 開発者がローカルでビルドコマンドを実行, **When** 本番用ビルド（limimeshi-prod設定）を実行, **Then** distフォルダに本番Firebase設定が埋め込まれたビルド成果物が生成される
2. **Given** 本番用ビルドが完了, **When** firebase deploy --only hostingを実行, **Then** limimeshi-prodのHostingにデプロイされる
3. **Given** デプロイが完了, **When** 管理者が本番URL（https://limimeshi-prod.web.app）にアクセス, **Then** ログイン画面が表示される
4. **Given** 管理者が本番環境にログイン済み, **When** チェーン店・キャンペーンの一覧を表示, **Then** 本番Firestoreのデータが表示される（開発環境のデータではない）
5. **Given** 管理者が本番環境にログイン済み, **When** データを登録・編集・削除, **Then** 本番Firestoreに反映される

---

### User Story 2 - 開発環境でのローカル開発 (Priority: P1)

開発者がローカル環境で開発環境（limimeshi-dev）のFirestoreに接続して開発・テストできる

**Why this priority**: 本番データを汚さずに開発・テストするために必須

**Independent Test**: npm run devでローカルサーバーを起動し、開発環境のFirestoreに接続してデータ操作ができれば、この機能は独立して価値を提供できる

**Acceptance Scenarios**:

1. **Given** 開発者が.env.development.localを設定済み, **When** npm run devを実行, **Then** ローカルサーバーが起動し、limimeshi-devのFirestoreに接続される
2. **Given** ローカルサーバーが起動中, **When** 開発者がデータを操作, **Then** limimeshi-devのFirestoreに反映される（本番データには影響しない）

---

### Edge Cases

- **環境変数未設定**: .env.*.localファイルが存在しない場合、ビルド・起動時にエラーまたは警告を表示
- **誤った環境へのデプロイ**: firebase useで環境を切り替え忘れた場合、意図しない環境にデプロイされる可能性がある → デプロイ前に現在の環境を確認する手順を文書化
- **Firestoreルール未適用**: 本番Firestoreにセキュリティルールが適用されていない場合、権限エラーが発生 → limimeshi-infraからのルールデプロイ手順を文書化

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: システムは本番環境（limimeshi-prod）へのデプロイをサポートしなければならない
- **FR-002**: システムは開発環境（limimeshi-dev）と本番環境（limimeshi-prod）を環境変数で切り替えられなければならない
- **FR-003**: システムは.env.*.localファイルをgitignoreに含め、シークレットがコミットされないようにしなければならない
- **FR-004**: システムは本番ビルド時に本番Firebase設定（API Key、Project ID等）を埋め込まなければならない
- **FR-005**: 本番Firestoreには適切なセキュリティルールが適用されていなければならない

### Key Entities

- **Firebase Project（開発）**: limimeshi-dev。ローカル開発専用。Hostingへのデプロイは行わない
- **Firebase Project（本番）**: limimeshi-prod。Firebase Hosting専用。ローカル開発では使用しない
- **環境変数ファイル**: .env.development.local（開発用）、.env.production.local（本番用）。両方とも.gitignoreに含まれる

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 開発者が本番デプロイを5分以内に完了できる（ビルド＋デプロイ）
- **SC-002**: 本番URL（https://limimeshi-prod.web.app）でログイン・データ操作が正常に動作する
- **SC-003**: 本番環境と開発環境のデータが完全に分離されている（相互に影響しない）
- **SC-004**: シークレット（API Key等）がGitリポジトリにコミットされない

## Assumptions *(optional)*

- Firestoreセキュリティルールはlimimeshi-infraリポジトリで管理・デプロイされる
- 開発環境（limimeshi-dev）のHostingへのデプロイは当面不要（将来的に必要になれば本specを更新）
- CI/CDによる自動デプロイは当面不要（手動デプロイで十分）

## Out of Scope *(optional)*

- 開発環境（limimeshi-dev）へのHostingデプロイ
- ステージング環境の構築
- CI/CDパイプラインの構築
- 自動デプロイ（GitHub Actions等）
