import { test, expect } from '@playwright/test';

const production = process.env.OSCE_TEST_PRODUCTION === '1' || !!process.env.OSCE_E2E_URL;

test('正式頁面載入已編譯的 JS 與 CSS，並可開始及恢復遊戲', async ({ page, request }, testInfo) => {
  test.skip(!production, '部署檢查只驗證 production build 或正式網站');
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  const revision = process.env.OSCE_EXPECTED_REVISION;
  const query = revision ? `?deployment=${encodeURIComponent(revision)}` : '';
  if (revision) {
    await expect.poll(async () => {
      const manifest = await request.get(`deployment.json${query}`);
      return manifest.ok() ? (await manifest.json()).revision : `HTTP ${manifest.status()}`;
    }, { timeout: 45000, intervals: [3000, 5000, 10000] }).toBe(revision);
  }

  const response = await page.goto(`./${query}`);
  expect(response?.status()).toBe(200);
  await expect(page.getByRole('button', { name: '開始值勤' })).toBeVisible();
  await expect(page.locator('html')).toHaveCSS('background-color', 'rgb(16, 28, 43)');

  const modules = await page.locator('script[type="module"][src]').evaluateAll(elements => elements.map(element => (element as HTMLScriptElement).src));
  expect(modules.length).toBeGreaterThan(0);
  for (const src of modules) {
    expect(new URL(src).pathname).toMatch(/^\/OSCE-escape-room\/assets\/.+\.js$/);
    const asset = await request.get(src);
    expect(asset.status(), src).toBe(200);
    expect(asset.headers()['content-type']).toMatch(/javascript/);
  }
  const styles = await page.locator('link[rel="stylesheet"]').evaluateAll(elements => elements.map(element => (element as HTMLLinkElement).href));
  expect(styles.length).toBeGreaterThan(0);
  for (const src of styles) {
    const asset = await request.get(src);
    expect(asset.status(), src).toBe(200);
    expect(asset.headers()['content-type']).toMatch(/text\/css/);
  }
  await page.screenshot({ path: testInfo.outputPath('deployed-home.png'), fullPage: true });
  await page.getByRole('button', { name: '開始值勤' }).click();
  await page.getByRole('button', { name: '進入急診區' }).click();
  await expect(page.getByRole('heading', { name: '消失的病歷' })).toBeVisible();
  await page.getByRole('button', { name: /病歷夾/ }).click();
  await expect(page.getByText('已加入線索背包')).toBeVisible();
  await page.getByRole('button', { name: '關閉', exact: true }).click();
  await page.reload();
  await page.getByRole('button', { name: /繼續遊戲/ }).click();
  await expect(page.getByText('已取得 1 / 10 項線索')).toBeVisible();
  expect(errors).toEqual([]);
});
