# 海巡新增來源 SOP — 產業資料庫

> 建立緣由：2026-08-26 建立 `data_sources` 表（PR #133），過程中發現
> 多次「同一計畫、不同網址被誤判成兩個獨立來源」的重工狀況（例如
> eii.nat.gov.tw 其實是既有雲市集工業館頁面的說明入口，並非新來源）。
> 本文件將這次建表與盤點的過程萃取為可複用的判斷規則，供未來任何
> ETL 流程新增資料來源時參考執行。

---

## 一、案例回顧：從「長官分享網址」到「登錄進 data_sources」

| 步驟 | 內容 | 發現的問題 |
|---|---|---|
| 起點 | 長官過去三個多月陸續於對話中分享多個網址 | 這些網址散落在對話紀錄裡，缺乏中央登錄，海巡時需重新翻找 |
| 過濾 | 從對話紀錄篩選出疑似資料來源的網址，排除純參考連結（如 G2、內部系統等） | 僅靠關鍵字比對容易遺漏，需逐則檢視對話內容 |
| Liveness Check | 針對每個網址實際 fetch，確認存活狀態與資料型態 | 部分網址受 robots.txt／Cloudflare Turnstile／純 JS 動態載入所限，無法直接 fetch |
| **交叉比對既有紀錄** | 使用 `conversation_search` 查詢過去的爬蟲相關對話 | **發現 eii.nat.gov.tw 導向的頁面，實為 6 月已經在爬取的雲市集工業館子頁面，僅筆數由 39 筆成長至 126 筆——並非新來源，而是既有來源的資料量成長** |
| 建表 | 設計 `data_sources` schema，並納入 `related_source_id` 欄位以處理「同計畫多入口」情況 | 若缺少此欄位，未來仍可能重複發生誤判 |
| 資訊補充 | 請某同仁協助補充記憶中缺漏的網址（如新創嚴選、商業署 PDF 名單）與取得管道（同仁提供／長官分享／自行搜尋發現） | 這類資訊不會出現在任何自動化流程中，僅能透過詢問取得 |

**核心心得**：資料來源的「網址」本身並非穩定的識別單位——同一個
計畫可能存在說明頁、清單頁、媒合平台等多個入口，且頁面內容會隨時間
增長。判斷是否為新來源時，第一步應**優先查詢 `data_sources` 表與過去
對話紀錄**，而非發現新網址便逕行視為新來源、直接排入待辦。

---

## 二、新增來源前的建議判斷流程

```
1. 收到一個疑似新來源的網址
   （可能來源：長官分享連結／某同仁提供／自行於稽核過程中發現）

2. 優先查詢 data_sources 表
   SELECT * FROM public.data_sources WHERE url ILIKE '%關鍵字%';
   → 若已存在：此非新來源，建議檢查 notes/technical_note 是否需要更新
     （例如筆數成長，可將 data_freshness_status 標記為「需增量複查」）

3. 若表中查無資料，可用 conversation_search 查詢過去對話
   （表格可能尚未補齊所有歷史來源，對話紀錄可作為輔助查核依據）
   → 若對話中有相關線索：可進一步追查真正的清單頁網址
     （長官分享的時常是說明頁而非清單本身，如前述 eii→keid 案例）

4. 確認為全新來源後，再進行 Source Liveness Check
   - 可直接 web_fetch 讀取到資料 → crawl_status 標記為「可直接爬」
   - 受 robots.txt 限制 → 標記為「人工複製」，或評估是否適合收錄
   - 受 Cloudflare Turnstile／機器人偵測阻擋 → 標記為「需繞過技術限制」
   - 純 JS 動態載入 → 建議先確認是否有同計畫的 HTML 版本入口（可參考新北案例）

5. 登錄進 data_sources
   建議統一依循本文件第三節的欄位填寫原則，避免以推測方式填寫
```

---

## 三、`data_sources` 欄位填寫原則

### 建議採用受控詞彙（避免自由文字，便於未來查詢與篩選）

| 欄位 | 建議採用值 |
|---|---|
| `acquisition_channel` | `長官提供` / `同仁提供` / `自行搜尋發現` / `既有來源延伸` |
| `crawl_status` | `可直接爬` / `需繞過技術限制` / `後台匯出不需爬蟲` / `人工複製` / `已下架無需爬取` |
| `data_freshness_status` | `尚未稽核` / `稽核中` / `稽核完成` / `需增量複查` |

### `related_source_id` 建議使用時機

當同一個計畫存在兩個以上對外網址時使用，用途在於避免重複列入待辦
清單。建議兩筆記錄**互相**填入對方的 `source_id`（雙向關聯）。

