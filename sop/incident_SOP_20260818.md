# 事故應變 SOP — 產業資料庫

> 建立緣由：PR #126（2026-08-17 merge）導致正式站 `/api/solutions`
> 全面 500，2026-08-18 上午發現並以 Instant Rollback 緊急處理。
> 本文件將該次應變過程萃取為可複用的判斷規則，供未來類似事故
> 直接對照執行，不需要臨場重新判斷。

---

## 一、案例回顧：PR #126 事故時間軸

| 時間 | 事件 |
|---|---|
| 8/17 | PR #126 merge 到 main，commit `97a7efa` |
| 8/18 上午 | 正式站 `/api/solutions` 全面 500，前端顯示「載入失敗」 |
| 根因確認 | Supabase `solutions` 表沒有 `solution_category` 欄位，PostgREST 回 `42703 column does not exist` |
| 關鍵警訊 | PR #126 的 SYNC 已誠實揭露「只用 mock 資料測試，未連過真實 Preview API」——這正是問題根源 |
| 緊急處理 | Vercel Instant Rollback，從 `97a7efa` 滾回 `bb0bc56`，數秒內恢復正常 |
| 正式修復 | 另開 PR #127（非疊加在壞分支上），移除不存在欄位，三層驗證後 merge |

**核心教訓一句話**：警訊被寫出來了，但沒有轉成阻擋動作。Codex 誠實
自報「只做過 mock」，人工卻仍判斷「diff 看起來沒問題，可以 merge」。
問題不在誠實揭露本身，在於揭露之後沒有強制卡點。

---

## 二、Rollback 觸發規則（不需要先 debug）

### 觸發條件（符合任一即執行）
- `/api/solutions`、`/api/companies`、`/api/cases` 任一對外回傳 500
- 前端出現「載入失敗」，且非單一使用者的網路問題（多次刷新仍失敗）
- 剛 merge 的 PR 部署後 5 分鐘內出現上述狀況

### 執行步驟（順序固定，不可跳步）

```
1. 立即 Rollback
   Vercel Dashboard → Deployments → 找到上一個確認正常的版本
   → ⋯ → Instant Rollback → 填原因 → Continue → Confirm Rollback
   （全程約 1 分鐘內完成，這次實測驗證過）

2. 確認正式站恢復
   curl -s -o /dev/null -w "%{http_code}\n" https://solution-finder-gray.vercel.app/api/solutions
   應為 200；同時人工開啟前端頁面確認資料正常載入

3. 才開始查根因
   - 用 information_schema.columns 查詢懷疑的表結構
   - 用 raw.githubusercontent.com 抓壞掉那個 PR 的實際 diff
   - 找出「壞在哪一行」
```

**為什麼順序不能反過來**：先查根因再決定要不要 rollback，會讓正式站
多蒙受不必要的停機時間。止血永遠優先於診斷，這是這次應變做對的地方，
值得固化成規則而非每次臨場判斷。

### ⚠️ Rollback 之後，事情還沒結束

Rollback 只是讓網域指向舊版本，**main 分支本身仍然是壞的**。這代表：
- 若之後有人不小心從 main 重新部署（Redeploy），或 Vercel 自動部署
  觸發，會再次踩雷
- **必須盡快完成正式修復並 merge，讓 main 分支本身回到健康狀態**，
  不能只依賴 rollback 這個暫時繞開的狀態

---

## 三、災後正式修復流程

### Step 1：另開乾淨分支，不疊加在壞分支上
```
git checkout main
git pull
git checkout -b fix/【描述】-hotfix-YYYYMMDD
```
壞掉的程式碼可能還有其他未發現的問題，疊加修改容易讓 diff 難以核對。

### Step 2：規格書要求「反向操作」的精確描述
規格書裡明確寫出「移除什麼、保留什麼」，避免 Codex 順手清掉不該動的
東西。例如 PR #127 的範例：
- 移除：`solution_category` / `sc` 相關的 select、輸出、前端讀取
- 保留：`data_source` / `src` 兩條輸出、`src || p` fallback 邏輯不動

### Step 3：三層驗證，缺一不可
1. **Diff 核對**：用 `raw.githubusercontent.com` 抓實際 commit diff，
   逐行核對規格書要求的移除／保留項目
2. **未修改危險函式確認**：`scoreSolution`、`getRecommendations`、
   `officialPrograms` 等核心邏輯函式不得被觸碰，即使是緊急修復
3. **真實 Preview API 呼叫**：HTTP 200、JSON 陣列有資料、關鍵欄位
   （這次是 `sc`）確實不存在於回傳結果中

若執行環境本身無法連線驗證（如本機網路規則封鎖），**由人在有連線
權限的環境完成第 3 項**，不得省略、不得僅憑 Codex 的 mock 測試結果
放行。

### Step 4：Merge 後的收尾確認
- [ ] main 分支的最新 commit 已是修復後版本（非事故版本）
- [ ] 正式站網域已恢復指向最新 main（或確認 rollback 狀態可以安全解除）
- [ ] 更新交接清冊，標記事故為已解決，記錄根因與修復 PR 連結
- [ ] 若事故牽涉到某類資料完整性問題（如本次的欄位 NULL 值），
      另開獨立待辦追蹤，不要和緊急修復混在一起處理

---

## 四、預防性檢查清單（規格書層級）

> 對應 `codex_規格書範本_v2.md` 新增的段落，這裡列出精簡對照表，
> 供快速掃描用。詳細填寫規則請見規格書範本本身。

| 檢查點 | 對應規格書段落 | 核心規則 |
|---|---|---|
| Supabase 欄位是否存在 | 五之二 | select 語句改動必須附 schema 查詢結果或真實 API 200 回應，mock-only 不算完成 |
| Schema 快照比對 | 四 | 執行前比對 `supabase_schema_snapshot.json`，找不到就標記待人工確認 |
| 驗證方式聲明 | 五之三 | 結構化勾選，勾到「僅 mock」就自動視為未完成驗收，不得建議 merge |
| 欄位填寫率 | 一 | 「恢復顯示某欄位」類任務，動工前先查該欄位在資料裡的非空值比例 |

---

## 五、一句話版本（給趕時間的自己看）

> **正式站掛了 → 先 rollback 別先 debug → 查根因用 information_schema
> 不要用猜的 → 修復另開分支別疊加 → merge 前一定要有人在能連線的
> 環境親自打過一次 API 確認 200 → SYNC 裡寫「只做過 mock」就是
> 還沒做完，不是可以商量的灰色地帶。**

---

*文件由 Claude 產出 · 版本 v1（2026-08-18）· 依據 PR #126 / #127 事故實際處理過程整理*
