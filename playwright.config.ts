import { defineConfig } from '@playwright/test';
import { existsSync } from 'node:fs';

const production = process.env.OSCE_TEST_PRODUCTION === '1';
const remoteURL = process.env.OSCE_E2E_URL?.replace(/\/?$/, '/');
const localURL = `http://127.0.0.1:${production ? 4173 : 5173}/OSCE-escape-room/`;

export default defineConfig({
  testDir: './tests',
  timeout: 90000,
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: remoteURL || localURL,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    launchOptions: {
      executablePath: existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined,
      args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
    },
  },
  webServer: remoteURL ? undefined : {
    command: production ? 'npm run preview -- --port 4173 --strictPort' : 'npm run dev -- --port 5173 --strictPort',
    url: localURL,
    reuseExistingServer: !process.env.CI,
  },
  workers: 1,
});
