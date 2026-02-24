import { useState } from "react";

 function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "123") {
      onLogin(); // On appelle la fonction pour dire que l'utilisateur est connecté
    } else {
      alert("Identifiants incorrects ! (Essaye admin / 123)");
    }
  };

  return (
    <div className="login-card">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Nom d'utilisateur" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Mot de passe" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}
export default Login