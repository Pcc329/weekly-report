/* nav.js — 全站統一浮動「回首頁」按鈕
   用法：在每頁 </body> 前加一行 <script src="nav.js"></script>
   行為：注入右下角浮動鈕，點擊回報告首頁（絕對網址，全站一致）
*/
(function () {
  var HOME = "https://pcc329.github.io/weekly-report/index.html";

  function inject() {
    if (document.getElementById("wr-home-fab")) return; // 防重複
    var a = document.createElement("a");
    a.id = "wr-home-fab";
    a.href = HOME;
    a.setAttribute("aria-label", "回報告首頁");
    a.innerHTML = '<span class="wr-fab-ico">🏠</span><span class="wr-fab-txt">回首頁</span>';

    var css = document.createElement("style");
    css.textContent =
      '#wr-home-fab{position:fixed;right:20px;bottom:20px;z-index:9999;' +
      'display:inline-flex;align-items:center;gap:7px;' +
      'padding:11px 16px;border-radius:999px;' +
      'background:#16233B;color:#fff;text-decoration:none;' +
      'font-family:"Noto Sans TC",-apple-system,"Microsoft JhengHei",sans-serif;' +
      'font-size:14px;font-weight:700;line-height:1;' +
      'box-shadow:0 4px 14px rgba(22,35,59,.28);' +
      'transition:transform .15s ease, background .15s ease;}' +
      '#wr-home-fab:hover{background:#0F7B6C;transform:translateY(-2px);}' +
      '#wr-home-fab:active{transform:translateY(0);}' +
      '#wr-home-fab .wr-fab-ico{font-size:15px;}' +
      '@media print{#wr-home-fab{display:none;}}' +
      '@media(max-width:480px){#wr-home-fab{right:14px;bottom:14px;padding:10px 14px;font-size:13px;}}';
    document.head.appendChild(css);
    document.body.appendChild(a);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
