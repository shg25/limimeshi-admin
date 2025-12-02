import { test, expect } from '@playwright/test';

// 注: これらのテストは認証済み状態を前提としています
// 実際の運用では、テスト用アカウントでのログインをbeforeEachで行うか、
// 認証状態をモック化する必要があります

test.describe('チェーン店管理', () => {
  test.skip('チェーン店一覧が表示される', async ({ page }) => {
    // ログイン済みの状態でアクセス
    await page.goto('/#/chains');

    // 一覧テーブルが表示されることを確認
    await expect(page.getByRole('table')).toBeVisible();

    // 「チェーン名」カラムが表示されることを確認
    await expect(page.getByText('チェーン名')).toBeVisible();
  });

  test.skip('チェーン店作成フォームが表示される', async ({ page }) => {
    await page.goto('/#/chains/create');

    // フォームフィールドが表示されることを確認
    await expect(page.getByLabel('チェーン名')).toBeVisible();
    await expect(page.getByLabel('ふりがな')).toBeVisible();
  });

  test.skip('必須項目未入力でエラーが表示される', async ({ page }) => {
    await page.goto('/#/chains/create');

    // 空のまま保存ボタンをクリック
    await page.getByRole('button', { name: /save|保存/i }).click();

    // バリデーションエラーが表示されることを確認
    await expect(page.getByText(/required|必須/i)).toBeVisible();
  });
});
