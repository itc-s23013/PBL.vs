// components/Todo.js
import { useState, useEffect } from 'react';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toLocaleDateString());
  const [noteInput, setNoteInput] = useState(''); // メモ入力の状態
  const [editIndex, setEditIndex] = useState(null);
  const [isEditingTodo, setIsEditingTodo] = useState(false);
  const [deletedTodos, setDeletedTodos] = useState([]); // 削除されたタスクを保存する状態

  // ローカルストレージからTODOリストを読み込む
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
    const savedDeletedTodos = JSON.parse(localStorage.getItem('deletedTodos'));
    if (savedDeletedTodos) {
      setDeletedTodos(savedDeletedTodos);
    }
  }, []);

  // TODOリストが変更されたらローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 削除されたTODOリストが変更されたらローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('deletedTodos', JSON.stringify(deletedTodos));
  }, [deletedTodos]);

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
    const removedTodo = todos[index];
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    setDeletedTodos([...deletedTodos, removedTodo]); // 削除されたタスクを保存
  };

  const restoreTodo = (index) => {
    const restoredTodo = deletedTodos[index];
    const newDeletedTodos = deletedTodos.filter((_, i) => i !== index);
    setDeletedTodos(newDeletedTodos);
    setTodos([...todos, restoredTodo]); // 削除されたタスクを復元
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
    <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.5em' }}>
      <h1 style={{ fontSize: '2em' }}>TODOリスト</h1>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="新しいTODOを入力"
        style={{ fontSize: '1.5em', padding: '10px', width: '80%', marginBottom: '10px' }}
      />
      <input 
        type="date" 
        value={dueDate} 
        onChange={(e) => setDueDate(e.target.value)}
        style={{ fontSize: '1.5em', padding: '10px', marginBottom: '10px' }}
      />
      <textarea
        value={noteInput}
        onChange={(e) => setNoteInput(e.target.value)}
        placeholder="メモを追加"
        rows="4"
        cols="50"
        style={{ fontSize: '1.5em', padding: '10px', width: '80%', marginBottom: '10px' }}
      />
      <button 
        onClick={addTodo} 
        style={{ fontSize: '1.5em', padding: '10px 20px', marginBottom: '20px' }}>
        {isEditingTodo ? '更新' : '追加'}
      </button>
      <h2 style={{ fontSize: '2em' }}>タスクリスト</h2>
      <ul style={{ listStyleType: 'none', padding: 0, fontSize: '1.5em' }}>
        {todos.map((todo, index) => (
          <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none', marginBottom: '20px' }}>
            <span>{todo.text}</span><br/>
            <span style={{ fontSize: '0.8em', color: 'gray' }}>{todo.timestamp}</span><br/>
            <span style={{ fontSize: '0.8em', color: 'green' }}>期限: {todo.dueDate}</span><br/>
            {todo.note && (
              <div style={{ marginTop: '10px', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}>
                <strong>メモ:</strong>
                <p>{todo.note}</p>
              </div>
            )}
            <button onClick={() => toggleTodo(index)} style={{ fontSize: '1em', padding: '5px 10px' }}>
              {todo.completed ? '未完了' : '完了'}
            </button>
            <button onClick={() => editTodo(index)} style={{ fontSize: '1em', padding: '5px 10px' }}>編集</button>
            <button onClick={() => removeTodo(index)} style={{ fontSize: '1em', padding: '5px 10px' }}>削除</button>
          </li>
        ))}
      </ul>
      {deletedTodos.length > 0 && (
        <div>
          <h2 style={{ fontSize: '2em' }}>削除されたタスクリスト</h2>
          <ul style={{ listStyleType: 'none', padding: 0, fontSize: '1.5em' }}>
            {deletedTodos.map((todo, index) => (
              <li key={index} style={{ marginBottom: '20px' }}>
                <span>{todo.text}</span><br/>
                <button onClick={() => restoreTodo(index)} style={{ fontSize: '1em', padding: '5px 10px' }}>復元</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Todo;
