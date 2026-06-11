import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Search, Folder, Book, Star, Edit, Trash2, Plus, X } from 'lucide-react';
import { getCategories, saveVocabulary, deleteVocabulary, getWordsByFolderId } from '../utils/vocabDb';
import './Vocabulary.css';

const Vocabulary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
  const [editingFolderId, setEditingFolderId] = useState(null);
  const [vocabName, setVocabName] = useState('');
  const [wordsList, setWordsList] = useState([{ en: '', ko: '' }]);

  const loadCategories = () => {
    setCategories(getCategories());
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleOpenCreateModal = () => {
    setModalMode('create');
    setEditingFolderId(null);
    setVocabName('');
    setWordsList([{ en: '', ko: '' }]);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (e, folder) => {
    e.stopPropagation(); // Card 클릭으로 페이지 이동되는 것 방지
    setModalMode('edit');
    setEditingFolderId(folder.id);
    setVocabName(folder.name);

    const existingWords = getWordsByFolderId(folder.id);
    setWordsList(existingWords.length > 0 ? existingWords : [{ en: '', ko: '' }]);
    setIsModalOpen(true);
  };

  const handleDeleteFolder = (e, folderId, folderName) => {
    e.stopPropagation();
    if (window.confirm(`"${folderName}" 단어장을 삭제하시겠습니까?`)) {
      deleteVocabulary(folderId);
      loadCategories();
    }
  };

  const handleAddWordRow = () => {
    setWordsList([...wordsList, { en: '', ko: '' }]);
  };

  const handleRemoveWordRow = (index) => {
    if (wordsList.length === 1) {
      setWordsList([{ en: '', ko: '' }]);
    } else {
      setWordsList(wordsList.filter((_, i) => i !== index));
    }
  };

  const handleWordChange = (index, field, value) => {
    const updated = [...wordsList];
    updated[index][field] = value;
    setWordsList(updated);
  };

  const handleSave = () => {
    if (!vocabName.trim()) {
      alert('단어장 이름을 입력해 주세요.');
      return;
    }

    // Filter out empty rows
    const filteredWords = wordsList.filter(w => w.en.trim() && w.ko.trim());
    if (filteredWords.length === 0) {
      alert('최소 한 개 이상의 영어 단어와 한글 뜻을 입력해 주세요.');
      return;
    }

    saveVocabulary(editingFolderId, vocabName.trim(), filteredWords);
    setIsModalOpen(false);
    loadCategories();
  };

  // Filter categories and folders based on search term
  const filteredCategories = categories.map(cat => {
    const matchedFolders = cat.folders.filter(folder =>
      folder.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return {
      ...cat,
      folders: matchedFolders
    };
  }).filter(cat => cat.folders.length > 0);

  return (
    <div className="page-container vocab-page">
      <Header
        title="나의 단어장"
        showBack={true}
        rightIcon="add"
        onRightIconClick={handleOpenCreateModal}
      />

      <div className="search-bar glass-panel">
        <Search size={20} className="search-icon" />
        <input
          type="text"
          placeholder="검색: 단어장 이름을 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="category-list1">
        {filteredCategories.map((cat, idx) => (
          <div key={idx} className="category-section">
            <h3 className="category-title">
              <Folder size={18} className="folder-icon" fill="#fbbf24" stroke="#fbbf24" />
              {cat.title}
            </h3>

            <div className="folder-list">
              {cat.folders.map(folder => (
                <div
                  key={folder.id}
                  className="folder-card glass-panel"
                  onClick={() => navigate(`/flashcard/${folder.id}`)}
                >
                  <div className="folder-icon-wrapper">
                    {folder.icon === 'book' ?
                      <Book size={24} color="#3b82f6" fill="#bfdbfe" /> :
                      <Star size={24} color="#f59e0b" fill="#fef3c7" />}
                  </div>
                  <div className="folder-info">
                    <h4 className="folder-name">{folder.name}</h4>
                    {folder.progress !== undefined ? (
                      <div className="progress-text">(진행률: {folder.progress}%)</div>
                    ) : (
                      <div className="progress-text">(단어 수: {folder.count}개)</div>
                    )}
                  </div>

                  {/* Custom Vocab actions */}
                  {folder.isCustom && (
                    <div className="folder-actions">
                      <button
                        className="action-icon-btn edit-btn"
                        onClick={(e) => handleOpenEditModal(e, folder)}
                        title="단어장 수정"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="action-icon-btn delete-btn"
                        onClick={(e) => handleDeleteFolder(e, folder.id, folder.name)}
                        title="단어장 삭제"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        {filteredCategories.length === 0 && (
          <div className="no-results glass-panel">
            검색 결과가 존재하지 않습니다.
          </div>
        )}
      </div>

      {/* Vocabulary Create/Edit Modal */}
      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content glass-panel">
            <div className="modal-header">
              <h2>{modalMode === 'create' ? '새 단어장 만들기' : '단어장 수정하기'}</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="vocab-name">단어장 이름</label>
                <input
                  type="text"
                  id="vocab-name"
                  placeholder="예: 전공 필수 어휘 모음"
                  value={vocabName}
                  onChange={(e) => setVocabName(e.target.value)}
                  className="modal-input"
                />
              </div>

              <div className="word-form-section">
                <div className="section-title-row">
                  <h3>단어 목록 추가</h3>
                  <button className="btn-small-primary" onClick={handleAddWordRow}>
                    <Plus size={14} /> 행 추가
                  </button>
                </div>

                <div className="word-rows-container">
                  {wordsList.map((word, index) => (
                    <div key={index} className="word-input-row">
                      <input
                        type="text"
                        placeholder="영어 단어 (예: Concept)"
                        value={word.en}
                        onChange={(e) => handleWordChange(index, 'en', e.target.value)}
                        className="modal-input word-en-input"
                      />
                      <input
                        type="text"
                        placeholder="한글 뜻 (예: 개념)"
                        value={word.ko}
                        onChange={(e) => handleWordChange(index, 'ko', e.target.value)}
                        className="modal-input word-ko-input"
                      />
                      <button
                        className="btn-delete-row"
                        onClick={() => handleRemoveWordRow(index)}
                        title="이 행 삭제"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setIsModalOpen(false)}>취소</button>
              <button className="btn-primary" onClick={handleSave}>저장</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vocabulary;