參考範例（實際案例）：

| source_id | url | related_source_id | 說明 |
|---|---|---|---|
| SRC-003 | keid.../ai_solution.aspx | SRC-004 | 雲市集工業館三頁之一 |
| SRC-004 | keid.../AITools_solution.aspx | SRC-003 | 同計畫，eii.nat.gov.tw 導向的即為此頁 |
| SRC-007 | economic.ntpc.../AITransformation | SRC-008 | HTML 表格版，建議優先使用 |
| SRC-008 | ntpc-ai.ntpc.gov.tw/vendors | SRC-007 | JS 動態版，遇技術限制時可改用 SRC-007 |

**判斷參考**：若兩個網址所呈現的公司名單／方案內容重複度極高，或
官網已明確標示「另見 XX 平台」，建議採用 `related_source_id` 建立關聯，
而非各自獨立登錄一筆。

### 待補欄位的處理原則

暫時查無資料的欄位（如主辦單位、年度），**建議填 NULL，避免以推測方式
填寫**，並於 `notes` 中註明「待補」。理由：此表未來將作為稽核判斷的
參考依據，錯誤資訊的風險高於留白——留白會促使後續人工複查，而錯誤
資訊則可能被直接誤用。

---

## 四、Supabase 寫入注意事項（本次執行過程中的參考經驗）

1. **Codex 目前無 Supabase SQL Editor 存取權限**，僅能產出 migration
   檔案，實際執行仍需由人親自於 SQL Editor 操作，此步驟無法由 Codex
   代為完成。
2. **`BEGIN` 未搭配 `COMMIT` 可能導致交易停滯**：貼上 SQL 時建議確認
   頭尾完整（`BEGIN;` ... `COMMIT;`），避免分段貼上、分段執行，以免
   遺漏中間的 INSERT 區塊。建議統一透過 `raw.githubusercontent.com`
   或 GitHub Raw 連結整段複製，避免手動拼接產生疏漏。
3. **建議預設啟用 RLS（Row Level Security）**：Supabase 建表時若跳出
   「Potential issue detected」提示，建議選擇 **Run and enable RLS**。
   理由：此類內部追蹤表不宜對 anon/authenticated API 開放，符合
   「先收後放」原則。日後若確有前端讀取需求，再另行新增 policy 即可。
4. **建議務必執行三段驗證查詢，避免僅以「Success」判斷完成**：
   ```sql
   SELECT COUNT(*) FROM public.data_sources;  -- 確認筆數是否正確
   SELECT * FROM public.data_sources ORDER BY source_id;  -- 逐筆核對內容
   SELECT source_id, related_source_id FROM public.data_sources
     WHERE related_source_id IS NOT NULL ORDER BY source_id;  -- 確認關聯是否正確
   ```
   「Success. No rows returned」僅代表 SQL 語法執行無誤，並不代表資料
   已正確寫入或筆數無誤——這是 INSERT／CREATE TABLE 類語句的正常回應，
   仍需另外以 SELECT 進行驗證確認。

---

## 五、每次 ETL 新增來源時建議的固定動作

未來任何 ETL 流程若涉及「資料來源」的判斷，建議依循以下順序：

1. 優先查詢 `data_sources` 表，確認是否已有此來源
2. 若尚未登錄，依循第二節的判斷流程補登一筆
3. 若已登錄，檢查 `last_crawl_date` 與 `data_freshness_status`，據以
   決定是否需要重新爬取或僅需增量比對
4. 爬取完成後，回填 `last_crawl_date`、`record_count_estimate`
5. 若該批資料涉及 record_status 標記（下架判定），建議比照既有的
   資料新鮮度稽核流程（DRY_RUN → 小批 → 全批）辦理，此與 `data_sources`
   的登錄屬於兩個獨立作業，建議分開處理

---

## 六、重點摘要（供快速參考）

> **收到新網址時，建議先查詢 data_sources 表與過去對話紀錄，避免逕行
> 視為新來源並直接排入待辦 → 同計畫多入口建議統一以 related_source_id
> 建立雙向關聯 → 查無資料的欄位建議填 NULL，避免推測性填寫 → Supabase
> 寫入建議預設啟用 RLS → 貼上 SQL 建議整段複製，避免分段拼接 →
> 「Success」訊息並不代表資料正確，仍需以 SELECT 完成三段驗證。**

---

*文件由 Claude 產出 · 版本 v3（2026-08-26）· 依據 PR #133 / data_sources
表建置實際處理過程整理，並於措辭上調整為較正式之表達方式*

