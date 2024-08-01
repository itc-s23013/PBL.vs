const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <li className="flex justify-between items-center border-b p-2">
      <span
        className={`flex-1 ${todo.completed ? 'line-through' : ''}`}
        onClick={toggleTodo}
      >
        {todo.text}
      </span>
      <button
        onClick={deleteTodo}
        className="bg-red-500 text-white p-1 rounded"
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;

