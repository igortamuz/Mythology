import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../Components/Header/header";
import "../ResetCss/reset.css";
import Footer from "../Components/Footer/footer";
import Home from "../Components/Bodys/home/home";
import Termos from "../Components/Bodys/termos/termos";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
			<Route path="/Entrada" element={<Home />} />
            <Route path="/Termos" element={<Termos />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;