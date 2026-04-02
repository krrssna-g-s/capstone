import "./App.css";
import { Header } from "./components/Header";
import Footer from "./components/Footer";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <div className="grid">
      <Header />
      <div className="page-content">
        <AppRouter />
      </div>
      <Footer />
    </div>
  );
}

export default App;
