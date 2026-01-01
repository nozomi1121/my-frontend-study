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