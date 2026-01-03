import { useState, useEffect } from 'react'

// 1. このコンポーネントだけで使う型定義
interface User {
  id: number;
  name: string;
}

export function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  // 2. データの取得ロジックをこちらに移動
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div style={{ marginTop: '30px' }}>
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
  );
}