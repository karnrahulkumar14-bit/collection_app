
import "./index.css";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Donation from "./pages/Donation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import Expenses from "./pages/Expenses";
import Adminpanel from "./pages/Adminpanel";
import Error from "./pages/Error";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

import { DonationProvider } from "./store/DonationProvider";

function App() {
  return (
    <DonationProvider>
      <BrowserRouter>
        <Navigation />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/collections" element={<Donation />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/admin" element={<Adminpanel />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </DonationProvider>
  );
}

export default App;
