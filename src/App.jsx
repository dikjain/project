import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home.jsx';
import NextMove from './NextMove.jsx';
import AuthPage from './AuthPage.jsx';
import { UserProvider } from './Context/Context.jsx';
import UserLines from './UserLines.jsx';
import LandingPage from './LandingPage.jsx';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/next-move" element={<NextMove />} />
          <Route path="/userlines" element={<UserLines />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </Router>
  );
}

export default App;