import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import { TodoItem } from './TodoItem';

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

  const validate = (value: string) => {
    if (value.length === 0) return "";
    if (value.length < 2) return "2文字以上入力してください";
    if (value.length > 20) return "20文字以内で入力してください";
    return "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setErrorMsg(validate(value));
  };

  const addTodo = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue.length >= 2 && trimmedValue.length <= 20) {
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
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              // ★ ここがポイント：IME（変換）中ではない時だけ、Enterを受け付ける
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                e.preventDefault();
                addTodo();
              }
            }}
            placeholder="タスクを入力..."
            style={{ 
              border: errorMsg ? '2px solid red' : '1px solid #ddd',
              flex: '1',
              padding: '8px',
              borderRadius: '4px',
              outline: 'none'
            }}
          />
          <button 
            type="button"
            onClick={addTodo} 
            disabled={errorMsg !== "" || inputValue.trim().length < 2 || inputValue.trim().length > 20}
            style={{ 
              padding: '8px 16px',
              cursor: (errorMsg !== "" || inputValue.trim().length < 2) ? 'not-allowed' : 'pointer' 
            }}
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

      <ul style={{ listStyle: 'none', padding: 0 }}>
        <AnimatePresence>
          {todos.map((todo) => (
            <motion.li
              key={todo.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              style={{ marginBottom: '8px' }}
            >
              <TodoItem
                todo={todo}
                onDelete={deleteTodo}
                onToggle={toggleTodo}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

export default App;