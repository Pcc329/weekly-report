# SYNC：封存結束日期與預設收合（2026-09-11）

## Git
- Branch：codex/archive-labels-collapsed-groups
- 功能 commits：6874c5e8519b4ae28b2f921c0808599ecbe588b2、a9b36636903b9d5376aa6e465082fce0d4500fd6
- PR：https://github.com/Pcc329/weekly-report/pull/13

## 修改範圍
index.html、statusUpdate.html；新增本SYNC。
兩頁新增 getStatusArchiveDisplayDate，formatStatusArchiveDate / formatStatusArchive 改為使用它。
getStatusArchiveDate 原排序鍵及 sort callbacks 保持不變，路徑与連結不變。
renderTrackingCard 僅改初始 open 條件：P0/P1/P2 不加 open；未指定優先度組維持既有展開。篩選函式逐字相同。
沒有修改任何封存檔案、status.md 或其他卡片。

## 日期規則與範例
顯示專用 helper 辨識 status_YYYYMMDD-MMDD.md，月日完整採後段 MMDD，正常跨月仍用起始年；結束月份小於起始月份時視為跨年，加一年。無效結束日期回退原有單日期標籤。
| 檔名 | 舊標籤 | 新標籤 |
|---|---|---|
| status_20260907-0911.md | 2026-09-07 | 2026-09-11 |
| status_20260828-0903.md | 2026-08-28 | 2026-09-03 |
| status_20261228-0101.md | 2026-12-28 | 2027-01-01 |
| status_20260904.md | 2026-09-04 | 2026-09-04 |
| status-2026-08-20.md | 2026-08-20 | 2026-08-20 |
進度頁標籤仍附「封存」。排序繼續使用原先完整起始日期鍵，避免此次僅修標籤卻改變排序。
規格中跨月說明有語意矛盾，本次直接採後段明示月份：08→09為同年跨月，12→01才跨年。

## 收合與互動驗證
兩頁載入最新真實 status.md，20筆，P0/P1/P2=1/9/10；open=[false,false,false]，組內可見項目0筆。
逐一點擊每組，僅該組展開，再點擊還原。
展開P1後選「後端5」，open仍為[false,true,false]，可見1筆；點「全部20」後保持同樣收合狀態。
分類篩選邏輯沒有改動。

## 驗證範圍
- Node語法與同月/跨月/跨年/單日期/無效日期案例通過。
- 兩頁原排序日期函式與篩選程式逐字比較未變。
- Edge首頁清單實測標籤為9/11、9/3，href仍為原封存路徑且順序未改。
- Edge進度頁選單標籤為9/11封存、9/3封存，option value仍為原路徑。
- 桌面1100px、手機375px，兩頁新收合卡片操作通過，卡片無水平溢出，手機截圖已檢視。
- 無pageerror；瀏覽器使用最新真實status.md與模擬的兩個封存檔名清單。進度頁既有marked/nav.js用測試替身，未驗證正式CDN或原有日誌排版。
- PR尚未合併，未宣稱正式站已部署。

## 驗收
- [x] 兩處日期標籤採區間結束日。
- [x] 跨月日期正確。
- [x] 兩頁P0/P1/P2皆預設收合。
- [x] 個別開關與分類篩選保留。
- [x] 桌面及手機卡片驗證通過。
