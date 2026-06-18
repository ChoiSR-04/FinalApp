import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const streakDays = 1; // 임시 하드코딩 값
  const robotImage = streakDays > 10 ? "/smiling_robot.png" : "/sad_robot.png";
  const robotAlt = streakDays > 10 ? "Smiling Robot" : "Sad Robot";

  return (
    <div className="page-container home-page">
      <Header title="공대 영단어 마스터" rightIcon="bell" />
      
      <div className="character-section">
        <div className="character-bg-grid"></div>
        <img src={robotImage} alt={robotAlt} className="robot-image" />
        
        <div className="streak-badge glass-panel">
          <span className="fire-icon">🔥</span> 연속 학습: {streakDays}일째
        </div>
      </div>

      <div className="challenge-section">
        <h2 className="section-title">오늘의 챌린지</h2>
        <div className="challenge-card glass-panel">
          <div className="challenge-content">
            <p className="challenge-subtitle">오늘의 챌린지 잡공!</p>
            <h3 className="challenge-title">매운맛 퀴즈</h3>
            <p className="challenge-desc">매운맛 퀴즈를 시작하세요!</p>
            <button className="btn-primary mt-4" onClick={() => navigate('/quiz')}>
              매운맛 퀴즈
            </button>
          </div>
          <div className="challenge-icon">
            <span style={{fontSize: '4rem'}}>🔥</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
