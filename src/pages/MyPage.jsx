import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Book, Star } from 'lucide-react';
import { getUserStats, getRecentFolders } from '../utils/vocabDb';
import './MyPage.css';

const MyPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '김철수',
    major: '전자공학과',
    grade: '3학년',
    email: 'kcs***@postech.ac.kr'
  });
  const [stats, setStats] = useState({ level: 1, totalPoints: 0, pointsInCurrentLevel: 0, pointsNeededForNext: 50 });
  const [recentFolders, setRecentFolders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('userInfo');
    if (saved) {
      setUserInfo(JSON.parse(saved));
    }
    setStats(getUserStats());
    setRecentFolders(getRecentFolders());
  }, []);

  const handleSave = () => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="page-container mypage-page">
      <Header title="마이페이지" rightIcon="settings" onRightIconClick={() => alert('설정')} />

      <div className="profile-card glass-panel">
        <div className="profile-header">
          <img src="/smiling_robot.png" alt="Profile" className="profile-img" />
          <div className="profile-info">
            {isEditing ? (
              <input
                type="text"
                className="edit-input name-input"
                value={userInfo.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            ) : (
              <h2 className="profile-name">{userInfo.name} 님</h2>
            )}
            <p className="profile-level">Level {stats.level}</p>
            <div className="level-progress-container">
              <div className="level-progress-bar">
                <div 
                  className="level-progress-fill" 
                  style={{ width: `${Math.min(100, (stats.pointsInCurrentLevel / stats.pointsNeededForNext) * 100)}%` }}
                ></div>
              </div>
              <p className="level-progress-text">
                {stats.pointsInCurrentLevel} / {stats.pointsNeededForNext} P
              </p>
            </div>
          </div>
          {isEditing ? (
            <button className="btn-edit" onClick={handleSave}>저장</button>
          ) : (
            <button className="btn-edit" onClick={() => setIsEditing(true)}>정보수정</button>
          )}
        </div>
        <div className="profile-details">
          {isEditing ? (
            <div className="edit-form">
              <div className="edit-row">
                <label>전공:</label>
                <input 
                  type="text" 
                  className="edit-input" 
                  value={userInfo.major} 
                  onChange={(e) => handleChange('major', e.target.value)} 
                />
              </div>
              <div className="edit-row">
                <label>학년:</label>
                <input 
                  type="text" 
                  className="edit-input" 
                  value={userInfo.grade} 
                  onChange={(e) => handleChange('grade', e.target.value)} 
                />
              </div>
              <div className="edit-row">
                <label>이메일:</label>
                <input 
                  type="text" 
                  className="edit-input" 
                  value={userInfo.email} 
                  onChange={(e) => handleChange('email', e.target.value)} 
                />
              </div>
            </div>
          ) : (
            <>
              <p>전공: {userInfo.major}</p>
              <p>학년: {userInfo.grade}</p>
              <p>이메일: {userInfo.email}</p>
            </>
          )}
        </div>
      </div>

      <div className="recent-card glass-panel">
        <h3 className="section-title">최근 학습 단어장</h3>
        {recentFolders.length > 0 ? (
          <div className="folder-list">
            {recentFolders.map((folder, idx) => (
              <div 
                key={idx} 
                className="folder-item" 
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/flashcard/${folder.id}`)}
              >
                <div className="icon-wrap">
                  {folder.icon === 'book' ? <Book size={20} color="#3b82f6" /> : <Star size={20} color="#f59e0b" />}
                </div>
                <div className="folder-text">
                  <h4>{folder.name}</h4>
                  <p>(진행률: {folder.progress !== undefined ? folder.progress : 0}%)</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', textAlign: 'center', margin: '20px 0' }}>
            최근 학습한 단어장이 없습니다.
          </p>
        )}
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
    </div>
  );
};

export default MyPage;
