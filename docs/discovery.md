# Discovery from legacy `taipeimetrohouse`

## 1. 核心功能清單

根據舊專案頁面、前端檔名與 Firebase Functions 可整理出這些主要能力：

### 對外網站
- 公司形象首頁
- 服務項目與聯絡資訊展示
- 管理系統登入入口

### 帳號與存取
- 登入 / 註冊
- 帳號管理
- Firebase Authentication 為主

### 房源 / 房型管理
- 新增房源
- 查看房源資訊
- 編輯房源資料
- 維護房屋基本資料：地址、類型、房間數、清潔費、管理費、網路、Wi‑Fi、門鎖密碼
- 上傳房屋圖片

### 房間 / 租客資訊
- 查看單房資訊
- 維護租客資料：姓名、電話、Email、身分證、租期、租金、押金
- 顯示即時電表 / 水表資訊
- 上傳房間圖片

### 任務 / 工單管理
- 建立任務
- 指派任務給員工
- 查看待處理 / 已完成任務
- 任務明細包含：主旨、內容、建立日、截止日、處理日、處理方式、處理結果、備註、費用

### 修繕管理
- 對房源 / 房內設備建立修繕案件
- 區分待處理 / 已完成
- 追蹤器材、問題內容、處理方式與費用

### 清潔管理
- 指派清潔工作
- 查看待處理 / 已完成清潔任務
- 完成後寄信通知管理員

### 設備管理
- 記錄房間設備
- 支援修改 / 移轉 / 維修狀態
- 設備類型包含冷氣、遙控器、電視、洗衣機、烘衣機、冰箱、微波爐等

### 租約與收費
- 租約行事曆
- 新增租約
- 登記收款
- 費用分類：租金、水費、電費、管理費、瓦斯、物件費、修繕費、其他

### 文件與通知
- 電子簽約 PDF 頁面
- Firebase Functions 發送通知信：
  - 邀請註冊
  - 電子簽約通知
  - 清潔任務通知
  - 清潔完成通知
  - 契約修改通知

## 2. 使用者流程

### A. 管理員日常流程
1. 登入後進入後台
2. 查看房源總覽
3. 選定房源後查看房間、租客、設備與費用資料
4. 新增或編輯任務 / 修繕 / 清潔案件
5. 追蹤進度與完工資訊
6. 維護租約與月度收款

### B. 新增房源流程
1. 建立房屋基本資料
2. 上傳房屋照片
3. 建立房間資料與設備清單
4. 後續再補租客與租約資料

### C. 任務派工流程
1. 建立任務或修繕案件
2. 指派工作人員
3. 設定截止日
4. 工作人員處理並回填結果
5. 管理員確認完成與費用

### D. 租約 / 收款流程
1. 建立租客與租約
2. 記錄租金與押金
3. 依月份登錄水電瓦斯等雜費
4. 透過行事曆檢視租期與帳務節點

### E. 電子簽約 / 通知流程
1. 管理員建立租約或更新資料
2. 系統寄送邀請或簽約通知
3. 房客於時效內完成簽署
4. 管理端收到完成通知

## 3. 可能的資料模型

### User
- id
- name
- email
- phone
- role (`admin`, `manager`, `staff`, `cleaner`, `maintenance`)
- status
- createdAt

### Property
- id
- code
- name
- type
- address
- district
- roomCount
- cleanFee
- managementFee
- networkProvider
- wifiName
- wifiPassword
- doorPassword
- waterMeterBase
- electricMeterBase
- gasMeterBase
- notes
- createdAt
- updatedAt

### PropertyImage
- id
- propertyId
- url
- sortOrder

### Room
- id
- propertyId
- code
- floor
- status (`vacant`, `occupied`, `maintenance`)
- monthlyRent
- deposit
- notes

### Tenant
- id
- roomId
- name
- phone
- email
- nationalId
- emergencyContact
- moveInDate
- moveOutDate

### Lease
- id
- propertyId
- roomId
- tenantId
- startDate
- endDate
- rentAmount
- depositAmount
- paymentDay
- contractStatus
- signedAt
- fileUrl

### Device
- id
- roomId
- category
- name
- brand
- serialNumber
- status (`active`, `repairing`, `transferred`, `retired`)
- note

### WorkOrder
- id
- propertyId
- roomId
- type (`task`, `cleaning`, `repair`)
- title
- description
- deviceId
- priority
- status (`todo`, `in_progress`, `done`, `cancelled`)
- assignedTo
- dueDate
- resolvedAt
- resolutionMethod
- resolutionResult
- fee
- note
- createdBy
- createdAt

### ChargeRecord
- id
- propertyId
- roomId
- leaseId
- category (`rent`, `electricity`, `water`, `gas`, `management`, `repair`, `other`)
- title
- amount
- meterPrevious
- meterCurrent
- billingMonth
- paidAt
- note

### NotificationLog
- id
- type
- targetEmail
- relatedEntityType
- relatedEntityId
- status
- sentAt

## 4. 建議 MVP 範圍

先不要把舊系統全部重演，那只是在重做技術債。

### MVP v1（最值得先做）
1. 管理員登入
2. 房源列表 / 房源詳情
3. 房間與租客基本資料
4. 任務 / 修繕工單建立、指派、更新狀態
5. 基本儀表板（待辦、逾期、空房、近期到期租約）

### MVP v1.5
6. 清潔任務獨立流程
7. 檔案 / 圖片上傳
8. 基本通知（Email）

### MVP v2
9. 租約行事曆
10. 帳務與月費紀錄
11. 電子簽約
12. 權限分級與審計紀錄

## 5. 重做方向建議

舊案問題：
- 頁面與業務邏輯高度耦合
- 直接在前端綁 Firebase SDK，資料結構難收斂
- 修繕 / 清潔 / 一般任務模型重複度高
- 文件與通知能力散落在 Cloud Functions

新版建議：
- 用單一 `WorkOrder` 模型統一任務、清潔、修繕
- 把資料操作收斂到 server actions / API 層
- 先做 admin-first 的內部系統，不急著重做舊版所有展示頁
- 租約、帳務、通知分模組迭代上線
