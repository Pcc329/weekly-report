# SYNC：封存下拉選單 GitHub API 自動偵測升級

- 日期：2026-08-31
- Repo：`Pcc329/weekly-report`
- 分支：`feat/archive-autodetect-upgrade-2026-08-31`

## 改動

- `weekly.html`：改以 GitHub Contents API 掃描 `/^report-.+\.md$/`。依檔名字串由新到舊排序，選項顯示 `YYYY-MM-DD 週報`。
- `statusUpdate.html`：改以同一 API 掃描 `/^status[-_]\d{4}[-_]?\d{2}[-_]?\d{2}.*\.md$/`，從檔名解析日期再排序。
- 刪除不再需要的 `report_archive_index.json`、`status_archive_index.json`。
- 保留兩頁既有 `loadReport`／`loadStatus`、query 參數、同頁切換與 catch 降級行為。
- `weekly.html` KPI 的 `api/stats` 邏輯未修改。

## Status 規則驗證

實際封存檔排序（新到舊）：

1. `status_20260831-0904.md` — 2026-08-31
2. `status_20260825_final.md` — 2026-08-25
3. `status-2026-08-20.md` — 2026-08-20

`status.md` 不符合規則，不會進入下拉選單。

## 範圍聲明

純靜態前端改動，沒有新增排程、GitHub Action、後端 API 或伺服器端邏輯。GitHub Pages 無 branch preview，合併後再以頁面實測 GitHub API 成功／失敗時的視覺行為。

完整 diff 請見本 PR 的 Files changed。
