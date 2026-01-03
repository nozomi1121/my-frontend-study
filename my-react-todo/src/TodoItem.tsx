// src/TodoItem.tsx

interface TodoItemProps {
  todo: string;
  index: number;
  onDelete: (index: number) => void;
}

// 「export」を頭につけるのSを忘れずに！
export function TodoItem({ todo, index, onDelete }: TodoItemProps) {
  return (
    <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
      <span>{todo}</span>
      <button 
        onClick={() => onDelete(index)} 
        style={{ 
          marginLeft: '10px', 
          padding: '4px 12px', 
          backgroundColor: '#ff4d4f', 
          fontSize: '0.8rem',
          borderRadius: '4px',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        削除
      </button>
    </li>
  );
}