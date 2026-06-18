import { wordsData as initialWordsData } from '../data/wordsData';

const CATEGORIES_KEY = 'vocab_categories';
const WORDS_KEY = 'vocab_words';
const PROGRESS_KEY = 'vocab_progress';
const LAST_INDEX_KEY = 'vocab_last_index';
const RECENT_FOLDERS_KEY = 'vocab_recent_folders';

const defaultCategories = [
  {
    title: '1. 공대 기초 영단어',
    folders: [
      { id: 1, name: '미적분학 필수 어휘', icon: 'book' },
      { id: 2, name: '일반물리학 필수 어휘', icon: 'book' }
    ]
  },
  {
    title: '2. 전공 수업별 영단어',
    folders: [
      { id: 3, name: '회로이론', icon: 'book' },
      { id: 4, name: '전자기학', icon: 'book' }
    ]
  },
  {
    title: '3. 스스로 만드는 단어장',
    folders: [
      { id: 5, name: '중간고사 오답 노트', count: initialWordsData[5] ? initialWordsData[5].length : 0, icon: 'star', isCustom: true }
    ]
  }
];

export const initVocabDb = () => {
  if (!localStorage.getItem(CATEGORIES_KEY)) {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(defaultCategories));
  } else {
    // Sync folder names & category titles from defaults into localStorage
    const categories = JSON.parse(localStorage.getItem(CATEGORIES_KEY));
    
    // Remove folder 6 (대학원 논문 독해용) completely if it exists in cache
    categories.forEach(cat => {
      const idx = cat.folders.findIndex(f => Number(f.id) === 6);
      if (idx !== -1) cat.folders.splice(idx, 1);
    });

    defaultCategories.forEach((defCat, catIdx) => {
      if (categories[catIdx]) {
        categories[catIdx].title = defCat.title;
        defCat.folders.forEach(defFolder => {
          const existing = categories[catIdx].folders.find(f => f.id === defFolder.id);
          if (existing) {
            existing.name = defFolder.name;
          }
        });
      }
    });
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  }
  if (!localStorage.getItem(WORDS_KEY)) {
    localStorage.setItem(WORDS_KEY, JSON.stringify(initialWordsData));
  } else {
    // Sync default words (folders 1-4) from initialWordsData
    const wordsMap = JSON.parse(localStorage.getItem(WORDS_KEY));
    [1, 2, 3, 4].forEach(id => {
      if (initialWordsData[id]) {
        wordsMap[id] = initialWordsData[id];
      }
    });
    localStorage.setItem(WORDS_KEY, JSON.stringify(wordsMap));
  }
  if (!localStorage.getItem(PROGRESS_KEY)) {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify({}));
  }
  if (!localStorage.getItem(LAST_INDEX_KEY)) {
    localStorage.setItem(LAST_INDEX_KEY, JSON.stringify({}));
  }
};

export const getCategories = () => {
  initVocabDb();
  const categories = JSON.parse(localStorage.getItem(CATEGORIES_KEY));
  const wordsMap = JSON.parse(localStorage.getItem(WORDS_KEY));
  const progressMap = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');

  // Calculate progress and count for each folder dynamically
  categories.forEach(cat => {
    cat.folders.forEach(folder => {
      const totalWords = wordsMap[folder.id] ? wordsMap[folder.id].length : 0;
      const learnedWords = progressMap[folder.id] ? progressMap[folder.id].length : 0;
      folder.count = totalWords;
      folder.progress = totalWords > 0 ? Math.round((learnedWords / totalWords) * 100) : 0;
    });
  });

  return categories;
};

export const getWordsByFolderId = (folderId) => {
  initVocabDb();
  const wordsMap = JSON.parse(localStorage.getItem(WORDS_KEY));
  return wordsMap[folderId] || [];
};

export const getAllWords = () => {
  initVocabDb();
  const wordsMap = JSON.parse(localStorage.getItem(WORDS_KEY));
  return Object.values(wordsMap).flat();
};

export const markWordLearned = (folderId, wordIndex) => {
  initVocabDb();
  const progressMap = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
  if (!progressMap[folderId]) {
    progressMap[folderId] = [];
  }
  if (!progressMap[folderId].includes(wordIndex)) {
    progressMap[folderId].push(wordIndex);
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressMap));
    addPoints(5); // Add 5 points for learning a new word
  }
};

export const addPoints = (points) => {
  const currentPoints = Number(localStorage.getItem('user_points') || 0);
  localStorage.setItem('user_points', currentPoints + points);
  return currentPoints + points;
};

