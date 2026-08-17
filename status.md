# 2026-08-17（週一）即時記事

## ✅ 今天完成

- **companies.js 已下架記錄過濾修復（PR #124 已 merge）**：延續上週 PR #123 的漏網之魚——`api/companies.js` 的 Airtable 與 Supabase 兩條路徑都補上 `record_status` 過濾，公司層級的方案數／平均評分／標籤不再被已下架的臺灣雲市集記錄污染。Codex 額外把 `solution_count` 改成統一從過濾後的 Solutions 明細重算，比原規格書要求更徹底。已透過 `raw.githubusercontent.com` 對過實際 commit diff 驗證無誤才 merge。

- **has_ai None-206（實際262筆）批次標註，Airtable + Supabase 雙資料庫同步完成**：
  - 套用 `ai_batch_etl_lib.py` 框架，跑 Haiku 批次標註（`temperature=0`，用 monkey-patch 方式覆寫）
  - 抓到 262 筆（比預期206多56筆，確認為新北輔導匯入那批新方案，數字吻合）
  - 257 筆成功分類：「有」111 筆（43.2%）、「無」146 筆；5 筆資料不足（新北經發局）留待下次補描述
  - 各來源「有AI」比例合理：農業部33.3%／軟採網19.5%／新北經發局94.1%／新創嚴選60%／自有50%
  - **發現並補上流程缺口**：Airtable → Supabase 沒有自動同步機制，臨時寫了同步步驟（DRY_RUN→小批次→全批次，含布林值轉換），257 筆全部同步成功並抽查驗證一致

- **Cases 表 industry_category 改名為 industry_code（PR #125 已 merge）**：解決與 Solutions.industry_category（功能分類）同名異義的命名衝突。只改 Cases，Solutions 完全未動；Supabase 直接透傳，Airtable 保留向後相容轉換；`dashboard.html`／`manufacturing.html` 讀取點皆已更新。

- **Solutions API 補回 data_source／solution_category 欄位輸出（PR #126 已 merge，含補充 commit 修正遺漏）**：根因是 API 抓了欄位卻沒放進回傳物件。新增 `src`／`sc` 兩個簡稱欄位，`manufacturing.html` 四處顯示點（詳情展開、詳情頁、列表卡片來源badge、分類badge）全部補上 fallback 邏輯。第一輪漏了列表卡片，diff 比對抓出後第二輪補齊。FarmiSpace 異常已排查程式碼邏輯面（排除抓錯記錄的可能），因環境限制待可連線環境最終驗證。

- **查明 45 vs 29 筆案例落差的根因**：Supabase SQL 查詢確認，多出的 16 筆是 8/13–8/14 案例收錄補完那批真實案例，當時直接寫入 Supabase、沒有同步回 Airtable（跟 has_ai 任務發現的同步缺口方向相反）。這 16 筆 `airtable_rec_id`／`industry_code` 皆為空值，待決策是否補寫回 Airtable。

- **Companies 清理殘留完成**：①42837620 複查結果乾淨，無孤兒殘留，結案。②82800070（睿思創新）重複方案排查：寫 Colab 全庫引用掃描腳本（唯讀，掃 7 張表確認無業務表引用），逐筆比對後刪除 3 筆真重複（SOL-0966、SOL-0487、SOL-0483），另 3 組確認為合法雙上架（不同政府採購目錄）維持不動。**Airtable 與 Supabase 已同步刪除，雙庫一致**。

## 📌 待處理（記錄不遺忘）

- 5 筆新北經發局方案描述過短，需人工補充後才能分類 `has_ai`
- 2 筆方案名稱異常（`reckjRYv0Orl2Mf9p` 空白、`recuxAIs6Tuqwg1jP` 顯示「缺」）
- **FarmiSpace 異常**：需在有 Airtable/Vercel 存取權限的環境親自核對 PR #126 修復後數字是否正確
- **案例知識庫 16 筆缺口**：是否補寫回 Airtable；`industry_code` 空值需補分類
- **系統性問題**：Airtable↔Supabase 雙向同步機制缺失，今天兩個方向都各自出現過遺漏，建議找時間認真設計一套規則，不要繼續個案處理
- `ai_batch_etl_lib.py` 建議正式納入 Supabase 同步步驟

## 🔜 明天預定（8/18）

- Pilot 測試回饋收集
- 方法論教程會議成果彙整
- Program_Promotions 有效期間確認

## 📌 待週末整理進正式週報

上述事項將於本週週報（`report.md`）彙整。
