# SYNC：statusUpdate 歷史封存下拉選單

- 日期：2026-08-31
- Repo：`Pcc329/weekly-report`
- 分支：`feat/status-archive-dropdown-2026-08-31`
- Base：`main` @ `e8716b1a87970d825759fd39c5cb0e80678b1c82`

## 實際改動

### `status_archive_index.json`（新增）

```json
[
  {
    "period": "2026-08-31 ~ 09-04",
    "file": "status_20260831-0904.md"
  },
  {
    "period": "2026-08-25 ~ 08-29",
    "file": "status_20260825_final.md"
  }
]
```

兩筆封存檔均已在 `main` 存在，未改名、未修改內容。

### `statusUpdate.html`

1. 新增 `#archive-selector` 容器，位置在現有 info bar 後、`#report-content` 前。
2. 新增下拉選單樣式，手機寬度改為直向排版。
3. 將既有依 `?status=` 決定檔名、讀檔、`marked.parse(md)` 渲染流程收斂為 `loadStatus(statusFile)`。
4. 成功讀到 `status_archive_index.json` 才以 DOM API 建立 select：
   - 固定選項：`本週進行中`（值 `status.md`）
   - 索引選項：由每筆 `period` / `file` 建立
   - URL 帶 `?status=...` 時，選取同名檔案。
   - 切換選項時以 `history.pushState` 更新 URL，然後呼叫同一個 `loadStatus()`；不重整整頁。
5. 索引 fetch / JSON 讀取失敗會被 catch，選單保持隱藏，既有 status 讀取流程不受影響。

## 完整程式碼 Diff

PR 建立後的完整 GitHub diff：
`https://github.com/Pcc329/weekly-report/compare/main...feat/status-archive-dropdown-2026-08-31`

改動檔案統計（相對 `main`）：`statusUpdate.html` +96/-15、`status_archive_index.json` +10。

## 驗證

已在分支原始檔完成靜態驗證：

- `status_archive_index.json` 可被 `JSON.parse` 解析，且兩筆檔名依規格存在。
- `loadStatus(statusFile)` 存在，仍以 `marked.parse(md)` 渲染。
- 索引 fetch：`fetch('status_archive_index.json?t=' + Date.now())`。
- 固定選項：`new Option('本週進行中', 'status.md')`。
- 封存切換以 `window.history.pushState` 加 `loadStatus(statusFile)` 完成，沒有 `location.reload()`。
- 索引失敗的 catch 不改動報告區內容，維持既有 status reader。

已確認兩個封存來源檔存在：
- `status_20260831-0904.md`
- `status_20260825_final.md`

## 驗收狀態

- [x] 索引檔已建立，含本週與 8/25 兩筆。
- [x] 實作「本週進行中」及索引週份選項。
- [x] 實作 query 參數對應選取與同一 fetch 流程切換。
- [x] 實作索引缺失／失敗時的優雅降級。
- [x] 未新增排程、背景任務、後端 API 或伺服器端邏輯；本次為純靜態 HTML + JSON。
- [ ] GitHub Pages 操作截圖：GitHub Pages 本專案僅由 main 發布，功能在 PR branch 尚未合併前沒有可供驗證的 branch preview。合併部署後以 `/statusUpdate.html`、`?status=status_20260831-0904.md` 實測並補截圖。

## Git

- PR（Draft）：https://github.com/Pcc329/weekly-report/pull/2
- 最新分支 commit（本 SYNC）：`1ecfaf0bc353d7ba9405377333c44ee6ec5259b3`

前兩個功能 commit：
- `f3f8f15f1ce518d6df18f8bd83b44d1371ea0485` — `feat(status): add archive dropdown navigation`
- `499648e0fe43f0457ce6d68423adb0bb221b7a3f` — `feat(status): add archive index`
