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
| PR #156（API身分驗證Phase2）~~已就緒~~ 分支已過期，待復工決策 | 資安 | Patrick | Patrick | — | ~~規格/實作/審查皆已完成，PPC決定延後……狀態為「準備階段」：下次重啟工作時只需決定直接merge、或先調整後再上線，不需要重新規劃/重新審查~~ **10/5更正**：分支落後main（缺#173／#174／#199／#200／#201／#202），已不能直接merge；PPC決定短期不merge、保留紀錄。復工須先rebase跟上main並**重新審查**。13組帳號仍有效。⚠️「API身分驗證」仍是最高優先、尚未解決的資安項目 |
| ~~篩選面板熱門篩選chip（官方認證供應商／免費試用）套用標籤未顯示~~ | 前端 | Patrick | — | — | ~~規格已交付~~ PR #172（9/23完成）於9/24驗收並merge |
| 「返回首頁」按鈕語意與行為不符 | 前端 | Patrick | — | — | 9/18舊規格未實作，~~本次縮小範圍先修主題區詳情頁連結＋全站Logo兩處，規格已交付~~ PR #169/#170/#171已於9/23 merge（含搜尋結果頁返回按鈕改版與文字統一）；方案詳情頁返回鈕、popstate分支另案處理 |
| ~~Supabase advisor新增一項RLS policy警示待查證~~ | 資安 | Patrick | — | — | ~~需確認該policy屬讀取或寫入權限~~ 9/24已修正：`source_monitoring_checks`的公開INSERT權限為8/20海巡v1腳本試跑遺留（僅1筆資料），已移除；`source_monitoring_targets`僅開放SELECT，無相同問題 |
| weekly-report為public repo，status.md含資安處理細節 | 資安 | Patrick | Patrick | — | 9/24發現；9/29已評估三個方向（private+付費/改寫法/換平台加密碼），PPC確認「必須記錄細節」排除改寫法，其餘兩個方向暫緩，優先度讓給看板功能，待之後有餘裕再處理 |
| 「跨N種計畫」將非政府來源計入公部門計畫參與 | 後端 | Patrick | — | — | 9/29發現：`api/solutions.js`計算`pgc`／`pgList`時納入所有`program_type`，包含非政府平台的「資策會產業調查」（原領域型調查），導致公部門計畫參與度高估，屬語意膨脹；待開規格書，需決定排除清單（至少排除資策會產業調查）；10/2提醒：來源已改名，排除清單須使用新名「資策會產業調查」 |
| ~~「領域型調查(人工搜查)」統一改名為「資策會產業調查」~~ | 資料品質 | Patrick | Patrick | — | **10/2完成**：PR #199 merge並部署後，資料庫改名（`solutions` 133筆、`program_sources` 1筆、`data_sources` SRC-013 1筆，單一交易含筆數檢查），驗證新名133／舊名0、全庫2,487與前台可見2,268不變；官網來源篩選132筆（133筆含1筆已下架）。遷移檔`20261002_rename_iii_industry_survey.sql`已存檔。待PPC看一眼詳情頁的「非政府審核」揭露說明與`sources.html`顯示數字 |
| 資料海巡稽核頻率制度化：每週輕量檢查＋每月完整稽核 | 資料品質 | Patrick | Patrick | 每週五 | 9/29定案；9/30產出SOP v3（第七節稽核節奏、第十節比對方法與陷阱，並更正一處成因錯誤）與稽核log（補登9/21、新增9/30段落、每週檢查基準表），~~待上傳`sop/`目錄~~ 10/1已確認上傳（SOP含v3與逐筆驗證範例、稽核log含任務C結果，根目錄誤放的副本已移除）；首次例行輕量檢查排10/2（五） |
| ~~MCP v1.0.2 驗收第4題補測（高雄飯店）~~ | 後端 | Patrick | — | — | **10/2通過**：工具權限改為Always allow後重跑，日誌顯示07:43連續10個請求全200、版本5，兩次搜尋都送達；Claude不設region、拆短詞「入住」「評論」分次搜尋，取交集得`SOL-0911`；引用`page_summary`的數字（23筆、前15筆11正常／4疑似）與資料庫完全一致。v1.0.2驗收4／4完成 |
| ~~MCP v1.0.3：`matches_industry_keyword`旗標、`page_summary`伺服器端統計、`ids_only`模式~~ | 後端 | Patrick | Patrick | — | **10/2已部署v1.0.3（Edge Function第5版）**：`page_summary`（正常／疑似／未填地區／在名冊／命中產業詞由伺服器計算）、`matches_industry_keyword`、稅籍欄位（`tax_primary_industry`、`it_code_rank`、get_solution的`tax_industries`）、describe_data新增第八節。**未改工具參數，不需重新連線**。`ids_only`改列v1.1與服務範圍篩選一起；**同日再部署v1.0.4**（Edge Function第6版）：修正獲獎少報——官網「獲獎肯定」來自`awards`（公司層級），MCP原只讀`solutions.has_award`，有效方案中49筆vs272筆。新增搜尋結果`has_company_award`／`company_award_count`／`company_award_best_level`與`get_solution`的`company_awards`，`describe_data`第九節說明。未改工具參數，不需重新連線。官網另有「資安CDM分類」「案例實績佐證」「跨N種計畫」三個信任訊號MCP尚未帶，列v1.1評估 |
| ~~Codex：稅籍主業標示（只標示不排序）~~ | 前端 | Patrick | Patrick | — | **10/2完成**：PR #200 merge並於正式站驗證——思偉達卡片顯示「稅籍主業：電腦及電腦週邊設備批發」且無資服標籤（rank 2）、搜尋「客服」仍251筆、排序未變；審查時確認3檔改動、`escapeHtml`、匿名身分可讀新欄位（1,103家全讀得到）、與#199三方合併0衝突。Codex多補了`api/solutions.js`的資料列→公司物件對應（規格書漏列，必要） |
| 組長連線SF資料庫MCP（驗收項目d）＋v1.1重測 | 專案管理 | Patrick | Patrick | — | ~~10/2邀請信已備妥~~ 組長已連線並實測（10/2–10/5，三題真實問題）。**10/5 v1.1已部署**，待組長Disconnect→Connect、8個工具重設Always allow，用同一題「臺北市有POS系統的廠商與方案」重測，回報耗時與呼叫次數（v1.0.4時約330次工具呼叫，v1.1預估降到個位數，**以實測為準**）。驗收項目d（`whoami`日誌確認為她的user id）仍待。擴大到全組PM前須確認資策會對「個人帳號存取內部資料庫」的規範（目前無） |
| 稅籍名冊比對匯入後續：3家登記地與SF city不同、254家不在名冊、排序分三階段 | 資料品質 | Patrick | Patrick | — | 10/2已完成資料庫第一階段與前端「標示」階段（PR #200）；排序仍未動。待決：①`22023793`／`50767268`／`83764072`的SF city（高雄／台南／彰化）與稅籍登記地（新北／臺北）不同，疑為營運據點vs登記地，**未覆蓋**；②254家不在名冊，建議用財政部開放資料最新月檔補查；③排序：先標示→平手加分→加權，權重由Alex／組長拍板 |
| ~~儀表板「近期更新」新增「資料維護」區塊（Codex）~~ | 前端 | Patrick | Patrick | — | **10/5完成**：PR #201 merge，正式站驗收數字正確（方案校正39、公司補充898、列表4行，既有+0／2,268、+0／1,102不變）；PPC發現列表字級與其他區塊不一致、日期在左，由PR #202修正（以「最新寫入項目」為模板，日期移右）並merge |
| ~~收回`anon`對12張內部表的寫入類授權~~ | 資安 | Patrick | Patrick | — | **10/5完成**（PPC核准、PPC在SQL Editor執行）：`REVOKE INSERT, UPDATE, DELETE, TRUNCATE ... FROM anon`共13個物件——`companies_public`（視圖）、`company_cdm_categories`、`csp_violations`、`data_sources`、`gov_registrations`、`industry_codes`、`program_promotions`、`program_sources`、`solution_reviews`、`solution_status_log`、`source_monitoring_checks`、`source_monitoring_targets`、`users`；保留`pm_survey_responses`的INSERT。單一交易內自檢（剩餘寫入授權=1）通過，交易外獨立驗證只剩`pm_survey_responses｜INSERT`。事前查證網站無anon寫入路徑（讀取類API用anon、`csp-report.js`與`company-detail.js`用service_role、`feedback.js`寫Airtable）。SELECT授權未處理，另列P2 |
| Airtable退場階段1：三條紀錄寫入遷移、移除API的Airtable分支、確認Vercel環境值 | 後端 | Patrick | Patrick | — | 10/1評估（見當日細節）：`api/ask.js`（Ask_Logs）、`api/claude.js`（Search_Logs）、`api/feedback.js`僅寫Airtable，無Supabase路徑；`solutions`／`companies`／`stats`／`cases`四支有`DB_SOURCE_*`雙來源切換，預設`airtable`。~~待PPC確認Vercel正式環境值~~ **10/2確認首頁累計方案2,268＝Supabase**，`DB_SOURCE_SOLUTIONS`確定為supabase（companies／cases合理推斷同），前提成立；另Airtable Companies匯出僅871家（Supabase 1,103），Airtable已落後。待寫Codex規格書。PPC決定三步驟：①移轉Supabase ②Airtable備著 ③移除另兩位使用權、只留PPC（約US$20／月）。不要降到免費方案（筆數上限）；遷移完成後做一次最終完整匯出並撤掉或改唯讀`AIRTABLE_TOKEN` |
| MCP改進：Skill（A）、v1.2（B＋D＋E）、限流（F） | 後端 | Patrick | Patrick／Alex | — | 10/5組長回饋「劉姥姥進大觀園」：問題想很久、列方案時已下架解釋過多，建議建Skills或加強input／output schema（附MCP規格Tools頁）。整理為A～H八個方向（詳見10/5細節）。**待決三項**：①已下架揭露改「預設一行、被問才展開」（PPC＋Alex）②推薦類只列「正常」由Skill指示`normal_only`、伺服器預設仍與官網一致 ③限流閾值（組長峰值106次／分）。v1.2的B、D、E合併一次發布，讓使用者只重連一次 |

