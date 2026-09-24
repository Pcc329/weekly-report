## 待追蹤事項

### P0
| 項目 | 分類 | 執行人 | 決策人 | 預計時間 | 狀態 |
|---|---|---|---|---|---|
| CSP第二波（Content-Security-Policy正式啟用） | 資安 | Patrick | — | — | Report-Only回報資料已查證，data:資源漏洞已修復並merge（PR #166），~~待正式站觀察24小時無異常後評估切換強制模式~~ 觀察期已滿；9/24決定不在週末前切換，延至下週一查證`csp_violations`無新增違規後切換強制模式 |

### P1
| 項目 | 分類 | 執行人 | 決策人 | 預計時間 | 狀態 |
|---|---|---|---|---|---|
| AI顧問頁面架構方向（維持雙欄局部優化 vs 單欄循序流程） | 專案管理 | Patrick | Alex | — | 已示範兩版DEMO，Patrick決定暫緩，優先度後排 |
| 五個政策問題是否符合實際使用情境 | 專案管理 | Patrick | Carrie | — | 待提案啟用時確認 |
| 三張獨立Table（能量登錄／補助／得標）實際資料量 | 外部協作 | Rio Hsu | — | — | 已去信詢問，未回覆 |
| PR #156（API身分驗證Phase2）已就緒，待復工決策 | 資安 | Patrick | Patrick | — | 規格/實作/審查皆已完成，PPC決定延後——經與Alex、Carrie多次小型會議，發現組織層級更在乎的是資料庫方案（含ETL/爬取資料）如何與iii產生連結、產出價值，優先度重新評估中；13組帳號已建好不會過期。狀態為「準備階段」：下次重啟工作時只需決定直接merge、或先調整後再上線，不需要重新規劃/重新審查 |
| 篩選面板熱門篩選chip（官方認證供應商／免費試用）套用標籤未顯示 | 前端 | Patrick | — | — | 篩選邏輯本身正確運作，僅UI套用標籤區塊漏寫isGov/pricingModel分支，規格已交付 |
| 「返回首頁」按鈕語意與行為不符 | 前端 | Patrick | — | — | 9/18舊規格未實作，~~本次縮小範圍先修主題區詳情頁連結＋全站Logo兩處，規格已交付~~ PR #169/#170/#171已於9/23 merge（含搜尋結果頁返回按鈕改版與文字統一）；方案詳情頁返回鈕、popstate分支另案處理 |
| 6張表RLS開啟但無policy待確認（data_sources/program_promotions/program_sources/solution_status_log等） | 資安 | Patrick | — | — | 9/23查advisor時一併發現，INFO等級、預設拒絕非外洩風險，需確認是否有功能其實需要anon讀取這幾張表 |
| Supabase advisor新增一項RLS policy警示待查證 | 資安 | Patrick | — | — | 9/24查advisor時發現，前次未列入；需確認該policy屬讀取或寫入權限，查證前細節不公開記錄 |
| weekly-report為public repo，status.md含資安處理細節 | 資安 | Patrick | Patrick | — | 9/24發現；待評估改為private repo或將資安細節移至非公開文件，需先確認GitHub Pages於private repo下的可用性 |

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
| 本機工作區整理（solution-finder-pr-work） | 專案管理 | Patrick | — | — | 9/23盤點：外層repo停在07-14，含2個未commit修改（已另存patch）；9個子資料夾中8個確認內容皆已在GitHub可刪除，`api-auth-phase1`本機commit無法確認已推送，保留待查；已整包備份；taskboard workspace路徑待整理後更新 |
| Supabase Egress用量觀察 | 後端 | Patrick | — | — | 9/24查看Free plan本期用量3.27／5GB（約65%），待確認計費週期重置日與主要流量來源 |
| 待啟用帳號臨時密碼處理 | 資安 | Patrick | — | — | 含臨時密碼的CSV已自Claude Project移除，改存僅含帳號名稱版本；恢復PR #156時需重新產生臨時密碼並要求首次登入修改 |
| 任務看板：Codex沙箱帳號呼叫taskctl需走完整路徑 | 專案管理 | Patrick | — | — | 功能正常，因Codex以獨立沙箱帳號執行，讀不到使用者層級PATH與環境變數，每次多繞步驟；使用一段時間後再評估優化 |

---
