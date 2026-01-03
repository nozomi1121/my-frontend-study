// --- 1. インターフェース（設計図）の定義 ---
// 外部に切り出すことで、どこでも再利用できるようになります
interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

// --- 2. 要素の取得 ---
// as を使って「これは絶対この要素です」とTypeScriptに伝えます
const addButton = document.getElementById('add-button') as HTMLButtonElement;
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const messageArea = document.getElementById('message-area') as HTMLParagraphElement;

// --- 3. ToDo追加機能 ---
if (addButton && todoInput && todoList) {
    addButton.addEventListener('click', () => {
        const taskText: string = todoInput.value;

        if (taskText !== "") {
            const li = document.createElement('li');
            li.textContent = taskText;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '削除';
            deleteButton.style.marginLeft = '10px';
            deleteButton.addEventListener('click', () => {
                li.remove();
            });

            li.appendChild(deleteButton);
            todoList.appendChild(li);
            todoInput.value = "";
        }
    });
}

// --- 4. API連携関数 ---
async function getUsers(): Promise<void> {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        // ここで「Userインターフェースの形をした配列ですよ」と指定
        const data: User[] = await response.json();
        
        console.log("取得したデータ:", data);
        
        if (todoList) {
            // dataがUser[]だとわかっているので、user.と打つと補完が出ます
            data.forEach((user: User) => {
                const li = document.createElement('li');
                li.textContent = `👤 ${user.name} (${user.email})`;
                li.style.color = "#0078d4";
                todoList.appendChild(li);
            });
        }

        if (messageArea) {
            messageArea.textContent = `全${data.length}名のユーザーデータを読み込みました`;
        }
        
    } catch (error) {
        console.error("データの取得に失敗しました:", error);
    }
}

// 実行！
getUsers();