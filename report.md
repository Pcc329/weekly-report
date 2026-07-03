# III 產業資料庫週報 2026-07-03

**週期：W15（2026/06/29–07/03）**
**撰寫：2026-07-03（週五）**
**系統連結**：[產業策略智庫](https://solution-finder-gray.vercel.app) ｜ [方案探索](https://solution-finder-gray.vercel.app/manufacturing.html)

---

## 重點網址入口

| 項目 | 連結 |
|---|---|
| 🔍 產業策略智庫（主頁） | https://solution-finder-gray.vercel.app |
| 🏭 方案探索 | https://solution-finder-gray.vercel.app/manufacturing.html |
| 📊 戰情儀表板 | https://solution-finder-gray.vercel.app/dashboard.html |
| 💻 GitHub Repo | https://github.com/Pcc329/solution-finder |

---

## 一、本週整體進度

本週分兩條主軸並行：**方案探索（manufacturing.html）UI 深化**與**資料庫品質收尾**。前者完成案例卡片圖片 Lightbox 化、小螢幕版面修復、捲動架構重構，並確立「訂閱看更多」CTA 的視覺設計方向；後者完成 B05 稅籍資料整合、company_id 重複清理歸零，以及 Solutions 表 282 筆缺編號批次補號與驗證。

---

## 二、本週完成事項

### 方案探索（manufacturing.html）

| 任務 | 狀態 | 說明 |
|---|---|---|
| 真實案例匯入 | ✅ merged | 5 筆真實案例（振添、台中精機、奇美食品、樹德企業、盟創科技）匯入 Cases 表，30→35 筆，新增 `is_real` 欄位區分真實/模擬 |
| 案例區塊 Phase 2：動態串接 | ✅ merged | 由 Phase 1 靜態 hardcoded 30 筆，改為 `api/cases.js` 動態讀取 Airtable，真實案例優先排序，顯示上限 5 筆 |
| 案例卡片圖片 Lightbox 化 | ✅ merged | 縮圖排版改為「一大兩小」，點擊開啟全頁 Lightbox（背景模糊暗化、左右切換、下方縮圖高亮、三種關閉方式），移除舊 hover 浮層邏輯 |
| 案例圖片素材處理 | ✅ 完成 | 19 張圖片篩選後，9 張處理為 400×400px（真實照片置中裁切、圖表類留白避免裁切文字），仍缺 6 張待補 |
| 分析結果卡片 sticky 化 | ✅ merged | 「重新分析」按鈕固定於右欄頂部，捲動時不遺失 |
| 推薦方案單開 accordion | ✅ merged | 同時僅展開一項，避免資訊過載 |
| 產生推薦按鈕互動優化 | ✅ merged | 分析完成後加入 pulse 動畫引導點擊 |
| 小螢幕版面修復 | ✅ merged | 根因為 `.agent-card-fixed` 缺少 `flex-shrink: 0` 被上層擠壓；修復後對話、選項、輸入框、進度、按鈕五項在小螢幕下皆可見 |
| 捲動架構重構 | ✅ merged | 排查出瀏覽器會將 `overflow-y: visible` + `overflow-x: hidden` 併用時默默轉為 `auto` 導致內容裁切；整頁改為單層統一捲動，移除子容器固定高度與獨立捲動設定 |
| 戰情儀表板整合 | ✅ merged | dashboard.html 與 strategy-guide.html 合併為單一整合頁面（9 個區塊 + sticky 錨點導覽），分 4 個 patch 執行 |
| 「訂閱看更多」CTA 設計定案 | ✅ 決策完成 | 評估漸層遮罩／模糊馬賽克／引導聯繫顧問三種視覺方案，定案採「漸層遮罩＋點擊彈窗導向聯繫顧問」組合，屬假性 CTA（不做真實訂閱機制）；馬賽克方案評估後不採用，因易讓內容顯得刻意隱藏、降低信任感 |

### 資料整合 & 品質

| 任務 | 狀態 | 說明 |
|---|---|---|
| B05 稅籍資料比對 | ✅ 完成 | 用統編比對財政部全國營業稅籍登記資料集，命中率 96.3%（771/801 有效統編），779 筆寫入 Airtable，新增 5 個官方欄位 |
| company_id 重複清理（Phase 4） | ✅ 完成 | 從 49 筆問題清單逐組排查至清零，含前導 0 格式合併、統編填錯修正 |
| Solutions 缺編號批次補號 | ✅ 完成 | 282 筆（臺灣雲市集 149 筆 SOL-1216~1364、領域型調查(人工搜查) 133 筆 SOL-FIELD-0001~0133）正式寫入並驗證通過，無串錯行 |

---

## 三、資料庫現況

| 表 | 筆數 | 變化 |
|---|---|---|
| Solutions（方案）| 2,320 筆 | solution_id 空值已歸零 |
| Companies（業者）| 825 筆 | 重複統編清零 |
| Cases（案例）| 35 筆 | +5（新增真實案例） |
| Contacts（聯絡人）| 601 筆 | 無變動 |

---

## 四、已知問題 & 暫緩項目

| 項目 | 說明 |
|---|---|
| 訂閱 CTA 顯示 bug | 真實 Airtable 案例的 `case_id` 型態與模擬資料不同，導致判斷式誤判，真實案例（case 37–41 以外）展開後 CTA 未正確顯示，已產出問題回報文件，尚未排入修復排程 |
| 案例圖片素材缺口 | 振添 3 張、樹德 2 張、盟創 1 張，共 6 張待補 |
| company_id 檢查碼問題 | 約 20 多筆檢查碼未過但無重複，低優先，待後續處理 |
| Solutions.company_id 格式一致性 | 前導 0 格式不一致，建議近期一併排查 |
| 農業雲市集數位館資料補充 | agdigi.atri.org.tw，待排 Colab 爬蟲 |
| 新創方案補充 | 待確認同事進度後啟動 |
| Daily English | 進度待確認補齊 |
| Google Trends API | 已申請 alpha，等 iii-fdb project 核准通知 |

---

## 五、開發費用

### 5-1 訂閱與儲值（累計至上週，台幣）

| 項目 | 單價 | 次數 | 小計 | 說明 |
|---|---|---|---|---|
| Claude AI 月費 | NT$ 680 | 3 | NT$ 2,040 | 4/5/6 月 |
| Codex / ChatGPT 月費 | NT$ 640 | 2 | NT$ 1,280 | 5/6 月 |
| Claude API Credit 儲值 | — | 3 | NT$ 1,559 | 4月 301・5月 629・6月 629 |
| Crunchbase | NT$ 3,150 | 1 | NT$ 3,150 | 99 美金，一次性 |
| **累計合計（至6月）** | | | **NT$ 8,029** | |

> ⚠️ 7 月訂閱與儲值金額尚未確認，本表暫沿用 6 月底累計數字，待實際帳單出來後更新。

### 5-2 本週 API 使用量概算

| 使用情境 | 資料量 | 估算費用 |
|---|---|---|
| 方案探索（manufacturing-analyze，Haiku）| 本週測試多次 | 費用低，未逐筆估算 |
| B05 / company_id / Solutions 補號 | 純 Airtable API + Python 腳本 | 無 Claude API 費用（僅 Airtable 讀寫，免費額度內）|

### 5-3 模型成本比較（單次方案探索）

| 模型 | 相對成本 | 單次估算 | 1,000 次估算 |
|---|---|---|---|
| **Haiku 4.5（目前採用）** | 1× | NT$ 0.6 | NT$ 600 |
| Sonnet 4.6 | 3× | NT$ 1.8 | NT$ 1,800 |
| Opus 4.8 | 5× | NT$ 3.0 | NT$ 3,000 |

---

## 六、下週計畫

| 優先 | 任務 | 說明 |
|---|---|---|
| 🔴 | 訂閱 CTA bug 修復 | 修正真實案例 `case_id` 型態判斷邏輯 |
| 🟡 | company_id 格式一致性排查 | Solutions 表前導 0 格式清理 |
| 🟡 | 案例圖片素材補齊 | 振添 3、樹德 2、盟創 1，共 6 張 |
| 🟡 | 農業雲市集數位館資料補充 | 排 Colab 爬蟲 |
| 🟡 | 新創方案補充 | 確認同事進度後啟動 |
| 🟢 | company_id 檢查碼問題 | 20 多筆低優先項目 |

---

*產業資料庫專案 · III 數位轉型研究院 · 2026-07-03*
