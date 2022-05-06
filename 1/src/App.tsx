import './App.css';
import HomePage from './pages/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DetailsPage from './pages/DetailsPage';


function App() {

  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}>
            </Route>
            <Route path="/:id" element={<DetailsPage/>}/>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
