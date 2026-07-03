# III 產業資料庫週報 2026-06-26

**週期：W14（2026/06/23–06/26）**  
**撰寫：2026-06-26（週五）**  
**系統連結**：[產業策略智庫](https://solution-finder-gray.vercel.app) ｜ [製造業診斷](https://solution-finder-gray.vercel.app/manufacturing.html)

---

## 一、本週整體進度

本週為製造業診斷工具深化週，重點如下：

- manufacturing.html 方案卡片全面升級：複數行內展開、description_short 整合
- 參考案例資料庫 MVP 建立：Cases 表 30 筆種子資料、前端卡片展開功能上線
- description_short 批次生成：2,214 筆 AI 短摘要寫入 Airtable
- 三議題評估完成：案例資料庫、會員機制、資料庫升級規模的決策方向確立

---

## 二、本週完成事項

### 製造業方案探索（manufacturing.html）

| 任務 | 狀態 | 說明 |
|---|---|---|
| 方案卡片複數行內展開 | ✅ merged | 桌機最多同時展開 3 張，手機 1 張，lastToggledId 控制動畫不重複播放 |
| description_short 前端整合 | ✅ merged | 優先顯示 ds 短摘要全文，無值則 fallback 到 description 前 100 字截字 |
| solutions.js 加入 ds 欄位 | ✅ merged | `ds: f['description_short'] \|\| ''`，最小改動原則，核心搜尋邏輯不動 |
| 參考案例區塊 Phase 1 | ✅ merged | 推薦方案下方加入「參考案例」區塊，30 筆靜態真實樣本，支援產業 chip 篩選 |
| 案例卡片行內展開 | ✅ merged | 點案例卡展開顧問診斷結論、推動阻力、化解方法、可複製條件 |
| 案例展開橫列式版面 | ✅ merged | icon + label + text 各一列，PC 與手機兼容，不需 media query |
| 案例最多同時展開 3 張 | ✅ merged | 比照推薦方案邏輯，桌機 3 張 / 手機 1 張，第 4 張自動收合最早展開 |

### 資料工作

| 任務 | 狀態 | 說明 |
|---|---|---|
| description_short 批次生成 | ✅ 完成 | Colab + Claude Haiku，2,214 筆成功，失敗 0，費用約 US$0.61（約 NT$20）|
| Cases 表建立 | ✅ 完成 | Airtable 新增 Cases 表，15 個欄位，含 diagnosis / resistance / resolution / replicable_condition |
| Cases 種子資料 30 筆 | ✅ 完成 | 涵蓋製造、醫療、零售、服務業、物流、旅遊住宿、金融、教育、電商、建築營造、餐飲 11 個產業 |

### 架構決策

| 議題 | 決策 |
|---|---|
| 案例資料庫 | P0 優先，先取得真實資料再談複雜架構；Phase 1 靜態常數驗證 UI |
| 會員機制 | Phase 3 商用化前再規劃，現在用 Vercel Deployment Protection 做輕量入口保護 |
| 資料庫升級 | 觀察症狀（搜尋 >2 秒、Airtable 429 頻率），不急著遷移 Supabase |

---

## 三、資料庫現況

| 表 | 筆數 | 變化 |
|---|---|---|
| Solutions（方案）| 2,322 筆 | 無變動 |
| Companies（業者）| 840 家 | 無變動 |
| Cases（案例）| 30 筆 | 🆕 本週新建 |
| Contacts（聯絡人）| 601 筆 | 無變動 |

**description_short 覆蓋率**：2,214 筆（佔 Solutions 95.3%）

---

## 四、已知問題 & 暫緩項目

| 項目 | 說明 |
|---|---|
| Cases 真實資料取得 | 目前為 30 筆模擬種子資料，需找顧問訪談取得真實案例 |
| 農業雲市集數位館資料補充 | agdigi.atri.org.tw，待排 Colab 爬蟲 |
| 新創方案補充 | 待確認同事進度後啟動 |
| manufacturing.html 官方欄篩選邏輯 | 雲市集工業館 vs SME AI平台 定義待確認 |
| Daily English Day 10–12 | 三天未產出，待補 |
| Google Trends API | 已申請 alpha，等 iii-fdb project 核准通知 |

---

## 五、開發費用

### 5-1 訂閱與儲值（4月起累計，台幣）

| 項目 | 單價 | 次數 | 小計 | 說明 |
|---|---|---|---|---|
| Claude AI 月費 | NT$ 680 | 3 | NT$ 2,040 | 4/5/6 月 |
| Codex / ChatGPT 月費 | NT$ 640 | 2 | NT$ 1,280 | 5/6 月 |
| Claude API Credit 儲值 | — | 3 | NT$ 1,559 | 4月 301・5月 629・6月 629 |
| Crunchbase | NT$ 3,150 | 1 | NT$ 3,150 | 99 美金，一次性 |
| **累計合計** | | | **NT$ 8,029** | 4 月起至今 |

### 5-2 本週 API 使用量概算

| 使用情境 | 資料量 | 估算費用 |
|---|---|---|
| description_short 批次生成 | 2,214 筆 | 約 US$0.61（NT$20）|
| 製造業方案探索（單次分析）| 1 份文件 | 約 US$0.02（NT$0.6）|

> 本週主要費用為 description_short 一次性批次生成，後續不需重跑。

### 5-3 模型成本比較（單次製造業方案探索）

| 模型 | 相對成本 | 單次估算 | 1,000 次估算 |
|---|---|---|---|
| **Haiku 4.5（目前採用）** | 1× | NT$ 0.6 | NT$ 600 |
| Sonnet 4.6 | 3× | NT$ 1.8 | NT$ 1,800 |
| Opus 4.8 | 5× | NT$ 3.0 | NT$ 3,000 |

---

## 六、下週計畫

| 優先 | 任務 | 說明 |
|---|---|---|
| 🔴 | Cases 真實資料取得 | 找 1 位顧問，完成 3 筆真實案例「入庫確認」|
| 🔴 | Daily English Day 10–12 補做 | 三天未產出，優先補齊 |
| 🟡 | 農業雲市集數位館資料補充 | agdigi.atri.org.tw，排 Colab 爬蟲 |
| 🟡 | 新創方案補充 | 確認同事進度後啟動 |
| 🟡 | manufacturing.html 官方欄篩選邏輯確認 | 雲市集工業館 vs SME AI平台 定義 |
| 🟢 | Round 08 模擬測試 | 調整 keyword 過泛問題後重跑 |

---

*產業資料庫專案 · III 數位轉型研究院 · 2026-06-26*
