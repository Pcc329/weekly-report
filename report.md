# III 產業資料庫週報 2026-07-24

**週期：W18（2026/07/20–07/24）**  
**撰寫：2026-07-24（週五）**  
**系統連結**：[產業策略智庫](https://solution-finder-gray.vercel.app) ｜ [方案探索](https://solution-finder-gray.vercel.app/manufacturing.html)

---

## 重點網址入口

| 項目 | 連結 |
|---|---|
| 🔍 產業策略智庫（主頁） | https://solution-finder-gray.vercel.app |
| 🏭 方案探索 | https://solution-finder-gray.vercel.app/manufacturing.html |
| 📊 戰情儀表板 | https://solution-finder-gray.vercel.app/dashboard.html |
| 🗂️ 資料來源說明 | https://solution-finder-gray.vercel.app/sources.html |
| 💻 GitHub Repo | https://github.com/Pcc329/solution-finder |

---

## 一、本週整體進度

1.本週主軸為「資料庫遷移實作」與「小規模測試啟動」，為專案自建置以來架構變動幅度最大的一週。

2.PostgreSQL（Supabase）遷移完成階段一至階段三首站：階段一完成六張資料表全量遷移並通過三日連續一致性驗證；階段二完成 Row-Level Security 權限政策建置，並修復三項 Security Advisor 高風險告警；階段三啟動 API 逐支切換，第一支 `cases` API 已完成並上線合併。

3.API 切換採 feature flag 機制，正式環境預設維持 Airtable 模式，可隨時切換與回復，確保遷移過程不影響既有服務。`cases` API 經 29 筆逐筆、逐欄位比對，兩資料源輸出結果完全一致（differences = 0）。

4.小規模測試（Pilot Test）正式啟動，測試邀請已發送至耕偉組與中原組；上線前置作業（測試殘留資料清除、舊版含失效憑證檔案下架）均已完成。

5.資料治理方面完成外部展商名單比對分析，並依資料品質原則做成「不匯入」決策；另完成 PM 工作方法論 Kit 建置，供後續交接與跨專案複用。

---

## 二、本週完成事項

### PostgreSQL 遷移（主線）

| 階段 | 任務 | 狀態 | 說明 |
|---|---|---|---|
| 階段一 | 六表全量資料遷移 | ✅ 完成 | Companies 852、Solutions 2,429、Cases 59、Contacts 677、Digital_needs 145、Awards 148 |
| 階段一 | 三日連續一致性驗證 | ✅ 正式結案 | 三次比對結果一致，Solutions 固定 4 筆差異已查明為缺 `solution_name` 之草稿資料，屬預期行為 |
| 階段二 | RLS 權限政策建置 | ✅ 完成 | 完成 anon／consultant／admin 三角色權限設計與實測 |
| 階段二 | Security Advisor 高風險告警修復 | ✅ 完成 | 修復 Security Definer View（2 項）及 RLS 啟用但無政策（1 項）共 3 項 CRITICAL |
| 階段二 | 三角色權限實測 | ✅ 完成 | 過程中另發現並修復兩項實質資料外露風險：anon 可存取原始 companies 表含敏感欄位、consultant 缺少 `companies_public` 檢視表授權 |
| 階段三 | `cases` API 切換（PR #115） | ✅ 完成並 merge | 導入 `DB_SOURCE_CASES` feature flag，預設維持 Airtable；使用 anon key 確保 RLS 持續生效 |
| 階段三 | `cases` API 逐筆驗收 | ✅ 通過 | 29 筆逐欄位 JSON 比對，differences = 0 |

### `cases` API 驗收過程排除問題（共 6 項）

| # | 問題 | 層級 | 處理方式 |
|---|---|---|---|
| 1 | Vercel Preview 登入驗證牆阻擋 API 驗證 | 部署設定 | 驗證期間暫時關閉，完成後已恢復保護 |
| 2 | `case_id` 於 ETL 過程被重新編號，與 Airtable 原始編號不符 | 資料內容 | 以 `airtable_rec_id` 為對照鍵修正，59 筆全數校正 |
| 3 | RLS 政策僅放行「公開」，遺漏「內部可看」；consultant 角色無讀取政策 | 權限設計 | 修正政策涵蓋兩種狀態並補上 consultant 讀取權限，anon 可見筆數由 5 筆回復為 29 筆 |
| 4 | `industry_category` 於 Supabase 命名為 `industry_code`，API 未做映射 | API 對應 | Supabase 路徑加入欄位映射，對外合約維持不變 |
| 5 | `company_size` 欄位缺漏 | Schema | 補建欄位並回填 35 筆 |
| 6 | `pain_point_domain`、`key_technology`、`ai_maturity_stage` 三欄缺漏 | Schema | 補建欄位（前兩者為 jsonb 陣列型別）並回填 24／24／8 筆 |

### 小規模測試（Pilot Test）

| 任務 | 狀態 | 說明 |
|---|---|---|
| 測試邀請信發送 | ✅ 完成 | 已發送至耕偉組、中原組 |
| Feedback 表測試殘留清除 | ✅ 完成 | 清除 7 筆測試殘留紀錄 |
| 舊版 `feedback.html` 下架 | ✅ 完成 | 該檔含已撤銷憑證字串，自 weekly-report repo 移除 |
| 案例卡片雙標籤顯示修正（PR #114） | ✅ 完成並 merge | 修正 `case_type` 與 `outcome_status` 原互斥顯示問題，改為雙標籤並列 |
| 測試進度追蹤 | ⬜ 進行中 | 已請主管協助提醒，後台回饋待收集 |

### 資料治理

| 任務 | 狀態 | 說明 |
|---|---|---|
| 外部展商名單比對分析 | ✅ 完成 | 原始 1,157 筆去重後 929 家；與現有資料庫重疊 57 家（其中 48 家具方案層資料、0 家具案例層資料），全新 872 家 |
| 展商名單匯入決策 | ✅ 完成決策 | **決定不匯入**：872 家全新業者無已驗證方案或案例內容，匯入將稀釋資料密度而無實質效益 |
| ETL 比對報告發布 | ✅ 完成 | 發布至 GitHub Pages，並改良索引頁改為動態讀取各報告標題與說明 |

### 文件與方法論

| 任務 | 狀態 | 說明 |
|---|---|---|
| PM 工作方法論 Kit 建置 | ✅ 完成 | 重構為 `core/`（跨專案通用）＋ `instances/`（專案專屬）兩層架構，core 層共 8 份文件 |
| 系統架構圖製作 | ✅ 完成 | 軟體堆疊、雲端部署、AI 整合三張架構圖，含口說稿與名詞對照表 |
| 專案簡報 V9 更新 | ✅ 完成 | 新增資料庫升級章節（4 頁），並更正先前遺漏之費用項目 |

---

## 三、資料庫現況

| 表 | Airtable | Supabase | 一致性 |
|---|---:|---:|---|
| Solutions（方案） | 2,433 筆 | 2,429 筆 | 差異 4 筆（缺 `solution_name` 草稿，已查明） |
| Companies（業者） | 852 筆 | 852 筆 | ✅ 一致 |
| Cases（案例） | 59 筆 | 59 筆 | ✅ 一致 |
| Contacts（聯絡人） | 677 筆 | 677 筆 | ✅ 一致 |
| Digital_needs（數位需求） | 145 筆 | 145 筆 | ✅ 一致 |
| Awards（獎項） | 148 筆 | 148 筆 | ✅ 一致 |

### API 遷移進度

| API | 狀態 | 說明 |
|---|---|---|
| `/api/cases` | ✅ 已完成切換能力 | feature flag 就緒，正式環境預設仍走 Airtable |
| `/api/companies` | ⬜ 下週執行 | 第二支 |
| `/api/solutions` 等其餘 4 支 | ⬜ 待排程 | 依序處理 |

---

## 四、已知問題 & 待處理事項

| 項目 | 說明 | 優先度 |
|---|---|---|
| `sources.html` 尚未新增農業部來源 | 屬短工時收尾項目 | 🔴 高 |
| companies API 遷移前欄位健檢 | 本週 cases API 因欄位缺漏三度返工，須於規格書撰寫前先執行欄位對照健檢 | 🔴 高 |
| 其餘資料表可能同樣存在缺欄 | cases 表發現 5 個欄位缺漏，solutions、contacts 等表尚未複查 | 🔴 高 |
| `manufacturing.html` 前端欄位讀取異常 | 農業部 93 筆之 `solution_category`、來源 badge、價格顯示與 Airtable 不符 | 🟡 中 |
| `has_ai` 空值 206 筆 | 待 Haiku 批次標註，須先抽樣驗證準確率 | 🟡 中 |
| 5 筆舊案例 `industry_category` 未填 | 資料完整性補齊 | 🟡 中 |
| 方案詳情頁「返回搜尋結果」導覽 bug | 滑鼠側鍵／瀏覽器上一頁未依預期返回 | 🟡 中 |
| 案例圖片素材缺口 | 振添 3 張、樹德 2 張、盟創 1 張，共 6 張待補 | 🟢 追蹤中 |

### Blocker 狀態更新

| Blocker | 前次狀態 | 本週狀態 | 說明 |
|---|---|---|---|
| 2-1 `company_id` 重複 | ✅ 已解決 | ✅ 已解決 | — |
| 2-2 `industry_category` 同名異義 | ⬜ 待處理 | ✅ **結案** | Supabase 該欄位已命名為 `industry_code`，資料庫層衝突消失；API 層以映射維持對外合約，前端無須改動，原規劃之前端改名工程取消 |
| 2-3 `has_ai` 值域不一致 | ✅ 已解決 | ✅ 已解決 | — |

---

## 五、開發費用

### 5-1 訂閱與儲值（累計，台幣）

本週配合簡報 V9 更新，重新盤點歷史費用，補入先前未列計之 **Airtable** 與 **OpenAI／Codex** 項目。

| 項目 | 說明 |
|---|---|
| 前次帳面累計 | NT$ 8,029 |
| 本次補入項目 | Airtable 訂閱、OpenAI／Codex 使用費 |
| **更正後累計** | **NT$ 20,748** |

> ⚠️ 上表為 V9 簡報更正後之總額。逐項明細請以簡報附表為準；7 月訂閱與儲值金額待實際帳單出來後更新。

### 5-2 本週 API 使用量概算

| 使用情境 | 資料量 | 估算費用 |
|---|---|---|
| Supabase 遷移與一致性驗證 | 六表共 4,310 筆 | 以 Notebook 執行，未使用模型判定，無 Claude API 費用 |
| `cases` 表欄位補資料 | 91 筆更新（35＋24＋24＋8） | Airtable 讀取與 Supabase 寫入，未產生按次費用 |
| API 開發與 SYNC 文件 | PR #114、PR #115 | 屬 Codex／ChatGPT 月費範圍 |
| 展商名單比對分析 | 1,157 筆清洗、929 筆比對 | 以 Python 本機執行，無 API 費用 |
| Supabase 使用量 | 六表全量 | 目前於免費額度內 |

### 5-3 本週成本結論

1.本週投入集中於資料庫遷移、權限設計、API 開發與驗證流程，未使用模型批次判定作業，因此未新增 Claude API 成本。

2.Supabase 導入後，資料庫層目前仍在免費額度範圍內；後續開放 20–30 人使用時，須另行評估用量級距與費用。

---

## 六、下週計畫

| 優先 | 任務 | 說明 |
|---|---|---|
| 🔴 | 執行欄位對照健檢 | companies 表 Airtable ↔ Supabase 欄位比對，並回頭複查其餘資料表，避免重演本週返工 |
| 🔴 | 撰寫 companies API 遷移規格書 | 將健檢結果納入規格，健檢未完成前不動工 |
| 🔴 | 完成 `sources.html` 更新 | 新增「農業部（農業雲市集－數位館）」，完成資料匯入文件閉環 |
| 🔴 | 治理案例文件補記 | 補入本週三項驗證教訓：筆數吻合不代表內容吻合、逐筆比對須先排序對齊、欄位狀態須全表掃描不可單筆推論 |
| 🟡 | companies API 開發與驗收 | 沿用 cases API 流程：規格書 → 實作 → 逐筆比對 differences = 0 |
| 🟡 | 修正 `manufacturing.html` 欄位讀取 | 農業部 93 筆前端顯示與資料層不符 |
| 🟡 | 追蹤小規模測試回饋 | 於期中檢視整體完成率，評估是否需調整任務設計 |
| 🟢 | `has_ai` 206 筆補標 PoC | 抽樣測試 Haiku 判定準確率後再批次回寫 |

### 待決策事項

| 項目 | 建議時機 | 理由 |
|---|---|---|
| 正式環境切換至 Supabase | 小規模測試結束後 | 測試期間切換將增加變因，若測試者回報異常將無法分辨為功能問題或遷移問題；切換與回復成本極低（僅環境變數），無須提前 |
