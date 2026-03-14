# taipeimetrohouse-2

台北都會物業管理系統重製版。

這個 repo 不是複製舊專案，而是根據舊系統的業務流程重新整理後，用更容易維護與擴充的方式重建。

## 目標

- 重做舊版「房源 / 租約 / 任務 / 修繕 / 清潔 / 收支」管理流程
- 降低單頁塞滿邏輯、直接綁 Firebase SDK 的技術債
- 建立可逐步演進成內部營運平台的基礎架構

## 建議技術棧

- **Next.js 15 + React 19 + TypeScript**
  - 同時處理前台/後台頁面與後續 API
  - 元件化、路由與資料抓取方式一致，重構成本低
- **CSS variables + 極簡全域樣式**
  - 第一版先求穩，避免 UI 工具鏈過重
- **Zod**
  - 後續做表單與 API 驗證時可直接延用
- **未來建議資料層：PostgreSQL + Prisma / Supabase**
  - 比舊版直接把資料散在 Firebase Realtime Database 更容易治理

## 目前範圍

第一版目前已建立：

- 專案說明與重構方向
- App Router 基本頁面骨架
- 模組分區（dashboard / properties / tasks / leases / finance / settings）
- Dashboard / Properties / Tasks / Leases 四個可展示頁面
- 共用 mock data、domain types 與基礎 UI shell
- 公開頁（首頁 / 公司簡介 / 房型介紹）
- 登入 / 建立帳號畫面與前端角色切分
- 功能盤點與 MVP 文件

## 快速開始

```bash
npm install
npm run dev
```

開啟 <http://localhost:3000>

## 目前路由

- `/`：產品定位與模組入口
- `/about`：公司簡介，公開可看
- `/room-types`：房型介紹，公開可看
- `/login`：登入頁
- `/register`：建立帳號頁
- `/dashboard`：待辦、逾期、空房、租約提醒總覽
- `/properties`：房源卡片總覽
- `/tasks`：工單模型展示
- `/leases`：近期到期租約提醒
- `/settings`：最高權限設定入口（superadmin only）

## 目前權限規則

- 公開頁不需登入即可瀏覽
- `metroclaw168@gmail.com` 為目前最高權限帳號
- 目前登入/註冊為前端 mock 流程，後續可接正式 auth / database

## 部署

- 已加入 GitHub Pages workflow
- `main` push 後會自動輸出靜態站並部署到 Pages

## 可用指令

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
```

## 建議開發順序

1. 定義資料模型與角色權限
2. 先做「房源管理 + 任務管理」MVP
3. 再補「租約 / 帳務 / 通知 / 檔案」
4. 最後串接報表、自動提醒與電子簽約

## 文件

- `docs/discovery.md`：舊專案功能拆解、使用者流程、資料模型與 MVP 建議
- `docs/architecture.md`：新專案模組規劃
