import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../Components/Header/header";
import "../GlobalCss/reset.css";
import Footer from "../Components/Footer/footer";
import Home from "../Components/Bodys/home/home";
import Terms from "../Components/Bodys/terms/terms";
import GodsPage from "../Components/Bodys/gods/godsPage";
import GlobalKeywordApplier from "../GlobalWrapper/globalApplier"; 

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <GlobalKeywordApplier>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Entrada" element={<Home />} />
              <Route path="/Termos" element={<Terms />} />
              <Route path="/panteao/:panteao/:nomeDeus" element={<GodsPage />} />
            </Routes>
          </GlobalKeywordApplier>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;