### P2
| 項目 | 分類 | 執行人 | 決策人 | 預計時間 | 狀態 |
|---|---|---|---|---|---|
| S3優先3：全庫周邊表外鍵驗證 | 後端 | Patrick | — | — | 未執行，非急迫 |
| 農業雲市集數位館（93筆） | 後端 | Patrick | — | — | 9/30編號比對＋Chrome逐筆驗證完成：73正常／1疑似／19已下架。僅剩`SOL-1423`（錢老闆防錯一鍵通）待判：頁面仍在但已改放其他商品，無法排除功能併入同公司其他商品，維持疑似 |
| data_sources表拆分「主辦單位」與「執行單位」欄位 | 後端 | Patrick | — | — | 9/7排查連結時發現，非急迫 |
| feedback.html、system-board.html兩條失效連結 | 前端 | Patrick | — | — | 搬移前既有問題。**10/1更正**：先前我寫「feedback.html不存在」未經驗證有誤——`solution-finder`的`public/feedback.html`與`api/feedback.js`都存在（該頁寫入Airtable，見Airtable退場評估）；repo中找不到的是`system-board.html`。待PPC實際開啟網址確認連結是否可用 |
| 貼標與搜尋排序DEMO | 外部協作 | Rio Hsu | — | 9/11 | 追蹤中，Rio為專案負責人，Patrick工作已結束 |
| 萬物智通(93056611)疑似空殼重複記錄 | 資料品質 | Patrick | — | — | 0方案掛靠，另一筆(86570312)有1方案但region='其他'待查證實際地址；發現時機為排查該筆region異常時 |
| gov_registrations 前端能量登錄badge呈現方式 | 前端 | — | Alex | — | 已暫緩，UI方向未定 |
| CDM分類前端badge呈現方式 | 前端 | — | Alex | — | 已暫緩，UI方向未定，可能與上項合併規劃 |
| statusUpdate.html「工作記事」空狀態顯示落差（無日誌內容時重複印出待追蹤事項表格） | 前端 | Patrick | — | — | 非嚴重bug，列入下次規格書修正 |
| 使用者自助改密碼功能 | 資安 | Patrick | — | — | API身分驗證Phase2範圍內刻意排除，目前忘記密碼只能由管理員手動重設雜湊 |
| ISO27001等國際標準認證資料蒐集 | 資料品質 | Patrick | — | — | 信任訊號功能延伸討論時提出；資料庫目前無對應來源，需外部查證，工作量不明，與信任訊號本次規格分開處理 |
| 「政府關係指數」量化模型評估 | 資料品質 | Patrick | Patrick | — | PPC提出以獲獎層級/政府計畫參與廣度/官方登錄深度做加權分數；現有資料（awards.host_org、solutions.program_type、gov_registrations.registration_category）可支撐，但需先定義方法論（標準化、權重理由）；需與現有「信任驗證」清單分開呈現，避免被解讀為替政府計畫背書；範圍與工作量待評估，暫不排入本次PR |
| 新增使用者登入紀錄表（login_logs） | 資安 | Patrick | — | — | Phase2已讓session帶有userId，具備記錄基礎，但尚未建表寫入；欄位初步構想：user_id(FK)、login_at、ip_address |
| 新北產業AI化輔導計畫56筆 vs 官方公告45家落差 | 資料品質 | Patrick | — | — | 8/25稽核log待辦遺留，至今未處理亦未列入追蹤；官方「AI服務供應商方案表.PDF」可比照商業署PDF比對法；首次以完整稽核處理 |
| 收錄候選清單交ETL評估：新創嚴選17筆、農業雲市集1筆（豬你旺PigDataPro）、SME AI平台1筆（專加點餐通2.0餐飲系統） | 後端 | Patrick | — | — | 9/30比對產出；均為官網有、資料庫尚無的商品，非稽核問題。注意先前名稱比對列的農業雲市集十餘筆「新增候選」幾乎都是改名，已排除 |
| 每週輕量檢查基準缺口：雲市集工業館只看了三頁之一 | 資料品質 | Patrick | — | 10/9 | 10/2首次輕量檢查發現`data_sources`登記工業館有三頁（SRC-003 AI工具庫方案、SRC-004 Lite版、SRC-005 雲端解決方案），基準只看SRC-005（111／10頁，+5）；139筆疑似來自SRC-003、SRC-004為6月39→8月126。資料庫329筆全無網址無法對應頁面，完整稽核須三頁合併清單以正規化名稱比對。下週先補另兩頁基準，再排完整稽核 |
| ~~商業服務業專區117家名單所屬系列未記錄~~ | 資料品質 | Patrick | Patrick | — | **10/2結案**：117筆＝「提升商業服務業營運效能強化韌性計畫（個案補助－單店導入）AI解決方案入選名單」（服務提供者上架的有標價方案，非整合型補助的店家名單）。證據：Chrome比對14家公司全在`service-ai.php`提供者名單、整合型第三梯16家與本庫0家重疊；我補：第一梯名單PDF前20筆19筆在本庫、`SOL-BIZ-0001`起依PDF序號排列。`data_sources` SRC-002已補計畫名稱／年度／執行單位，並移除貼錯的工業館計畫頁網址。**未完成**：第二梯（7/15公告）逐筆比對、網站約300筆而本庫僅117筆（在精不在多，不擴充，但要記錄覆蓋範圍）、第三梯受理至10/20後的新名單追蹤 |
| 政府軟體採購網基準建立：本庫100筆為同仁挑選子集，與網站總數不可比 | 資料品質 | Patrick | — | — | 10/2：網站套裝軟體5,804／雲端服務36／資安健診27；本庫100筆（資安合規67等）7/21由III同仁提供、81筆無網址。每週只看存活與最新消息日期 |
| ~~舊空專案`Pcc329's Project`與9/10演練測試專案~~ | 資安 | Patrick | — | — | 10/2兩者皆已刪除。空專案查證：Storage下載為22 bytes空zip；Resume後0張資料表、0使用者、Storage從未初始化、9.7MB系統基本大小，repo無引用。組織只剩正式站，12月季度演練有名額 |
| 備份SKILL改進：密碼寫在指令裡會進PowerShell歷史；歷史參考數字缺9/24與10/2 | 資安 | Patrick | — | — | 10/2週備份5.56MB（9/10為5.01MB，+11%合理：csp_violations 433筆、兩輪稽核留痕、MCP表）。建議改用環境變數或備份後清除歷史；SKILL為PPC外掛，由PPC更新 |
| ~~確認9/30 Supabase變更未被Airtable同步覆蓋~~ | 後端 | Patrick | — | — | 10/1抽查15筆保留、repo無同步程式；10/2確認官網讀Supabase、Airtable已落後232家且無回寫，**結案** |
| 本機工作區整理（solution-finder-pr-work） | 專案管理 | Patrick | — | — | ~~9/23盤點，8個舊副本待刪除~~ 9/24已刪除8個（內容皆在GitHub）；`api-auth-phase1`經`git cherry`確認4個commit未在GitHub，保留待PR #156復工時確認；taskboard workspace路徑待建立正式工作區後更新 |
| ~~「免費試用」按鈕與資料值「提供試用」語意一致性~~ | 資料品質 | Patrick | — | — | **10/5完成**：PR #202 merge，`index.html`第107行label改「提供試用」，`id: free-trial`與第464行篩選邏輯未動；Preview篩出53筆 |
| Supabase Egress用量觀察 | 後端 | Patrick | — | — | 9/24查看Free plan本期用量3.27／5GB（約65%），待確認計費週期重置日與主要流量來源 |
| 待啟用帳號臨時密碼處理 | 資安 | Patrick | — | — | 含臨時密碼的CSV已自Claude Project移除，改存僅含帳號名稱版本；恢復PR #156時需重新產生臨時密碼並要求首次登入修改 |
| ~~任務看板：Codex沙箱帳號呼叫taskctl需走完整路徑~~ | 專案管理 | Patrick | — | — | 9/29已改用GitHub Projects取代dashi-taskboard／Cloudflare部署路線，此問題隨舊路線放棄而不再適用 |
| PM需求調查問卷（網頁表單）暫停，恢復時需上傳兩個檔案 | 專案管理 | Patrick | Patrick | — | 10/1頁面與資料庫都已就緒（22題＋Q2b諮詢對象題；必填姓名；存取碼可由連結`?code=`帶入；80項自動測試通過），但**尚未上線**（repo中`docs/pm_survey_20260930.html`不存在、`index.html`未更新）。恢復只需上傳`docs/pm_survey_20260930.html`與根目錄`index.html`，並用真實存取碼自測一份再發給同事。資料表`pm_survey_responses`目前0筆；分析完成後須刪除原始回覆 |
| `target_industry`多套詞彙正規化 | 資料品質 | Patrick | — | — | 10/1發現：同樣是「金融業」，雲市集寫法「金融保險」（52筆）與主計總處寫法「K金融及保險業」（57筆）並存，前者存成單一字串以「, 」分隔、後者以「；」分隔。官網首頁`api/claude.js`對照表只命中一套（金融52→詞根112、零售225→363）。MCP已改用詞根；治本是建立統一產業分類與對照表（同地區詞彙問題） |
| ~~公司所在地缺口：513家公司region與city皆空~~ | 資料品質 | Patrick | — | — | **10/2已補346家**（稅籍名冊縣市→網站既有區域定義；苗栗歸中部），region空由513→167、city空514→168，留痕`company_field_log`。剩餘167家不在名冊，待改用財政部最新月檔 |
| `service_region`兩套詞彙並存與缺口 | 資料品質 | Patrick | — | — | 10/1：同一欄位混用「北北基／桃竹苗／中彰投…」與「北部／中部／南部／東部」，另有「離島地區」（4筆）與「離島/其他」（267筆）疑似同義；空白1,064筆（47%）。目前MCP不提供服務範圍篩選，客戶位置類需求（例：高雄飯店找全台可服務的廠商）做不到，列入v1.1候選 |
| 臺灣雲市集疑似下架方案逐筆驗證（按需求驅動，先做資安61筆） | 資料品質 | Patrick | Patrick | — | 10/1：疑似1,188筆中1,031筆來自臺灣雲市集，原因「平台停止服務未逐筆驗證」（是稽核判斷，**不是偵測機制出問題**）。關鍵字「資安」204筆＝125確認在架＋79疑似（61臺灣雲市集＋18其他）；**61筆`website_url`全空**，無法直接開網址驗證。建議先排除商工登記顯示歇業者，再以廠商官網為逐筆證據，依SOP恢復需逐筆證據 |
| 官網顯示疑似下架方案的比例（疑似佔前台可見52%） | 前端 | Patrick | Alex | — | 10/1：2,268筆前台可見中1,188筆為疑似（設計決策：未逐筆驗證不隱藏），比例高，使用者可能誤以為皆可用。MCP的回答會標註，官網是否加註標示為產品決策，另案評估 |
| 搜尋與排序邏輯目前有兩份實作（官網JS＋資料庫函式`sf_search_solutions`） | 後端 | Patrick | — | — | 10/1：以官網自身程式碼為標準答案做28項對照測試確認一致。長期應讓官網改呼叫同一個資料庫函式，單一實作；首頁邏輯改動前須同步修改函式並重跑`sf_search_parity_gen_test.js` |
| ~~repo存檔：MCP相關檔案~~ | 專案管理 | Patrick | — | — | **10/2完成**：`solution-finder`的`supabase/functions/sf-mcp/index.ts`（v1.0.4）、`migrations/`四個SQL（access、search、company_tax_industry、rename_iii_industry_survey）、`tests/sf-mcp/sf_search_parity_gen_test.js`；`weekly-report`的`status.md`與`sop/freshness-audit-log.md`。皆以雜湊逐位元組核對（測試產生器僅一行註解多2個尾端空白，無影響），機密掃描0命中。函式原始碼與Supabase線上版為**間接**一致（同源檔案、部署回傳ACTIVE、新欄位在驗收中出現），未從線上讀回比對。測試產生器單獨仍不能一鍵重跑 |
| solution-finder repo缺`.gitignore` | 資安 | Patrick | — | — | 10/1：已查目前repo內無金鑰；但`SUPABASE_SERVICE_ROLE_KEY`同時存在Production／Preview／Development，若在repo資料夾`vercel env pull`再`git add .`，可能把繞過RLS的金鑰推上公開repo。補`.gitignore`（`.env*`、`.vercel`、`node_modules`）為極小PR |
| 舊HS256 JWT密鑰仍被信任 | 資安 | Patrick | Patrick | — | 10/1查證：JWT Signing Keys目前使用中為ES256（ECC P-256），舊的Legacy HS256為Previous key。**不可按Revoke**：網站的anon／service_role仍是舊密鑰簽的JWT。要真正封死，須先把Vercel換成新式`sb_publishable_`／`sb_secret_`金鑰，再撤銷舊密鑰；獨立加固專案 |
| 資料審查：`AgentFlow 智動客服解決方案`摘要與名稱矛盾、同名「A.I.智能客服大使」兩筆 | 資料品質 | Patrick | — | — | 10/1驗收時發現：前者名稱與標語是客服、簡述卻是製造業ERP整合；後者資料庫有兩筆同名方案，欄位命中情況不同，可能是不同公司或重複記錄，尚未查；10/2補：全庫有效方案中「同名＋同公司」重複組95組、涉及198筆（多為同一產品同時上架多個平台，如SME AI平台／臺灣雲市集／雲市集工業館），詳見P2「重複列」；另`SOL-0491`方案名稱為「缺」（已標已下架_資料異常） |
| 跨平台重複列：同名＋同公司95組、198筆；「累計方案」計來源列數而非不重複產品 | 資料品質 | Patrick | Alex | — | 10/2驗收評論搜尋時發現同一方案出現兩次。成因是同一產品上架多個平台各存一列。影響：搜尋結果重複、儀表板「累計2,268」不等於2,268個不同產品、所有「有幾筆」的回答。**產品決策**：一個產品一列，還是一個平台上架一列（目前）；需與Alex討論，勿先改資料 |
| 205筆有效方案沒有公司編號（約9%） | 資料品質 | Patrick | — | — | 10/2：搜尋結果顯示公司名為空、地區不明、稅籍與獲獎皆查不到（例：「快好評」「AI智慧社群互動」）。需查是公司尚未建檔或編號漏填 |
| 系統性權限防線：新表預設權限與每月授權稽核 | 資安 | Patrick | — | — | 10/2：Supabase建新表時預設把完整權限給`anon`與`authenticated`，今天兩張新表是手動收回的。建議`ALTER DEFAULT PRIVILEGES`改為最小權限，並在每月稽核加一項「列出anon／authenticated寫入類授權與預期比對」；MCP路徑已實測無任何寫入途徑（見當日細節） |
| MCP信任訊號缺口：資安CDM分類、案例實績佐證、跨N種計畫 | 後端 | Patrick | — | — | 10/2：官網卡片有、MCP未帶；獲獎已於v1.0.4補上。CDM表已對`authenticated`收回SELECT，若要提供需先評估；v1.1依組長測試6的真實問題決定優先序，另含`ids_only`模式與服務範圍篩選 |
| 備份檔完整性三項檢查未回報；下次備份才含新表 | 資安 | Patrick | — | — | 10/2備份5.56MB於15:00前完成，**不含**之後新增的`company_tax_industry`與`company_field_log`（下次備份才會有）。完整性檢查（結尾標記、`CREATE TABLE public.`應20張、關鍵表COPY）PPC未回報，選做 |
| `anon`與`authenticated`的SELECT授權盤點 | 資安 | Patrick | Patrick | — | 10/5寫入類已收斂；10/2原計畫「連同SELECT一起處理」未做。需先列出網站API實際讀取的表（`solutions`／`companies`／`cases`／`industry_codes`／`maintenance_activity`等），再決定其餘內部表是否收回SELECT |
| repo存檔待補：v1.1原始碼、台→臺遷移檔 | 專案管理 | Patrick | — | — | 10/5：`supabase/functions/sf-mcp/index.ts`仍為v1.0.4，需以`sf-mcp_index_v1.1.0_PREPARED_未部署.ts`覆蓋（雜湊`9ff1f4be00e46d79`）；`migrations/20261002_normalize_city_taiwan.sql`待上傳（檔內已註明實際執行日10/5） |
| PR #202：方案探索頁SOL-0005真實Preview截圖未取得 | 前端 | Patrick | — | — | 10/5：方案探索頁無名稱搜尋入口，Codex以本機fixture補驗，並在SYNC中標明「非Preview截圖」；首頁兩筆（SOL-0005正向、SOL-0911反向）為真實Preview。正式站有機會遇到時順手確認即可 |

