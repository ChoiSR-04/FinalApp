import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { getWordsByFolderId, markWordLearned, getLastStudiedIndex, saveLastStudiedIndex, updateRecentFolder } from '../utils/vocabDb';
import './Flashcard.css';

const Flashcard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const words = getWordsByFolderId(id);
  
  const initialIndex = getLastStudiedIndex(id);
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= words.length ? 0 : initialIndex);
  const [showMeaning, setShowMeaning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (words.length > 0) {
      updateRecentFolder(id);
    }
  }, [id, words.length]);

  // If invalid ID
  if (words.length === 0) {
    return (
      <div className="page-container">
        <Header title="단어장 오류" showBack={true} />
        <p>단어장이 비어있거나 존재하지 않습니다.</p>
      </div>
    );
  }

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      if (showMeaning) {
        setShowMeaning(false);
        setTimeout(() => {
          const nextIndex = currentIndex + 1;
          setCurrentIndex(nextIndex);
          saveLastStudiedIndex(id, nextIndex);
        }, 300);
      } else {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        saveLastStudiedIndex(id, nextIndex);
      }
    } else {
      setIsFinished(true);
    }
  };

  const handleCardClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    if (x < width * 0.3) {
      // Left 30%: Previous Card
      if (currentIndex > 0) {
        if (showMeaning) {
          setShowMeaning(false);
          setTimeout(() => {
            const nextIndex = currentIndex - 1;
            setCurrentIndex(nextIndex);
            saveLastStudiedIndex(id, nextIndex);
          }, 300);
        } else {
          const nextIndex = currentIndex - 1;
          setCurrentIndex(nextIndex);
          saveLastStudiedIndex(id, nextIndex);
        }
      }
    } else if (x > width * 0.7) {
      // Right 30%: Next Card
      handleNext();
    } else {
      // Center 40%: Flip or Go Next
      if (!showMeaning) {
        setShowMeaning(true);
        markWordLearned(id, currentIndex);
      } else {
        handleNext();
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    saveLastStudiedIndex(id, 0);
    setShowMeaning(false);
    setIsFinished(false);
  };

  return (
    <div className="page-container flashcard-page">
      <Header title="단어 암기" showBack={true} />
      
      {!isFinished ? (
        <div className="flashcard-container">
          <div className="progress-info">
            단어 {currentIndex + 1} / {words.length}
          </div>
          
          <div 
            className={`flashcard glass-panel ${showMeaning ? 'flipped' : ''}`} 
            onClick={handleCardClick}
          >
            <div className="flashcard-inner">
              <div className="flashcard-front">
                <h2 className="word-en">{words[currentIndex].en}</h2>
              </div>
              <div className="flashcard-back">
                <h2 className="word-ko">{words[currentIndex].ko}</h2>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="finished-container glass-panel">
          <h2>🎉 학습 완료!</h2>
          <p>단어를 모두 학습했습니다.</p>
          <div className="action-buttons">
            <button className="btn-primary" onClick={handleRestart}>다시 학습하기</button>
            <button className="btn-outline" onClick={() => navigate('/vocabulary')}>단어장 목록으로</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flashcard;
