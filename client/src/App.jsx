import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import HomePage from "./pages/Homepage";
import Login from "./pages/login";
import Register from "./pages/register";
import Recipes from "./pages/recipes";
import AddRecipe from "./pages/addrecipe";
import RecipeFinder from "./pages/RecipeFinder";
import Profile from "./pages/profile";
import ProtectedRoute from "./components/protectedroute";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:category" element={<Recipes />} />

        {/* Profile routes */}
        <Route path="/profile" element={<Navigate to="/profile/me" replace />} />
        <Route path="/profile/me" element={
          <ProtectedRoute><Profile /></ProtectedRoute>
        } />
        <Route path="/profile/:userId" element={
          <ProtectedRoute><Profile /></ProtectedRoute>
        } />

        {/* Other protected pages */}
        <Route path="/addrecipe" element={
          <ProtectedRoute><AddRecipe /></ProtectedRoute>
        } />
        <Route path="/updaterecipe/:id" element={
          <ProtectedRoute><AddRecipe /></ProtectedRoute>
        } />
        <Route path="/findrecipes" element={
          <ProtectedRoute><RecipeFinder /></ProtectedRoute>
        } />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
