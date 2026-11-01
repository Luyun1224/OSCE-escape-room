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
npm run test:production
```

E2E 在存在 `/usr/bin/chromium` 時使用系統 Chromium，否則使用 `npx playwright install chromium` 安裝的瀏覽器。開發測試使用 5173 埠；`test:production` 使用 `dist` 與 Vite preview（4173 埠），驗證真正的靜態成品與完整通關。

[架構、互動流程、素材與階段規劃](docs/DESIGN.md)

## GitHub Pages
Vite base 已設定 `/OSCE-escape-room/`，不使用依賴伺服器 fallback 的歷史路由。執行 `npm run build`，將 `dist` 作為 Pages artifact 部署。`.github/workflows/pages.yml` 會在推送 `main` 時自動建置並部署，也可從 Actions 手動執行。請在 Settings → Pages 將 Source 設為 **GitHub Actions**，不要直接發布 `main` 根目錄；原始 `index.html` 引用 TypeScript，直接分支發布會造成白畫面。工作流程會在上傳 `dist` 前以瀏覽器驗證成品，上線後再次驗證正式 URL、JS/CSS、遊戲互動與部署提交版本。更名儲存庫或自訂網域時須調整 base。沒有遠端字型、CDN 或 AI API 的執行期依賴。

## 原型限制
3D 目前為自行建立的建築走廊及固定視角熱區，尚缺授權寫實病人／病床／器械與診察室模型，未達正式高擬真醫療場景要求。第 2–6 關尚未實作。病例、標準解及權重均待教師審核，僅作形成性認知練習，不代表正式 OSCE／EPA 或實際操作技能。評核、無障礙與裝置相容性仍需教學試測。