---

# 2026-10-05

1. **台→臺統一**：10/2補縣市時用稅籍的「臺」，網站原有為「台」，同一城市拆成兩種寫法；PPC決定以官方「臺」為準，409家由「台」改「臺」，PPC在SQL Editor執行，獨立驗證7/7
2. **PR #201（儀表板「資料維護」區塊）merge並於正式站驗收**：數字正確；PPC發現字級與日期位置不一致
3. **PR #156分支過期**：短期不merge，保留紀錄
4. **組長MCP實測回饋**：「劉姥姥進大觀園」——想很久、已下架解釋過多；讀完MCP規格Tools頁，整理改進方向A～H
5. **交接清冊v12**（舊視窗圖片上限，換新視窗）
6. **MCP v1.1部署**（PPC於Dashboard手動貼檔）：`whoami`=1.1.0、`data_status`總數不變；PPC已重連並把8個工具設Always allow
7. **收回`anon`對13個物件的寫入類授權**：單一交易自檢＋交易外獨立驗證，只剩問卷表INSERT
8. **PR #202 merge**：資料維護列樣式統一（日期移右）、「免費試用」→「提供試用」、稅籍徽章圖示`fa-code`→`fa-desktop`

<details>
<summary>展開細節</summary>

**台→臺統一**：分布（改前）臺北市172／台北市322、臺中市55／台中市76、臺南市23／台南市9、臺東縣1／台東縣2。單一交易：先寫`company_field_log`留痕→`UPDATE companies SET city = replace(city,'台','臺')`→`ROW_COUNT`與預期比對→檢查無「台」殘留。獨立驗證：含「台」0、公司總數1,103、region空167、city空168、留痕409、臺北市494／臺中市131／臺南市32／臺東縣3、前台可見2,268、`maintenance_activity(7)`公司不重複898。網站`normalizeCity()`會把臺轉成台做統計，儀表板不受影響。⚠️留痕`reason`字串誤寫「2026-10-02 縣市寫法統一…」，實際`changed_at`為10/5；審計紀錄只增不改，以時間戳記為準。遷移檔`20261002_normalize_city_taiwan.sql`已在檔頭註明實際執行日

