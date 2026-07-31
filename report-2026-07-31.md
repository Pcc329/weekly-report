# III 產業資料庫週報 2026-07-31

**週期：W19（2026/07/27–07/31）**  
**撰寫：2026-07-31（週五）**  
**系統連結**：[產業策略智庫](https://solution-finder-gray.vercel.app) ｜ [方案探索](https://solution-finder-gray.vercel.app/manufacturing.html)

---

## 重點網址入口

### 🎯 主線：產業資料庫

| 項目 | 連結 |
|---|---|
| 🔍 產業策略智庫（主頁） | https://solution-finder-gray.vercel.app |
| 🏭 方案探索 | https://solution-finder-gray.vercel.app/manufacturing.html |
| 📊 戰情儀表板 | https://solution-finder-gray.vercel.app/dashboard.html |
| 🗂️ 資料來源說明 | https://solution-finder-gray.vercel.app/sources.html |
| 💻 GitHub Repo | https://github.com/Pcc329/solution-finder |

### 📈 支線：升級評估

| 項目 | 連結 |
|---|---|
| 📄 資料庫升級評估（主任報告） | https://pcc329.github.io/weekly-report/db_upgrade_roadmap_20260730.html |

### 🧭 支線：方法論分享

| 項目 | 連結 |
|---|---|
| 🎓 PM 起案方法論教學簡報 | https://pcc329.github.io/weekly-report/methodology_training_20260729.html |
| 📝 結構化週報製作方法 | https://pcc329.github.io/weekly-report/weekly_report_method_sharing_20260716.html |
| 💻 PM 方法論 Kit（GitHub） | https://github.com/Pcc329/pm-ai-workflow-kit |

---

## 一、本週整體進度

1.本週三條工作線並行推進：主線為「資料庫遷移收尾」，兩條重要分支為「資料庫升級評估報告（主任交辦）」與「PM 起案方法論教程開案（組長交辦）」。

2.**資料庫遷移主線達成重大里程碑**：API 層三大表遷移全數完成。繼上週 `cases` API（PR #115）後，本週完成 `companies` API（PR #116）與最複雜的 `solutions` API（PR #117，2,429 筆），三支皆通過逐筆逐欄位比對（realDifferences = 0）。

3.`solutions` API 遷移導入獨立第二審機制（Claude 初審 → GPT 二審 → 合併），二審通過後合併；並依二審建議同日完成一項分頁邊界防禦性修補（PR #118），預防未來資料量增長時的潛在故障。

4.**資料庫升級評估報告已交付主任**：將主線遷移成果與後續 18 個月路線圖，整理為「四階段路線圖」對外報告（餐車→固定店面→旗艦店→中央廚房），涵蓋時程、人力、費用結構與 MCP 整合時機，作為主任詢問之正式回覆。

5.**PM 起案方法論教程完成 kick-off**：依組長交辦與同事討論結果正式開案，教學簡報與 Kit 架構已交付；下一步進入「請顧問同仁實際試用、驗證教程可用性」階段。

6.**遷移時程**：API 層遷移預計 **8/15 前完成**。最後一支 `contacts` 表已完成健檢，結構為四表中最單純、無重大資料對齊問題，若後續實作順利可望提早完成；正式環境切換將待小規模測試結束後執行，以確保測試結果不受遷移變因干擾。

---

## 二、本週完成事項

### 主線一：資料庫遷移收尾

| 階段 | 任務 | 狀態 | 說明 |
|---|---|---|---|
| 階段三 | `companies` API 切換（PR #116） | ✅ 完成並 merge | 導入 `DB_SOURCE_COMPANIES` feature flag；過程中修復 `avg_score` null 計算 bug（parseScore 將 null 當 0，導致 33 筆平均分偏低） |
| 階段三 | `solutions` API 切換（PR #117） | ✅ 完成並 merge | 最大最複雜一支，2,429 筆；六項對齊修正（分頁排序、陣列格式、id/cid BOM 對應、空值處理等） |
| 階段三 | `solutions` API 逐筆驗收 | ✅ 通過 | 2,429 筆共同記錄，realDifferences = 0；另 4 筆為缺 `solution_name`／`description` 之空殼草稿，ETL 刻意跳過，已逐筆確認屬預期 |
| 階段三 | 獨立第二審（GPT） | ✅ 通過 | 針對分頁邊界、id/cid 邏輯、豁免項合理性等六點審查，結論「可 merge」 |
| 階段三 | 分頁邊界防禦性修補（PR #118） | ✅ 完成並 merge | 修正 offset 分頁在「總筆數為單頁上限整數倍」時的邊界判斷，避免越界請求觸發 416 被誤判為錯誤；純防禦性修補，輸出行為不變 |

> **三大表 API 遷移進度**：`cases` ✅ ／ `companies` ✅ ／ `solutions` ✅

### 分支二：資料庫升級評估報告（主任交辦）

| 任務 | 狀態 | 說明 |
|---|---|---|
| 四階段路線圖報告製作 | ✅ 完成並交付 | 以「餐車→固定店面→旗艦店→中央廚房」四階段呈現內部工具到跨院 B2B 服務的升級路徑 |
| 18 個月時程總覽 | ✅ 完成 | 甘特圖呈現各階段時程與里程碑 |
| 人力評估 | ✅ 完成 | 從單人 AI 協作到小型團隊的人力級距 |
| 費用結構分析 | ✅ 完成 | 依用途分四類（開發／資料庫基礎設施／AI 推論／資料來源採購），以百分比堆疊圖呈現 |
| MCP 整合時機說明 | ✅ 完成 | 以條件觸發而非固定時程規劃 |
| 三點結論建議 | ✅ 完成 | 每階段設明確 Go/No-Go 升級門檻，後期預算採需求觸發而非預先承諾 |

> 本報告為主線遷移成果的對外呈現版本，作為主任詢問資料庫進度之正式回覆。

### 分支三：PM 起案方法論教程（組長交辦 + 同事討論開案）

| 任務 | 狀態 | 說明 |
|---|---|---|
| 正式開案（kick-off） | ✅ 完成 | 依組長交辦與同事討論結果開案 |
| 方法論 Kit 交付 | ✅ 完成 | `core/`（跨專案通用）＋ `instances/`（專案專屬）兩層架構，含起案訪談、AI 協作角色、GitHub/Vercel 教學等文件 |
| 教學簡報交付 | ✅ 完成 | methodology_training_20260729.html 已發布 |
| 教程可用性驗證 | ⬜ 下一步 | kick-off 完成，後續請顧問同仁實際試用，驗證教程是否 work |

---

## 三、資料庫現況

| 表 | Airtable | Supabase | 一致性 |
|---|---:|---:|---|
| Solutions（方案） | 2,433 筆 | 2,429 筆 | 差異 4 筆（缺 `solution_name` 空殼草稿，已查明） |
| Companies（業者） | 852 筆 | 852 筆 | ✅ 一致 |
| Cases（案例） | 59 筆 | 59 筆 | ✅ 一致 |
| Contacts（聯絡人） | 677 筆 | 677 筆 | ✅ 一致 |
| Digital_needs（數位需求） | 145 筆 | 145 筆 | ✅ 一致 |
| Awards（獎項） | 148 筆 | 148 筆 | ✅ 一致 |

### API 遷移進度

| API | 狀態 | 說明 |
|---|---|---|
| `/api/cases` | ✅ 已完成切換能力 | feature flag 就緒，正式環境預設仍走 Airtable |
| `/api/companies` | ✅ 已完成切換能力 | 本週完成（PR #116） |
| `/api/solutions` | ✅ 已完成切換能力 | 本週完成（PR #117），三大表遷移收尾 |
| `/api/contacts` | 🔄 已完成健檢，待遷移 | 最後一支；健檢結果結構單純、無重大對齊問題（詳見下方） |

> 正式環境（Production）目前**未設定** `DB_SOURCE_*` 環境變數，三支 API 皆維持 Airtable 模式，遷移程式碼已進主幹但開關未開，正式站行為不變。正式切換為獨立階段，待小規模測試結束後執行。

### contacts 表健檢結論（本週完成）

本週對最後一支 `contacts` 表完成遷移前欄位健檢，結果為四張表中結構最單純者，無重大對齊風險：

| 檢查項 | 結果 |
|---|---|
| 欄位對齊（7 核心欄） | ✅ 表／遮罩檢視表全對 |
| `company_id` 型別 | ✅ 為 text，非 Linked Record（原預期之對照工序不需要） |
| 筆數 | ✅ 677 筆，與紀錄一致 |
| `company_id` 對應 | ✅ 零孤兒，與 companies 表 join 完全乾淨 |
| 陣列欄位 | ✅ 零個，無排序／空值處理負擔 |
| 個資遮罩 | ✅ email／mobile／office_phone 三欄皆遮 |

> 健檢過程另發現 `contacts_masked` 檢視表原僅遮罩 email 與 mobile，**office_phone（市話）漏遮**（含分機直撥號亦為明碼）。本週已就地修補遮罩邏輯，三欄一致遮罩，含分機號碼一併遮除，個資風險封閉於源頭。

---

## 四、已知問題 & 待處理事項

| 項目 | 說明 | 優先度 |
|---|---|---|
| anon 角色權限過寬 | solutions 表 anon 角色具全套 DML 權限（INSERT/UPDATE/DELETE 等），應收斂至僅 SELECT；anon key 公開於前端，屬安全暴露面 | 🔴 高 |
| `sources.html` 尚未新增農業部來源 | 屬短工時收尾項目（沿上週未結） | 🔴 高 |
| `contacts` 表遷移 | 最後一支 API，已完成健檢（無重大對齊問題），待實作 | 🟡 中 |
| `cid` 欄位 BOM 問題（fix/cid-bom） | Companies 表 `company_id` 欄位名帶 BOM 導致 cid 輸出恆空，屬既有 bug，另開分支修正 | 🟡 中 |
| 免費方案價格顯示（fix/price-zero-preserve） | price=0 被判為 null，前端價格篩選視為無價格，應保留 0 | 🟡 中 |
| `manufacturing.html` 前端欄位讀取異常 | 農業部方案之來源 badge、價格顯示與資料層不符（前端映射問題，資料層已驗證正確） | 🟡 中 |
| `has_ai` 空值 206 筆 | 待 Haiku 批次標註，須先抽樣驗證準確率 | 🟡 中 |
| `industry_category` 命名衝突 | Solutions 功能分類 vs Cases 產業碼同名，需前端配合改名 | 🟡 中 |
| 方案詳情頁「返回搜尋結果」導覽 bug | 滑鼠側鍵／瀏覽器上一頁未依預期返回 | 🟢 追蹤中 |

### Blocker 狀態更新

| Blocker | 前次狀態 | 本週狀態 | 說明 |
|---|---|---|---|
| 2-1 `company_id` 重複 | ✅ 已解決 | ✅ 已解決 | — |
| 2-2 `industry_category` 同名異義 | ✅ 結案 | ✅ 結案 | 資料庫層已解決；前端顯示層命名衝突另列待處理 |
| 2-3 `has_ai` 值域不一致 | ✅ 已解決 | ✅ 已解決 | — |

---

## 五、開發費用

### 5-1 本週 API 使用量概算

| 使用情境 | 資料量 | 估算費用 |
|---|---|---|
| Supabase 遷移與一致性驗證 | companies 852、solutions 2,429 逐筆比對 | 以 Notebook／本機腳本執行，未使用模型判定，無 Claude API 費用 |
| API 開發、SYNC 文件、GPT 二審 | PR #116、#117、#118 | 屬 Codex／ChatGPT 月費範圍 |
| 升級評估報告、方法論教程 | 文件產製 | 屬訂閱月費範圍 |
| Supabase 使用量 | 六表全量 | 目前於免費額度內 |

### 5-2 本週成本結論

1.本週投入集中於資料庫遷移收尾、對外報告產製與方法論開案，未使用模型批次判定作業，因此未新增 Claude API 成本。

2.Supabase 資料庫層目前仍在免費額度範圍內；後續開放 20–30 人使用時，須另行評估用量級距與費用（詳見升級評估報告費用結構章節）。

---

## 六、下週計畫

| 優先 | 任務 | 說明 |
|---|---|---|
| 🔴 | anon 權限收斂（chore/tighten-anon-grants） | 查 solutions/companies/cases 三表 anon 權限現況與 RLS policy，收斂至僅 SELECT 並驗證 |
| 🔴 | `contacts` API 遷移 | 最後一支 API，健檢已完成；沿用既有流程：規格書 → 實作 → 逐筆比對 differences = 0，目標 8/15 前 |
| 🔴 | 完成 `sources.html` 更新 | 新增「農業部（農業雲市集－數位館）」，完成資料匯入文件閉環 |
| 🟡 | PM 教程可用性驗證 | 請顧問同仁實際試用起案教程，收集回饋驗證是否 work |
| 🟡 | `cid` BOM 與免費方案價格修正 | fix/cid-bom、fix/price-zero-preserve 兩支獨立修補 |
| 🟡 | `manufacturing.html` 前端欄位讀取修正 | 農業部方案前端顯示與資料層不符 |
| 🟡 | 追蹤小規模測試回饋 | 於期中檢視整體完成率，評估是否需調整任務設計 |
| 🟢 | `has_ai` 206 筆補標 PoC | 抽樣測試 Haiku 判定準確率後再批次回寫 |

### 待決策事項

| 項目 | 建議時機 | 理由 |
|---|---|---|
| 正式環境切換至 Supabase | 小規模測試結束後 | 測試期間切換將增加變因，若測試者回報異常將無法分辨為功能問題或遷移問題；切換與回復成本極低（僅環境變數），無須提前 |
| cases/companies 分頁同步修補 | 併入下次 hardening | 兩表分頁 bug 與 solutions 同源，但筆數（59／852）遠低於單頁上限，短期零風險 |
