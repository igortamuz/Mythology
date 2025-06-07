import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../Pages/Header/header";
import "../ResetCss/reset.css";
import Footer from "../Pages/Footer/footer";
import Home from "../Pages/Bodys/home/home";
import Terms from "../Pages/Bodys/terms/terms";
import GodsPage from "../Pages/Bodys/gods/godsPage";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
			<Route path="/Entrada" element={<Home />} />
            <Route path="/Termos" element={<Terms />} />
            <Route path="/panteao/:panteao/:nomeDeus" element={<GodsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;