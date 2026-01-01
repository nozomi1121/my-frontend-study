// 1. 要素を取得する（Azureのログから特定のIDを探すイメージです）
const addButton = document.getElementById('add-button');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

addButton.addEventListener('click', () => {
    const taskText = todoInput.value; // 入力された文字を取得

    if (taskText !== "") { // 空っぽじゃない時だけ実行
        const li = document.createElement('li'); // 新しいリスト項目(li)を作る
        li.textContent = taskText; // リスト項目に文字を入れる
        
        todoList.appendChild(li); // ul（リスト）の中にliを追加する
        
        todoInput.value = ""; // 入力欄を空にする
    } else {
        alert("タスクを入力してください！");
    }
});