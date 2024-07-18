import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import About from "./pages/About";
import Services from "./pages/Services";
import PrivateRoute from "./components/PrivateRoute";
import Movie from "./pages/Movie";
import Search from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<Home />} />
          <Route path="/searchmovies" element={<Search />} />
          <Route path="/movies/:id" element={<Movie />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
