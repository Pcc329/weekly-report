# Codex 檔案交付 SOP（交付包＋雜湊核對）

**版本**：v1.1
**制訂日期**：2026-10-12（v1.1同日：新增 4-0 本機路徑表，git 一律 `git -C`，不依賴 shell 目前工作目錄）
**適用範圍**：Claude 產出、需要放進 GitHub repo 的檔案（`weekly-report`、`solution-finder`）
**不適用**：Supabase 線上操作（SQL Editor 執行、Edge Function 部署）——這些仍由 PPC 手動執行

---

## 一、目的

10/12 補上傳 6 個檔案時卡了三次，原因各不相同，但共通點是**都靠人眼判斷「對不對」**：

| 10/12 發生的錯誤 | 本質 |
|---|---|
| 下載資料夾裡有多個版本，傳到舊版 | 用肉眼判斷哪個是新版 |
| 貼上內容後沒有按 Commit | 用肉眼判斷有沒有完成 |
| 在 `migrations/` 裡又打了 `migrations/`，多出一層子資料夾 | 用肉眼判斷路徑對不對 |

本 SOP 把這三個判斷交給機器：**路徑由交付包決定、版本由雜湊比對、commit 由 git 指令完成**。PPC 不需要改檔名、找路徑或比對內容。

---

## 二、角色分工

| 步驟 | 誰 | 做什麼 |
|---|---|---|
| 1 | Claude | 產出交付包（zip），包含檔案、`MANIFEST.md`、`CODEX_PROMPT.md`；打包前做機密掃描 |
| 2 | PPC | 把 zip 交給 Codex，只說一句：「**依 zip 內 `CODEX_PROMPT.md` 執行**」 |
| 3 | Codex | 解壓 → 逐檔比對雜湊 → 全部相符才 commit → 回報 |
| 4 | Claude | 用 codeload 抓 main（或 PR 分支），與交付包**獨立**逐位元組核對 |

PPC 對 Claude 的觸發說法：「**產出 CODEX 更新**」。

---

## 三、交付包規格

### 3-1 檔名

`codex_delivery_YYYYMMDD_<主題>.zip`（全 ASCII，避免 Windows 解壓亂碼）

### 3-2 結構

zip 第一層是 **repo 名稱**，第二層以下**就是 repo 內的實際路徑**：

```
codex_delivery_20261012_example.zip
├── MANIFEST.md
├── CODEX_PROMPT.md
├── weekly-report/
│   ├── status.md
│   └── sop/codex-delivery-sop.md
└── solution-finder/
    └── migrations/20261002_example.sql
```

一個交付包可以同時包含兩個 repo 的檔案。

### 3-3 MANIFEST.md 欄位

| 欄位 | 說明 |
|---|---|
| repo | `weekly-report` 或 `solution-finder` |
| 路徑 | repo 內的相對路徑 |
| 動作 | `新增`（repo 中原本沒有）／`覆蓋`（repo 中已有）／`刪除`（交付包內無此檔） |
| SHA-256 | 完整 64 碼 |
| 位元組 | 檔案大小 |

`新增`與`覆蓋`的區分是額外的防線：Codex 若發現標示「新增」的檔案在 repo 已存在，或標示「覆蓋」的檔案不存在，代表 Claude 的認知與 repo 現況不符，要停下來回報。

### 3-4 檔名原則

- 新檔案優先使用 ASCII 檔名
- 沿用 repo 既有命名慣例時（例：`status_YYYYMMDD-MMDD.md`、`report-YYYY-MM-DD.md`）照慣例

---

## 四、Codex 執行規則（`CODEX_PROMPT.md` 的內容）

### 4-0 本機 repo 路徑（一律使用絕對路徑）

| repo | 本機路徑 |
|---|---|
| `weekly-report` | `C:\Users\S25036\Documents\Codex\repos\weekly-report` |
| `solution-finder` | 待首次交付前確認後補入 |

**不得依賴 shell 的目前工作目錄**。10/12 實測發現：即使 Codex 專案指向上表路徑，shell 的 `Get-Location` 仍是另一個同名資料夾（`OneDrive…\ChatGPT\weekly-report`，空的 git repo），導致兩次停在第 1 步。因此所有 git 指令一律用 `git -C <上表路徑>`，複製目的地也用上表路徑。


1. **先同步**：每個涉及的 repo 先執行 `git -C <路徑> remote -v`（必須是 `Pcc329/<repo名>`）與 `git -C <路徑> pull`，確認在最新的 `main`
2. **前置檢查**：依 MANIFEST 的「動作」核對 repo 現況（新增→不應存在；覆蓋／刪除→應存在）；不符即停止
3. **複製**：把 `<repo名>/` 底下的檔案複製到 4-0 表列的 repo 路徑，**路徑完全照交付包**，不得自行調整
4. **雜湊比對**：複製後在 repo 內逐檔計算 SHA-256，與 MANIFEST 比對；**任一不符即停止，不 commit**
5. **只動 MANIFEST 列出的檔案**：`git status` 顯示的變更必須與 MANIFEST 完全一致，多一個或少一個都停止
6. **commit 規則**：
   - `weekly-report`：直接 commit 並 push 到 `main`（純文件）
   - `solution-finder`：開分支、開 PR，**不 merge**（main 會觸發 Vercel 部署正式站，程式碼 repo 一律走 PR）
7. **commit 訊息**：`chore: delivery <交付包檔名>`
8. **回報**：每個檔案的路徑與 SHA-256（前 16 碼即可）、commit hash、PR 連結；停止時說明停在哪一步、哪個檔案

---

## 五、Claude 核對（第 4 步）

- 用 codeload 下載 `main`（`solution-finder` 則下載 PR 分支 `refs/pull/<n>/head`）
- 每個檔案與交付包**逐位元組比對**；`刪除`項目確認已不存在
- 確認沒有多出的檔案（例：多一層子資料夾、根目錄多一份封存檔）
- `solution-finder` 的 PR 由 Claude 審查後，PPC 再 merge

Codex 的雜湊回報是「自我檢查」，Claude 的 codeload 核對是「獨立驗證」，兩者都要有。

---

## 六、轉為手動的時機

以下任一情況，改回 PPC 手動上傳：

| 情況 | 處理 |
|---|---|
| Codex 沒有該 repo 的存取權（4-0 路徑不存在，或 `git -C` 看不到正確 remote） | 手動，並另案讓 Codex clone 該 repo、補入 4-0 表 |
| 雜湊不符，Claude 重新產出後仍不符 | 手動，並保留 Codex 的回報供查原因 |
| push 或開 PR 失敗 | 手動 |
| 急件且 Codex 忙碌中 | 手動 |

### 手動上傳檢查點（10/12 的教訓）

1. **下載前**：刪掉電腦裡同名的舊檔（`report.md`、`report (1).md`…），只留這次下載的
2. **貼上或上傳後**：一定要按 **Commit changes**，並選 **Commit directly to the `main` branch**；畫面離開 Edit／Preview 模式才算完成
3. **檔名框**：已經在資料夾裡時，不要再打資料夾名稱和 `/`；按 Home、End 確認完整檔名
4. **檔名框有反白時**：先點編輯區取消選取，避免按鍵把檔名取代掉
5. **完成後**：請 Claude 用 codeload 核對

---

## 七、紀錄

每次交付在 `status.md` 當日段落記一行：交付包檔名、檔案數、Codex 或手動、Claude 核對結果。
