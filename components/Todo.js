// components/Todo.js
import { useState, useEffect } from 'react';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toLocaleDateString());
  const [noteInput, setNoteInput] = useState(''); // メモ入力の状態
  const [editIndex, setEditIndex] = useState(null);
  const [isEditingTodo, setIsEditingTodo] = useState(false);

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
      const newTodo = {
        text: input,
        completed: false,
        timestamp: new Date().toLocaleString(),
        dueDate,
        note: noteInput // メモを追加
      };

      if (isEditingTodo) {
        const updatedTodos = todos.map((todo, index) =>
          index === editIndex ? { ...newTodo, completed: todos[index].completed } : todo
        );
        setTodos(updatedTodos);
        setIsEditingTodo(false);
        setEditIndex(null);
      } else {
        setTodos([...todos, newTodo]);
      }
      setInput('');
      setDueDate(new Date().toLocaleDateString());
      setNoteInput(''); // メモ入力をリセット
    }
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const toggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const editTodo = (index) => {
    setInput(todos[index].text);
    setDueDate(todos[index].dueDate);
    setNoteInput(todos[index].note); // メモを編集用に設定
    setEditIndex(index);
    setIsEditingTodo(true);
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
        value={dueDate} 
        onChange={(e) => setDueDate(e.target.value)}
      />
      <textarea
        value={noteInput}
        onChange={(e) => setNoteInput(e.target.value)}
        placeholder="メモを追加"
        rows="4"
        cols="50"
      />
      <button onClick={addTodo}>{isEditingTodo ? '更新' : '追加'}</button>
      <h2>タスクリスト</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {todos.map((todo, index) => (
          <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <span>{todo.text}</span><br/>
            <span style={{ fontSize: '0.8em', color: 'gray' }}>{todo.timestamp}</span><br/>
            <span style={{ fontSize: '0.8em', color: 'green' }}>期限: {todo.dueDate}</span><br/>
            {todo.note && (
              <div style={{ marginTop: '10px', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}>
                <strong>メモ:</strong>
                <p>{todo.note}</p>
              </div>
            )}
            <button onClick={() => toggleTodo(index)}>{todo.completed ? '未完了' : '完了'}</button>
            <button onClick={() => editTodo(index)}>編集</button>
            <button onClick={() => removeTodo(index)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
