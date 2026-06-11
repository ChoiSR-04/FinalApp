import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bell, Settings, Plus } from 'lucide-react';
import './Header.css';

const Header = ({ title, showBack, rightIcon, onRightIconClick }) => {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <div className="header-left">
        {showBack && (
          <button className="icon-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} />
          </button>
        )}
      </div>
      <h1 className="header-title">{title}</h1>
      <div className="header-right">
        {rightIcon === 'bell' && (
          <button className="icon-btn" onClick={onRightIconClick}>
            <Bell size={20} />
          </button>
        )}
        {rightIcon === 'settings' && (
          <button className="icon-btn" onClick={onRightIconClick}>
            <Settings size={20} />
          </button>
        )}
        {rightIcon === 'add' && (
          <button className="btn-small-primary" onClick={onRightIconClick}>
            <Plus size={16} /> 추가
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
