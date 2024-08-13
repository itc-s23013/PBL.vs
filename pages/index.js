import Head from 'next/head';
import { useState, useEffect } from 'react';

// Todoコンポーネント
const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [todoDetail, setTodoDetail] = useState('');
  const [subtaskText, setSubtaskText] = useState({}); // 各タスクのサブタスクの入力状態を保持

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
    if (todoText.trim()) {
      setTodos([...todos, { id: Date.now(), text: todoText, detail: todoDetail, subtasks: [] }]);
      setTodoText('');
      setTodoDetail('');
    }
  };

  const addSubtask = (todoId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId && subtaskText[todoId]?.trim()) {
        return {
          ...todo,
          subtasks: [...todo.subtasks, { id: Date.now(), text: subtaskText[todoId] }]
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setSubtaskText({ ...subtaskText, [todoId]: '' });
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const removeSubtask = (todoId, subtaskId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          subtasks: todo.subtasks.filter((subtask) => subtask.id !== subtaskId)
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h2>タスク一覧</h2>
      <input
        type="text"
        placeholder="タスクのタイトル"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <textarea
        placeholder="タスクの詳細"
        value={todoDetail}
        onChange={(e) => setTodoDetail(e.target.value)}
      />
      <button onClick={addTodo}>追加</button>
      <div>
        {todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            <div>
              <span className="todo-title">{todo.text}</span>
              <p className="todo-detail">{todo.detail}</p>
              <div className="subtasks">
                {todo.subtasks.map((subtask) => (
                  <div key={subtask.id} className="subtask-item">
                    <span>{subtask.text}</span>
                    <button onClick={() => removeSubtask(todo.id, subtask.id)}>削除</button>
                  </div>
                ))}
              </div>
              <input
                type="text"
                placeholder="サブタスクを追加"
                value={subtaskText[todo.id] || ''}
                onChange={(e) => setSubtaskText({ ...subtaskText, [todo.id]: e.target.value })}
              />
              <button onClick={() => addSubtask(todo.id)}>サブタスク追加</button>
            </div>
            <button onClick={() => removeTodo(todo.id)}>削除</button>
          </div>
        ))}
      </div>
      <style global jsx>{`
        body, html {
          margin: 0;
          padding: 0;
          font-family: 'Roboto', sans-serif;
          background-color: #e9ecef;
        }

        h1, h2 {
          margin: 0;
          padding: 10px 0;
          color: #343a40;
        }

        button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          margin: 10px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }

        button:hover {
          background-color: #0056b3;
        }

        input, textarea {
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
          margin-bottom: 10px;
          width: calc(100% - 22px);
          font-size: 16px;
        }

        textarea {
          resize: none;
          height: 60px;
        }

        .main-container {
          max-width: 600px;
          margin: 50px auto;
          background-color: white;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          text-align: left;
        }

        .todo-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 10px 0;
          border-bottom: 1px solid #dee2e6;
        }

        .todo-item:last-child {
          border-bottom: none;
        }

        .todo-title {
          font-size: 18px;
          color: #495057;
        }

        .todo-detail {
          font-size: 14px;
          color: #6c757d;
          margin: 0;
        }

        .subtasks {
          margin-top: 10px;
        }

        .subtask-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px 0;
          border-top: 1px solid #dee2e6;
        }

        .subtask-item:first-child {
          border-top: none;
        }

        .subtask-item span {
          font-size: 14px;
          color: #495057;
        }

        .subtask-item button {
          background-color: #dc3545;
          font-size: 12px;
          padding: 3px 8px;
        }

        .subtask-item button:hover {
          background-color: #c82333;
        }
      `}</style>
    </div>
  );
};

// Homeコンポーネント
export default function Home() {
  const [showTodo, setShowTodo] = useState(false);

  useEffect(() => {
    const savedShowTodo = JSON.parse(localStorage.getItem('showTodo'));
    if (savedShowTodo !== null) {
      setShowTodo(savedShowTodo);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('showTodo', JSON.stringify(showTodo));
  }, [showTodo]);

  return (
    <div>
      <Head>
        <title>TODOアプリ</title>
        <meta name="description" content="Next.jsで作成したTODOアプリ" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main-container">
        {showTodo ? (
          <Todo />
        ) : (
          <div style={{ textAlign: 'center' }}>
            <h1>TODOアプリへようこそ</h1>
            <p>タスクを管理して効率的に仕事を進めましょう。</p>
            <button onClick={() => setShowTodo(true)}>開始</button>
          </div>
        )}
      </main>
    </div>
  );
}
