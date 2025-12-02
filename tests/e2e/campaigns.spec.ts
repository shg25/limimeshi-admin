import { test, expect } from '@playwright/test';

// 注: これらのテストは認証済み状態を前提としています

test.describe('キャンペーン管理', () => {
  test.skip('キャンペーン一覧が表示される', async ({ page }) => {
    await page.goto('/#/campaigns');

    // 一覧テーブルが表示されることを確認
    await expect(page.getByRole('table')).toBeVisible();

    // カラムヘッダーが表示されることを確認
    await expect(page.getByText('キャンペーン名')).toBeVisible();
    await expect(page.getByText('ステータス')).toBeVisible();
  });

  test.skip('キャンペーン作成フォームが表示される', async ({ page }) => {
    await page.goto('/#/campaigns/create');

    // フォームフィールドが表示されることを確認
    await expect(page.getByLabel('キャンペーン名')).toBeVisible();
    await expect(page.getByLabel('販売開始日時')).toBeVisible();
  });

  test.skip('削除時に確認ダイアログが表示される', async ({ page }) => {
    // 既存のキャンペーンの編集画面にアクセス
    await page.goto('/#/campaigns');

    // 削除ボタンをクリック
    await page
      .getByRole('button', { name: /delete|削除/i })
      .first()
      .click();

    // 確認ダイアログが表示されることを確認
    await expect(page.getByText(/confirm|確認/i)).toBeVisible();
  });
});
