import { wordsData as initialWordsData } from '../data/wordsData';

const CATEGORIES_KEY = 'vocab_categories';
const WORDS_KEY = 'vocab_words';

const defaultCategories = [
  {
    title: '1. 공대 기초 영단어 모음집',
    folders: [
      { id: 1, name: '공학 수학 필수 어휘', progress: 75, icon: 'book' },
      { id: 2, name: '물리학/실험 기본 용어', progress: 40, icon: 'book' }
    ]
  },
  {
    title: '2. 전공 수업별 영단어 모음집',
    folders: [
      { id: 3, name: '회로이론 및 실험', progress: 90, icon: 'book' },
      { id: 4, name: '신호 및 시스템', progress: 15, icon: 'book' }
    ]
  },
  {
    title: '3. 스스로 만드는 단어장 (커스텀)',
    folders: [
      { id: 5, name: '중간고사 오답 노트', count: initialWordsData[5] ? initialWordsData[5].length : 0, icon: 'star', isCustom: true },
      { id: 6, name: '대학원 논문 독해용', count: initialWordsData[6] ? initialWordsData[6].length : 0, icon: 'star', isCustom: true }
    ]
  }
];

export const initVocabDb = () => {
  if (!localStorage.getItem(CATEGORIES_KEY)) {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(defaultCategories));
  }
  if (!localStorage.getItem(WORDS_KEY)) {
    localStorage.setItem(WORDS_KEY, JSON.stringify(initialWordsData));
  }
};

export const getCategories = () => {
  initVocabDb();
  return JSON.parse(localStorage.getItem(CATEGORIES_KEY));
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
        title: '3. 스스로 만드는 단어장 (커스텀)',
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
  const targetId = Number(folderId);

  // Remove from categories
  for (let cat of categories) {
    const index = cat.folders.findIndex(f => Number(f.id) === targetId);
    if (index !== -1) {
      cat.folders.splice(index, 1);
      break;
    }
  }

  // Remove from wordsMap
  delete wordsMap[targetId];

  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  localStorage.setItem(WORDS_KEY, JSON.stringify(wordsMap));
};