**PR #201審查與驗收**：以codeload下載`refs/pull/201/head`審查，函式10項測試過、失敗隔離、僅`textContent`、CSP `style-src`含`'unsafe-inline'`；merge後main與審查版逐位元組相同。正式站：方案校正39、公司資料補充898、列表`10/05 公司所在地 409 家`／`10/02 公司所在地 346 家`／`10/02 稅籍登記主業 849 家`／`09/30 方案狀態與名稱校正 39 筆`；既有案例+0／85、方案+0／2,268、公司+0／1,102不變。7天滾動窗口，約10/7中午後9/30那列滾出屬正常

**PR #201樣式問題（審查漏網）**：列只套外框`.update-item`（只管flex、間距、分隔線），文字直接塞進外框，沒套內層`.update-item-name`（14px、800、`#0f172a`），因此退回瀏覽器預設約16px、400。字型家族相同（body統一設定），看起來像換字型是因為字級與粗細不同。我審查時檢查了函式、失敗隔離、`textContent`、CSP，**沒有拿新元件和旁邊既有元件的結構對照**；這類視覺問題看diff難發現，需看畫面

**組長MCP回饋與日誌**：三題（台北市有AI方案的業者幾家／台北市POS廠商與方案list／高雄岡山車用底盤模具商預算20萬行銷建議）。約17:44–17:56十二分鐘約660次請求（約330次工具呼叫），尖峰106次／分，平均1.0–1.5秒。根因：搜尋只能篩北中南東、結果無縣市→Agent逐筆`get_solution`查城市；`get_solution`內部6次查詢；`describe_data`11節很長；`notes`與`describe_data`寫「引用時請標註」→已下架解釋冗長。Agent做得好的：說明城市是公司所在地、標疑似下架原因、抓到摘要與名稱不符（亞路科技「AI賦能智慧POS」摘要是健身房系統）。暴露資料問題：SOL-MOE-0518無公司編號（205筆同類）

