# SYNC：index.html 重大事項更新歷史區塊

- 日期：2026-08-31
- Repo：`Pcc329/weekly-report`
- 分支：`feat/index-status-history-block-2026-08-31`

## 改動

僅在 `index.html` 增加：

1. 「重大事項更新歷史」區塊，位置介於「週報歷史版本」與「資料 ETL 歷程」之間。
2. `getStatusArchiveDate()`：支援三種 status 檔名的日期解析。
3. `loadStatusHistory()`：沿用既有 GitHub Contents API、摘要擷取、最多顯示 5 筆與「顯示更多」互動模式。
4. 頁面載入時新增 `loadStatusHistory()` 呼叫。

## 驗證

- [x] 區塊順序：週報歷史版本 → 重大事項更新歷史 → 資料 ETL 歷程。
- [x] 正規表示式：`/^status[-_]\d{4}[-_]?\d{2}[-_]?\d{2}.*\.md$/`。
- [x] 三種封存檔都匹配，實際排序為：
  1. `status_20260831-0904.md`
  2. `status_20260825_final.md`
  3. `status-2026-08-20.md`
- [x] `status.md` 不匹配。
- [x] 每筆使用 `reader.html?file=${item.name}`。
- [x] GitHub API 失敗時僅在 `#status-history` 顯示失敗提示，不影響既有週報、ETL、新鮮度稽核區塊。
- [x] 無新增排程、GitHub Action、後端 API 或伺服器端邏輯。

## Diff

程式碼 diff 僅修改 `index.html`。GitHub Pages 無 branch preview，合併後再以頁面操作截圖驗收。
