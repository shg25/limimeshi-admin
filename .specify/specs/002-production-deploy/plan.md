# Implementation Plan: 本番環境デプロイ（Production Deploy）

**Branch**: `002-production-deploy` | **Date**: 2025-12-09 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/002-production-deploy/spec.md`  

## Summary

管理画面を本番環境（limimeshi-prod）にデプロイする。開発環境（limimeshi-dev）はローカル開発専用、本番環境はFirebase Hosting専用という運用方針を採用。Viteの環境変数切り替えで本番Firebase設定を埋め込み、Firestoreセキュリティルールは別リポジトリ（limimeshi-infra）からデプロイする。

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Vite 6.x, Firebase CLI  
**Storage**: Firestore（limimeshi-dev: 開発用、limimeshi-prod: 本番用）  
**Testing**: 手動テスト（本番URLでログイン・データ操作確認）  
**Target Platform**: Web（Firebase Hosting）  
**Project Type**: web（React Admin SPA）  
**Performance Goals**: デプロイ完了まで5分以内  
**Constraints**: シークレットをGitにコミットしない  
**Scale/Scope**: 管理者1名、チェーン店16店舗、キャンペーン約160件  

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原則 | 状態 | 説明 |
|------|------|------|
| I. Spec-Driven | ✅ Pass | spec.md作成済み |
| II. Test-First | ✅ Pass | 手動受け入れテストで確認（本番URLでログイン・データ操作） |
| III. Simplicity | ✅ Pass | 設定ファイル変更のみ、新規コード最小限 |
| IV. Firebase-First | ✅ Pass | Firebase Hosting使用 |
| V. Legal Risk Zero | ✅ Pass | 関係なし |
| VI. Mobile & Performance First | N/A | 管理画面はPC向け |
| VII. Cost Awareness | ✅ Pass | Hosting無料枠内で運用 |
| VIII. Security & Privacy First | ✅ Pass | シークレットはgitignore、Firestoreルール適用 |
| IX. Observability | N/A | 本機能では対象外 |

## Project Structure

### Documentation (this feature)

```
specs/002-production-deploy/
├── spec.md              # 仕様書
├── plan.md              # このファイル
├── research.md          # 調査結果（Vite環境変数、デプロイ手順）
├── tasks.md             # タスクリスト
└── checklists/
    └── requirements.md  # 仕様チェックリスト
```

### Source Code Changes

今回の機能では新規ソースコード追加は最小限。主に設定ファイルの変更：

```
limimeshi-admin/
├── .firebaserc              # 本番プロジェクト追加
├── .env.development.local   # 開発用環境変数（gitignore）
├── .env.production.local    # 本番用環境変数（gitignore）
└── README.md                # デプロイ手順追記
```

**Structure Decision**: 既存プロジェクト構造を維持。設定ファイルの追加・変更のみ。

## Implementation Approach

### Phase 1: 環境変数の整理

1. Viteの環境変数読み込み動作を調査
2. `.env.development.local` と `.env.production.local` の命名規則を確定
3. 本番ビルド時に正しく環境変数が読み込まれることを確認

### Phase 2: 本番デプロイ

1. `.firebaserc` に本番プロジェクト（limimeshi-prod）を追加
2. 本番用ビルドコマンドを確定
3. Firebase Hostingにデプロイ
4. 本番URLでログイン・データ操作を確認

### Phase 3: Firestoreルール適用

1. limimeshi-infraから本番Firestoreにセキュリティルールをデプロイ
2. 本番環境で権限エラーが解消されることを確認

### Phase 4: ドキュメント整備

1. ADR作成（環境分離方針）
2. README更新（デプロイ手順）
3. 001-admin-panel/spec.mdからEnvironment Configurationセクション削除

## Complexity Tracking

なし（設定変更のみで複雑性の追加なし）
