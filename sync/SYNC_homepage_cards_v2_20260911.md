# SYNC：首頁卡片 v2（2026-09-11）

## Git 與範圍
- Branch：`codex/homepage-cards-v2`
- 功能 commit：`f6437878cc656fbdc77b193f386672deaefca5b3`
- PR：https://github.com/Pcc329/weekly-report/pull/11
- Base：main，確認 PR #10 已合併。
- 修改 index.html；新增本 SYNC。未修改 report.md/status.md。
- 本週週報、本週工作記事、資料更新、其他 tab、歷史清單原有 script 及其 HTML 逐字比較保持相同。
- PR 尚未合併，本紀錄不代表正式站已部署。

## 函式與介面
移除：本週摘要 HTML、專屬 CSS（weekly-summary、ws-*）、parseWeeklyCard、loadWeeklyCard 與啟動呼叫；不再為摘要請求 report.md。移除舊兩段式 splitTrackingCard。
保留共用：cardText、cardEscape、cardSection、cardTableCells、parseTrackingCard、fetchCardMarkdown。
新增 trackingGroups、renderTrackingCard（包含 addFilter、applyFilter 閉包）；修改 renderTrackingItem、loadTrackingCard。

### 優先度
沿用來源 ### P0/P1/P2 辨識方式，不推定優先度。每個有資料的優先度使用獨立 details：
- P0 · 緊急：預設 open，紅色左框與底色。
- P1 · 重要：預設 open。
- P2 · 待排入：預設收合。
- 若有部分未指定優先度，另列「未設定優先度」，預設展開。
沒有資料的組別不渲染。原生 summary 可滑鼠與鍵盤操作，箭頭依自己的 open 狀態旋轉。

### 分類
以 Map 統計實際分類及筆數，依來源首次出現順序產生按鈕，另加「全部」。分類顏色依序輪用 5 組既有風格色系，不寫死分類名稱。分類按鈕以 textContent 寫入，使用 aria-pressed 表示選取。
有分類但某筆空白時提供「未分類」；全部資料都沒有分類時僅提供「全部」，不創造分類。
每筆 DOM 保存 data-cat。applyFilter 以 hidden 隱藏不符合項目（CSS 明確保證 hidden 生效），不移除節點、不重建分組，也不改變 details.open。
標籤筆數固定表示整份來源的分類總數；篩選時每組計數為「符合數 / 總數」，全部模式顯示總數。無符合項目的組別維持原收合狀態，展開時顯示提示。
載入、HTTP/逾時/解析失敗、空表格及完整工作記事連結保留。

## 真實來源與向下相容
實際 main/status.md 仍是「項目／對象／預計時間／狀態」四欄，23 筆，沒有優先度或分類。
因此目前真實來源呈現「全部 23」、前 5 筆與「顯示更多（還有 18 筆）▾」，展開後 23 筆，再次收合恢復 5 筆。
若只有分類而無優先度，依篩選後符合資料顯示前 5 筆；展開狀態保留，按鈕剩餘數跟著分類更新。原有 report-history/status-history toggle 完全未改。
分組篩選完整效果已以合成資料驗證；未修改來源檔案或要求使用者更改格式。

## 驗證案例
### 案例 1：三組獨立收合（合成資料）
P0 2 筆：CSP/資安、急件/資料。
P1 2 筆：登入/資安、資料修復/資料。
P2 2 筆：例行盤點/資料、維護/維運。
初始 open 狀態：[true,true,false]，可見 4 筆。
點 P0 後：[false,true,false]；再點 P2：[false,true,true]，其他組狀態未被改動。

### 案例 2：篩選前後（合成資料）
分類按鈕：「全部 6」「資安 2」「資料 3」「維運 1」。
保留上述 [false,true,true] 狀態，點「資料 3」：
- 三組符合數各為 1/2。
- 畫面可見 P1 資料修復、P2 例行盤點；P0 急件符合分類但因組別收合而不顯示。
- 全部 6 個項目 DOM 均保留，未移除。
改選「維運 1」僅顯示 P2 維護，P1 展開區顯示無符合項目。
點「全部 6」恢復所有符合項目，但 P0 保持收合；open 狀態一直是 [false,true,true]。

### 案例 3：375px 與真實四欄格式
手機合成資料選「資料 3」，P0/P1 展開、P2 收合，顯示「1 / 2 筆」，分類列與卡片無水平溢出，截圖已視覺檢查。
真實 status.md：只有「全部 23」，5+18 展開收合驗證通過，不展示臆測分類。
桌面 1100px 合成資料三組畫面已截圖並檢視。

## 驗收與測試
- [x] 本週摘要卡片與專屬函式/CSS 完全移除，網路請求檢查確認無摘要 report.md fetch。
- [x] 優先度組獨立收合、預設 P0/P1 展開 P2 收合。
- [x] 分類動態標籤與計數、篩選及全部還原。
- [x] 篩選保持所有節點及各組 open 狀態。
- [x] 桌面 1100px、手機 375px Edge headless 實際瀏覽器操作與截圖檢視通過。
- [x] 無優先度的 23 筆真實舊格式、只有分類無優先度、缺分組及空分類測試通過。
- [x] HTML 注入、空表格、解析失敗、HTTP 503 容錯通過，沒有 pageerror。
- [x] 所有 inline script 語法通過；不在範圍內的既有 script 與其他卡片/tab HTML 逐字比較相同。

瀏覽器測試使用攔截請求提供從 GitHub 讀取的真實 Markdown，以及明確標示的合成優先度資料；尚未做合併後正式站驗收。
