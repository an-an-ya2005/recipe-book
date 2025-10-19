import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/Homepage";
import Login from "./pages/login";
import Register from "./pages/register";
import Header from "./components/header";
import Footer from "./components/footer";
import Recipes from "./pages/recipes";
import AddRecipe from "./pages/addrecipe";
import RecipeFinder from "./pages/RecipeFinder";

function App() {
  return (
    <Router>
      <div>
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:category" element={<Recipes />} />
          <Route path="/addrecipe" element={<AddRecipe />} />
          <Route path="/updaterecipe/:id" element={<AddRecipe />} />
          <Route path="/findrecipes" element={<RecipeFinder />} /> {/* Fixed path */}
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
