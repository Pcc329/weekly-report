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
| PR #156（API身分驗證Phase2）~~已就緒~~ 分支已過期，待復工決策 | 資安 | Patrick | Patrick | — | ~~規格/實作/審查皆已完成，PPC決定延後……狀態為「準備階段」：下次重啟工作時只需決定直接merge、或先調整後再上線，不需要重新規劃/重新審查~~ **10/5更正**：分支落後main（缺#173／#174／#199／#200／#201／#202），已不能直接merge；PPC決定短期不merge、保留紀錄。復工須先rebase跟上main並**重新審查**。13組帳號仍有效。⚠️「API身分驗證」仍是最高優先、尚未解決的資安項目。10/14看板SOL-6（公開Issue #179）標題改泛稱「資安加固項目D」。**10/15**：聯絡資訊卡開放email／手機後（PR #257），全站共用`SITE_PASSWORD`（session 7天、無個別帳號、無存取紀錄）成為聯絡資料唯一的存取控制，此項重要性提高 |
| ~~篩選面板熱門篩選chip（官方認證供應商／免費試用）套用標籤未顯示~~ | 前端 | Patrick | — | — | ~~規格已交付~~ PR #172（9/23完成）於9/24驗收並merge |
| ~~「返回首頁」按鈕語意與行為不符~~ | 前端 | Patrick | — | — | 9/18舊規格未實作，~~本次縮小範圍先修主題區詳情頁連結＋全站Logo兩處，規格已交付~~ PR #169/#170/#171已於9/23 merge（含搜尋結果頁返回按鈕改版與文字統一）；方案詳情頁返回鈕、popstate分支另案處理。**10/13結案（看板SOL-8）**：查main程式碼——主題區「返回首頁」與全站Logo為`resetToHome`（PR #169）、搜尋結果頁返回已改版（#170／#171）；方案詳情頁按鈕文字為「返回搜尋結果」、行為為退一步（`goBackInApp`），語意與行為一致，**本來就不是bug**。唯一未處理：瀏覽器上一頁退回首頁時popstate的else分支只清空搜尋字、未清空篩選與排序，影響小，依在精不在多不另開卡片，有人反映再處理 |
| ~~Supabase advisor新增一項RLS policy警示待查證~~ | 資安 | Patrick | — | — | ~~需確認該policy屬讀取或寫入權限~~ 9/24已修正：`source_monitoring_checks`的公開INSERT權限為8/20海巡v1腳本試跑遺留（僅1筆資料），已移除；`source_monitoring_targets`僅開放SELECT，無相同問題 |
| weekly-report為public repo，status.md含資安處理細節 | 資安 | Patrick | Patrick | — | 9/24發現；9/29已評估三個方向（private+付費/改寫法/換平台加密碼），PPC確認「必須記錄細節」排除改寫法，其餘兩個方向暫緩，優先度讓給看板功能，待之後有餘裕再處理 |
| ~~「跨N種計畫」將非政府來源計入公部門計畫參與~~ | 後端 | Patrick | — | — | 9/29發現：`api/solutions.js`計算`pgc`／`pgList`時納入所有`program_type`，包含非政府平台的「資策會產業調查」（原領域型調查），導致公部門計畫參與度高估，屬語意膨脹；待開規格書，需決定排除清單（至少排除資策會產業調查）；10/2提醒：來源已改名，排除清單須使用新名「資策會產業調查」。**10/13完成（PR #204）**：判斷標準改為「出現在該來源能否佐證通過某政府計畫審核」，`api/solutions.js`新增**允許清單**`PROGRAM_EVIDENCE_SOURCES`（臺灣雲市集、雲市集工業館、新創嚴選網、商業服務業專區、農業雲市集-數位館、新北產業AI化輔導計畫；1,751／2,268筆）；不計入SME AI平台（網站無法證明隸屬計畫）、政府軟體採購網（採購資格非計畫）、資策會產業調查、案例反推補建。新來源預設不計入。影響：有徽章公司179→129（50家消失、70家數字變小） |
| ~~「領域型調查(人工搜查)」統一改名為「資策會產業調查」~~ | 資料品質 | Patrick | Patrick | — | **10/2完成**：PR #199 merge並部署後，資料庫改名（`solutions` 133筆、`program_sources` 1筆、`data_sources` SRC-013 1筆，單一交易含筆數檢查），驗證新名133／舊名0、全庫2,487與前台可見2,268不變；官網來源篩選132筆（133筆含1筆已下架）。遷移檔`20261002_rename_iii_industry_survey.sql`已存檔。待PPC看一眼詳情頁的「非政府審核」揭露說明與`sources.html`顯示數字 |
| 資料海巡稽核頻率制度化：每週輕量檢查＋每月完整稽核 | 資料品質 | Patrick | Patrick | 每週五 | 9/29定案；9/30產出SOP v3（第七節稽核節奏、第十節比對方法與陷阱，並更正一處成因錯誤）與稽核log（補登9/21、新增9/30段落、每週檢查基準表），~~待上傳`sop/`目錄~~ 10/1已確認上傳（SOP含v3與逐筆驗證範例、稽核log含任務C結果，根目錄誤放的副本已移除）；首次例行輕量檢查排10/2（五）；10/9因休假未做，本週補；**10/14補做第二次例行檢查**（瀏覽器，只讀取）：新創嚴選+1、農業雲市集+2，兩者觸發提前完整稽核（另列P1），詳見當日 |
| ~~MCP v1.0.2 驗收第4題補測（高雄飯店）~~ | 後端 | Patrick | — | — | **10/2通過**：工具權限改為Always allow後重跑，日誌顯示07:43連續10個請求全200、版本5，兩次搜尋都送達；Claude不設region、拆短詞「入住」「評論」分次搜尋，取交集得`SOL-0911`；引用`page_summary`的數字（23筆、前15筆11正常／4疑似）與資料庫完全一致。v1.0.2驗收4／4完成 |
| ~~MCP v1.0.3：`matches_industry_keyword`旗標、`page_summary`伺服器端統計、`ids_only`模式~~ | 後端 | Patrick | Patrick | — | **10/2已部署v1.0.3（Edge Function第5版）**：`page_summary`（正常／疑似／未填地區／在名冊／命中產業詞由伺服器計算）、`matches_industry_keyword`、稅籍欄位（`tax_primary_industry`、`it_code_rank`、get_solution的`tax_industries`）、describe_data新增第八節。**未改工具參數，不需重新連線**。`ids_only`改列v1.1與服務範圍篩選一起；**同日再部署v1.0.4**（Edge Function第6版）：修正獲獎少報——官網「獲獎肯定」來自`awards`（公司層級），MCP原只讀`solutions.has_award`，有效方案中49筆vs272筆。新增搜尋結果`has_company_award`／`company_award_count`／`company_award_best_level`與`get_solution`的`company_awards`，`describe_data`第九節說明。未改工具參數，不需重新連線。官網另有「資安CDM分類」「案例實績佐證」「跨N種計畫」三個信任訊號MCP尚未帶，列v1.1評估 |
| ~~Codex：稅籍主業標示（只標示不排序）~~ | 前端 | Patrick | Patrick | — | **10/2完成**：PR #200 merge並於正式站驗證——思偉達卡片顯示「稅籍主業：電腦及電腦週邊設備批發」且無資服標籤（rank 2）、搜尋「客服」仍251筆、排序未變；審查時確認3檔改動、`escapeHtml`、匿名身分可讀新欄位（1,103家全讀得到）、與#199三方合併0衝突。Codex多補了`api/solutions.js`的資料列→公司物件對應（規格書漏列，必要） |
| ~~組長連線SF資料庫MCP（驗收項目d）＋v1.1重測~~ | 專案管理 | Patrick | Patrick | — | ~~10/2邀請信已備妥~~ 組長已連線並實測（10/2–10/5，三題真實問題）。**10/5 v1.1已部署**，待組長Disconnect→Connect、8個工具重設Always allow，用同一題「臺北市有POS系統的廠商與方案」重測，回報耗時與呼叫次數（v1.0.4時約330次工具呼叫，v1.1預估降到個位數，**以實測為準**）。驗收項目d（`whoami`日誌確認為她的user id）仍待。擴大到全組PM前須確認資策會對「個人帳號存取內部資料庫」的規範（目前無）。**10/13已寄重測信**（主旨「【請協助】SF資料庫 v1.1 重測（同樣三題，約 15 分鐘）」）：請組長重連、8工具Always allow、對話開頭貼提示讓Claude每題附「查詢紀錄」（工具與次數，不估算）、最後呼叫whoami；組長只需回報3項主觀感想（速度、答案品質、已下架說明多寡），時間與次數由Edge Function日誌核對。**10/13重測完成**：三題共15次工具呼叫（第1題10、第2題1、第3題3、whoami 1）；v1.0.4時約330次工具呼叫。whoami確認為組長本人帳號、server_version 1.1.0，**驗收項目d完成**。組長發現兩個問題（列入MCP改進）：①掃描上限300筆使計數題少算——第1題首次查詢只得87家，依資料來源分批合併後約152家，且雲市集工業館單一來源仍超過上限；②關鍵字比對不分B2B／B2C，「行銷」結果偏B2C。速度、答案品質、已下架說明三項主觀感想待組長回覆。10/14已寄v1.2上線通知，主觀感想併入「MCP v1.2後續」追蹤 |
| 稅籍名冊比對匯入後續：3家登記地與SF city不同、254家不在名冊、排序分三階段 | 資料品質 | Patrick | Patrick | — | 10/2已完成資料庫第一階段與前端「標示」階段（PR #200）；排序仍未動。待決：①`22023793`／`50767268`／`83764072`的SF city（高雄／台南／彰化）與稅籍登記地（新北／臺北）不同，疑為營運據點vs登記地，**未覆蓋**；②254家不在名冊，建議用財政部開放資料最新月檔補查；③排序：先標示→平手加分→加權，權重由Alex／組長拍板 |
| ~~儀表板「近期更新」新增「資料維護」區塊（Codex）~~ | 前端 | Patrick | Patrick | — | **10/5完成**：PR #201 merge，正式站驗收數字正確（方案校正39、公司補充898、列表4行，既有+0／2,268、+0／1,102不變）；PPC發現列表字級與其他區塊不一致、日期在左，由PR #202修正（以「最新寫入項目」為模板，日期移右）並merge |
| ~~收回`anon`對12張內部表的寫入類授權~~ | 資安 | Patrick | Patrick | — | **10/5完成**（PPC核准、PPC在SQL Editor執行）：`REVOKE INSERT, UPDATE, DELETE, TRUNCATE ... FROM anon`共13個物件——`companies_public`（視圖）、`company_cdm_categories`、`csp_violations`、`data_sources`、`gov_registrations`、`industry_codes`、`program_promotions`、`program_sources`、`solution_reviews`、`solution_status_log`、`source_monitoring_checks`、`source_monitoring_targets`、`users`；保留`pm_survey_responses`的INSERT。單一交易內自檢（剩餘寫入授權=1）通過，交易外獨立驗證只剩`pm_survey_responses｜INSERT`。事前查證網站無anon寫入路徑（讀取類API用anon、`csp-report.js`與`company-detail.js`用service_role、`feedback.js`寫Airtable）。SELECT授權未處理，另列P2 |
| ~~Airtable退場階段1：三條紀錄寫入遷移、移除API的Airtable讀取分支、確認Vercel環境值~~ | 後端 | Patrick | Patrick | — | 10/1評估（見當日細節）：`api/ask.js`（Ask_Logs）、`api/claude.js`（Search_Logs）、`api/feedback.js`僅寫Airtable，無Supabase路徑；`solutions`／`companies`／`stats`／`cases`四支有`DB_SOURCE_*`雙來源切換，預設`airtable`。~~待PPC確認Vercel正式環境值~~ **10/2確認首頁累計方案2,268＝Supabase**，`DB_SOURCE_SOLUTIONS`確定為supabase（companies／cases合理推斷同），前提成立；另Airtable Companies匯出僅871家（Supabase 1,103），Airtable已落後。待寫Codex規格書。PPC決定三步驟：①移轉Supabase ②Airtable備著 ~~③移除另兩位使用權、只留PPC（約US$20／月）~~ **③10/12確認已完成**：10/3扣款Airtable月費NT$764（1人），9/3為NT$1,517（2人），現只剩PPC一個管理者席位。①仍待：Ask_Logs／Search_Logs／feedback三條寫入遷移。不要降到免費方案（筆數上限）；遷移完成後做一次最終完整匯出並撤掉或改唯讀`AIRTABLE_TOKEN`。**10/12①寫入遷移完成**：Supabase新建`ask_logs`／`search_logs`／`feedback_submissions`（RLS、無policy、明確REVOKE anon／authenticated）；PR #203 merge（三支API改service_role寫入、共用`_lib/supabase-insert.js`、錯誤log不含內容）；歷史匯入ask 802、search 1,212（`source='airtable_import'`）；Feedback唯一1筆為測試不搬。**剩**：`solutions`／`cases`／`stats`／`companies`四支API的Airtable讀取分支、`strategy-guide.html`第740行Airtable字樣（另開PR）；之後才能停Airtable訂閱。**10/13讀取分支移除完成（PR #205）**：四支API只讀Supabase、`DB_SOURCE_*`不再被讀取、`strategy-guide.html`頁尾改「資料庫」；main的`api/`／`public/`／`_lib/`中Airtable連線程式碼為0。**網站已與Airtable完全脫鉤**。剩：觀察期至11/12後刪除Vercel的`DB_SOURCE_SOLUTIONS`／`_COMPANIES`／`_CASES`與`AIRTABLE_TOKEN`、停止Airtable訂閱 |
| ~~MCP改進：Skill（A）、v1.2（B＋D＋E）、限流（F）~~ | 後端 | Patrick | Patrick／Alex | — | 10/5組長回饋「劉姥姥進大觀園」：問題想很久、列方案時已下架解釋過多，建議建Skills或加強input／output schema（附MCP規格Tools頁）。整理為A～H八個方向（詳見10/5細節）。**待決三項**：①已下架揭露改「預設一行、被問才展開」（PPC＋Alex）②推薦類只列「正常」由Skill指示`normal_only`、伺服器預設仍與官網一致 ③限流閾值（組長峰值106次／分）。v1.2的B、D、E合併一次發布，讓使用者只重連一次。**10/13組長重測後新增**：G 縣市篩選與廠商計數移到資料庫函式——v1.1為不改資料庫，由Edge Function先取前300筆（`SCAN_CAP`）再篩縣市、再計數，順序是「截斷→篩選→計數」，超過300筆即少算；v1.2改由資料庫在全表完成篩選與`count(distinct company_id)`，順序變為「篩選→計數→截斷」，截斷只影響明細筆數、不影響總數。單純調高上限不是解法（等於每次搬回全部資料，變慢且耗流量）。H 客戶類型（B2B／B2C）欄位另評估，屬資料欄位缺口。v1.2建議一次包含B＋D＋E＋G＋最後使用時間欄位。**10/14三項決策定案、v1.2上線**（PR #256，Edge Function 1.2.0）：①已下架揭露改預設一句帶過、被問才展開（可逆決策，PPC決定，上線通知告知組長）②`normal_only`參數、推薦類由Skill指示帶true ③限流每人30次／分、第一階段只記錄。後續項目另列「MCP v1.2後續」 |
| MCP推廣給資策會內部同仁（進階使用者管道） | 專案管理 | Patrick | 組長／主管 | — | 10/13規劃：網站另設MCP介紹頁（首頁只放入口卡片），內容含與網站的能／不能比較表、設定步驟、範例問題、資料解讀、使用規範、FAQ。**身分規則**：登入email限`@iii.org.tw`或`@isd4.biz`（資策會發放與管理；PPC為委外，用`isd4.biz`），一人一個email、同仁優先`iii.org.tw`。申請資訊：姓名、組別、登入email、使用目的、同意規範。**試辦前**：①組長／主管同意並確認資料留在個人Claude帳號是否可接受 ②向IT確認`isd4.biz`停用時機與發放對象 ③實測兩網域可完成MCP登入 ④PPC與組長白名單改新規則email ⑤查詢頻率上限 ⑥開通／停用SOP ⑦使用規範定稿。**開放前**：⑧記錄每人最後使用時間（免費方案日誌保留期短，季度檢視需此欄，併v1.2）⑨版本更新通知管道 ⑩介紹頁 ⑪範例＋Skill ⑫申請表單 ⑬異常處理流程。治理：開通權限集中於委外人員，建議組長可檢視白名單。**10/14**：⑤限流第一階段（只記錄）與⑧最後使用時間已隨v1.2上線（`sf_mcp_usage`，僅能經`sf_mcp_touch()`寫入本人那一列）；工具名稱改為中文（連接器權限畫面直接顯示），有助推廣 |
| 新創嚴選網完整稽核（10/14輕量檢查146筆，基準145） | 資料品質 | Patrick | — | — | 10/14觸發。+1為淨值，可能同時有新增與下架，須逐筆名稱比對（9/30任務B做法）；資料庫152筆（正常128／疑似16／已下架8） |
| 農業雲市集－數位館完整稽核（10/14輕量檢查77筆，基準75） | 資料品質 | Patrick | — | — | 10/14觸發。9/30為82→75（10筆消失、3筆新出現），本次+2；比照9/30編號比對（Content編號）＋逐筆驗證；資料庫93筆（正常73／疑似1／已下架19） |
| MCP v1.2後續：組長重測、Skill安裝、限流第二階段、v1.2.1小修 | 後端 | Patrick | Patrick | 10/28 | 10/14 v1.2上線後：①組長重測（10/14已寄上線通知，附縣市計數演進圖、架構圖、驗證流程圖；請她重連後開新對話，回報速度、答案品質、已下架說明份量）②`normal_only`尚未真實環境實測（本對話工具清單為舊版，需新對話）③使用端Skill（`docs/sf-mcp-skill/SKILL.md`）尚未安裝到使用者端；回答格式能否落實視組長重測結果 ④限流第二階段：10/28依`sf_mcp_usage`實際分布檢視30次／分是否合理，再決定啟用阻擋（`RATE_LIMIT_ENFORCE`）⑤v1.2.1小修：`summary_line`照抄輸入「台北市」未轉「臺北市」；`describe_data`目錄第五節只截到「需求 → keyword：。」；`sf_search_solutions`空頁不回傳總數與縣市未填數（Codex已在notes揭露） |
| ~~方案詳情頁「聯絡資訊」收合卡（B版）＋`company-detail`開放email／手機~~ | 前端 | Patrick | Alex | 10/15 | 10/15 PPC與Alex討論後同意對登入使用者顯示email／手機（推翻原「只回傳姓名／職稱／公司電話」的最小化設計；MCP欄位授權**不變**）。PR #257（`5194147`→`ebbbbfa`）Claude以實際diff審查通過，**10/15 PPC已merge**。部署專屬網址（`solution-finder-474zc3lal-…`）已確認三種情境正常（遮罩手機→暫無資訊、真實手機可點撥、`#`分機與`mailto:`連結正確）。~~**待**：以正式網域驗證~~ **10/15結案**：PPC於正式網域開啟QbiAI（人工智能，真實手機）詳情頁，聯絡資訊卡與可點撥手機皆顯示，新版API已上線，無需Promote（截圖未含網址列，依PPC操作步驟記錄） |
| contacts手機來源遮罩：346筆為`09XX000000`（74種前綴）；email約19筆無效 | 資料品質 | Patrick | Patrick | — | 10/15發現：563筆手機中346筆後6碼為0，主要出自臺灣雲市集匯入（344筆；平台已停止服務，無法重抓原值），實際可用217筆（32%）。email 667筆中16筆為文字placeholder、19筆不含`@`，實際約648筆（96%）。目前由API層`isMaskedMobile`／`isInvalidEmail`過濾（PR #257 `ebbbbfa`），資料庫未改。**10/15補查`office_phone`**：344筆中空值類（`''`、空白、placeholder）皆為0，但36筆主號碼為同規則遮罩（`^\d{4}0{6}$`，35筆出自臺灣雲市集），實際可用308筆；已由PR #258 `isMaskedOfficePhone`過濾並於正式站確認。**待決**：資料庫標記方式（改NULL／保留原值加狀態欄／原值移紀錄表），依mark-don't-delete與信心程度揭露原則——遮罩值屬「推定無效」，應標記並記錄判斷依據而非直接刪除；分機若用「分機」「ext」等非`#`寫法不會被過濾（只漏不誤殺，影響小） |
| `company-detail`存取紀錄 | 資安 | Patrick | Patrick | — | 10/15：開放email／手機後，任何持有共用密碼者皆可查詢，目前無紀錄可追查（例：廠商反映個資外洩時無法回應）。需新表（時間、`company_id`、IP）＋RLS＋明確REVOKE，依標準先做本機模擬測試。另：PR #257限流為in-memory（各serverless instance各自計數、冷啟動歸零），只是提高撈取成本，不是精確上限 |

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
| ~~每週輕量檢查基準缺口：雲市集工業館只看了三頁之一~~ | 資料品質 | Patrick | — | ~~10/9~~ 本週 | 10/2首次輕量檢查發現`data_sources`登記工業館有三頁（SRC-003 AI工具庫方案、SRC-004 Lite版、SRC-005 雲端解決方案），基準只看SRC-005（111／10頁，+5）；139筆疑似來自SRC-003、SRC-004為6月39→8月126。資料庫329筆全無網址無法對應頁面，完整稽核須三頁合併清單以正規化名稱比對。下週先補另兩頁基準，再排完整稽核；10/13原排上午，被PR #204／#205排擠，延到10/14上午。**10/14完成（看板SOL-34）**：SRC-003 `ai_solution.aspx` 179筆／15頁、SRC-004 `AITools_solution.aspx` 187筆／16頁、SRC-005 111筆／10頁（＝基準）。三頁合計477筆，資料庫329筆；頁面之間可能重複，不可直接相減。完整稽核另列P2 |
| ~~商業服務業專區117家名單所屬系列未記錄~~ | 資料品質 | Patrick | Patrick | — | **10/2結案**：117筆＝「提升商業服務業營運效能強化韌性計畫（個案補助－單店導入）AI解決方案入選名單」（服務提供者上架的有標價方案，非整合型補助的店家名單）。證據：Chrome比對14家公司全在`service-ai.php`提供者名單、整合型第三梯16家與本庫0家重疊；我補：第一梯名單PDF前20筆19筆在本庫、`SOL-BIZ-0001`起依PDF序號排列。`data_sources` SRC-002已補計畫名稱／年度／執行單位，並移除貼錯的工業館計畫頁網址。**未完成**：第二梯（7/15公告）逐筆比對、網站約300筆而本庫僅117筆（在精不在多，不擴充，但要記錄覆蓋範圍）、第三梯受理至10/20後的新名單追蹤。10/14輕量檢查：10/05公告「個案補助－多店升級（第二梯次）」入選名單，屬不同路線，另列P2 |
| 政府軟體採購網基準建立：本庫100筆為同仁挑選子集，與網站總數不可比 | 資料品質 | Patrick | — | — | 10/2：網站套裝軟體5,804／雲端服務36／資安健診27；本庫100筆（資安合規67等）7/21由III同仁提供、81筆無網址。每週只看存活與最新消息日期 |
| ~~舊空專案`Pcc329's Project`與9/10演練測試專案~~ | 資安 | Patrick | — | — | 10/2兩者皆已刪除。空專案查證：Storage下載為22 bytes空zip；Resume後0張資料表、0使用者、Storage從未初始化、9.7MB系統基本大小，repo無引用。組織只剩正式站，12月季度演練有名額 |
| 備份SKILL改進：密碼寫在指令裡會進PowerShell歷史；歷史參考數字缺9/24與10/2 | 資安 | Patrick | — | — | 10/2週備份5.56MB（9/10為5.01MB，+11%合理：csp_violations 433筆、兩輪稽核留痕、MCP表）。建議改用環境變數或備份後清除歷史；SKILL為PPC外掛，由PPC更新；10/12：歷史參考數字待補10/2 5.56 MB、10/12 6.30 MB，完整性三項檢查指令可一併寫入SKILL；10/19：再補10/19 6.58 MB，資料表基準改為26張 |
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
| 205筆有效方案沒有公司編號（約9%） | 資料品質 | Patrick | — | — | 10/2：搜尋結果顯示公司名為空、地區不明、稅籍與獲獎皆查不到（例：「快好評」「AI智慧社群互動」）。需查是公司尚未建檔或編號漏填。10/14：臺北市關鍵字「AI」查詢另有207筆縣市未填而未納入，多數應屬此類 |
| 系統性權限防線：新表預設權限與每月授權稽核 | 資安 | Patrick | — | — | 10/2：Supabase建新表時預設把完整權限給`anon`與`authenticated`，今天兩張新表是手動收回的。建議`ALTER DEFAULT PRIVILEGES`改為最小權限，並在每月稽核加一項「列出anon／authenticated寫入類授權與預期比對」；MCP路徑已實測無任何寫入途徑（見當日細節） |
| MCP信任訊號缺口：資安CDM分類、案例實績佐證、跨N種計畫 | 後端 | Patrick | — | — | 10/2：官網卡片有、MCP未帶；獲獎已於v1.0.4補上。CDM表已對`authenticated`收回SELECT，若要提供需先評估；v1.1依組長測試6的真實問題決定優先序，另含`ids_only`模式與服務範圍篩選 |
| ~~備份檔完整性三項檢查未回報；下次備份才含新表~~ | 資安 | Patrick | — | — | **10/12完成**：`backup_20261012.sql` 6.30 MB；結尾標記1、`CREATE TABLE public.` 22張（10/2的20張＋`company_tax_industry`、`company_field_log`）、`companies`／`solutions`／`company_field_log`／`company_tax_industry`的`COPY`皆在。22張作為下次比對基準 |
| ~~Claude API Credit餘額確認~~ | 後端 | Patrick | — | — | **10/12查證結案**：Console餘額US$11.00、自動儲值開啟（低於$5補到$20）。Invoice history：4/24 US$10、6/1 US$20、6/17 US$20（另5/1免費US$0.07），對應費用表301＋629＋629＝1,559，**6月後無自動扣款、無漏記**（費用表把6/1那筆記為5月，金額一致）。本月用量US$0.04、近7天15K tokens |
| ~~方案探索使用量極低（10月僅約2次）~~ AI功能使用量：方案探索仍有使用、AI顧問問答停用 | 專案管理 | Patrick | Alex | — | **10/12下午更正**：上午以8/14單價（約NT$0.6／次）把Console US$0.04換算成「約2次」是錯的——方案探索AI搜尋（`api/claude.js`）用Haiku、max 300 tokens，單次約US$0.002；Search_Logs顯示10月1–12日**11次**（9月134次），與US$0.04相符。真正停用的是AI顧問問答（`api/ask.js`，Sonnet），最後一筆9/7。使用分布：5–6月測試期集中（ask 793／802、search 925／1,212），之後明顯下降。可與PM需求調查一併檢視 |
| ~~Codex檔案交付流程首次實測~~ | 專案管理 | Patrick | — | — | **10/12完成**：`codex_delivery_20261012_sop_v2.zip`成功push（`2e494be`），Claude獨立核對通過。weekly-report本機clone：`C:\Users\S25036\Documents\Codex\repos\weekly-report`。solution-finder本機路徑尚未補入SOP 4-0，首次以交付包更新solution-finder前確認 |
| Airtable CSV備份與私密檔清理 | 資安 | Patrick | — | — | 10/12：Ask_Logs、Logs、Feedback三份CSV存OneDrive備份資料夾（Airtable停訂閱後即原始資料最後副本）；刪除下載資料夾的`20261012_import_airtable_history_PRIVATE.sql`（含使用者問題內容） |
| Vercel `DB_SOURCE_*`為Secret（不可讀）勿按Save | 資安 | Patrick | — | 11/12後 | 10/13發現三個變數設為Secret，編輯畫面Value顯示空白，按Save會寫入空值。PR #205後程式已不讀取，觀察期後直接刪除；之後非機密的設定值改用Config類型 |
| 6張表RLS開啟但無policy待確認（看板SOL-9） | 資安 | Patrick | — | — | 9/23自舊看板移入，10/13同步看板時補進本表：INFO等級、預設拒絕，確認是否有功能需要anon讀取。10/14看板標題改泛稱「資安加固項目C」（公開Issue #182；改名在Issue時間軸留有舊標題紀錄，因預設拒絕、非可利用弱點，判定不刪除重建） |
| SME AI平台：Genie CPO待人工確認（看板SOL-11） | 資料品質 | Patrick | — | — | 9/23自舊看板移入：27筆差異中26筆為截斷方法論瑕疵，僅此筆待確認 |
| 新創嚴選網4筆疑似改名候選（看板SOL-24） | 資料品質 | Patrick | — | — | 9/23自舊看板移入：律果簽／Robotiive／ClimaMentor／EgentHub待人工核對 |
| 農業雲市集「悠由農」容量參數落差30→32公頃（看板SOL-25） | 資料品質 | Patrick | — | — | 9/23自舊看板移入：屬內容更新待辦 |
| `anon`與`authenticated`的SELECT授權盤點 | 資安 | Patrick | Patrick | — | 10/5寫入類已收斂；10/2原計畫「連同SELECT一起處理」未做。需先列出網站API實際讀取的表（`solutions`／`companies`／`cases`／`industry_codes`／`maintenance_activity`等），再決定其餘內部表是否收回SELECT |
| ~~repo存檔待補：v1.1原始碼、台→臺遷移檔~~ | 專案管理 | Patrick | — | — | 10/5：`supabase/functions/sf-mcp/index.ts`仍為v1.0.4，需以`sf-mcp_index_v1.1.0_PREPARED_未部署.ts`覆蓋（雜湊`9ff1f4be00e46d79`）；`migrations/20261002_normalize_city_taiwan.sql`待上傳（檔內已註明實際執行日10/5）。**10/12完成**：兩檔已進`solution-finder`並以codeload逐位元組核對 |
| PR #202：方案探索頁SOL-0005真實Preview截圖未取得 | 前端 | Patrick | — | — | 10/5：方案探索頁無名稱搜尋入口，Codex以本機fixture補驗，並在SYNC中標明「非Preview截圖」；首頁兩筆（SOL-0005正向、SOL-0911反向）為真實Preview。正式站有機會遇到時順手確認即可 |
| 雲市集工業館完整稽核（三頁合併去重） | 資料品質 | Patrick | — | — | 10/14三頁基準建立後可排程。資料庫329筆無網址、無法對應頁面，須以三頁合併清單（477筆，含頁面間重複）正規化名稱比對（SOP第十節方法②） |
| 商業服務業專區：10/05「多店升級（第二梯次）」入選名單；單店導入第三梯 | 資料品質 | Patrick | Patrick | 10/20後 | 10/14輕量檢查發現。本庫117筆來源為「單店導入」第一、二梯（10/2結案），多店升級為不同路線、本庫未收錄。①先由Chrome唯讀確認10/05附件是「服務提供者＋方案」名單（可收錄）或「獲補助店家」名單（不收錄）②若為方案名單，先與現有43家比對，再交ETL依收錄篩選標準評估，不直接入庫 ③10/20上架受理截止後追蹤單店導入第三梯名單（117筆的直接延續，優先） |
| SME AI平台279筆方案`website_url`全空 | 資料品質 | Patrick | Patrick | — | 10/14查詢網域變更影響時發現（279筆皆空值，非舊網域）。使用者在SF上無法點連結查證；是否補網址待決 |
| 每週輕量檢查自動化評估 | 後端 | Patrick | Patrick | — | 10/14：伺服器端抓取農業雲市集回傳SERVER_ERROR，瀏覽器正常（網站擋非瀏覽器請求，非網站故障）。自動化須：①結果分「存活／無法判定／失效」三種，抓取失敗先歸「無法判定」，兩個獨立管道都失敗才判「失效」②同一來源單次大量變動即停止 ③偵測與通知可自動，寫入`record_status`前須人工確認。單次連不上不等於方案下架 |
| 關鍵字子字串誤中：英文單字含 ai（email、retail）也會命中「AI」 | 資料品質 | Patrick | — | — | 10/14：臺北市關鍵字「AI」169家，以`is_ai=true`篩為152家，差17家；可能為英文字誤中，或確有AI功能但`has_ai`未標。回答數字須說明定義（Skill已含「數字附定義」）；是否改為詞邊界比對，或推薦以`is_ai`為準，另評估 |
| 選字即時搜尋：方案／公司內文左鍵選取 → 浮動提示 → Google搜尋 | 前端 | Patrick | Patrick | — | 10/14 PPC提出：串聯SF網站與網路搜尋，讓使用者即時查證、提升資料立論性；細節與製作順序待討論。設計原則（10/14討論）：①並陳不取代——提示框同時顯示SF查證資訊（來源／最後查證日／`record_status`）與Google入口；SF回答「能否透過政府計畫取得」，Google回答「市場上是否仍可買到」②線索要查證——使用者回報寫入`feedback_submissions`、原狀態不動、人工查證後新增紀錄（官網仍販售≠仍在計畫平台上架）③只宣稱實際做到的事——新鮮度揭露到每筆層級，不寫全站口號。參考：SME AI 279筆無網址，選字搜尋為其唯一查證管道 |
| 網站沒有登出按鈕 | 前端 | Patrick | — | — | 10/15 PR #257驗收時發現：使用者無法主動登出，session維持7天；共用電腦上用完無法清除登入狀態。聯絡資訊含email／手機後重要性提高。驗收時以Console呼叫`fetch('/api/logout', {method:'POST'})`登出（`vercel.json`已有`/api/logout`路由，僅缺前端按鈕） |
| `manufacturing.html`公司資料面板是否同步顯示email／手機 | 前端 | Patrick | Alex | — | 10/15：該頁同樣呼叫`/api/company-detail`，PR #257後API已回傳`email`／`mobile`，但面板未顯示（規格明訂不改此頁）。是否顯示另案決定 |
| 向Alex同步聯絡資訊實際覆蓋率 | 專案管理 | Patrick | — | — | 10/15：同意開放手機時依據為帳面563支，實際可用217支（32%）；email約96%才是主要聯絡管道；聯絡人僅涵蓋568／1,017家公司（約44%公司展開後為「暫無資訊」） |
| Supabase Advisors提示未查看 | 資安 | Patrick | — | — | 10/15 Dashboard左側Advisors顯示紅點，未點開；常見為RLS或function `search_path`提醒，與P2「6張表RLS無policy」可能重疊 |
| `sop/maintenance_checklist.md` 🔴區塊對應的首頁元素已不存在 | 文件 | Patrick | — | — | 10/19週封存時依清單檢查`index.html`：`ws-date`、`ws-conclusion`、`ws-item`、`decision-item`只剩CSS定義，頁面已無對應元素，「69筆真實案例」字樣亦不在；首頁已改版但清單未更新，清單待依現行首頁改寫 |

