import { useState, useEffect } from 'react'
import './App.css'

// 1. 型の定義（インターフェース）
interface User {
  id: number;
  name: string;
}

function App() {
  // 2. 状態（State）の定義
  const [todos, setTodos] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  // 3. APIからデータを取る
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  // --- 追加・修正した関数 ---

  // ToDoを追加する関数
  const addTodo = () => {
    // trim()を使うことで、空白だけの入力も防ぎます
    if (inputValue.trim() !== "") {
      setTodos([...todos, inputValue]);
      setInputValue("");
    }
  };

  // 指定した番号（index）のToDoを消す関数
  const deleteTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="profile-card">
      <h1>React版 ToDoリスト</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          value={inputValue}
          // 文字が変わるたびにStateを更新
          onChange={(e) => setInputValue(e.target.value)} 
          // ★ Enterキーが押されたら追加する機能
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addTodo();
            }
          }}
          placeholder="タスクを入力..."
        />
        <button onClick={addTodo}>追加</button>
      </div>

      <ul>
        {todos.map((todo, index) => (
          <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span>{todo}</span>
            {/* ★ 削除ボタン */}
            <button 
              onClick={() => deleteTodo(index)} 
              style={{ 
                marginLeft: '10px', 
                padding: '4px 12px', 
                backgroundColor: '#ff4d4f', 
                fontSize: '0.8rem',
                borderRadius: '4px'
              }}
            >
              削除
            </button>
          </li>
        ))}
      </ul>

      <hr />
      <h3>API取得ユーザー</h3>
      <ul>
        {users.map(user => (
          <li key={user.id} style={{ color: '#0078d4', textAlign: 'left' }}>
            👤 {user.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App