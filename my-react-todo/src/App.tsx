import { useState } from 'react'
import './App.css'
import { TodoItem } from './TodoItem'
import { UserList } from './UserList' // 👈 追加

// App.tsx

// ToDoひとつひとつが持つデータの形
interface Todo {
  id: number;      // 削除や更新の時に使う固有の番号
  text: string;    // タスクの中身
  isDone: boolean; // 完了したかどうかのフラグ
}

// App.tsx 内
function App() {
  // string[] から Todo[] (さっき作ったインターフェースの配列) に変更
  const [todos, setTodos] = useState<Todo[]>([]); 
  const [inputValue, setInputValue] = useState("");

  // App.tsx 内

const addTodo = () => {
  if (inputValue.trim() !== "") {
    // 新しい Todo オブジェクトを作成して追加
    // 3. 文字ではなく「オブジェクト」を作って追加する
    const newTodo: Todo = {
      id: Date.now(), // 現在時刻をIDにする（簡易的な一意のID）
      text: inputValue,
      isDone: false // 最初は未完了
    };
    setTodos([...todos, newTodo]);
    setInputValue("");
  }
};

// 4. index(番号) ではなく id(固有番号) で削除するように変更
const deleteTodo = (id: number) => {
  // indexではなく、idが一致しないものを残す（より安全な消し方）
  const newTodos = todos.filter((todo) => todo.id !== id);
  setTodos(newTodos);
};

const toggleTodo = (id: number) => {
    // 全てのtodoをチェックして、IDが一致するものだけ isDone を反転させる
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        // ...todo で今の内容をコピーし、isDone だけ上書きする
        return { ...todo, isDone: !todo.isDone };
      }
      return todo; // 一致しないものはそのまま
    });
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
          onKeyDown={(e) => {
  // 変換中（isComposing）は無視して、確定した後の Enter だけに反応させる
  if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
    addTodo();
  }
}}
          placeholder="タスクを入力..."
          autoComplete="off"
        />
        <button onClick={addTodo}>追加</button>
      </div>

      {/* todosの数が0より大きいときだけリストを表示し、0のときはメッセージを出す */}
{todos.length > 0 ? (
  <ul style={{ padding: 0 }}>
          {todos.map((todo) => (
            // 5. todoオブジェクトをそのまま渡し、deleteTodoもidを使うように変更
            <TodoItem
              key={todo.id} 
              todo={todo} 
              onDelete={deleteTodo} 
              onToggle={toggleTodo}
            />
          ))}
        </ul>
) : (
  <p style={{ color: '#888', fontStyle: 'italic' }}>現在、タスクはありません。今日も一日頑張りましょう！</p>
)}
      {/* ★ 外部データを表示する機能は、この一行を置くだけ！ */}
      <UserList />
    </div>
  )
}


export default App