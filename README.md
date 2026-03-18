# taipeimetrohouse-2

台北都會物業管理系統重製版。

這個 repo 不是複製舊專案，而是根據舊系統的業務流程重新整理後，用更容易維護與擴充的方式重建。

## 目標

- 重做舊版「房源 / 租約 / 任務 / 修繕 / 清潔 / 收支」管理流程
- 降低單頁塞滿邏輯、直接綁 Firebase SDK 的技術債
- 建立可逐步演進成內部營運平台的基礎架構

## 目前技術定位

- **Next.js 15 + React 19 + TypeScript**
- 目前先以 **static export** 方式輸出前端 shell
- 部署路徑改為 **GitHub CI/CD → Firebase Hosting**
- 目前資料與 auth 仍是 mock，正式 Firebase 資料層與權限層會在後續階段補上

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
- 目前登入/註冊為前端 mock 流程，後續會改成正式 auth
- 目前前端內建示範帳密僅供 prototype 使用，不可視為正式上線方案

## 部署

目前部署方式：

- `main` push 後由 GitHub Actions 執行 CI/CD
- workflow 會跑 `npm ci`、`npm run lint`、`npm run typecheck`、`npm run build`
- Next.js 會輸出靜態站到 `out/`
- GitHub Actions 再把 `out/` 部署到 Firebase Hosting
- Firebase Hosting site 明確綁定為 `taipeimetrohouse-2`，避免 CI target resolution 模糊

相關檔案：

- `firebase.json`
- `.firebaserc`
- `.github/workflows/deploy-firebase-hosting.yml`
- `docs/deployment.md`

GitHub repo 需設定 secret：

- `FIREBASE_TOKEN`

## 可用指令

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
```

## 當前限制

目前 repo 仍採 `output: 'export'`，所以：

- 還沒有 Next.js API routes
- 還沒有 server actions
- 還沒有 `/api/assistant` 代理
- 還沒有正式 Firebase auth / Firestore / Drive metadata 流程

這代表目前上線的是前端靜態殼，不是完整營運系統。

## 建議開發順序

1. 補齊 Firebase Hosting 部署與 repo 文件
2. 對齊正式 domain model（lease / work_order / assignment / attachment / audit_log）
3. 定義後端 API contract
4. 再接 Firebase auth、Firestore、Drive 與 assistant proxy

## 文件

### 工單提醒與租約提醒資料結構與狀態字典

以下為建議的 Firebase 資料結構與狀態字典設計：

1. 工單提醒 (WorkOrderAlert)
- id: string (工單編號)
- propertyId: string (所屬物業id)
- description: string (工單描述)
- status: string (狀態，可用值：pending, inProgress, completed, cancelled)
- createdAt: timestamp (建立時間)
- updatedAt: timestamp (最後更新時間)
- dueDate: timestamp (預計完成日期)
- assignedTo: string (負責人員id)

狀態字典：
- pending: 待處理
- inProgress: 進行中
- completed: 已完成
- cancelled: 已取消

2. 租約提醒 (LeaseAlert)
- id: string (提醒編號)
- propertyId: string (所屬物業id)
- leaseId: string (租約編號)
- tenantName: string (租戶名稱)
- status: string (狀態，可用值：active, expiringSoon, expired, renewed)
- leaseStart: timestamp (租約開始日期)
- leaseEnd: timestamp (租約結束日期)
- alertSent: boolean (是否已發送提醒)
- createdAt: timestamp (建立時間)
- updatedAt: timestamp (最後更新時間)

狀態字典：
- active: 正常中
- expiringSoon: 即將到期
- expired: 已過期
- renewed: 已續約

---

請參考以上結構執行開發與測試。

## 前端介面設計方案草稿

本專案工單提醒（WorkOrderAlert）與租約提醒（LeaseAlert）前端介面涵蓋以下主要模塊與頁面：

1. 提醒總覽頁（Dashboard）
- 總覽所有工單與租約提醒狀態統計
- 快速過濾：待處理、進行中、即將到期等
- 提醒待辦清單快速存取

2. 工單提醒頁（Tasks）
- 工單列表：顯示工單基本資訊、狀態、負責人
- 詳細頁：查看工單詳情及編輯狀態
- 狀態更新：透過按鈕或選單操作狀態變更
- 建立新工單提醒（表單）

3. 租約提醒頁（Leases）
- 租約提醒列表：顯示租戶、租約狀態、到期日
- 詳細頁：租約詳情及狀態更新
- 租約續約、提醒發送操作

4. 資料同步與狀態管理
- 與 Firebase API 連接，取得實時數據
- 使用 React Context / Redux 管理全局狀態
- 錯誤與載入狀態提示

5. 使用者體驗與交互
- 清晰的狀態標示及顏色區分
- 操作前提示與確認對話框
- 響應式設計，支持主要桌機與行動裝置

---

請根據此方案進行界面實作和測試。


- `docs/discovery.md`：舊專案功能拆解、使用者流程、資料模型與 MVP 建議
- `docs/architecture.md`：新專案模組規劃
- `docs/deployment.md`：目前部署方式與限制
