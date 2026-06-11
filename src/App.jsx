import { Routes, Route, useLocation } from 'react-router-dom';

import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Vocabulary from './pages/Vocabulary';
import Flashcard from './pages/Flashcard';
import Quiz from './pages/Quiz';
import GameRoom from './pages/GameRoom';
import MyPage from './pages/MyPage';

function App() {
  const location = useLocation();

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/vocabulary" element={<Vocabulary />} />
        <Route path="/flashcard/:id" element={<Flashcard />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/game" element={<GameRoom />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
      <BottomNav />
    </>
  );
}

export default App;
