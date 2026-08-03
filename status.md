# 📌 專案即時記事本

> 隨手登記大事件，週末整理進正式週報。最新在最上面。
> 狀態圖示：✅ 完成 ／ 🔄 進行中 ／ ⬜ 待辦 ／ ⚠️ 卡住

---

## 2026-08-03（週一）

### ✅ 資安：修補 anon 全表過度授權（重大）
- 規劃 contacts 遷移時，發現公開金鑰 anon 對多張表有全套 DML 權限
- 風險：677 筆聯絡人明碼個資可被公開讀取；solutions 等 5 表可被 TRUNCATE 清空
- 處置：撤 contacts/contacts_masked 全部權限；5 張商業表撤 DML 只留 SELECT
- 驗證：anon key 實測打 contacts 回 42501 拒絕；前端三頁煙霧測試正常
- 只有 companies 原本正確，其餘 5 表 + contacts 皆為系統性過度授權

### ✅ contacts 定位確立：單一守門人模式
- 查證：目前無 /api/contacts，前端不提供聯絡人查詢
- 決策：基於個資保護，contacts 不建對外 API；資料已完成後端遷移與遮罩
- 系統為純公開查詢站，無登入機制

### ✅ 資安：RLS policy 六表複查
- 六表全數 RLS 啟用且有 policy，內容正確（三角色分層 admin/consultant/anon）
- contacts 雙鎖一致：table 權限 + RLS 皆只允許 admin_role，明碼鎖死
- cases 額外有機密分級、digital_needs 限 consultant 讀
- 備忘：consultant 角色 table 權限未查（暴露面小，低優先）

### ✅ 資安：收 authenticated 角色權限
- 七張表撤 DML 只留 SELECT，contacts 明碼表零權限
- 現況：anon/authenticated 皆無寫入權，contacts 明碼無任何角色可讀

### ⬜ 待辦（本週）
- sources.html 補農業部來源
- fix/cid-bom、fix/price-zero-preserve
- 遷移評估文件 Ch2–4

---

## 2026-07-31（週五）

### ✅ solutions API Supabase 遷移（PR #117）
- 最大最複雜一支，2429 筆，逐筆比對零差異，GPT 二審通過

### ✅ 分頁 416 邊界防禦（PR #118）
- offset 分頁整除 off-by-one 修補，預防未來資料量增長時 API 500

### ✅ 資料庫遷移里程碑
- API 層三大表（cases/companies/solutions）遷移全數完成
