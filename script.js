// ==========================================================
// 連絡先：「アドレスをコピー」ボタン
// 押すとメールアドレスをコピーし、「コピーしました」と表示する
// ==========================================================
(function () {
  var button = document.getElementById("copy-button");
  var status = document.getElementById("copy-status");
  if (!button || !status) return;

  var timerId = null;

  // 古いブラウザや file:// で開いたとき用のコピー方法
  function fallbackCopy(text) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-1000px";
    document.body.appendChild(textarea);
    textarea.select();
    var ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (e) {
      ok = false;
    }
    document.body.removeChild(textarea);
    return ok;
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(
        function () { return true; },
        function () { return fallbackCopy(text); }
      );
    }
    return Promise.resolve(fallbackCopy(text));
  }

  function showMessage(message) {
    status.textContent = message;
    clearTimeout(timerId);
    timerId = setTimeout(function () {
      status.textContent = "";
    }, 2500);
  }

  button.addEventListener("click", function () {
    var address = button.getAttribute("data-copy");
    copyText(address).then(function (ok) {
      if (ok) {
        showMessage("コピーしました");
      } else {
        showMessage("コピーできませんでした。アドレスを選択してコピーしてください。");
      }
    });
  });
})();
