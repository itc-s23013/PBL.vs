import { useState, useEffect } from 'react';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toLocaleDateString());
  const [noteInput, setNoteInput] = useState('');
  const [priority, setPriority] = useState('低');
  const [editIndex, setEditIndex] = useState(null);
  const [isEditingTodo, setIsEditingTodo] = useState(false);
  const [deletedTodos, setDeletedTodos] = useState([]);

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

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

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
        note: noteInput,
        priority
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
      setNoteInput('');
      setPriority('低');
    }
  };

  const removeTodo = (index) => {
    const removedTodo = todos[index];
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    setDeletedTodos([...deletedTodos, removedTodo]);
  };

  const restoreTodo = (index) => {
    const restoredTodo = deletedTodos[index];
    const newDeletedTodos = deletedTodos.filter((_, i) => i !== index);
    setDeletedTodos(newDeletedTodos);
    setTodos([...todos, restoredTodo]);
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
    setNoteInput(todos[index].note);
    setPriority(todos[index].priority);
    setEditIndex(index);
    setIsEditingTodo(true);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.2em' }}>
      <h1 style={{ fontSize: '1.5em' }}>TODOリスト</h1>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="新しいTODOを入力"
        style={{ fontSize: '1.2em', padding: '8px', width: '80%', marginBottom: '10px' }}
      />
      <input 
        type="date" 
        value={dueDate} 
        onChange={(e) => setDueDate(e.target.value)}
        style={{ fontSize: '1.2em', padding: '8px', marginBottom: '10px' }}
      />
      <textarea
        value={noteInput}
        onChange={(e) => setNoteInput(e.target.value)}
        placeholder="メモを追加"
        rows="4"
        cols="50"
        style={{ fontSize: '1.2em', padding: '8px', width: '80%', marginBottom: '10px' }}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        style={{ fontSize: '1.2em', padding: '8px', width: '80%', marginBottom: '10px' }}
      >
        <option value="低">低</option>
        <option value="中">中</option>
        <option value="高">高</option>
      </select>
      <button 
        onClick={addTodo} 
        style={{ fontSize: '1.2em', padding: '8px 16px', marginBottom: '20px' }}>
        {isEditingTodo ? '更新' : '追加'}
      </button>
      <h2 style={{ fontSize: '1.5em' }}>タスクリスト</h2>
      <ul style={{ listStyleType: 'none', padding: 0, fontSize: '1.2em' }}>
        {todos.map((todo, index) => (
          <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none', marginBottom: '15px' }}>
            <span>{todo.text}</span><br/>
            <span style={{ fontSize: '0.8em', color: 'gray' }}>{todo.timestamp}</span><br/>
            <span style={{ fontSize: '0.8em', color: 'green' }}>期限: {todo.dueDate}</span><br/>
            <span style={{ fontSize: '0.8em', color: todo.priority === '高' ? 'red' : (todo.priority === '中' ? 'orange' : 'blue') }}>
              重要度: {todo.priority}
            </span><br/>
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
          <h2 style={{ fontSize: '1.5em' }}>削除されたタスクリスト</h2>
          <ul style={{ listStyleType: 'none', padding: 0, fontSize: '1.2em' }}>
            {deletedTodos.map((todo, index) => (
              <li key={index} style={{ marginBottom: '15px' }}>
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
