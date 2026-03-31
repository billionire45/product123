const translations = {
  ko: {
    title: "저녁 메뉴 추천",
    heading: "오늘 저녁 뭐 먹지?",
    recommend: "메뉴 추천받기",
    theme: "다크 모드",
    default: "메뉴를 추천해드릴게요!",
    contactHeading: "제휴 문의",
    labelEmail: "이메일 주소",
    labelMessage: "문의 내용",
    submitBtn: "보내기",
    placeholderEmail: "example@mail.com",
    placeholderMessage: "문의 내용을 입력해주세요.",
    menus: [
      { name: "비빔밥", img: "https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=400" },
      { name: "스테이크", img: "https://images.unsplash.com/photo-1546241072-48010ad2862c?q=80&w=400" },
      { name: "초밥", img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=400" },
      { name: "파스타", img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=400" },
      { name: "라면", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=400" }
    ]
  },
  en: {
    title: "Dinner Recommender",
    heading: "What's for dinner?",
    recommend: "Recommend Menu",
    theme: "Dark Mode",
    default: "I'll recommend a menu!",
    contactHeading: "Affiliate Inquiry",
    labelEmail: "Email Address",
    labelMessage: "Message",
    submitBtn: "Send",
    placeholderEmail: "example@mail.com",
    placeholderMessage: "Enter your message here.",
    menus: [
      { name: "Bibimbap", img: "https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=400" },
      { name: "Steak", img: "https://images.unsplash.com/photo-1546241072-48010ad2862c?q=80&w=400" },
      { name: "Sushi", img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=400" },
      { name: "Pasta", img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=400" },
      { name: "Ramen", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=400" }
    ]
  },
  ja: {
    title: "晩御飯のおすすめ",
    heading: "今夜、何食べる？",
    recommend: "メニューを提案",
    theme: "ダークモード",
    default: "メニューを提案します！",
    contactHeading: "提携のお問い合わせ",
    labelEmail: "メールアドレス",
    labelMessage: "お問い合わせ内容",
    submitBtn: "送信",
    placeholderEmail: "example@mail.com",
    placeholderMessage: "内容を入力してください。",
    menus: [
      { name: "ビビンバ", img: "https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=400" },
      { name: "ステーキ", img: "https://images.unsplash.com/photo-1546241072-48010ad2862c?q=80&w=400" },
      { name: "寿司", img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=400" },
      { name: "パスタ", img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=400" },
      { name: "라면", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=400" }
    ]
  }
};

let currentLang = localStorage.getItem('lang') || 'ko';

function updateUI() {
  const t = translations[currentLang];
  document.getElementById('site-title').textContent = t.title;
  document.getElementById('main-heading').textContent = t.heading;
  document.getElementById('recommend-btn').textContent = t.recommend;
  document.getElementById('theme-toggle').textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
  
  // Contact form translations
  document.getElementById('contact-heading').textContent = t.contactHeading;
  document.getElementById('label-email').textContent = t.labelEmail;
  document.getElementById('label-message').textContent = t.labelMessage;
  document.getElementById('submit-btn').textContent = t.submitBtn;
  document.getElementById('email').placeholder = t.placeholderEmail;
  document.getElementById('message').placeholder = t.placeholderMessage;

  // Update menu if not empty
  const menuName = document.getElementById('menu-name').textContent;
  if (menuName === translations['ko'].default || menuName === translations['en'].default || menuName === translations['ja'].default) {
    document.getElementById('menu-name').textContent = t.default;
  }
}

function changeLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  updateUI();
}

function recommendMenu() {
  const menus = translations[currentLang].menus;
  const randomIndex = Math.floor(Math.random() * menus.length);
  const selected = menus[randomIndex];
  
  document.getElementById('menu-name').textContent = selected.name;
  document.getElementById('menu-image').src = selected.img;
}

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
  updateUI();
});

// Init
updateUI();
