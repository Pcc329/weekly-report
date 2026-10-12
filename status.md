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
| 資料海巡稽核頻率制度化：每週輕量檢查＋每月完整稽核 | 資料品質 | Patrick | Patrick | 每週五 | 9/29定案；9/30產出SOP v3（第七節稽核節奏、第十節比對方法與陷阱，並更正一處成因錯誤）與稽核log（補登9/21、新增9/30段落、每週檢查基準表），~~待上傳`sop/`目錄~~ 10/1已確認上傳（SOP含v3與逐筆驗證範例、稽核log含任務C結果，根目錄誤放的副本已移除）；首次例行輕量檢查排10/2（五）；10/9因休假未做，本週補 |
| ~~MCP v1.0.2 驗收第4題補測（高雄飯店）~~ | 後端 | Patrick | — | — | **10/2通過**：工具權限改為Always allow後重跑，日誌顯示07:43連續10個請求全200、版本5，兩次搜尋都送達；Claude不設region、拆短詞「入住」「評論」分次搜尋，取交集得`SOL-0911`；引用`page_summary`的數字（23筆、前15筆11正常／4疑似）與資料庫完全一致。v1.0.2驗收4／4完成 |
| ~~MCP v1.0.3：`matches_industry_keyword`旗標、`page_summary`伺服器端統計、`ids_only`模式~~ | 後端 | Patrick | Patrick | — | **10/2已部署v1.0.3（Edge Function第5版）**：`page_summary`（正常／疑似／未填地區／在名冊／命中產業詞由伺服器計算）、`matches_industry_keyword`、稅籍欄位（`tax_primary_industry`、`it_code_rank`、get_solution的`tax_industries`）、describe_data新增第八節。**未改工具參數，不需重新連線**。`ids_only`改列v1.1與服務範圍篩選一起；**同日再部署v1.0.4**（Edge Function第6版）：修正獲獎少報——官網「獲獎肯定」來自`awards`（公司層級），MCP原只讀`solutions.has_award`，有效方案中49筆vs272筆。新增搜尋結果`has_company_award`／`company_award_count`／`company_award_best_level`與`get_solution`的`company_awards`，`describe_data`第九節說明。未改工具參數，不需重新連線。官網另有「資安CDM分類」「案例實績佐證」「跨N種計畫」三個信任訊號MCP尚未帶，列v1.1評估 |
| ~~Codex：稅籍主業標示（只標示不排序）~~ | 前端 | Patrick | Patrick | — | **10/2完成**：PR #200 merge並於正式站驗證——思偉達卡片顯示「稅籍主業：電腦及電腦週邊設備批發」且無資服標籤（rank 2）、搜尋「客服」仍251筆、排序未變；審查時確認3檔改動、`escapeHtml`、匿名身分可讀新欄位（1,103家全讀得到）、與#199三方合併0衝突。Codex多補了`api/solutions.js`的資料列→公司物件對應（規格書漏列，必要） |
| 組長連線SF資料庫MCP（驗收項目d）＋v1.1重測 | 專案管理 | Patrick | Patrick | — | ~~10/2邀請信已備妥~~ 組長已連線並實測（10/2–10/5，三題真實問題）。**10/5 v1.1已部署**，待組長Disconnect→Connect、8個工具重設Always allow，用同一題「臺北市有POS系統的廠商與方案」重測，回報耗時與呼叫次數（v1.0.4時約330次工具呼叫，v1.1預估降到個位數，**以實測為準**）。驗收項目d（`whoami`日誌確認為她的user id）仍待。擴大到全組PM前須確認資策會對「個人帳號存取內部資料庫」的規範（目前無） |
| 稅籍名冊比對匯入後續：3家登記地與SF city不同、254家不在名冊、排序分三階段 | 資料品質 | Patrick | Patrick | — | 10/2已完成資料庫第一階段與前端「標示」階段（PR #200）；排序仍未動。待決：①`22023793`／`50767268`／`83764072`的SF city（高雄／台南／彰化）與稅籍登記地（新北／臺北）不同，疑為營運據點vs登記地，**未覆蓋**；②254家不在名冊，建議用財政部開放資料最新月檔補查；③排序：先標示→平手加分→加權，權重由Alex／組長拍板 |
| ~~儀表板「近期更新」新增「資料維護」區塊（Codex）~~ | 前端 | Patrick | Patrick | — | **10/5完成**：PR #201 merge，正式站驗收數字正確（方案校正39、公司補充898、列表4行，既有+0／2,268、+0／1,102不變）；PPC發現列表字級與其他區塊不一致、日期在左，由PR #202修正（以「最新寫入項目」為模板，日期移右）並merge |
| ~~收回`anon`對12張內部表的寫入類授權~~ | 資安 | Patrick | Patrick | — | **10/5完成**（PPC核准、PPC在SQL Editor執行）：`REVOKE INSERT, UPDATE, DELETE, TRUNCATE ... FROM anon`共13個物件——`companies_public`（視圖）、`company_cdm_categories`、`csp_violations`、`data_sources`、`gov_registrations`、`industry_codes`、`program_promotions`、`program_sources`、`solution_reviews`、`solution_status_log`、`source_monitoring_checks`、`source_monitoring_targets`、`users`；保留`pm_survey_responses`的INSERT。單一交易內自檢（剩餘寫入授權=1）通過，交易外獨立驗證只剩`pm_survey_responses｜INSERT`。事前查證網站無anon寫入路徑（讀取類API用anon、`csp-report.js`與`company-detail.js`用service_role、`feedback.js`寫Airtable）。SELECT授權未處理，另列P2 |
| Airtable退場階段1：三條紀錄寫入遷移、移除API的Airtable分支、確認Vercel環境值 | 後端 | Patrick | Patrick | — | 10/1評估（見當日細節）：`api/ask.js`（Ask_Logs）、`api/claude.js`（Search_Logs）、`api/feedback.js`僅寫Airtable，無Supabase路徑；`solutions`／`companies`／`stats`／`cases`四支有`DB_SOURCE_*`雙來源切換，預設`airtable`。~~待PPC確認Vercel正式環境值~~ **10/2確認首頁累計方案2,268＝Supabase**，`DB_SOURCE_SOLUTIONS`確定為supabase（companies／cases合理推斷同），前提成立；另Airtable Companies匯出僅871家（Supabase 1,103），Airtable已落後。待寫Codex規格書。PPC決定三步驟：①移轉Supabase ②Airtable備著 ~~③移除另兩位使用權、只留PPC（約US$20／月）~~ **③10/12確認已完成**：10/3扣款Airtable月費NT$764（1人），9/3為NT$1,517（2人），現只剩PPC一個管理者席位。①仍待：Ask_Logs／Search_Logs／feedback三條寫入遷移。不要降到免費方案（筆數上限）；遷移完成後做一次最終完整匯出並撤掉或改唯讀`AIRTABLE_TOKEN` |
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
| 每週輕量檢查基準缺口：雲市集工業館只看了三頁之一 | 資料品質 | Patrick | — | ~~10/9~~ 本週 | 10/2首次輕量檢查發現`data_sources`登記工業館有三頁（SRC-003 AI工具庫方案、SRC-004 Lite版、SRC-005 雲端解決方案），基準只看SRC-005（111／10頁，+5）；139筆疑似來自SRC-003、SRC-004為6月39→8月126。資料庫329筆全無網址無法對應頁面，完整稽核須三頁合併清單以正規化名稱比對。下週先補另兩頁基準，再排完整稽核 |
| ~~商業服務業專區117家名單所屬系列未記錄~~ | 資料品質 | Patrick | Patrick | — | **10/2結案**：117筆＝「提升商業服務業營運效能強化韌性計畫（個案補助－單店導入）AI解決方案入選名單」（服務提供者上架的有標價方案，非整合型補助的店家名單）。證據：Chrome比對14家公司全在`service-ai.php`提供者名單、整合型第三梯16家與本庫0家重疊；我補：第一梯名單PDF前20筆19筆在本庫、`SOL-BIZ-0001`起依PDF序號排列。`data_sources` SRC-002已補計畫名稱／年度／執行單位，並移除貼錯的工業館計畫頁網址。**未完成**：第二梯（7/15公告）逐筆比對、網站約300筆而本庫僅117筆（在精不在多，不擴充，但要記錄覆蓋範圍）、第三梯受理至10/20後的新名單追蹤 |
| 政府軟體採購網基準建立：本庫100筆為同仁挑選子集，與網站總數不可比 | 資料品質 | Patrick | — | — | 10/2：網站套裝軟體5,804／雲端服務36／資安健診27；本庫100筆（資安合規67等）7/21由III同仁提供、81筆無網址。每週只看存活與最新消息日期 |
| ~~舊空專案`Pcc329's Project`與9/10演練測試專案~~ | 資安 | Patrick | — | — | 10/2兩者皆已刪除。空專案查證：Storage下載為22 bytes空zip；Resume後0張資料表、0使用者、Storage從未初始化、9.7MB系統基本大小，repo無引用。組織只剩正式站，12月季度演練有名額 |
| 備份SKILL改進：密碼寫在指令裡會進PowerShell歷史；歷史參考數字缺9/24與10/2 | 資安 | Patrick | — | — | 10/2週備份5.56MB（9/10為5.01MB，+11%合理：csp_violations 433筆、兩輪稽核留痕、MCP表）。建議改用環境變數或備份後清除歷史；SKILL為PPC外掛，由PPC更新；10/12：歷史參考數字待補10/2 5.56 MB、10/12 6.30 MB，完整性三項檢查指令可一併寫入SKILL |
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
| ~~備份檔完整性三項檢查未回報；下次備份才含新表~~ | 資安 | Patrick | — | — | **10/12完成**：`backup_20261012.sql` 6.30 MB；結尾標記1、`CREATE TABLE public.` 22張（10/2的20張＋`company_tax_industry`、`company_field_log`）、`companies`／`solutions`／`company_field_log`／`company_tax_industry`的`COPY`皆在。22張作為下次比對基準 |
| ~~Claude API Credit餘額確認~~ | 後端 | Patrick | — | — | **10/12查證結案**：Console餘額US$11.00、自動儲值開啟（低於$5補到$20）。Invoice history：4/24 US$10、6/1 US$20、6/17 US$20（另5/1免費US$0.07），對應費用表301＋629＋629＝1,559，**6月後無自動扣款、無漏記**（費用表把6/1那筆記為5月，金額一致）。本月用量US$0.04、近7天15K tokens |
| 方案探索使用量極低（10月僅約2次） | 專案管理 | Patrick | Alex | — | 10/12：Anthropic Console本月花費US$0.04，以8/14實測單次約NT$0.6（≈US$0.02）換算約2次搜尋。是產品使用度訊號而非費用問題；可與PM需求調查一併檢視（同仁實際需要什麼、為何不用）。注意：Console只算API呼叫，看不到未觸發AI的一般搜尋 |
| ~~Codex檔案交付流程首次實測~~ | 專案管理 | Patrick | — | — | **10/12完成**：`codex_delivery_20261012_sop_v2.zip`成功push（`2e494be`），Claude獨立核對通過。weekly-report本機clone：`C:\Users\S25036\Documents\Codex\repos\weekly-report`。solution-finder本機路徑尚未補入SOP 4-0，首次以交付包更新solution-finder前確認 |
| `anon`與`authenticated`的SELECT授權盤點 | 資安 | Patrick | Patrick | — | 10/5寫入類已收斂；10/2原計畫「連同SELECT一起處理」未做。需先列出網站API實際讀取的表（`solutions`／`companies`／`cases`／`industry_codes`／`maintenance_activity`等），再決定其餘內部表是否收回SELECT |
| repo存檔待補：v1.1原始碼、台→臺遷移檔 | 專案管理 | Patrick | — | — | 10/5：`supabase/functions/sf-mcp/index.ts`仍為v1.0.4，需以`sf-mcp_index_v1.1.0_PREPARED_未部署.ts`覆蓋（雜湊`9ff1f4be00e46d79`）；`migrations/20261002_normalize_city_taiwan.sql`待上傳（檔內已註明實際執行日10/5） |
| PR #202：方案探索頁SOL-0005真實Preview截圖未取得 | 前端 | Patrick | — | — | 10/5：方案探索頁無名稱搜尋入口，Codex以本機fixture補驗，並在SYNC中標明「非Preview截圖」；首頁兩筆（SOL-0005正向、SOL-0911反向）為真實Preview。正式站有機會遇到時順手確認即可 |