**MCP改進方向（讀MCP規格2025-11-25 Tools頁後整理；Prompts與`instructions`欄位未查證，標待驗證）**：A 使用端Skill（路由表、回答格式、已下架一行原則、數字附定義，放repo版控）／B 伺服器瘦身（`notes`分級、`summary_line`、`status_scope`、`describe_data`分`topic`）／C 部署v1.1（已完成）／D `outputSchema`＋`structuredContent`＋`title`（客戶端是否利用需實測）／E 錯誤與0筆回`isError`＋`next_step`／F 限流（規格MUST）／G Prompts、`instructions`待驗證／H 資料側治本（205筆無公司編號、摘要名稱不符、重複列95組）。順序：v1.1→組長重測→A＋5條守則→v1.2一次包B＋D＋E→F

**MCP v1.1部署**：Supabase Dashboard→Edge Functions→`sf-mcp`→Settings確認「Verify JWT with legacy secret」**關閉**（驗證在函式內；權杖由Supabase Auth OAuth以ES256簽發，非legacy secret）→Code貼上v1.1（671行，雜湊`9ff1f4be00e46d79`）→Deploy updates。部署確認視窗「cannot be rolled back automatically」＝沒有一鍵還原；手動回滾來源為repo `supabase/functions/sf-mcp/index.ts`（v1.0.4，與線上版10/2逐位元組核對過）。驗證：`whoami` `server_version`=1.1.0；`data_status` 2,487／正常1,080／疑似1,188／已下架219／前台2,268／公司所在地未填291，10個來源逐項與部署前相同。PPC重連後8個工具（新增`search_companies`、`get_solutions`）皆設Always allow。v1.1內容：`city`篩選（台／臺互通）、`search_companies`、`get_solutions`（批次≤20）、查詢平行化、`describe_data`加清單任務做法；不需DB改動

