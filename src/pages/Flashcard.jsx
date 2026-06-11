import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { getWordsByFolderId } from '../utils/vocabDb';
import './Flashcard.css';

const Flashcard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const words = getWordsByFolderId(id);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // If invalid ID
  if (words.length === 0) {
    return (
      <div className="page-container">
        <Header title="단어장 오류" showBack={true} />
        <p>단어장이 비어있거나 존재하지 않습니다.</p>
      </div>
    );
  }

  const handleCardClick = () => {
    if (!showMeaning) {
      // First click: show meaning
      setShowMeaning(true);
    } else {
      // Second click: flip back first, then change word after card is edge-on
      setShowMeaning(false);
      setTimeout(() => {
        if (currentIndex < words.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          setIsFinished(true);
        }
      }, 300); // 0.3s = halfway through 0.6s flip (card is at 90°, invisible)
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
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
                <p className="click-hint">클릭해서 뜻 확인</p>
              </div>
              <div className="flashcard-back">
                <h2 className="word-ko">{words[currentIndex].ko}</h2>
                <p className="click-hint">클릭해서 다음 단어</p>
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
