# Architecture draft

## Modules

- `app/`：路由與頁面
- `components/`：UI 元件
- `lib/`：共用工具、常數、mock data
- `types/`：型別定義
- `docs/`：規劃文件

## Planned route groups

- `/`：產品定位與模組入口
- `/dashboard`：營運總覽
- `/properties`：房源 / 房間
- `/tasks`：任務 / 清潔 / 修繕工單
- `/leases`：租約
- `/finance`：收支與月費
- `/settings`：系統設定

## Data strategy

初期先用 mock data 驗證流程，避免太早綁死資料庫；
確認欄位與流程後，再接正式資料層。

## Design principles

1. 先把 domain model 拉直，再做 UI 細節
2. 任務、清潔、修繕用同一個工單核心模型
3. 任何外部服務整合都走 server side
4. 舊案功能拆成模組，不再用單頁堆功能
