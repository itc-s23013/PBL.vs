
// components/TodoList.js
import React from 'react';
import styles from './Todo.module.css';

const TodoList = ({
  todos,
  deletedTodos,
  input,
  dueDate,
  noteInput,
  priority,
  isEditingTodo,
  handleInputChange,
  handleDueDateChange,
  handleNoteInputChange,
  handlePriorityChange,
  handleAddTodo,
  handleToggleTodo,
  handleEditTodo,
  handleRemoveTodo,
  handleRestoreTodo,
  handlePermanentlyRemoveTodo
}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>TODOリスト</h1>
      <input 
        type="text" 
        value={input} 
        onChange={handleInputChange} 
        placeholder="新しいTODOを入力"
        className={styles.input}
      />
      <input 
        type="date" 
        value={dueDate} 
        onChange={handleDueDateChange}
        className={styles.input}
      />
      <textarea
        value={noteInput}
        onChange={handleNoteInputChange}
        placeholder="メモを追加"
        rows="4"
        cols="50"
        className={styles.input}
      />
      <select
        value={priority}
        onChange={handlePriorityChange}
        className={styles.input}
      >
        <option value="低">低</option>
        <option value="中">中</option>
        <option value="高">高</option>
      </select>
      <button 
        onClick={handleAddTodo} 
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
              onClick={() => handleToggleTodo(index)} 
              className={styles.buttonSmall}
            >
              {todo.completed ? '未完了' : '完了'}
            </button>
            <button 
              onClick={() => handleEditTodo(index)} 
              className={styles.buttonSmall}
            >
              編集
            </button>
            <button 
              onClick={() => handleRemoveTodo(index)} 
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
                  onClick={() => handleRestoreTodo(index)} 
                  className={styles.buttonSmall}
                >
                  復元
                </button>
                <button 
                  onClick={() => handlePermanentlyRemoveTodo(index)} 
                  className={styles.buttonSmall}
                >
                  完全に削除
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TodoList;
