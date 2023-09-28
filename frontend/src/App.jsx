import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/nav/Nav";
import Header from "./components/header/Header";
import About from "./components/about/About";
import Product from "./components/product/Product";
import Team from "./components/team/Team";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import Pricing from "./components/pricing/Pricing";
import Whyus from "./components/whyus/Whyus";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Moods from "./components/moods/Moods";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";
import { isAuthenticated } from "./services/auth.service";

const App = () => {
  const isLoggedIn = isAuthenticated();
  return (
    <Router>
      <div className="app-container">
        <Nav isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/moods" element={<ProtectedRoute element={Moods} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

const Home = () => {
  return (
    <>
      <Header />
      <About />
      <Product />
      <Whyus />
      <Pricing />
      <Team />
      <Contact />
    </>
  );
};

export default App;
