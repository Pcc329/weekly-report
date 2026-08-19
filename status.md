# 2026-08-19（週三）即時記事

## ✅ 今天完成

- **PR #127、PR #128 皆已合併進 main，正式站恢復完全健康**

<details>
<summary>展開細節</summary>
<p>PR #127 移除引發 8/18 事故的欄位 solution_category，保留 data_source/src 輸出；經 Diff 核對、Supabase schema 查詢、Preview 驗證三項確認後 merge（commit 97115aa）。PR #128 把 data_source 移出核心查詢、改獨立補查，失敗時不拖累其他欄位；經正常情況驗證與反向測試（故意讓欄位失效，取得真實環境的 HTTP 200／空字串／Function Logs 三項證據）後 merge（commit 0fa134c）。</p>
</details>

- **回顧：8/18 事故根因是查詢邏輯「全欄位綁一起，一個失敗全部失敗」**

<details>
<summary>展開細節</summary>
<p>Supabase select 語句加入不存在的欄位 solution_category，PostgREST 回 42703 錯誤，導致整支 /api/solutions 連帶其餘正常欄位一併失效。當下以 Vercel Instant Rollback 止血，數分鐘內恢復。</p>
</details>

- **今日最大發現：Instant Rollback 不會自動解除，已寫入方法論文件**

<details open>
<summary>展開細節</summary>
<p>merge PR #127 後 main 已健康，但正式站網域持續指向 8/18 rollback 當時選定的舊版本，未自動跟隨新的 merge——落差維持超過一天沒被發現，因前端 fallback 邏輯剛好蓋住異常。透過比對 Vercel 部署頁「Domains」欄位抓出問題，執行 Promote 正式解除。已寫入 incident_prevention_playbook_20260818.html 與 incident_SOP_20260818.md，列為未來事故處理的固定檢查項。</p>
</details>

- **PR #128 分支歷史分歧已排除**

<details>
<summary>展開細節</summary>
<p>PR #127 以 squash 方式併入 main，導致 PR #128 分支與 main 產生歷史分歧（mergeable: false）。本機 merge 確認無衝突、未復原已移除的欄位、優雅降級邏輯完整；因本機 Git push 受阻，改用 GitHub 網頁 Update branch 完成同步。</p>
</details>

- **FarmiSpace 顯示異常確認修復**（銜接 8/17 待處理項）

<details>
<summary>展開細節</summary>
<p>src 欄位修復並上線後，manufacturing.html 上 FarmiSpace 四筆方案來源標籤與分類皆正確顯示。非獨立 bug，是 8/18 事故的連鎖影響，隨根因修復一併解決。</p>
</details>

## 📌 待處理（記錄不遺忘）

- 5 筆新北經發局方案描述過短，待補充分類（延續 8/17）
- 2 筆方案名稱異常記錄（延續 8/17）
- 案例知識庫 16 筆缺口，待決策是否補寫回 Airtable（延續 8/17）
- Airtable↔Supabase 雙向同步機制缺失，待設計正式規則（延續 8/17）
- ai_batch_etl_lib.py 建議納入 Supabase 同步步驟（延續 8/17）
- **新增**：stats.js 尚未遷移至 Supabase 雙軌讀取，預計 **8/21（週五）前**完成
- **新增**：DB_SOURCE_COMPANIES／DB_SOURCE_CASES 未補 Preview 環境變數（非緊急）

## 🔜 明天預定（8/20）

- Pilot 測試回饋收集（延續自 8/18 因事故暫緩）
- 方法論教程會議成果彙整（延續自 8/18 因事故暫緩）
- Program_Promotions 有效期間確認（等新北經發局回覆）

## 📌 待週末整理進正式週報

上述事項將於本週週報（`report.md`）彙整。

---

# 2026-08-17（週一）即時記事

## ✅ 今天完成

- **companies.js 已下架記錄過濾修復（PR #124 已 merge）**

