import Header from '../components/Header';
import { Book } from 'lucide-react';
import './MyPage.css';

const MyPage = () => {
  return (
    <div className="page-container mypage-page">
      <Header title="마이페이지" rightIcon="settings" onRightIconClick={() => alert('설정')} />

      <div className="profile-card glass-panel">
        <div className="profile-header">
          <img src="/sad_robot.png" alt="Profile" className="profile-img" />
          <div className="profile-info">
            <h2 className="profile-name">김철수 님</h2>
            <p className="profile-level">Level 8</p>
            <p className="profile-points">Points 1250 P</p>
          </div>
          <button className="btn-edit">정보수정</button>
        </div>
        <div className="profile-details">
          <p>전공: 전자공학과</p>
          <p>이메일: kcs***@postech.ac.kr</p>
        </div>
      </div>

      <div className="stats-card glass-panel">
        <h3 className="section-title">학습기록</h3>
        <ul className="stats-list">
          <li>총 학습 단어 수: 1450개</li>
          <li>총 퀴즈 참여 수: 45회</li>
          <li>최고 연속 학습 일수: 15일</li>
        </ul>
      </div>

      <div className="stats-card glass-panel">
        <h3 className="section-title">주간 학습 추이</h3>
        <div className="bar-chart">
          {/* Simple CSS bar chart */}
          <div className="bar-container"><div className="bar" style={{height: '90%'}}></div><span className="day">Mon</span></div>
          <div className="bar-container"><div className="bar" style={{height: '60%'}}></div><span className="day">Tue</span></div>
          <div className="bar-container"><div className="bar" style={{height: '60%'}}></div><span className="day">Wed</span></div>
          <div className="bar-container"><div className="bar" style={{height: '60%'}}></div><span className="day">Thu</span></div>
          <div className="bar-container"><div className="bar" style={{height: '20%'}}></div><span className="day">Fri</span></div>
          <div className="bar-container"><div className="bar" style={{height: '10%'}}></div><span className="day">Sat</span></div>
        </div>
      </div>

      <div className="recent-card glass-panel">
        <h3 className="section-title">최근 학습 단어장</h3>
        <div className="folder-list">
          <div className="folder-item">
            <div className="icon-wrap"><Book size={20} color="#3b82f6" /></div>
            <div className="folder-text">
              <h4>공학 수학 필수 어휘</h4>
              <p>(진행률: 75%)</p>
            </div>
          </div>
          <div className="folder-item">
            <div className="icon-wrap"><Book size={20} color="#3b82f6" /></div>
            <div className="folder-text">
              <h4>물리학/실험 기본 용어</h4>
              <p>(진행률: 40%)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
