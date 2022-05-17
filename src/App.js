import AppRouter from './routers/AppRouter';
import { Header } from './pages/Header';
import { Footer } from './pages/Footer';
import { BrowserRouter } from 'react-router-dom';

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Header />
        <AppRouter />
        <Footer />
      </BrowserRouter>
    </>
  );

};

export default App;
