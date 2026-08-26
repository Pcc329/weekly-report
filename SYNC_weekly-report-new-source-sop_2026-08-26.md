# SYNC：海巡新增來源 SOP 加入 weekly-report

- 日期：2026-08-26
- 分支：`feat/weekly-report-new-source-sop-2026-08-26`
- 目標網站：`Pcc329/weekly-report`

## 異動檔案

1. 新增 `freshness-audit-new-source-sop.md`
   - 內容與交付的 `海巡_新增來源SOP_v3.md` 原文逐字一致。
   - 已驗證字元數：來源與網站檔案皆為 4437。

2. 更新 `freshness-audit.html`
   - 在既有「查看稽核方法論SOP」連結下方，新增：
   ```html
   <p><a href="reader.html?file=freshness-audit-new-source-sop.md" style="color:var(--teal); font-weight:700; text-decoration:none;">📚 查看新增資料來源 SOP →</a></p>
   ```

## 驗證

- 新 SOP 原文比對：通過。
- `freshness-audit.html` 已含 `reader.html?file=freshness-audit-new-source-sop.md`。
- 既有 `freshness-audit-log.md` 與稽核方法論 SOP 入口仍保留。
- `reader.html` 為通用閱讀器：讀取 `file` query parameter、從 GitHub Raw 載入指定 Markdown，並以 `marked.parse(md)` 渲染。因此本 PR merge 至 `main` 後，`reader.html?file=freshness-audit-new-source-sop.md` 可直接顯示完整 SOP。
- 本環境沒有網站 Preview 瀏覽器可擷取畫面；以上為部署前的原始檔與閱讀器流程靜態驗證。

## 驗收結論

- SOP 檔案完整新增：通過。
- 海巡頁新增導覽入口：通過。
- 原有稽核日誌與其他主站頁面未修改：通過。
