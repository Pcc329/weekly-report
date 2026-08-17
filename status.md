# 2026-08-17（週一）即時記事

## ✅ 今天完成

- **companies.js 已下架記錄過濾修復（PR #124 已 merge）**：延續上週 PR #123 的漏網之魚——`api/companies.js` 的 Airtable 與 Supabase 兩條路徑都補上 `record_status` 過濾，公司層級的方案數／平均評分／標籤不再被已下架的臺灣雲市集記錄污染。Codex 額外把 `solution_count` 改成統一從過濾後的 Solutions 明細重算（原本 Supabase 路徑吃的是可能不同步的 `companies_with_counts` view），比原規格書要求的更徹底。已透過 `raw.githubusercontent.com` 對過實際 commit diff 驗證無誤才 merge。

- **has_ai None-206（實際262筆）批次標註，Airtable + Supabase 雙資料庫同步完成**：
  - 套用 `ai_batch_etl_lib.py` 框架，跑 Haiku 批次標註（`temperature=0`，用 monkey-patch 方式覆寫，未修改共用 lib 本身）
  - 抓到 262 筆（比預期206多56筆，確認為新北輔導匯入那批新方案，數字吻合）
  - 257 筆成功分類：「有」111 筆（43.2%）、「無」146 筆；5 筆資料不足（新北經發局）留待下次欄位完整性掃描一併處理
  - 各來源「有AI」比例合理：農業部33.3%／軟採網19.5%／新北經發局94.1%（該計畫本就以AI方案為主打，非誤判）／新創嚴選60%／自有50%
  - **發現並補上流程缺口**：Airtable → Supabase 沒有自動同步機制，寫完 Airtable 後正式站（讀Supabase）不會反映異動。臨時寫了 Supabase 同步步驟（DRY_RUN→小批次→全批次，含布林值轉換 `有/無`→`true/false`），257 筆全部同步成功並抽查驗證一致

- **Cases 表 industry_category 改名為 industry_code（PR #125 已 merge）**：解決與 Solutions.industry_category（功能分類，九選一）同名異義的命名衝突。只改 Cases，Solutions 完全未動。Supabase 直接透傳 `industry_code`；Airtable 保留 `industry_code ?? industry_category` 向後相容轉換。`dashboard.html` 與 `manufacturing.html` 的 Cases 讀取點皆已改用新欄位，Solutions 交叉分析未受影響。

- **Solutions API 補回 data_source／solution_category 欄位輸出（PR #126 已 merge，含補充 commit 修正遺漏）**：根因是 `api/solutions.js` 原本有抓 `data_source` 卻沒放進回傳物件（Airtable/Supabase 兩路徑皆漏），導致 `manufacturing.html` 來源 badge 一直用 `program_type` 代打顯示不精確。新增 `src`（=data_source）、`sc`（=solution_category）兩個簡稱欄位，`manufacturing.html` 四處顯示點（詳情展開、詳情頁、搜尋結果列表卡片來源badge、相鄰分類badge）全部補上 fallback 邏輯。第一輪只改了兩處，經 diff 比對發現漏了列表卡片（使用者最常看到的畫面），補充規格書後第二輪 commit 補齊。FarmiSpace 數字異常已排查程式碼邏輯面（排除抓錯同名記錄的可能），但因環境限制未能做線上逐筆最終驗證，如實記錄待確認。

- **查明 45 vs 29 筆案例落差的根因**：透過 Supabase SQL 查詢確認，多出的 16 筆是 8/13–8/14 案例收錄補完那批真實案例，但當時直接寫入 Supabase、沒有同步回 Airtable（跟 has_ai 任務發現的同步缺口方向相反）。這 16 筆 `airtable_rec_id` 與 `industry_code` 皆為空值，待決策是否補寫回 Airtable、並補分類。

## 📌 待處理（記錄不遺忘）

- 5 筆新北經發局方案描述過短，需人工補充後才能分類 `has_ai`
- 2 筆方案名稱異常（`reckjRYv0Orl2Mf9p` 空白、`recuxAIs6Tuqwg1jP` 顯示「缺」），需與其他欄位完整性掃描一起處理
- **FarmiSpace 異常**：需在有 Airtable/Vercel 存取權限的環境親自核對，確認 PR #126 修復後數字是否已正確顯示
- **案例知識庫 16 筆缺口**：是否補寫回 Airtable 維持 source of truth 一致性；`industry_code` 空值需補分類
- **流程建議**：`ai_batch_etl_lib.py` 之後應把 Supabase 同步步驟正式納入標準流程；同時 Airtable↔Supabase 雙向同步機制本身也值得找時間認真設計一套規則，目前兩個方向都各自出現過遺漏

## 🔜 進行中 / 下一步

- Companies 清理殘留（42837620、82800070）
- Program_Promotions 有效期間確認
- Pilot 測試回饋收集、方法論教程會議成果彙整

## 📌 待週末整理進正式週報

上述事項將於本週週報（`report.md`）彙整。
