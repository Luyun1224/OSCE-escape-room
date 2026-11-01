# OSCE ESCAPE｜臨床解碼：最後一班值勤

第一關可通關原型，React + TypeScript + Vite + R3F + Drei + Zustand + Tailwind + Motion。

```sh
cd /workspace/OSCE-escape-room
npm ci
npm run dev
```

Node.js 24 / npm 11 已驗證。無需 API key、後端或登入。使用非敏感虛構案例；進度僅存本機瀏覽器。

```sh
npm run build
npm test
npm run test:e2e
```

E2E 預設使用 `/usr/bin/chromium`；若本機安裝位置不同，調整 playwright.config.ts 的 executablePath，或移除此欄並執行 `npx playwright install chromium`。測試會啟動 5173 埠。

[架構、互動流程、素材與階段規劃](docs/DESIGN.md)

## GitHub Pages
Vite base 已設定 `/OSCE-escape-room/`，不使用依賴伺服器 fallback 的歷史路由。執行 `npm run build`，將 `dist` 作為 Pages artifact 部署。`.github/workflows/pages.yml` 會在推送 `main` 時自動建置並部署，也可從 Actions 手動執行。工作流程會嘗試啟用 GitHub Pages；若儲存庫權限不足，需由管理員在 Settings → Pages 選 GitHub Actions 後重跑。更名儲存庫或自訂網域時須調整 base。沒有遠端字型、CDN 或 AI API 的執行期依賴。

## 原型限制
3D 目前為自行建立的建築走廊及固定視角熱區，尚缺授權寫實病人／病床／器械與診察室模型，未達正式高擬真醫療場景要求。第 2–6 關尚未實作。病例、標準解及權重均待教師審核，僅作形成性認知練習，不代表正式 OSCE／EPA 或實際操作技能。評核、無障礙與裝置相容性仍需教學試測。
