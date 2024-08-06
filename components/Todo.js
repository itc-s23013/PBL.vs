import { useState, useEffect } from 'react';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [deadline, setDeadline] = useState(''); // 期限用のステートを追加

  // ローカルストレージからTODOリストを読み込む
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  // TODOリストが変更されたらローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { text: input, deadline }]);
      setInput('');
      setDeadline('');
    }
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>TODOリスト</h1>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="新しいTODOを入力"
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        placeholder="期限を設定"
      />
      <button onClick={addTodo}>追加</button>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {todos.map((todo, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
            {todo.text} 
            {todo.deadline && (
              <span>（期限: {todo.deadline}）</span>
            )}
            <button onClick={() => removeTodo(index)} style={{ marginLeft: '10px' }}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