---

# 2026-10-19

1. **補做上週五例行工作**（10/16週五PPC請假）：週備份＋週封存
2. **週備份**：`backup_20261019.sql` 6.58 MB，完整性三項檢查通過
3. **週封存**：`status/status_20261012-1016.md`（10/12～10/15，含10/15第13條codeload核對結果）；本檔清空每日記事、保留待追蹤事項
4. **封存檢查**：`maintenance_checklist.md` 🔴區塊對應的首頁元素已不存在，列P2
5. **交付**：`codex_delivery_20261019_weekly.zip`（2檔，Codex推送），Claude codeload核對待補

<details>
<summary>展開細節</summary>

**週備份**：照SKILL固定指令（pooler端點、`$env:USERPROFILE`完整路徑；PowerShell開在`C:\WINDOWS\system32`仍成功）。大小6.58 MB（6.5754），比10/12的6.30 MB多約0.28 MB（+4%），對應10/12後新建的`ask_logs`、`search_logs`、`feedback_submissions`與10/14的`sf_mcp_usage`及其紀錄。完整性：`PostgreSQL database dump complete` Count=1；`^CREATE TABLE public\.` **26**（10/12的22張＋上述4張，與migration推算一致）；`COPY public.companies／contacts／search_logs／sf_mcp_usage／solutions` 5行皆在。26張作為下次比對基準。OneDrive複製（SKILL步驟5）截圖未含，待PPC確認。

**週封存**：依10/5～10/9慣例，封存檔為本週status.md完整內容（待追蹤事項＋每日記事），本檔保留待追蹤事項（含劃線已結案項目）並清空每日記事。封存前確認遠端`status.md`為10/15第二次交付版本（`432afb1`），本週無其他推送。

**封存檢查（`maintenance_checklist.md`）**：以repo內`index.html`（最後異動`fc09bf2`，10/14）比對🔴區塊：`ws-date`、`ws-conclusion`、`ws-item`、`decision-item`僅存在於CSS，頁面無對應元素；「案例分析功能開放測試提案」的「69筆真實案例」字樣不在。判斷為首頁改版後清單未同步，非內容過期，列P2改寫清單。

</details>

**本日教訓**
- 例行工作跳過一次就要補：Free方案沒有自動備份，少一週就是少一個還原點
- 檢查清單本身也會過期：照清單檢查時發現清單指向不存在的東西，要修的是清單
