// components/Todo.js
import { useState, useEffect } from 'react';
import styles from '../styles/Todo.module.css'; // CSSモジュールをインポート

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
    <div className={styles.todoContainer}>
      <h1 className={styles.header}>TODOリスト</h1>
      <div className={styles.inputField}>
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
      </div>
      <button className={styles.addButton} onClick={addTodo}>追加</button>
      <ul className={styles.todoList}>
        {todos.map((todo, index) => (
          <li key={index} className={styles.todoItem}>
            <span className={styles.todoText}>{todo.text}</span> 
            {todo.deadline && (
              <span className={styles.todoDeadline}>（期限: {todo.deadline}）</span>
            )}
            <button className={styles.removeButton} onClick={() => removeTodo(index)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;

