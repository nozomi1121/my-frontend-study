// src/TodoItem.tsx

// 1. 設計図（Props）の定義
// 親(App.tsx)から受け取るデータの形を定義します。
interface TodoItemProps {
  todo: {
    id: number;
    text: string;
    isDone: boolean;
  };
  onDelete: (id: number) => void;
  onToggle: (id: number) => void; // 👈 チェックを切り替えるための関数を追加
}

// 2. 削除ボタンのスタイル
const deleteButtonStyle = {
  marginLeft: '10px',
  padding: '4px 12px',
  backgroundColor: '#ff4d4f',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

// 3. コンポーネント本体
export function TodoItem({ todo, onDelete, onToggle }: TodoItemProps) {
  
  // データの状態(isDone)をそのまま変数に代入
  const isCompleted = todo.isDone;

  // 動的なスタイルの整理
  const textStyle = {
    textDecoration: isCompleted ? 'line-through' : 'none',
    color: isCompleted ? '#aaa' : '#333',
    flex: 1,
    textAlign: 'left' as const
  };

  return (
    <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
      
      {/* 4. チェックボックスの実装 */}
      <input 
        type="checkbox" 
        checked={isCompleted} 
        onChange={() => onToggle(todo.id)} // クリック時に親の関数を呼び出す
        style={{ marginRight: '10px', cursor: 'pointer' }}
      />

      {/* 5. タスクの中身を表示 */}
      <span style={textStyle}>
        {todo.text}
      </span>

      {/* 6. 削除ボタン */}
      <button 
        onClick={() => onDelete(todo.id)} 
        style={deleteButtonStyle}
      >
        削除
      </button>

    </li>
  );
}