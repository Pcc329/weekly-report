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
| ~~Supabase advisor新增一項RLS policy警示待查證~~ | 資安 | Patrick | — | — | ~~需確認該policy屬讀取或寫入權限~~ 9/24已修正：`source_monitoring_checks`的公開INSERT權限為8/20海巡v1腳本試跑遺留（僅1筆資料），已移除；`source_monitoring_targets`僅開放SELECT，無相同問題 |
| weekly-report為public repo，status.md含資安處理細節 | 資安 | Patrick | Patrick | — | 9/24發現；9/29已評估三個方向（private+付費/改寫法/換平台加密碼），PPC確認「必須記錄細節」排除改寫法，其餘兩個方向暫緩，優先度讓給看板功能，待之後有餘裕再處理 |
| 「跨N種計畫」將非政府來源計入公部門計畫參與 | 後端 | Patrick | — | — | 9/29發現：`api/solutions.js`計算`pgc`／`pgList`時納入所有`program_type`，包含非政府平台的「資策會產業調查」（原領域型調查），導致公部門計畫參與度高估，屬語意膨脹；待開規格書，需決定排除清單（至少排除資策會產業調查） |
| 「領域型調查(人工搜查)」統一改名為「資策會產業調查」 | 資料品質 | Patrick | Patrick | — | 9/29規格已交付Codex（程式碼4檔＋前端3處來源說明）；資料庫3張表（solutions 133筆／program_sources／data_sources SRC-013）由Claude於PR核准後、merge前執行 |
| 資料海巡稽核頻率制度化：每週輕量檢查＋每月完整稽核 | 資料品質 | Patrick | Patrick | 每週五 | 9/29定案：每週檢查各來源平台存活與總筆數，總筆數變動即對該平台提前完整稽核；每月逐筆名單比對。首次輕量檢查排10/2（五）；需同步寫入`sop/freshness-audit-sop.md` |

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
| 「免費試用」按鈕與資料值「提供試用」語意一致性 | 資料品質 | Patrick | — | — | 9/29查證：54筆有效方案無一筆僅標「提供試用」、無一筆描述提及「免費」，判定語意誇大；規格已交付Codex，按鈕文字改為「提供試用」（僅改label，`id: free-trial`不動） |
| Supabase Egress用量觀察 | 後端 | Patrick | — | — | 9/24查看Free plan本期用量3.27／5GB（約65%），待確認計費週期重置日與主要流量來源 |
| 待啟用帳號臨時密碼處理 | 資安 | Patrick | — | — | 含臨時密碼的CSV已自Claude Project移除，改存僅含帳號名稱版本；恢復PR #156時需重新產生臨時密碼並要求首次登入修改 |
| ~~任務看板：Codex沙箱帳號呼叫taskctl需走完整路徑~~ | 專案管理 | Patrick | — | — | 9/29已改用GitHub Projects取代dashi-taskboard／Cloudflare部署路線，此問題隨舊路線放棄而不再適用 |

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

3. **任務看板遷移：從本機dashi-taskboard改為GitHub Projects**：原規劃部署dashi-taskboard到Cloudflare（Worker/D1/R2），查證後改變方向，24張SOL卡片全數搬遷至GitHub Projects
4. **solution-finder repo公開性評估：決定暫不處理**，優先確保看板功能可用，資安加固另案處理

<details>
<summary>展開細節</summary>

**任務看板遷移**：原評估dashi-taskboard部署到Cloudflare雲端（Worker+D1+R2），已完成Cloudflare帳號確認、`wrangler login`步驟；查證dashi-taskboard官方文件確認架構可行，但PPC進一步詢問「能不能做成靜態頁面」時，釐清看板需要即時寫入互動（拖曳卡片、建卡），與status.md/稽核log這類唯讀靜態頁面本質不同，靜態託管做不到寫入。討論延伸出三種滿足「能寫入、不靠本機開機」需求的路線（自建Vercel+Supabase／GitHub Projects／Trello等SaaS），PPC決定改用GitHub Projects——理由是天生跟現有repo/PR/commit活動長在同一個地方，符合「團隊能接手看得懂脈絡」的初衷，且免費、免部署。已取消Cloudflare部署路線（R2啟動頁面關閉，未輸入付款資訊，未產生費用）。

Codex完成匯出（`taskboard-export-solution-finder-20260929-154517.json`）、建立GitHub Project（四欄：Backlog/To Do/In Progress/In Review，另加Done共五欄，符合原Backlog獨立語意不併入To Do的決定），逐筆核對24張卡片（SOL-2～SOL-25）的描述、標籤、優先度、狀態，全數通過。本機dashi-taskboard的31張卡片（含後加的6張與測試卡）維持不變，未刪除。

**repo公開性評估**：搬遷過程中Codex回報`Pcc329/solution-finder`的Issues是公開的，與9/24已發現但未處理的「weekly-report為public repo」屬同一類問題（內部專案管理內容曝露在公開網路上）。實際核對SOL-6（PR #156相關）卡片內容，確認僅含狀態摘要（執行人/決策人/現況一句話），未包含密碼雜湊參數、session簽章機制等實作細節，判斷這24張卡片本身無立即資安風險。

