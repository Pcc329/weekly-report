# SYNC：weekly.html 歷史週報下拉選單

- 日期：2026-08-31
- Repo：`Pcc329/weekly-report`
- 分支：`feat/weekly-archive-dropdown-2026-08-31`
- Base：`main`

## 實際改動

### `report_archive_index.json`（新增）

新增 14 筆、由新到舊的既有週報封存檔案索引：

- 最前：`report-2026-08-28.md`
- 最後：`report-2026-05-29.md`

每筆以能確定的單一日期加「週報」顯示，未推測週期區間。

### `weekly.html`

- 新增 `#archive-selector`，位置在 KPI 數字列與週報內容之間。
- 成功讀取 `report_archive_index.json` 才建立下拉選單。
- 選單包含固定的 `本週進行中`（`report.md`）與 14 筆週報封存選項。
- `?report=report-2026-08-14.md` 會選中對應選項。
- 切換時使用 `history.pushState` 更新 `?report=`，並呼叫 `loadReport(reportFile)` 以同一份既有 fetch + `marked.parse(md)` 流程更新內容，沒有整頁重新整理。
- 索引讀取失敗時 select 保持隱藏；KPI 與既有週報讀取仍可運作。
- 原有 KPI `api/stats` 區塊未修改。

### `status_archive_index.json`（補正）

在既有兩筆尾端補上最早的封存：

```json
{
  "period": "2026-08-20 前後",
  "file": "status-2026-08-20.md"
}
```

因此 status 索引合計 3 筆，排序為最新至最舊。

## 靜態驗證

- [x] `report_archive_index.json` 可由 `JSON.parse` 讀取，合計 14 筆、日期新到舊。
- [x] 14 個 report 檔案與 `status-2026-08-20.md` 已存在於 repo。
- [x] `status_archive_index.json` 可由 `JSON.parse` 讀取，合計 3 筆。
- [x] `weekly.html` 有 `fetch('report_archive_index.json?t=' + Date.now())`。
- [x] 固定選項是 `new Option('本週進行中', 'report.md')`。
- [x] 切換使用 `history.pushState` 與 `loadReport(reportFile)`，沒有整頁 reload。
- [x] 索引失敗時 catch 僅隱藏下拉，不影響週報讀取。
- [x] KPI 區塊已與 `main` 比對，內容相同。

## 完整 Diff 與部署驗收

完整 diff 請見 PR 的 Files changed。GitHub Pages 僅由 `main` 發布，沒有 branch preview；合併後需以 GitHub Pages 的 `weekly.html` 及 `?report=report-2026-08-14.md` 做畫面截圖驗收。

## Pull Request

- Draft PR：https://github.com/Pcc329/weekly-report/pull/3

## 範圍聲明

本次沒有新增排程、GitHub Action、後端 API 或伺服器端邏輯；僅為靜態 HTML、靜態 JSON 與既有前端 fetch 流程。

