// 1. 要素を取得する（Azureのログから特定のIDを探すイメージです）
const button = document.getElementById('alert-button');
const messageArea = document.getElementById('message-area');

// 2. ボタンがクリックされた時の動作を決める（イベントリスナー）
button.addEventListener('click', () => {
    // 3. メッセージを書き換える（DOM操作）
    messageArea.textContent = 'JavaScriptが動きました！おめでとうございます！';
    messageArea.style.color = 'red';
    messageArea.style.fontWeight = 'bold';
});