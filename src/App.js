import AppRouter from "./routers/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./pages/Header";
import { Footer } from "./pages/Footer";
import { Modal } from "./components";

import "./App.css";

const App = () => {




  return (
    <BrowserRouter>
      <Header />
      <Modal/>
      <AppRouter />
      <Footer />
    </BrowserRouter>
  );

};

export default App;
