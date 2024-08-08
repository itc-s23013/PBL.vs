// components/Todo.js
import { useState, useEffect } from 'react';
import TodoList from './TodoList';
import styles from './Todo.module.css';

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

  const permanentlyRemoveTodo = (index) => {
    const newDeletedTodos = deletedTodos.filter((_, i) => i !== index);
    setDeletedTodos(newDeletedTodos);
  };

  return (
    <TodoList
      todos={todos}
      deletedTodos={deletedTodos}
      input={input}
      dueDate={dueDate}
      noteInput={noteInput}
      priority={priority}
      isEditingTodo={isEditingTodo}
      handleInputChange={(e) => setInput(e.target.value)}
      handleDueDateChange={(e) => setDueDate(e.target.value)}
      handleNoteInputChange={(e) => setNoteInput(e.target.value)}
      handlePriorityChange={(e) => setPriority(e.target.value)}
      handleAddTodo={addTodo}
      handleToggleTodo={toggleTodo}
      handleEditTodo={editTodo}
      handleRemoveTodo={removeTodo}
      handleRestoreTodo={restoreTodo}
      handlePermanentlyRemoveTodo={permanentlyRemoveTodo}
    />
  );
};

export default Todo;
