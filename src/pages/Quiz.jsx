import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPoints } from '../utils/vocabDb';
import Header from '../components/Header';
import './Quiz.css';

const Quiz = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(10);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState(null);
  const [isTimeoutReview, setIsTimeoutReview] = useState(false);

  const finishQuiz = () => {
    addPoints(50);
    setIsFinished(true);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (isFinished || feedbackStatus !== null || isTimeoutReview) return prev;
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished, feedbackStatus, isTimeoutReview]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `[${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}]`;
  };

  const questions = [
    {
      id: 1,
      examText: (
        <>
          3. (4 points) The <u>circumference</u> of a sphere was measured to be 84 cm with a possible error of 0.5 cm. Use differentials to estimate the maximum error in the calculated surface area. What is the relative error?
        </>
      ),
      questionWord: 'Circumference',
      options: [
        { id: 1, text: '원주(둘레)' },
        { id: 2, text: '표면적' },
        { id: 4, text: '지름' }
      ],
      correctId: 1
    },
    {
      id: 2,
      examText: (
        <>
          1. (4 points) Let P be a point on <span className="math">x² + 2xy + 2y² = 16</span>. Suppose that the tangent line at P is <u>perpendicular</u> to the tangent line at (4,0). Find all points P by using implicit differentiation.
        </>
      ),
      questionWord: 'Perpendicular',
      options: [
        { id: 1, text: '평행의' },
        { id: 2, text: '수직의' },
        { id: 3, text: '접하는' },
        { id: 4, text: '일치하는' }
      ],
      correctId: 2
    },
    {
      id: 3,
      examText: (
        <>
          1. (3 points) Let <span className="math">C</span> be the curve <br />
          <span className="math">x² + y² + xy - 27 = 0</span>. <br />
          Find the points on the curve <span className="math">C</span> where the tangent is <u>horizontal</u> or vertical.
        </>
      ),
      questionWord: 'Horizontal',
      options: [
        { id: 1, text: '수평의' },
        { id: 2, text: '수직의' },
        { id: 3, text: '접선의' },
        { id: 4, text: '곡선의' }
      ],
      correctId: 1
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (timeLeft === 0 && feedbackStatus === null && !isFinished && !isTimeoutReview) {
      setSelectedOption(currentQuestion.correctId);
      setFeedbackStatus('timeout');
      
      setTimeout(() => {
        setFeedbackStatus(null);
        setIsTimeoutReview(true);
      }, 1500);
    }
  }, [timeLeft, feedbackStatus, isFinished, isTimeoutReview, currentQuestionIndex, currentQuestion.correctId, questions.length]);

  const handleNext = () => {
    if (isTimeoutReview) {
      setIsTimeoutReview(false);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption(null);
        setTimeLeft(10);
      } else {
        finishQuiz();
      }
      return;
    }

    if (selectedOption !== null && feedbackStatus === null) {
      const isCorrect = selectedOption === currentQuestion.correctId;
      
      if (isCorrect) {
        setFeedbackStatus('correct');
        setTimeout(() => {
          setFeedbackStatus(null);
          if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
            setTimeLeft(10);
          } else {
            finishQuiz();
          }
        }, 1200);
      } else {
        setFeedbackStatus('incorrect');
        setTimeout(() => {
          setFeedbackStatus(null);
          setSelectedOption(null);
        }, 1200);
      }
    }
  };

  if (isFinished) {
    return (
      <div className="page-container quiz-page" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Header title="퀴즈 완료" showBack={true} />
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', width: '100%', marginTop: '40px' }}>
          <h2>퀴즈 완료!</h2>
          <p style={{ marginTop: '16px', color: 'var(--text-light)' }}>모든 문제를 다 푸셨습니다.</p>
          <button className="btn-primary mt-4" style={{ width: '100%', padding: '12px' }} onClick={() => navigate('/')}>
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container quiz-page">
      <Header title="오늘의 퀴즈" showBack={true} />
      
      <div className="quiz-header">
        <h2 className="quiz-subtitle">시험장 시뮬레이션 ({currentQuestionIndex + 1}/{questions.length})</h2>
        <span className="quiz-timer">{formatTime(timeLeft)}</span>
      </div>

      <div className="exam-paper glass-panel">
        <p className="exam-text">
          {currentQuestion.examText}
        </p>
      </div>

      <div className="question-block glass-panel">
        <h3 className="question-text">
          Q. <strong>{currentQuestion.questionWord}</strong>의 뜻은?
        </h3>
        
        <div className="options-list">
          {currentQuestion.options.map(opt => (
            <div 
              key={opt.id} 
              className={`option-item ${selectedOption === opt.id ? 'selected' : ''}`}
              onClick={() => {
                if (!isTimeoutReview) setSelectedOption(opt.id);
              }}
            >
              <div className="radio-circle">
                {selectedOption === opt.id && <div className="radio-inner"></div>}
              </div>
              <span className="option-text">{opt.text}</span>
            </div>
          ))}
        </div>

        <button 
          className="btn-primary" 
          style={{ width: '100%', marginTop: '24px', padding: '14px', fontSize: '1rem' }}
          onClick={handleNext}
          disabled={(selectedOption === null || feedbackStatus !== null) && !isTimeoutReview}
        >
          {isTimeoutReview ? '다음' : (currentQuestionIndex < questions.length - 1 ? '선택' : '선택 (완료)')}
        </button>

        {feedbackStatus && (
          <div className={`feedback-overlay feedback-${feedbackStatus === 'timeout' ? 'incorrect' : feedbackStatus}`}>
            <div className="feedback-icon">
              {feedbackStatus === 'correct' ? '⭕' : '❌'}
            </div>
            <div className="feedback-text">
              {feedbackStatus === 'correct' ? '정답!' : (feedbackStatus === 'timeout' ? '시간 초과!' : '오답!')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