**為什麼重連要重設Always allow**：工具權限有Always allow／Needs approval／Blocked三種；Needs approval是**每次工具呼叫**都要人工確認，不是每次連線一次。一個問題會被Agent拆成N次呼叫（組長那題約330次），沒設就要確認N次，漏按一次請求就不會送達（10/1第二次搜尋未送達即此原因）。重連時claude.ai重讀工具清單、權限回預設；舊工具權限是否保留未驗證，實務上重連後逐一檢查

**收回anon寫入授權**：事前查證（main的`api/`與`public/`）：`solutions.js`／`companies.js`／`cases.js`／`stats.js`用anon只讀；`stats.js`的`maintenance_activity`是POST呼叫RPC（EXECUTE），不是寫表，且為`SECURITY DEFINER`；`company-detail.js`、`csp-report.js`用service_role；`feedback.js`寫Airtable；前端無直接寫Supabase。盤點查詢（`information_schema.role_table_grants`，grantee=anon、privilege_type IN INSERT/UPDATE/DELETE/TRUNCATE）14列＝13物件四種全有＋`pm_survey_responses`僅INSERT。執行`BEGIN; REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON <13物件> FROM anon; DO $$ 自檢剩餘=1且問卷INSERT=1 $$; COMMIT;`→Success；另開執行盤點查詢→只剩`pm_survey_responses｜INSERT`。回滾語句：`GRANT INSERT, UPDATE, DELETE, TRUNCATE ON <13物件> TO anon;`

