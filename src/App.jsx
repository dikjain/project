import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home.jsx';
import NextMove from './NextMove.jsx';
import AuthPage from './AuthPage.jsx';
import { UserProvider } from './Context/Context.jsx';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/next-move" element={<NextMove />} />
        </Routes>
      </Router>
  );
}

export default App;