---

# 2026-10-12

1. **休假返回開工掃描**（10/6～10/11休假）：`solution-finder` main與10/5 merge PR #202後相同、無新commit；SF MCP線上v1.1.0，`data_status`總數2,487／正常1,080／疑似1,188／已下架219／前台2,268，與10/5相同
2. **週備份補做**：`backup_20261012.sql` 6.30 MB，完整性三項檢查通過，已存OneDrive
3. **補10/5那週週報與status封存**

<details>
<summary>展開細節</summary>

**休假期間漏掉的例行工作**：10/9週備份（最後一次為10/2，10/5的台→臺409家與anon授權收回不在任何備份中，10/12補做後已涵蓋）、10/9每週輕量檢查與雲市集工業館兩頁基準、10/9週報與status封存。

**週備份**：照SKILL固定指令（pooler端點、`$env:USERPROFILE`完整路徑）。PowerShell開在`C:\WINDOWS\system32`仍成功，因為輸出用完整路徑。大小6.30 MB，比10/2的5.56 MB多0.74 MB（+13%），對應10/2下午後新增的`company_tax_industry`與`company_field_log`（約1,950筆留痕）。完整性：`Select-String "PostgreSQL database dump complete"` Count=1；`^CREATE TABLE public\.` 22；`^COPY public\.(company_field_log|company_tax_industry|companies|solutions) ` 4行皆在。

