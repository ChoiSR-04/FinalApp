import { NavLink } from 'react-router-dom';
import { Home, BookOpen, HelpCircle, Gamepad2, User } from 'lucide-react';
import './BottomNav.css';

const BottomNav = () => {
  const navItems = [
    { path: '/', icon: <Home size={24} />, label: '홈' },
    { path: '/vocabulary', icon: <BookOpen size={24} />, label: '단어장' },
    { path: '/quiz', icon: <HelpCircle size={24} />, label: '퀴즈' },
    { path: '/game', icon: <Gamepad2 size={24} />, label: '게임룸' },
    { path: '/mypage', icon: <User size={24} />, label: 'My' },
  ];

  return (
    <nav className="bottom-nav">
      <div className="nav-container">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <div className="icon-wrapper">{item.icon}</div>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
