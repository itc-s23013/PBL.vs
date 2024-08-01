import { useState, useEffect } from 'react';
import Link from 'next/link';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input]);
      setInput('');
    }
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>TODOリスト</h1>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="新しいTODOを入力"
        style={{ padding: '10px', fontSize: '16px' }}
      />
      <button onClick={addTodo} style={{ padding: '10px 20px', fontSize: '16px' }}>追加</button>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {todos.map((todo, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
            {todo} 
            <button onClick={() => removeTodo(index)} style={{ marginLeft: '10px' }}>削除</button>
          </li>
        ))}
      </ul>
      <br />
      <Link href="/">
        ホームに戻る
      </Link>
    </div>
  );
};

export default Todo;