**費用（週報第七節）**：沿用8/14分類——資料庫營運費用只計Airtable（未來含Supabase／CDN／Vercel），Claude、OpenAI／Codex訂閱屬AI開發工具費用、不計營運成本。10月：營運764（Airtable 1人，9月2人1,517）＋開發3,868（Claude 3,178改Max方案、OpenAI 690）＝4,632。截至9/9分類累計驗算＝28,726（Airtable 15,134／Claude 3,986／OpenAI 4,897／API Credit 1,559／Crunchbase 3,150）。三項皆月付、9月三筆（9/3、9/8、9/9）已含在28,726，9/10～9/30無訂閱付款，累計至10/12為33,358（資料庫使用15,898／開發12,751／AI推論1,559／一次性採購3,150）。原總覽列「其他非營運項目」會誤導：API Credit是隨使用量成長的營運性成本，改為「AI推論費用（隨使用量成長）」與「一次性採購」兩類分列。9/11週報只列平表，未沿用分類，本次修正。

**API Credit**：Console餘額US$11.00、自動儲值開啟；Invoice三筆（4/24 $10、6/1 $20、6/17 $20）＝費用表1,559，無漏記；本月US$0.04≈2次方案探索。原先「6月後未儲值、用完會停止」的判斷前提不成立（未考慮自動儲值），已在週報更正。

