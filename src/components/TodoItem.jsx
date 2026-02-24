function TodoItem({ t, globalIndex, handleEdit, handleDelete }) {
  return (
    <li className="task">
      <span>{t}</span>
      <div className="actions">
        <button className="edit" onClick={() => handleEdit(globalIndex)}>
          Edit
        </button>
        <button className="delete" onClick={() => handleDelete(globalIndex)}>
          Delete
        </button>
      </div>
    </li>
  );
}
export default TodoItem