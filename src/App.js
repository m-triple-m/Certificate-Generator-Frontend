
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import NotFound from './components/NotFound';
import Generator from './components/Generator';
import TemplateManager from './components/TemplateManager';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <Toaster position='top-right' />
      <BrowserRouter>
      <Header />
        <Routes>
          <Route element={<Navigate to="/login" />} path='/' />
          <Route element={<Login />} path='login' />
          <Route element={<NotFound />} path='*' />
          <Route element={<Generator />} path='generate' />
          <Route element={<TemplateManager />} path='templates' />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
