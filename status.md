# 2026-08-17（週一）即時記事

## ✅ 今天完成

- **companies.js 已下架記錄過濾修復（PR #124 已 merge）**：延續上週 PR #123 的漏網之魚——`api/companies.js` 的 Airtable 與 Supabase 兩條路徑都補上 `record_status` 過濾，公司層級的方案數／平均評分／標籤不再被已下架的臺灣雲市集記錄污染。Codex 額外把 `solution_count` 改成統一從過濾後的 Solutions 明細重算（原本 Supabase 路徑吃的是可能不同步的 `companies_with_counts` view），比原規格書要求的更徹底。已透過 `raw.githubusercontent.com` 對過實際 commit diff 驗證無誤才 merge。

- **has_ai None-206（實際262筆）批次標註，Airtable + Supabase 雙資料庫同步完成**：
  - 套用 `ai_batch_etl_lib.py` 框架，跑 Haiku 批次標註（`temperature=0`，用 monkey-patch 方式覆寫，未修改共用 lib 本身）
  - 抓到 262 筆（比預期206多56筆，確認為新北輔導匯入那批新方案，數字吻合）
  - 257 筆成功分類：「有」111 筆（43.2%）、「無」146 筆；5 筆資料不足（新北經發局）留待下次欄位完整性掃描一併處理
  - 各來源「有AI」比例合理：農業部33.3%／軟採網19.5%／新北經發局94.1%（該計畫本就以AI方案為主打，非誤判）／新創嚴選60%／自有50%
  - **發現並補上流程缺口**：Airtable → Supabase 沒有自動同步機制，寫完 Airtable 後正式站（讀Supabase）不會反映異動。臨時寫了 Supabase 同步步驟（DRY_RUN→小批次→全批次，含布林值轉換 `有/無`→`true/false`），257 筆全部同步成功並抽查驗證一致

## 📌 待處理（記錄不遺忘）

- 5 筆新北經發局方案描述過短，需人工補充後才能分類 `has_ai`
- 2 筆方案名稱異常（`reckjRYv0Orl2Mf9p` 空白、`recuxAIs6Tuqwg1jP` 顯示「缺」），需與其他欄位完整性掃描一起處理
- **流程建議**：`ai_batch_etl_lib.py` 之後應把 Supabase 同步步驟正式納入標準流程，避免每次批次任務都要臨時補寫，這次是先用外掛方式處理

## 🔜 進行中

- industry_category 命名衝突拍板
- 農業部前端欄位對接修復

## 📌 待週末整理進正式週報

上述事項將於本週週報（`report.md`）彙整。
