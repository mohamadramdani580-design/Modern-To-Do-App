import { useState, useEffect } from "react";
import "./App.css";

// Import des composants depuis ton dossier components
import TodoInput from "./components/TodoInput";
import TodoItem from "./components/TodoItem";
import Pagination from "./components/Pagination";
import Login from "./components/Login";

function App() {
  // --- ÉTATS (STATES) ---
  
  // CORRECTION : Initialisation de l'état avec localStorage pour rester connecté
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedAuth = localStorage.getItem("isLoggedIn");
    return savedAuth === "true"; // Retourne true si la valeur est "true", sinon false
  });

  const [task, setTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 3;

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  // --- EFFETS (EFFECTS) ---
  
  // Sauvegarde du statut de connexion
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  // Sauvegarde des tâches et gestion de la page actuelle
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    const totalPages = Math.ceil(tasks.length / tasksPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [tasks, currentPage]);

  // Application du Dark Mode
  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // --- FONCTIONS LOGIQUES ---

  const handleAdd = () => {
    if (task.trim() === "") {
      alert("Veuillez entrer une tâche !");
      return;
    }
    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex] = task;
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, task]);
    }
    setTask("");
  };

  const handleDelete = (globalIndex) => {
    if (window.confirm("Tu veux vraiment supprimer cette tâche ?")) {
      const newTasks = tasks.filter((_, idx) => idx !== globalIndex);
      setTasks(newTasks);
    }
  };

  const handleEdit = (globalIndex) => {
    setTask(tasks[globalIndex]);
    setEditIndex(globalIndex);
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // --- CALCULS PAGINATION ---
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  // --- RENDU CONDITIONNEL ---

  // Si l'utilisateur n'est pas connecté, on affiche UNIQUEMENT le composant Login
  if (!isLoggedIn) {
    return (
      <div className="container">
        <Login onLogin={() => setIsLoggedIn(true)} />
      </div>
    );
  }

  // Si l'utilisateur est connecté, on affiche la To-Do List
  return (
    <div className="container">
      <div className="top-bar">
        <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>
          Déconnexion
        </button>
        <button className="theme-toggle" onClick={toggleDarkMode}>
          {isDarkMode ? "☀️ Mode Clair" : "🌙 Mode Sombre"}
        </button>
      </div>

      <h1>✨ Modern To-Do List</h1>

      <TodoInput 
        task={task} 
        setTask={setTask} 
        handleAdd={handleAdd} 
        editIndex={editIndex} 
      />

      <ul>
        {currentTasks.map((t, i) => (
          <TodoItem 
            key={indexOfFirstTask + i}
            t={t}
            globalIndex={indexOfFirstTask + i}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </ul>

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;