**Airtable退場第三步完成**：PPC確認只剩自己一個管理者席位。

**repo存檔完成**：`solution-finder`的`supabase/functions/sf-mcp/index.ts`更新為v1.1（`9ff1f4be00e46d79`，＝線上版）、新增`migrations/20261002_normalize_city_taiwan.sql`；`weekly-report`四檔。皆以codeload逐位元組核對。上傳過程卡三次（拿到舊版、貼上未commit、`migrations/`內又打`migrations/`）。

**Codex檔案交付SOP v1**（`sop/codex-delivery-sop.md`）：上述三次錯誤的共通點是都靠人眼判斷，改為Claude產出交付包（zip第一層為repo名、MANIFEST含動作與SHA-256、內附CODEX_PROMPT.md），Codex依雜湊比對後commit（weekly-report直接main、solution-finder開PR），Claude以codeload獨立核對；Codex無權限或失敗時轉手動。PPC觸發說法：「產出CODEX更新」。本SOP即以交付包實測：`_sop.zip`三次停在第1步（「週報更新」資料夾非git clone；clone至`Documents\Codex\repos\weekly-report`後，shell的`Get-Location`仍為`OneDrive…\ChatGPT\weekly-report`空repo，兩次），皆無副作用；SOP改v1.1（4-0本機路徑表、git一律`git -C <絕對路徑>`），`_sop_v2.zip`成功，commit `2e494be`，Claude以codeload逐位元組核對兩檔一致、無其他變更。⚠️「shell預設在OneDrive資料夾」為推測（可能為`$PROFILE`的`Set-Location`），Codex未回報第0步結果，待下次交付確認。

**封存**：`report.md`（10/5～10/9）同時存為`report/report-2026-10-09.md`；10/5版status.md存為`status/status_20261005-1009.md`。該週只有10/5一天。

</details>
