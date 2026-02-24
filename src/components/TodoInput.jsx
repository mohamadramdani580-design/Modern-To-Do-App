function TodoInput({ task, setTask, handleAdd, editIndex }) {
  return (
    <div className="inputBox">
      <input 
        value={task} 
        onChange={(e) => setTask(e.target.value)} 
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        placeholder="Ajouter une tâche..." 
      />
      <button onClick={handleAdd}>
        {editIndex !== null ? "Update" : "Add"}
      </button>
    </div>
  );
}
export default TodoInput