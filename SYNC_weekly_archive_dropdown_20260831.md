# SYNC：歷史封存下拉選單改為 GitHub API 自動偵測

- 日期：2026-08-31
- Repo：`Pcc329/weekly-report`
- 分支：`feat/weekly-archive-dropdown-2026-08-31`
- PR：https://github.com/Pcc329/weekly-report/pull/3

## 實際改動

### `weekly.html`

- 下拉選單來源由手動的 `report_archive_index.json` 改為 GitHub Contents API：
  `https://api.github.com/repos/Pcc329/weekly-report/contents/`
- 使用 `/^report-.+\.md$/` 過濾週報封存檔。
- 使用 `b.name.localeCompare(a.name)` 以檔名字串由新到舊排序。
- 選項文字從檔名取日期，顯示為 `YYYY-MM-DD 週報`。
- 保留既有的 `loadReport(reportFile)`、`history.pushState`、`?report=` 與無整頁重整的切換方式。
- GitHub API 失敗或回傳非陣列時，選單保持隱藏；既有 KPI 與週報讀取不受影響。
- KPI 的 `api/stats` 區塊與 `main` 相同，未修改。

### `statusUpdate.html`

- 下拉選單來源由 `status_archive_index.json` 改為同一個 GitHub Contents API。
- 使用：
  ```js
  /^status[-_]\d{4}[-_]?\d{2}[-_]?\d{2}.*\.md$/
  ```
  過濾封存檔。
- 以檔名中的日期轉成日期物件排序，處理三種歷史命名格式混用時仍能由新到舊：
  1. `status_20260831-0904.md`
  2. `status_20260825_final.md`
  3. `status-2026-08-20.md`
- `status.md` 不匹配上述模式，不會被放入歷史清單。
- 保留 `loadStatus(statusFile)`、`history.pushState`、`?status=` 與優雅降級行為。

### 已刪除的手動索引

- `report_archive_index.json`
- `status_archive_index.json`

未來只要新增符合命名規則的封存 Markdown 檔，重新載入頁面後即會自動出現在下拉選單，不需要額外更新索引。

## 完整程式碼 Diff

完整 GitHub diff：
https://github.com/Pcc329/weekly-report/compare/main...feat/weekly-archive-dropdown-2026-08-31

本次相對 `main` 的功能檔：
- `weekly.html`
- `statusUpdate.html`
- 刪除 `report_archive_index.json`
- 刪除 `status_archive_index.json`

## 驗證

- [x] `weekly.html` 不再引用 `report_archive_index.json`，並使用 Contents API 與 report regex。
- [x] `statusUpdate.html` 不再引用 `status_archive_index.json`，並使用 Contents API 與 status regex。
- [x] 三種 status 封存檔均匹配：
  - `status_20260831-0904.md` → 2026-08-31
  - `status_20260825_final.md` → 2026-08-25
  - `status-2026-08-20.md` → 2026-08-20
- [x] `status.md` 不匹配。
- [x] 實際排序結果：`status_20260831-0904.md` → `status_20260825_final.md` → `status-2026-08-20.md`。
- [x] 兩個手動索引檔已從分支刪除。
- [x] 兩頁 GitHub API 錯誤時皆 catch，選單不顯示但頁面的既有內容 fetch 仍可用。
- [x] 未新增排程、GitHub Action、後端 API 或伺服器端邏輯。

## 注意事項

未登入 GitHub Contents API 的速率限制為每小時 60 次。這是本 repo 的 `index.html` 既有模式；本次沿用相同風險模型。若未來需要更高頻率使用，應另行評估快取或後端代理。

GitHub Pages 沒有 branch preview；合併後需實際驗收：
- `weekly.html`
- `weekly.html?report=report-2026-08-14.md`
- `statusUpdate.html`
- `statusUpdate.html?status=status_20260825_final.md`