export const getUserStats = () => {
  const totalPoints = Number(localStorage.getItem('user_points') || 0);
  let level = 1;
  let pointsNeededForNext = 50;
  let currentLevelStartPoints = 0;

  while (totalPoints >= currentLevelStartPoints + pointsNeededForNext) {
    currentLevelStartPoints += pointsNeededForNext;
    level++;
    pointsNeededForNext *= 2;
  }

  const pointsInCurrentLevel = totalPoints - currentLevelStartPoints;

  return {
    level,
    totalPoints,
    pointsInCurrentLevel,
    pointsNeededForNext
  };
};

export const getLastStudiedIndex = (folderId) => {
  initVocabDb();
  const indexMap = JSON.parse(localStorage.getItem(LAST_INDEX_KEY) || '{}');
  return indexMap[folderId] || 0;
};

export const saveLastStudiedIndex = (folderId, index) => {
  initVocabDb();
  const indexMap = JSON.parse(localStorage.getItem(LAST_INDEX_KEY) || '{}');
  indexMap[folderId] = index;
  localStorage.setItem(LAST_INDEX_KEY, JSON.stringify(indexMap));
  updateRecentFolder(folderId);
};

export const updateRecentFolder = (folderId) => {
  const recent = JSON.parse(localStorage.getItem(RECENT_FOLDERS_KEY) || '[]');
  const updated = [folderId, ...recent.filter(id => String(id) !== String(folderId))].slice(0, 3);
  localStorage.setItem(RECENT_FOLDERS_KEY, JSON.stringify(updated));
};

export const getRecentFolders = () => {
  initVocabDb();
  const recentIds = JSON.parse(localStorage.getItem(RECENT_FOLDERS_KEY) || '[]');
  const categories = getCategories();
  const allFolders = [];
  categories.forEach(cat => allFolders.push(...cat.folders));
  
  const recentFolders = [];
  recentIds.forEach(id => {
    const folder = allFolders.find(f => String(f.id) === String(id));
    if (folder) recentFolders.push(folder);
  });
  
  return recentFolders;
};

export const saveVocabulary = (folderId, name, words) => {
  initVocabDb();
  const categories = JSON.parse(localStorage.getItem(CATEGORIES_KEY));
  const wordsMap = JSON.parse(localStorage.getItem(WORDS_KEY));

  let targetFolderId = folderId;

  if (targetFolderId) {
    // 1. Update existing folder
    targetFolderId = Number(targetFolderId); // Ensure number
    let found = false;
    for (let cat of categories) {
      const folder = cat.folders.find(f => Number(f.id) === targetFolderId);
      if (folder) {
        folder.name = name;
        if (folder.count !== undefined) {
          folder.count = words.length;
        }
        found = true;
        break;
      }
    }
    wordsMap[targetFolderId] = words;
  } else {
    // 2. Create new folder (always goes to the '스스로 만드는 단어장 (커스텀)' category)
    targetFolderId = Date.now(); // unique numeric id
    const newFolder = {
      id: targetFolderId,
      name: name,
      count: words.length,
      icon: 'star',
      isCustom: true
    };
    
    // Find the '스스로 만드는 단어장 (커스텀)' category
    const customCat = categories.find(cat => cat.title.includes('스스로 만드는 단어장'));
    if (customCat) {
      customCat.folders.push(newFolder);
    } else {
      // Fallback
      categories.push({
        title: '3. 스스로 만드는 단어장',
        folders: [newFolder]
      });
    }
    wordsMap[targetFolderId] = words;
  }

  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  localStorage.setItem(WORDS_KEY, JSON.stringify(wordsMap));
  return targetFolderId;
};

export const deleteVocabulary = (folderId) => {
  initVocabDb();
  const categories = JSON.parse(localStorage.getItem(CATEGORIES_KEY));
  const wordsMap = JSON.parse(localStorage.getItem(WORDS_KEY));
  const progressMap = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
  const targetId = Number(folderId);

  // Remove from categories
  for (let cat of categories) {
    const index = cat.folders.findIndex(f => Number(f.id) === targetId);
    if (index !== -1) {
      cat.folders.splice(index, 1);
      break;
    }
  }

  // Remove from wordsMap and progressMap
  delete wordsMap[targetId];
  delete progressMap[targetId];

  const indexMap = JSON.parse(localStorage.getItem(LAST_INDEX_KEY) || '{}');
  delete indexMap[targetId];

  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  localStorage.setItem(WORDS_KEY, JSON.stringify(wordsMap));
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressMap));
  localStorage.setItem(LAST_INDEX_KEY, JSON.stringify(indexMap));
};
