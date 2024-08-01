// components/Todo.js
import { useState, useEffect } from 'react';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState('');

  // ローカルストレージからTODOリストとメモを読み込む
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    const savedNotes = JSON.parse(localStorage.getItem('notes'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  // TODOリストが変更されたらローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // メモが変更されたらローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

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

  const addNote = () => {
    if (noteInput.trim()) {
      setNotes([...notes, noteInput]);
      setNoteInput('');
    }
  };

  const removeNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
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
      <button onClick={addTodo}>追加</button>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo} 
            <button onClick={() => removeTodo(index)}>削除</button>
          </li>
        ))}
      </ul>
      <h1>メモ</h1>
      <textarea
        value={noteInput}
        onChange={(e) => setNoteInput(e.target.value)}
        placeholder="新しいメモを入力"
        rows="4"
        cols="50"
      />
      <button onClick={addNote}>追加</button>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {notes.map((note, index) => (
          <li key={index}>
            {note} 
            <button onClick={() => removeNote(index)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;