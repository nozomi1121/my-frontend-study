// 1. 要素を取得する（Azureのログから特定のIDを探すイメージです）
const addButton = document.getElementById('add-button');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

addButton.addEventListener('click', () => {
    const taskText = todoInput.value;

    if (taskText !== "") {
        const li = document.createElement('li');
        li.textContent = taskText;

        // --- ここから追加：削除ボタンを作る ---
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '削除';
        deleteButton.style.marginLeft = '10px';

        // 削除ボタンが押された時の動作
        deleteButton.addEventListener('click', () => {
            li.remove(); // そのリスト項目(li)自体を消す
        });

        li.appendChild(deleteButton); // リスト項目の中に削除ボタンを入れる
        // --- ここまで ---

        todoList.appendChild(li);
        todoInput.value = "";
    }
});
// データを取得する関数
async function getUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        
        console.log("取得した全データ:", data);
        
        // 1. 表示先のリスト(ul)を取得
        const todoList = document.getElementById('todo-list');
        
        // 2. 10人のデータに対して、一人ずつリスト項目(li)を作って追加する
        data.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `👤 ${user.name} (ID: ${user.id})`;
            li.style.color = "#0078d4"; // 外部データだとわかるように色を変えてみる
            
            todoList.appendChild(li);
        });

        // 3. メッセージエリアを更新
        const messageArea = document.getElementById('message-area');
        messageArea.textContent = `全${data.length}名のユーザーを取得しました！`;
        
    } catch (error) {
        console.error("データの取得に失敗しました:", error);
    }
}
// 関数を実行する
getUsers();