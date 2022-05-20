import AppRouter from "./routers/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./pages/Header";
import { Footer } from "./pages/Footer";

const App = () => {

  return (
      <BrowserRouter>
        <Header />
        <AppRouter />
        <Footer />
      </BrowserRouter>
  );

};

export default App;
