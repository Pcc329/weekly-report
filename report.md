# 產業策略智庫 — Project 背景說明

## 專案定位
資策會數位轉型研究院「產業策略智庫」專案。
建立 AI 語意搜尋智庫，彙整台灣中小企業數位轉型補助與解決方案資料。

## 系統連結
- 線上系統：https://solution-finder-gray.vercel.app
- 儀表板：https://solution-finder-gray.vercel.app/dashboard.html
- GitHub：https://github.com/Pcc329/solution-finder

## Airtable 設定
- Base ID：appttP04OnzzC7qxG
- Solutions Table：tblqQkVQ4dSo7xgoE（2,320 筆，最新統計 2026-07-03）
- Companies Table：tblkOaOBGK96vfRm1（825 筆，最新統計 2026-07-03）
- Logs Table：tblLdVCmLwkzDFtMq（建置中）
- 環境變數：AIRTABLE_TOKEN、ANTHROPIC_API_KEY
- Claude Model：claude-sonnet-4-5

## 資料庫三層架構
- 層一：Companies（主鍵 company_id）
- 層二：Contacts / Awards / Digital_needs / Solutions
- 層三：Solution_Domains / Service_Domains / Logs

## 工作流程
你描述需求 → Claude 產規格書 → 貼給 Codex 執行
→ Codex 回傳 SYNC .md → Claude review → PR → Merge → 驗收

## 進行中任務（最新更新 2026-07-03）
- W8 任務 8-B：ask.js 寫入 Airtable Logs（Codex 執行中）
- W9+ 待啟動：Log 儀表板、Vercel Analytics
- 剩餘檢查碼問題 company_id：約20多筆檢查碼未過但無重複，低優先，待後續處理
- Solutions.company_id 格式一致性檢查：前導0格式不一致，建議近期一併排查

## 本 Project 的對話分工
- 資料整理：CSV 清洗、欄位補齊、覆蓋率分析
- 網頁製作：前端功能、API、Codex 規格書
- 簡報製作：PPT、圖表、ERD、交接清冊
- 每個新對話開頭請說明本次任務類型

---

# III 產業資料庫週報 2026-07-03

**週期：W27（2026/06/29–07/03）**
**撰寫：2026-07-03（週五）**

## 一、本週整體進度

本週為資料品質收尾週。完成 Companies 表與財政部 B05 稅籍登記資料集的比對整合，company_id 重複清理（Phase 4）全數清零，並完成 Solutions 表 282 筆缺編號方案的批次補號與驗證，資料庫主鍵完整性大幅提升。

## 二、本週完成事項

### 資料整合 & 品質

| 任務 | 狀態 | 說明 |
|---|---|---|
| B05 稅籍資料比對 | ✅ 完成 | 用統編比對財政部全國營業稅籍登記資料集，命中率 96.3%（771/801 有效統編），779 筆寫入 Airtable |
| B05 新增欄位 | ✅ 完成 | `paid_in_capital_official`（實收資本額）、`established_date_official`、`industry_code_official`、`b05_match_status`、`b05_synced_at` 五個欄位 |
| B05 異常人工排除 | ✅ 完成 | 抽查10筆資本額差異>5倍案例，2筆確認B05錯誤，人工排除不寫入 |
| company_id 重複清理（Phase 4） | ✅ 完成 | 從49筆問題清單逐組排查至清零，含前導0格式合併、統編填錯修正 |
| Companies 表現況 | — | 825 筆 |

### Solutions 補號 & 驗證

| 任務 | 狀態 | 說明 |
|---|---|---|
| 缺 solution_id 批次補號 | ✅ 完成 | 282 筆（臺灣雲市集149筆 SOL-1216~1364、領域型調查(人工搜查)133筆 SOL-FIELD-0001~0133）正式寫入 |
| 補號驗證腳本 | ✅ 完成 | 建立 `solutions_renumber_verify_v1.ipynb`，三項驗證（空值歸零 / SOL-FIELD- 系列對應正確 program_type / SOL-1216~1364 對應正確 program_type）全數通過，無串錯行 |
| Solutions 表現況 | — | 2,320 筆，solution_id 空值已歸零 |

## 三、待辦事項（延續至下週）

| 優先 | 任務 | 說明 |
|---|---|---|
| 🟡 中 | 剩餘檢查碼問題 company_id | 約20多筆檢查碼未過但無重複，低優先，待後續處理 |
| 🟡 中 | Solutions.company_id 格式一致性檢查 | 前導0格式不一致，建議補號完成後一併檢查 |

## 四、關鍵腳本

| 腳本 | 用途 | 狀態 |
|---|---|---|
| `companies_tax_registry_match_v1.ipynb` | B05 稅籍比對 | 完成 |
| `companies_merge_duplicates_v1.ipynb` | 重複統編自動合併 | 完成 |
| `solutions_batch_renumber_v1.ipynb` | 缺編號批次補號 | 完成 |
| `solutions_renumber_verify_v1.ipynb` | 補號結果驗證 | 完成（本週新建） |

---

*文件由 Claude 產出，2026-07-03*
