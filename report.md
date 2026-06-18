# III 產業資料庫週報 2026-06-18

**週期：W13（2026/06/15–06/18）**  
**撰寫：2026-06-18（週四，週五放假提前送出）**

---

## 一、本週整體進度

本週為製造業專屬入口建置與細節打磨週，重點如下：

- 0615 期中報告順利完成口頭報告
- 製造業方案探索（manufacturing.html）：新頁面建立、雙通道輸入、AI 推薦，至本日一連串使用體驗優化全部到位
- 智能方案探索（diagnosis.html）：改版為 AI Agent 對話介面
- index.html 白屏問題排除，正式機恢復正常
- Companies industry_vertical 完成 568 筆 AI 分類補全

---

## 二、本週完成事項

## 📊 0615 期中報告簡報

<a href="https://view.officeapps.live.com/op/view.aspx?src=https://raw.githubusercontent.com/Pcc329/weekly-report/main/0615_%E8%B3%87%E6%9C%8D%E7%94%A2%E6%A5%AD%E8%B3%87%E6%96%99%E5%BA%AB%E7%B0%A1%E5%A0%B1_V6_F.pptx" target="_blank">🖥️ 線上開啟簡報（Office Online）</a>

<iframe src="https://view.officeapps.live.com/op/view.aspx?src=https://raw.githubusercontent.com/Pcc329/weekly-report/main/0615_%E8%B3%87%E6%9C%8D%E7%94%A2%E6%A5%AD%E8%B3%87%E6%96%99%E5%BA%AB%E7%B0%A1%E5%A0%B1_V6_F.pptx" width="100%" height="450px" frameborder="0"></iframe>

> 本週為 0615 期中報告口頭報告週，簡報沿用上週完成之 V6_F（22 頁），本週無新增簡報產出。

### 製造業方案探索（manufacturing.html）

| 任務 | 狀態 | 說明 |
|---|---|---|
| 新頁面建立 | ✅ merged | 製造業專屬入口，左右兩欄版面，雙通道輸入（PDF 上傳 + AI Agent 逐項詢問） |
| 後端 API 新增 | ✅ merged | manufacturing-analyze.js（PDF 解析）、manufacturing-recommend.js（AI 推薦，JSON 輸出） |
| 雙上傳區拆分 | ✅ merged | 評量表（teal）/ 診斷報告（indigo）分開上傳，診斷書資料優先、pain_points 合併去重 |
| 分析結果加入公司名稱 | ✅ merged | 一次分析多家時可辨識當前企業，顯示於資訊區最上方 |
| 清除文件按鈕 | ✅ merged | 一鍵清空文件與分析狀態，方便切換分析對象 |
| 排序邏輯提示 | ✅ merged | 方案欄加 ⓘ tooltip，說明依「適配程度」而非價格排序 |
| 結論與卡片對齊 | ✅ merged | 結論建議前三名固定跟隨卡片排序，AI 僅負責撰寫理由與效益 |
| 方案數量精簡 | ✅ merged | 推薦方案 10 → 5 筆，結論建議改 AI 顧問式建議 |

### 智能方案探索（diagnosis.html）

| 任務 | 狀態 | 說明 |
|---|---|---|
| AI Agent 對話改版 | ✅ merged | 由靜態表單改為對話介面，左對話右推薦，haiku 對話 + sonnet 推薦，手動按鈕觸發省 API 成本 |
| 頁面命名與用詞 | ✅ merged | 定名「智能方案探索」，頁內「診斷」字眼改為「規劃」 |

### 系統穩定性 & 全站調整

| 任務 | 狀態 | 說明 |
|---|---|---|
| index.html 白屏修復 | ✅ merged | 移除 Babel 標籤誤加的 data-type="script"，恢復 JSX 正常渲染 |
| PDF-only 限制 | ✅ merged | 上傳僅支援 PDF（Anthropic Documents API 限制，DOCX 轉換不穩定） |
| navbar 箭頭移除 | ✅ merged | 全站 7 頁移除導覽列 ↗ 符號 |
| AGENTS.md 更新 | ✅ 完成 | 新增 Babel 標籤禁改規則、Codex 自動開 PR 指令 |

### 資料品質

| 任務 | 狀態 | 說明 |
|---|---|---|
| industry_vertical 分類 | ✅ 完成 | 568 筆 Companies AI 補全（成功 568 / 失敗 0），資訊服務業 529、其餘分散電商/農食/文創等 |
| SEMI → SME AI平台 修正 | ✅ 完成 | 279 筆 Airtable 標籤更正（SEMI 為半導體組織，正確為中企署 SME AI 平台） |

---

## 三、資料庫現況

| 表 | 筆數 |
|---|---|
| Solutions（方案）| 2,322 筆 |
| Companies（業者）| 840 家（industry_vertical 已補 568 筆） |
| Contacts（聯絡人）| 601 筆 |
| Awards（得獎）| 148 筆 |

**本週新增**：0 筆（功能與體驗打磨週，無新增方案資料）

---

## 四、已知問題 & 暫緩項目

| 項目 | 說明 |
|---|---|
| manufacturing.html 方案卡片點擊 | 點卡片跳轉方案詳細頁行為待確認後實作 |
| diagnosis.html Phase 2 | PDF/列印一頁報告，暫緩（本週評估後移出優先序） |
| twincn 爬蟲 | requests/Playwright 均被反爬蟲封鎖，暫緩 |
| Google Trends API | 已申請 alpha，等 iii-fdb project 核准通知 |

---

## 五、下週計畫

| 優先 | 任務 | 說明 |
|---|---|---|
| 🟡 | Round 08 模擬測試 | 調整「數位轉型入門」「接觸新客戶」keyword 過泛問題後重跑 |
| 🟡 | manufacturing 卡片點擊跳轉 | 確認預期行為後實作方案詳細頁導覽 |
| 🟡 | score 評分前端改版 | 改顯示相對位置（百分位），不顯示絕對分數 |
| 🟢 | Companies 屬性補全 | logo Favicon 批次 + website 從 Solutions 繼承 |

---

*產業資料庫專案 · III 數位轉型研究院 · 2026-06-18*
