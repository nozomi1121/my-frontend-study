import React, { useState, useEffect } from 'react'
import './App.css'
import { TodoItem } from './TodoItem'
import { UserList } from './UserList'

interface Todo {
  id: number;
  text: string;
  isDone: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('my-todos');
    return savedTodos ? (JSON.parse(savedTodos) as Todo[]) : [];
  });

  const [inputValue, setInputValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    localStorage.setItem('my-todos', JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // 【確認用】これがコンソールに出るはずです
    console.log("現在の入力値:", value, "文字数:", value.length);
    
    setInputValue(value);

    // バリデーション：空文字はエラーではないが、ボタンは押せない状態
    if (value.length === 0) {
      setErrorMsg("");
    } else if (value.length < 2) {
      setErrorMsg("2文字以上入力してください");
    } else if (value.length > 20) {
      setErrorMsg("20文字以内で入力してください");
    } else {
      setErrorMsg("");
    }
  };

  const addTodo = () => {
    const trimmedValue = inputValue.trim();
    // 最終チェック
    if (trimmedValue.length >= 2 && trimmedValue.length <= 20 && errorMsg === "") {
      const newTodo: Todo = {
        id: Date.now(),
        text: trimmedValue,
        isDone: false
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
      setErrorMsg(""); 
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map((t) => t.id === id ? { ...t, isDone: !t.isDone } : t));
  };

  return (
    <div className="profile-card">
      <h1>React版 ToDoリスト</h1>

      <div style={{ marginBottom: '30px', textAlign: 'left' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            id="todo-input"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="タスクを入力..."
            // 【重要】ブラウザ側でも21文字以上打てないようにガード
            maxLength={25} 
            style={{ 
              border: errorMsg ? '2px solid red' : '1px solid #ddd',
              flex: '1',
              padding: '8px'
            }}
          />
          <button 
            type="button"
            onClick={addTodo} 
            // ボタンの活性化条件を整理
            disabled={errorMsg !== "" || inputValue.trim().length < 2 || inputValue.trim().length > 20}
            style={{ cursor: (errorMsg !== "" || inputValue.trim().length < 2) ? 'not-allowed' : 'pointer' }}
          >
            追加
          </button>
        </div>

        <div style={{ marginTop: '8px', height: '20px' }}>
          {errorMsg && (
            <p style={{ color: 'red', fontSize: '14px', fontWeight: 'bold', margin: 0 }}>
              ⚠️ {errorMsg}
            </p>
          )}
        </div>
      </div>

      {todos.length > 0 ? (
        <ul>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} onToggle={toggleTodo} />
          ))}
        </ul>
      ) : (
        <p style={{ color: '#888' }}>タスクはありません。</p>
      )}
      
      <hr />
      <UserList />
    </div>
  )
}

export default App