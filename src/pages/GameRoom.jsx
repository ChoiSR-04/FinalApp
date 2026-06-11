import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import { getCategories, getWordsByFolderId, getAllWords } from '../utils/vocabDb';
import './GameRoom.css';

const GameRoom = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isCleared, setIsCleared] = useState(false); // Added for clear state
  const [inputValue, setInputValue] = useState('');

  // New state for category selection
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [gameStarted, setGameStarted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [gameId, setGameId] = useState(0); // Added to trigger useEffect on restart

  useEffect(() => {
    const rawCategories = getCategories();
    const folderList = [{ id: 'all', name: '전체 (모든 단어 혼합)' }];
    rawCategories.forEach(cat => {
      cat.folders.forEach(folder => {
        folderList.push({ id: String(folder.id), name: folder.name });
      });
    });
    setCategories(folderList);
  }, []);

  const activeWordsRef = useRef([]);
  const scoreRef = useRef(0);
  const livesRef = useRef(5);
  const isGameOverRef = useRef(false);
  const isClearedRef = useRef(false);
  const fireworksRef = useRef([]);
  const remainingWordsRef = useRef([]); // To keep track of words that haven't dropped yet

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    livesRef.current = lives;
    if (lives <= 0 && !isGameOverRef.current) {
      setIsGameOver(true);
      isGameOverRef.current = true;
    }
  }, [lives]);

  useEffect(() => {
    if (!gameStarted) return; // Removed isGameOver guard to keep rendering fireworks after win

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const gameWidth = rect.width;
    const gameHeight = rect.height;

    let animationId;
    let spawnTimer = 0;
    let baseSpeed = 1;

    const currentWordList = selectedCategory === 'all'
      ? getAllWords()
      : getWordsByFolderId(selectedCategory);

    const getRandomWord = () => {
      if (remainingWordsRef.current.length === 0) return null;

      const randomIndex = Math.floor(Math.random() * remainingWordsRef.current.length);
      const word = remainingWordsRef.current.splice(randomIndex, 1)[0];

      const x = 60 + Math.random() * (gameWidth - 120);
      return {
        id: Date.now() + Math.random(),
        en: word.en,
        ko: word.ko,
        x: x,
        y: -30,
        speed: baseSpeed + Math.random() * 0.3,
        color: `hsla(${Math.random() * 360}, 70%, 95%, 0.85)`
      };
    };

    const createFirework = (x, y) => {
      const particleCount = 30 + Math.floor(Math.random() * 20);
      const baseHue = Math.random() * 360;
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 3.5;
        fireworksRef.current.push({
          x: x,
          y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1,
          gravity: 0.05,
          alpha: 1,
          decay: 0.015 + Math.random() * 0.015,
          size: 2 + Math.random() * 2,
          color: `hsla(${baseHue + (Math.random() * 40 - 20)}, 95%, 60%, 1)`
        });
      }
    };

    const draw = () => {
      // Game over by losing all lives: stop drawing
      if (isGameOverRef.current && livesRef.current <= 0) return;

      ctx.clearRect(0, 0, gameWidth, gameHeight);

      // Draw fireworks when game is cleared
      if (isClearedRef.current) {
        if (Math.random() < 0.04) {
          createFirework(
            50 + Math.random() * (gameWidth - 100),
            50 + Math.random() * (gameHeight / 2)
          );
        }

        const particles = fireworksRef.current;
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += p.gravity;
          p.alpha -= p.decay;

          if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        animationId = requestAnimationFrame(draw);
        return;
      }

      baseSpeed = 0.5 + (scoreRef.current / 50) * 0.5;
      const spawnRate = Math.max(30, 150 - (scoreRef.current / 5));

      spawnTimer++;
      if (spawnTimer > spawnRate) {
        const newWord = getRandomWord();
        if (newWord) {
          activeWordsRef.current.push(newWord);
        }
        spawnTimer = 0;
      }

      // Check if player cleared the level (no remaining words AND no active words falling)
      if (remainingWordsRef.current.length === 0 && activeWordsRef.current.length === 0) {
        setIsCleared(true);
        isClearedRef.current = true;
        setIsGameOver(true);
        isGameOverRef.current = true;
        createFirework(gameWidth / 2, gameHeight / 2);
        createFirework(gameWidth / 4, gameHeight / 3);
        createFirework(3 * gameWidth / 4, gameHeight / 3);
      }

      for (let i = activeWordsRef.current.length - 1; i >= 0; i--) {
        const wordObj = activeWordsRef.current[i];

        wordObj.y += wordObj.speed;

        if (wordObj.y > gameHeight) {
          activeWordsRef.current.splice(i, 1);
          setLives(prev => prev - 1);
          continue;
        }

        ctx.save();
        ctx.fillStyle = wordObj.color;
        ctx.font = 'bold 16px Inter, Pretendard, sans-serif';
        const textMetrics = ctx.measureText(wordObj.en);
        const blockWidth = textMetrics.width + 28;
        const blockHeight = 38;

        ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 4;

        ctx.beginPath();
        ctx.roundRect(wordObj.x - blockWidth / 2, wordObj.y - blockHeight / 2, blockWidth, blockHeight, 16);
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.shadowColor = 'transparent';

        ctx.fillStyle = '#1e293b';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(wordObj.en, wordObj.x, wordObj.y + 1);
        ctx.restore();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [gameStarted, selectedCategory, gameId]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    const input = inputValue.trim();
    if (!input || isGameOver || !gameStarted) return;

    const currentWords = activeWordsRef.current;
    let matchIndex = -1;

    for (let i = 0; i < currentWords.length; i++) {
      const ko = currentWords[i].ko;
      if (ko === input || (ko.includes(input) && input.length >= 2)) {
        if (matchIndex === -1 || currentWords[i].y > currentWords[matchIndex].y) {
          matchIndex = i;
        }
      }
    }

    if (matchIndex !== -1) {
      activeWordsRef.current.splice(matchIndex, 1);
      setScore(prev => prev + 10);
      setInputValue('');
    } else {
      setInputValue('');
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setGameId(prev => prev + 1); // Trigger useEffect restart
    activeWordsRef.current = [];
    isGameOverRef.current = false;
    isClearedRef.current = false;
    fireworksRef.current = [];

    // Initialize remaining words pool for this game
    const wordList = selectedCategory === 'all'
      ? getAllWords()
      : getWordsByFolderId(selectedCategory);
    remainingWordsRef.current = [...wordList];

    setScore(0);
    setLives(5);
    setIsGameOver(false);
    setIsCleared(false);
    setInputValue('');
  };

  const returnToMenu = () => {
    setGameStarted(false);
  };

  return (
    <div className="page-container game-page">
      <Header title="게임룸" showBack={true} />

      {!gameStarted ? (
        <div className="start-screen glass-panel">
          <h2>학습할 카테고리를 선택하세요</h2>
          <div className="category-list">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <button className="btn-primary start-btn" onClick={startGame}>
            게임 시작
          </button>
        </div>
      ) : (
        <>
          <div className="game-status glass-panel">
            <div className="lives">
              남은 목숨: {Array(5).fill(0).map((_, i) => (
                <span key={i} className={`heart ${i < lives ? 'filled' : 'empty'}`}>
                  ❤️
                </span>
              ))}
            </div>
            <div className="score">점수: {score}</div>
          </div>

          <div className="canvas-container">
            {isGameOver && (
              <div className="game-over-overlay">
                <h3>{isCleared ? '클리어! 🎉' : '게임 종료!'}</h3>
                <p>최종 점수: {score}</p>
                <div className="game-over-actions">
                  <button className="btn-primary" onClick={startGame}>다시하기</button>
                  <button className="btn-secondary" onClick={returnToMenu}>메뉴로</button>
                </div>
              </div>
            )}
            <canvas ref={canvasRef} className="game-canvas"></canvas>
          </div>

          <div className="input-container glass-panel">
            <form onSubmit={handleInputSubmit}>
              <input
                type="text"
                className="word-input"
                placeholder="단어의 뜻을 입력하세요..."
                value={inputValue}
                onChange={handleInputChange}
                disabled={isGameOver}
                autoFocus
                autoComplete="off"
              />
              <button type="submit" className="submit-btn btn-primary" disabled={isGameOver}>입력</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default GameRoom;
