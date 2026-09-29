## 待追蹤事項

### P0
| 項目 | 分類 | 執行人 | 決策人 | 預計時間 | 狀態 |
|---|---|---|---|---|---|

### P1
| 項目 | 分類 | 執行人 | 決策人 | 預計時間 | 狀態 |
|---|---|---|---|---|---|
| AI顧問頁面架構方向（維持雙欄局部優化 vs 單欄循序流程） | 專案管理 | Patrick | Alex | — | 已示範兩版DEMO，Patrick決定暫緩，優先度後排 |
| 五個政策問題是否符合實際使用情境 | 專案管理 | Patrick | Carrie | — | 待提案啟用時確認 |
| 三張獨立Table（能量登錄／補助／得標）實際資料量 | 外部協作 | Rio Hsu | — | — | 已去信詢問，未回覆 |
| PR #156（API身分驗證Phase2）已就緒，待復工決策 | 資安 | Patrick | Patrick | — | 規格/實作/審查皆已完成，PPC決定延後——經與Alex、Carrie多次小型會議，發現組織層級更在乎的是資料庫方案（含ETL/爬取資料）如何與iii產生連結、產出價值，優先度重新評估中；13組帳號已建好不會過期。狀態為「準備階段」：下次重啟工作時只需決定直接merge、或先調整後再上線，不需要重新規劃/重新審查 |
| ~~篩選面板熱門篩選chip（官方認證供應商／免費試用）套用標籤未顯示~~ | 前端 | Patrick | — | — | ~~規格已交付~~ PR #172（9/23完成）於9/24驗收並merge |
| 「返回首頁」按鈕語意與行為不符 | 前端 | Patrick | — | — | 9/18舊規格未實作，~~本次縮小範圍先修主題區詳情頁連結＋全站Logo兩處，規格已交付~~ PR #169/#170/#171已於9/23 merge（含搜尋結果頁返回按鈕改版與文字統一）；方案詳情頁返回鈕、popstate分支另案處理 |
| 6張表RLS開啟但無policy待確認（data_sources/program_promotions/program_sources/solution_status_log等） | 資安 | Patrick | — | — | 9/23查advisor時一併發現，INFO等級、預設拒絕非外洩風險，需確認是否有功能其實需要anon讀取這幾張表 |
| ~~Supabase advisor新增一項RLS policy警示待查證~~ | 資安 | Patrick | — | — | ~~需確認該policy屬讀取或寫入權限~~ 9/24已修正：`source_monitoring_checks`的公開INSERT權限為8/20海巡v1腳本試跑遺留（僅1筆資料），已移除；`source_monitoring_targets`僅開放SELECT，無相同問題 |
| weekly-report為public repo，status.md含資安處理細節 | 資安 | Patrick | Patrick | — | 9/24發現；待評估改為private repo或將資安細節移至非公開文件，GitHub Pages於private repo需付費方案，待整理方案 |