**PR #202（Fix dashboard maintenance styling, trial label and tax badge icon）**：規格書`codex_規格書_儀表板資料維護樣式_提供試用_稅籍圖示_2026-10-05.md`。①資料維護列改為`update-item` > `update-item-main` > `update-item-name`（`${label}　${count} ${unit}`）＋`update-item-meta` > `update-item-time`（`MM/DD`），空／錯誤狀態改用`update-item-company`，全部`createElement`＋`textContent`，CSS未動 ②`index.html`第107行label「提供試用」③稅籍徽章`fa-code`→`fa-desktop`共3處（`index.html`第1513、1620行、`manufacturing.html`第998行）。PPC看到`</>`以為是程式出錯→看候選Demo（laptop／desktop／server／network-wired／briefcase／無圖示）後選`fa-desktop`。**第一輪Codex只做了①②**：拿到加入③之前的舊版規格書；從SYNC檔名（舊版指定的名稱）即可看出。改為在同一分支追加③、改PR標題。最終審查：③三處僅`code`→`desktop`、`fa-code`=0／`fa-desktop`=3、`dashboard.html`與上一輪審過版本逐位元組相同；merge後main三個HTML與審查版逐位元組相同。驗收對照：SOL-0005（104企業大師人資管理，`it_code_rank`=1，稅籍主業入口網站經營）顯示徽章；SOL-0911（思偉達，`it_code_rank`=2）只顯示稅籍主業。Codex本機fixture截圖中SOL-0911顯示「未標示來源」是fixture未填來源欄位所致（`manufacturing.html`第1972行`item.src || item.p || "未標示來源"`），非正式站問題

</details>

**本日教訓**
- 審查新UI元件時，要拿它和**旁邊既有元件的結構**對照，不只看功能與安全；視覺一致性需看畫面
- 動共用基礎設施（權限）之前，先留「改之前」的狀態（盤點結果、截圖）
- 「沒有自動回滾」不等於「不能回滾」：關鍵是手上有沒有改之前的完整狀態（repo原始碼、留痕、GRANT語句）
- **SYNC檔名是規格版本的指紋**：規格改版後，收到回報先對檔名
- fixture只能驗證餵進去的欄位；沒餵的欄位不能當證據
