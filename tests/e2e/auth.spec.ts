import { test, expect } from '@playwright/test';

test.describe('管理者認証', () => {
  test('ログインページが表示される', async ({ page }) => {
    await page.goto('/');

    // ログインフォームが表示されることを確認
    await expect(page.getByRole('textbox', { name: /username|email/i })).toBeVisible();
    await expect(page.getByRole('textbox', { name: /password/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in|ログイン/i })).toBeVisible();
  });

  test('誤ったパスワードでログイン失敗', async ({ page }) => {
    await page.goto('/');

    // 誤った認証情報でログイン試行
    await page.getByRole('textbox', { name: /username|email/i }).fill('wrong@example.com');
    await page.getByRole('textbox', { name: /password/i }).fill('wrongpassword');
    await page.getByRole('button', { name: /sign in|ログイン/i }).click();

    // エラーメッセージが表示されることを確認
    await expect(page.getByText(/error|エラー|invalid|無効/i)).toBeVisible({ timeout: 10000 });
  });

  // 注: 実際のログインテストは Firebase 認証が必要なため、
  // CI環境ではモック化するか、テスト用アカウントを用意する必要があります
});