### P2
| 項目 | 分類 | 執行人 | 決策人 | 預計時間 | 狀態 |
|---|---|---|---|---|---|
| S3優先3：全庫周邊表外鍵驗證 | 後端 | Patrick | — | — | 未執行，非急迫 |
| SME AI平台尋工具清單（約279筆） | 後端 | Patrick | — | — | API端點已找到，266筆現況已抓取比對，27筆差異26筆為截斷方法論瑕疵未標記，僅Genie CPO待人工確認 |
| 農業雲市集數位館（93筆） | 後端 | Patrick | — | — | 已完成首次稽核，17筆標記疑似已下架，3筆改名候選+凌聚農業科技11筆產品線改版待人工判斷 |
| data_sources表拆分「主辦單位」與「執行單位」欄位 | 後端 | Patrick | — | — | 9/7排查連結時發現，非急迫 |
| feedback.html、system-board.html兩條失效連結 | 前端 | Patrick | — | — | 搬移前既有問題 |
| 貼標與搜尋排序DEMO | 外部協作 | Rio Hsu | — | 9/11 | 追蹤中，Rio為專案負責人，Patrick工作已結束 |
| 萬物智通(93056611)疑似空殼重複記錄 | 資料品質 | Patrick | — | — | 0方案掛靠，另一筆(86570312)有1方案但region='其他'待查證實際地址；發現時機為排查該筆region異常時 |
| gov_registrations 前端能量登錄badge呈現方式 | 前端 | — | Alex | — | 已暫緩，UI方向未定 |
| CDM分類前端badge呈現方式 | 前端 | — | Alex | — | 已暫緩，UI方向未定，可能與上項合併規劃 |
| statusUpdate.html「工作記事」空狀態顯示落差（無日誌內容時重複印出待追蹤事項表格） | 前端 | Patrick | — | — | 非嚴重bug，列入下次規格書修正 |
| 使用者自助改密碼功能 | 資安 | Patrick | — | — | API身分驗證Phase2範圍內刻意排除，目前忘記密碼只能由管理員手動重設雜湊 |
| ISO27001等國際標準認證資料蒐集 | 資料品質 | Patrick | — | — | 信任訊號功能延伸討論時提出；資料庫目前無對應來源，需外部查證，工作量不明，與信任訊號本次規格分開處理 |
| 「政府關係指數」量化模型評估 | 資料品質 | Patrick | Patrick | — | PPC提出以獲獎層級/政府計畫參與廣度/官方登錄深度做加權分數；現有資料（awards.host_org、solutions.program_type、gov_registrations.registration_category）可支撐，但需先定義方法論（標準化、權重理由）；需與現有「信任驗證」清單分開呈現，避免被解讀為替政府計畫背書；範圍與工作量待評估，暫不排入本次PR |
| 新增使用者登入紀錄表（login_logs） | 資安 | Patrick | — | — | Phase2已讓session帶有userId，具備記錄基礎，但尚未建表寫入；欄位初步構想：user_id(FK)、login_at、ip_address |
| 新創嚴選網4筆疑似改名候選（律果簽/Robotiive/ClimaMentor/EgentHub） | 資料品質 | Patrick | — | — | 9/21海巡發現，同公司同類產品新舊命名並存，待人工核對是否為單純改名 |
| 農業雲市集「悠由農」容量參數落差(30→32公頃) | 資料品質 | Patrick | — | — | 9/21海巡發現，非下架問題，屬內容更新待辦 |
| 本機工作區整理（solution-finder-pr-work） | 專案管理 | Patrick | — | — | ~~9/23盤點，8個舊副本待刪除~~ 9/24已刪除8個（內容皆在GitHub）；`api-auth-phase1`經`git cherry`確認4個commit未在GitHub，保留待PR #156復工時確認；taskboard workspace路徑待建立正式工作區後更新 |
| 「免費試用」按鈕與資料值「提供試用」語意一致性 | 資料品質 | Patrick | — | — | 9/24驗收PR #172時發現，需確認資料中「提供試用」是否皆為免費，否則按鈕文字屬語意誇大 |
| Supabase Egress用量觀察 | 後端 | Patrick | — | — | 9/24查看Free plan本期用量3.27／5GB（約65%），待確認計費週期重置日與主要流量來源 |
| 待啟用帳號臨時密碼處理 | 資安 | Patrick | — | — | 含臨時密碼的CSV已自Claude Project移除，改存僅含帳號名稱版本；恢復PR #156時需重新產生臨時密碼並要求首次登入修改 |
| 任務看板：Codex沙箱帳號呼叫taskctl需走完整路徑 | 專案管理 | Patrick | — | — | 功能正常，因Codex以獨立沙箱帳號執行，讀不到使用者層級PATH與環境變數，每次多繞步驟；使用一段時間後再評估優化 |

---

# 2026-09-29

1. **工作方法決策：status.md與任務看板分工**：看板（`taskctl`／SOL卡片）記錄現況與下一步，status.md專責記錄決策脈絡與查證過程，兩者互補非取代，卡片可簡註「詳見status.md日期」避免重工。看板9/24才試用一天，本週先照此分工跑，視實際操作順不順再決定是否調整
2. **CSP第二波正式結案**：Report-Only切換強制模式（PR #173），並補上connect-src漏洞（PR #174），兩項驗收標準皆達成，正式站觀察無新增違規

<details>
<summary>展開細節</summary>

**工作方法決策**：PPC提出看板vs status.md的分工判斷——看板記「結果與下一步」、status.md記「細節與脈絡」，Claude認同並補充兩者互補而非取代關係，避免只留看板會遺失「怎麼查出來的」這類回顧價值，只留status.md則沒有「一眼看懂現況」的功能。

**CSP強制模式（PR #173）**：`vercel.json`只改CSP標頭key名稱（`Content-Security-Policy-Report-Only`→`Content-Security-Policy`），規則value逐字不動。查週末（連假）期間`csp_violations`無新增，確認可安全切換。Claude以完整下載main與PR commit做全樹遞迴比對，確認整個repo僅此一行差異。核准合併。

順帶就CSP切換對CIA三面向的意義討論：機密性與完整性因阻擋未授權來源而增強，可用性則是經過驗證、風險已確認很低的一項取捨（規則之外的東西會被真的擋下而非悄悄放行）。

**connect-src補件（PR #174）**：PPC實測時在開發者工具Console發現2筆真實違規——`cdnjs.cloudflare.com`與`unpkg.com`的`.js.map`原始碼對照表被擋，根因為`script-src`已允許這兩網域載入JS，但`connect-src`未同步允許。此為僅開發者工具開啟時才會觸發的請求，一般使用者不受影響，但仍判斷為規則真實漏洞應修正。規格書已交付並產出完整MD檔案供直接使用。Claude全樹比對確認僅`connect-src`新增兩網域，其餘逐字不變，核准合併。

**驗證**：因內嵌瀏覽器無DevTools，改用查`csp_violations`表間接驗證——merge後立即查到4筆新增，皆為已知的兩個`.js.map`違規、時間點卡在部署完成前（04:05），10分鐘後重查維持8筆無新增，確認PR174確實生效。CSP第二波（Report-Only啟用9/14起算）至此正式結案。

</details>