<details>
<summary>展開細節</summary>
<p>延續上週 PR #123 的漏網之魚——api/companies.js 的 Airtable 與 Supabase 兩條路徑都補上 record_status 過濾，公司層級的方案數／平均評分／標籤不再被已下架的臺灣雲市集記錄污染。Codex 額外把 solution_count 改成統一從過濾後的 Solutions 明細重算，比原規格書要求更徹底。已透過 raw.githubusercontent.com 對過實際 commit diff 驗證無誤才 merge。</p>
</details>

- **has_ai 262 筆批次標註，Airtable + Supabase 雙資料庫同步完成**

<details>
<summary>展開細節</summary>
<p>套用 ai_batch_etl_lib.py 框架跑 Haiku 批次標註（temperature=0）。抓到 262 筆（比預期 206 多 56 筆，確認為新北輔導匯入那批新方案）。257 筆成功分類：「有」111 筆（43.2%）、「無」146 筆；5 筆資料不足留待補描述。各來源「有AI」比例合理：農業部 33.3%／軟採網 19.5%／新北經發局 94.1%／新創嚴選 60%／自有 50%。發現並補上流程缺口：Airtable → Supabase 沒有自動同步機制，臨時寫了同步步驟，257 筆全部同步成功並抽查驗證一致。</p>
</details>

- **Cases 表 industry_category 改名為 industry_code（PR #125 已 merge）**

<details>
<summary>展開細節</summary>
<p>解決與 Solutions.industry_category（功能分類）同名異義的命名衝突。只改 Cases，Solutions 完全未動；Supabase 直接透傳，Airtable 保留向後相容轉換；dashboard.html／manufacturing.html 讀取點皆已更新。</p>
</details>

- **Solutions API 補回 data_source／solution_category 欄位輸出（PR #126 已 merge）**

<details>
<summary>展開細節</summary>
<p>根因是 API 抓了欄位卻沒放進回傳物件。新增 src／sc 兩個簡稱欄位，manufacturing.html 四處顯示點全部補上 fallback 邏輯。第一輪漏了列表卡片，diff 比對抓出後第二輪補齊。FarmiSpace 異常已排查程式碼邏輯面，因環境限制待可連線環境最終驗證。</p>
</details>

- **查明 45 vs 29 筆案例落差的根因**

<details>
<summary>展開細節</summary>
<p>Supabase SQL 查詢確認，多出的 16 筆是 8/13–8/14 案例收錄補完那批真實案例，當時直接寫入 Supabase、沒有同步回 Airtable。這 16 筆 airtable_rec_id／industry_code 皆為空值，待決策是否補寫回 Airtable。</p>
</details>

- **Companies 清理殘留完成**

<details>
<summary>展開細節</summary>
<p>①42837620 複查結果乾淨，無孤兒殘留，結案。②82800070（睿思創新）重複方案排查：寫 Colab 全庫引用掃描腳本，逐筆比對後刪除 3 筆真重複（SOL-0966、SOL-0487、SOL-0483），另 3 組確認為合法雙上架維持不動。Airtable 與 Supabase 已同步刪除，雙庫一致。</p>
</details>

## 📌 待處理（記錄不遺忘）

- 5 筆新北經發局方案描述過短，需人工補充後才能分類 has_ai
- 2 筆方案名稱異常記錄
- ~~FarmiSpace 異常：待可連線環境核對~~ → **已於 8/19 確認修復**
- 案例知識庫 16 筆缺口：是否補寫回 Airtable；industry_code 空值需補分類
- 系統性問題：Airtable↔Supabase 雙向同步機制缺失，建議認真設計一套規則
- ai_batch_etl_lib.py 建議正式納入 Supabase 同步步驟

## 🔜 明天預定（8/18）

- Pilot 測試回饋收集
- 方法論教程會議成果彙整
- Program_Promotions 有效期間確認

## 📌 待週末整理進正式週報

上述事項將於本週週報（`report.md`）彙整。
