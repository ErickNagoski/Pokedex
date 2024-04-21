import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import TimePage from './pages/time';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/time' element={<TimePage />} />
      </Routes>
    </Router>
  )
}

export default App;

