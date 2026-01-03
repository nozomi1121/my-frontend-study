import { useState } from 'react'
import './App.css'
import { TodoItem } from './TodoItem'
import { UserList } from './UserList' // 👈 追加

function App() {
  const [todos, setTodos] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  // ★ App.tsx から User 関連の State や useEffect が消えてスッキリ！

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, inputValue]);
      setInputValue("");
    }
  };

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
          onChange={(e) => setInputValue(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="タスクを入力..."
        />
        <button onClick={addTodo}>追加</button>
      </div>

      <ul>
        {todos.map((todo, index) => (
          <TodoItem key={index} todo={todo} index={index} onDelete={deleteTodo} />
        ))}
      </ul>

      {/* ★ 外部データを表示する機能は、この一行を置くだけ！ */}
      <UserList />
    </div>
  )
}

export default App