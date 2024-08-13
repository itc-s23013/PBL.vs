import { useState, useEffect } from 'react';
import styles from './Todo.module.css'; // CSSモジュールをインポート

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toLocaleDateString());
  const [noteInput, setNoteInput] = useState('');
  const [priority, setPriority] = useState('低');
  const [editIndex, setEditIndex] = useState(null);
  const [isEditingTodo, setIsEditingTodo] = useState(false);
  const [deletedTodos, setDeletedTodos] = useState([]);
  const [deletedNotes, setDeletedNotes] = useState([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
    const savedDeletedTodos = JSON.parse(localStorage.getItem('deletedTodos'));
    if (savedDeletedTodos) {
      setDeletedTodos(savedDeletedTodos);
    }
    const savedDeletedNotes = JSON.parse(localStorage.getItem('deletedNotes'));
    if (savedDeletedNotes) {
      setDeletedNotes(savedDeletedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('deletedTodos', JSON.stringify(deletedTodos));
  }, [deletedTodos]);

  useEffect(() => {
    localStorage.setItem('deletedNotes', JSON.stringify(deletedNotes));
  }, [deletedNotes]);

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

  const deleteTodoPermanently = (index) => {
    const newDeletedTodos = deletedTodos.filter((_, i) => i !== index);
    setDeletedTodos(newDeletedTodos);
  };

  const deleteNotePermanently = (index) => {
    const newDeletedNotes = deletedNotes.filter((_, i) => i !== index);
    setDeletedNotes(newDeletedNotes);
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
    <div className={styles.container}>
      <h1 className={styles.title}>TODOリスト</h1>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="新しいTODOを入力"
        className={styles.input}
      />
      <input 
        type="date" 
        value={dueDate} 
        onChange={(e) => setDueDate(e.target.value)}
        className={styles.input}
      />
      <textarea
        value={noteInput}
        onChange={(e) => setNoteInput(e.target.value)}
        placeholder="メモを追加"
        rows="4"
        cols="50"
        className={styles.input}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className={styles.input}
      >
        <option value="低">低</option>
        <option value="中">中</option>
        <option value="高">高</option>
      </select>
      <button 
        onClick={addTodo} 
        className={styles.button}
      >
        {isEditingTodo ? '更新' : '追加'}
      </button>
      <h2 className={styles.title}>タスクリスト</h2>
      <ul className={styles.todoList}>
        {todos.map((todo, index) => (
          <li 
            key={index} 
            className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}
          >
            <span>{todo.text}</span><br/>
            <span className={styles.timestamp}>{todo.timestamp}</span><br/>
            <span className={styles.dueDate}>期限: {todo.dueDate}</span><br/>
            <span 
              className={`${styles.priority} ${todo.priority === '高' ? styles.priorityHigh : (todo.priority === '中' ? styles.priorityMedium : styles.priorityLow)}`}
            >
              重要度: {todo.priority}
            </span><br/>
            {todo.note && (
              <div className={styles.note}>
                <strong className={styles.noteTitle}>メモ:</strong>
                <p>{todo.note}</p>
              </div>
            )}
            <button 
              onClick={() => toggleTodo(index)} 
              className={styles.buttonSmall}
            >
              {todo.completed ? '未完了' : '完了'}
            </button>
            <button 
              onClick={() => editTodo(index)} 
              className={styles.buttonSmall}
            >
              編集
            </button>
            <button 
              onClick={() => removeTodo(index)} 
              className={styles.buttonSmall}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
      {deletedTodos.length > 0 && (
        <div>
          <h2 className={styles.deletedTodosTitle}>削除されたタスクリスト</h2>
          <ul className={styles.deletedTodoList}>
            {deletedTodos.map((todo, index) => (
              <li key={index} className={styles.deletedTodoItem}>
                <span>{todo.text}</span><br/>
                <button 
                  onClick={() => restoreTodo(index)} 
                  className={styles.buttonSmall}
                >
                  復元
                </button>
                <button 
                  onClick={() => deleteTodoPermanently(index)} 
                  className={styles.buttonSmall}
                >
                  完全削除
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {deletedNotes.length > 0 && (
        <div>
          <h2 className={styles.deletedNotesTitle}>削除されたメモ</h2>
          <ul className={styles.deletedNoteList}>
            {deletedNotes.map((note, index) => (
              <li key={index} className={styles.deletedNoteItem}>
                <p>{note}</p><br/>
                <button 
                  onClick={() => deleteNotePermanently(index)} 
                  className={styles.buttonSmall}
                >
                  完全削除
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Todo;
