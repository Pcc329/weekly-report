# SYNC：statusUpdate 頂部待追蹤事項（2026-09-11）

## Git
- Branch：codex/status-top-tracking-card
- 功能 commit：4d0f70bca35520c5bd16b5b81037308b8809f777
- PR：https://github.com/Pcc329/weekly-report/pull/12
- 修改 statusUpdate.html；新增本 SYNC。未改 index.html、status.md、其他頁面。
- 尚未合併或宣稱正式站上線。

## 實作
在即時記事提示與查閱週份選單之後、update-time/report-content 之前新增待追蹤卡片。
直接複製 PR #11（codex/homepage-cards-v2）index.html 的完整卡片 script，函式內容逐字保持相同，僅在外層加入 IIFE 與私有 RAW 常數，以避免與既有頁面全域變數衝突。採複製而非抽出共用檔，原因是本輪明確要求首頁原本那份不改動；未來兩份邏輯需同步維護。
複用函式：cardText、cardEscape、cardSection、cardTableCells、parseTrackingCard、fetchCardMarkdown、trackingGroups、renderTrackingItem、renderTrackingCard、loadTrackingCard。
新增卡片 HTML/CSS，沿用既有主色、綠色、白底、圓角陰影，卡片內定義紅色優先度標示與手機間距。完整記事連結改為 #report-content，避免點擊後重新載入同頁。
沒有修改原有 loadStatus、reorderStatusMarkdown、週份選單、URL 更新、日期排序、日誌渲染及 marked/nav.js 引用。

卡片固定讀取 main 最新 status.md；選擇封存週份只影響原有下方記事。卡片的 fetching/loading/error 與記事讀取相互獨立。原文中的待追蹤事項表格依舊由既有全文渲染保留，不移除或改動來源。

## 真實資料
- status.md blob SHA：a1061f82f82fe9d2db517507e65242f12f7fa81c
- 來源元件 index.html blob SHA：400f78b6c585b233c103debacd56911de251dbc3
- 合計 20 筆，P0 1、P1 9、P2 10。
- 分類：資安2、後端5、資料品質5、專案管理2、外部協作2、前端4。
- 本次取得的最新 status.md 僅含待追蹤事項段落，未含每日日期標題。因此使用真實 status/status_20260904.md 封存補驗日期日誌與週份切換，不捏造每日內容。

## 實測結果
### 預設與分類
桌面1100px：卡片位於週份選單後、原有全文記事之前；P0/P1 open、P2 closed，各組標題1/9/10筆。
逐一點擊三組標題，只切換自己的 open，其他兩組保持不變。
展開所有組後，依次篩選六種類別，可見筆數與上述分類總數完全一致，篩選不改各组收合狀態，全部可還原20筆。

### 手機
375px：分類標籤正常換行，卡片本身沒有水平溢出，截圖已檢視。
選後端5時，P0顯示0/1及無符合提示，P1顯示1/9且可見網站存活監控，P2仍收合且顯示4/10。
桌面與手機新增區塊視覺正常；未擴大調整原本日誌表格的樣式。

### 原有功能
原有 inline script 逐字比較相同。以修改前與修改後頁面載入同一份最新來源，report-content.innerHTML 完全相同。
切換真實封存 status/status_20260904.md，修改前後 report-content.innerHTML 完全相同，選單與副標題正常，頂部卡片仍20筆最新資料。
模擬只有卡片 raw 請求回傳HTTP503，卡片顯示載入失敗，下方本週記事仍與修改前相同。全程無 pageerror。
所有 inline script 語法檢查通過；複製的元件 script 與首頁來源逐字比較一致。

## 驗收
- [x] 指定位置新增卡片，優先度獨立收合與分類篩選行為與首頁一致。
- [x] status.md 未修改。
- [x] 原有日誌與週份選單 script 未修改，修改前後本週與封存渲染比較一致。
- [x] 桌面1100px與手機375px新增卡片渲染與操作通過。
- [x] main最新真實資料20筆及六分類數量驗證通過。
- [x] loading及失敗提示保留，卡片失敗不阻斷日誌。

## 驗證限制
Edge headless 使用攔截請求回應真實 Markdown 與封存資料；日誌比較以 bundled marked 預先產生HTML，替代CDN回應。原頁 marked 9.1.6 CDN 引用保持原樣，但本次未驗證該 CDN 與 nav.js 的實際遠端載入。
卡片本身實際執行原始解析與DOM互動程式；本次未使用合成業務資料。不宣稱正式站部署/CDN傳播已驗收。
