import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Login from "./pages/login";
import Register from "./pages/register";
import Header from "./components/header";
import Footer from "./components/footer";
import Recipes from './pages/recipes';
import AddRecipe from "./pages/addrecipe"; 
// Ensure the correct import path

function App() {
  return (
    <Router>
      <div>
        {/* Header */}
        <header><Header/></header>

        {/* Main Content */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recipes" element={<Recipes />} /> {/* Shows all recipes */}
          <Route path="/recipes/:category" element={<Recipes />} /> {/* Category-based recipes */}
          <Route path="/addrecipe" element={<AddRecipe />} /> {/* ✅ Add this route */}
        </Routes>

        {/* Footer */}
        <footer><Footer/></footer>
      </div>
    </Router>
  );
}

export default App;
