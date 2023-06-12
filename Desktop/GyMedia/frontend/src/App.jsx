import "./app.css";
import NavBar from "./components/NavBar/NavBar";
import { Routes, Route } from "react-router-dom";
import RecipesPage from "./components/Recetas/RecipesPage";
import IndexComponent from "./components/Index/IndexComponent";
import UserProfile from "./components/User/UserProfile";
import Dashboard from "./components/Dashboard/Dashboard";
import CardIndex from "./components/Rutinas/CardIndex";
import Testing from "./components/Rutinas/Testing";

function App() {
  return (
    <>
      <Routes>
        <Route path="/Recetas" element={<RecipesPage />} />
        <Route path="/" element={<IndexComponent />} />
        <Route path="/Rutinas" element={<CardIndex />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/user-settings" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