針對weekly-report的public repo問題，討論出三個方向：①repo轉private+GitHub Pro付費（US$4/月）②status.md改寫法只記大方向不記技術細節③換用支援密碼保護的託管平台。PPC確認「必須記錄細節，寫大方向就失去記錄的意義」，②排除。釐清①的實際效果：GitHub Pages發布的網站本身是公開網址，不受repo private/public影響，故①只能防止別人翻commit歷史/原始檔案，防不了「網站畫面被看到」；若在意的是後者，需要③。討論「repo轉private＋3個月觀察有無非預期訪客」的暫行方案，Claude指出此方案的性質是「爭取決策時間」而非「解決風險」——網址可及性在這3個月內完全沒變，3個月平安不代表風險降低，且GitHub Pages/repo本身無內建足夠精細的訪客記錄工具，需另外加裝才有觀察意義。

最終PPC決定：資安加固（無論weekly-report的private化，或solution-finder repo公開性）**暫不處理**，優先順序讓給「看板功能先能用」，兩者為獨立決定，看板搬遷已完成可正常使用，資安評估留待之後有餘裕再處理。

</details>

**補記**：6張表RLS開啟無policy待確認一項，9/23查`api/*.js`與`public/*.html`已確認無任何程式碼查詢這4張表（data_sources/program_promotions/program_sources/solution_status_log），屬純後台/稽核用途，無policy是正確狀態，此P1待辦結案，從清單移除。

5. **「免費試用」語意查證並交付規格**：54筆皆無「免費」佐證，按鈕改為「提供試用」
6. **資料海巡對外說法潤飾＋稽核頻率制度化**：產出一句話版／一段話版與專業術語對照；定案每週輕量檢查＋每月完整稽核
7. **「領域型調查」來源重新定位並交付改名規格**：確認133筆為攻頂PO產業調查成果，統一改名「資策會產業調查」＋前端三處來源說明
8. **發現「跨N種計畫」高估公部門參與**：列入P1待辦，另案處理

<details>
<summary>展開細節</summary>

**免費試用查證**：查`solutions`有效方案中`pricing_model`含「提供試用」者共54筆，全數同時標記訂閱制／買斷制／客製化服務（0筆僅標提供試用），`description`與`description_short`中提及「免費」者0筆。資料只能佐證「有提供試用」，無法佐證「免費」。另PR #172套用標籤顯示欄位原值「提供試用」，與首頁按鈕「免費試用」用字不一致。全站僅`index.html`第107行`HOME_POPULAR_FILTERS`一處，規格僅改`label`，`id: "free-trial"`為`handlePopularFilter`內部識別碼刻意不動。

**海巡說法潤飾**：PPC希望將資料新鮮度稽核作為資料庫核心價值對外說明。Claude指出原說法兩處現況撐不住：「定期」（目前稽核無固定頻率，已執行8/20～25、9/21兩輪）與「全部來自政府權威網站」（含非政府平台來源）。產出潤飾版：一句話版「資料源自政府官方計畫平台，並經持續性資料新鮮度稽核，確保收錄方案真實在架、狀態可追溯」；一段話版強調有別於一次性爬取、依查證強度分級標記、每筆狀態變更留有查證紀錄。術語對照：權威來源／資料新鮮度稽核／資料血緣與可溯性／信心分級揭露。建議訂定稽核頻率讓「定期」有實據。PPC提議每週一次，Claude評估完整稽核每週做過重（9/21僅3個來源即耗時大半天，全部來源7個；且8/25→9/21近一個月僅新創嚴選16筆、農業雲市集17筆異動，每週完整比對多數週無變化），建議拆兩層：每週輕量檢查（僅看平台存活與總筆數，利用9/21已摸清的新創嚴選API `total`欄位、農業雲市集頁面總筆數、SME AI端點頁數，約15～30分鐘）＋每月完整稽核（逐筆比對，約半天～一天），並設觸發規則：輕量檢查發現總筆數變動即對該平台提前完整稽核。PPC同意，對外說法可更新為「每週監測、每月完整稽核」。

**來源重新定位**：PPC原描述此來源為「iii無直接合作、可抓取的公開資料」，初擬名稱「研究團隊收錄」並設計三段說明文字（短／中／完整版）。出規格書前查程式碼，發現四處名稱不一（人工搜查／III自有／攻頂PO），且dashboard描述為「深度產業調查與痛點分析」，與PPC描述矛盾。查證133筆（SOL-FIELD-0001～0133）全數於2026-07-21同批匯入、0筆有官網網址，判定為攻頂PO產業調查成果，非公開管道抓取。PPC確認攻頂PO為iii自有成果可納入，並拆為兩類：A「資策會產業調查」（現有133筆）、B「研究團隊收錄」（iii無合作之公開資料，目前0筆，未來收錄時再新增）。說明文字依實際來源改寫為「源自資策會產業調查專案」，避免不實陳述。另查`data_sources`（SRC-013）、`program_sources`各有1筆舊名，無外鍵約束；因前端以字串精確比對資料庫，規格定為Codex只改程式碼、Claude於核准後merge前執行資料庫更新以同步切換。規格並要求Codex查證是否有Airtable自動回寫`program_type`之排程（僅回報不修改）。

**跨N種計畫高估**：撰寫改名規格時查`api/solutions.js`第283～340行，`programTypesByCid`彙整公司所有`program_type`計算`pgc`與`pgList`，未排除非政府來源，致同時出現於資策會產業調查與一個政府平台的公司顯示「跨2種計畫」，高估公部門參與度。因涉及API計算邏輯，改名規格明確排除，另立P1待辦。

</details>
