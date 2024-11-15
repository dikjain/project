import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import NextMove from './NextMove.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/next-move" element={<NextMove />} />
      </Routes>
    </Router>
  );
}

export default App;