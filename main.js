const URL = "https://teachablemachine.withgoogle.com/models/X_HrR4tJg/";
let model, labelContainer, maxPredictions;

const translations = {
  ko: {
    title: "인공지능 동물상 테스트",
    heading: "나의 동물상은?",
    subHeading: "강아지상일까, 고양이상일까? AI가 분석해드립니다!",
    uploadBtn: "사진 업로드하기",
    contactHeading: "제휴 문의",
    labelEmail: "이메일 주소",
    labelMessage: "문의 내용",
    submitBtn: "보내기",
    dog: "강아지",
    cat: "고양이"
  },
  en: {
    title: "AI Animal Face Test",
    heading: "What's Your Animal Face?",
    subHeading: "Dog or Cat? Our AI will analyze for you!",
    uploadBtn: "Upload Photo",
    contactHeading: "Affiliate Inquiry",
    labelEmail: "Email Address",
    labelMessage: "Message",
    submitBtn: "Send",
    dog: "Dog",
    cat: "Cat"
  },
  ja: {
    title: "AI動物顔診断",
    heading: "私の動物顔は？",
    subHeading: "犬顔？猫顔？AI가 분석합니다!",
    uploadBtn: "写真をアップロード",
    contactHeading: "提휴のお問い合わせ",
    labelEmail: "メールアドレス",
    labelMessage: "お問い合わせ内容",
    submitBtn: "送信",
    dog: "犬",
    cat: "猫"
  }
};

let currentLang = localStorage.getItem('lang') || 'ko';

function updateUI() {
  const t = translations[currentLang];
  document.getElementById('site-title').textContent = t.title;
  document.getElementById('main-heading').textContent = t.heading;
  document.getElementById('sub-heading').textContent = t.subHeading;
  document.getElementById('upload-btn').textContent = t.uploadBtn;
  document.getElementById('contact-heading').textContent = t.contactHeading;
  document.getElementById('label-email').textContent = t.labelEmail;
  document.getElementById('label-message').textContent = t.labelMessage;
  document.getElementById('submit-btn').textContent = t.submitBtn;
}

function changeLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  updateUI();
  if (model) predict(); // Re-predict to update labels if image exists
}

// Load Model
async function loadModel() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();
}

// Handle Image Upload
async function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async function(e) {
    const imgElement = document.getElementById('face-image');
    imgElement.src = e.target.result;
    imgElement.style.display = 'block';
    
    if (!model) await loadModel();
    await predict();
  };
  reader.readAsDataURL(file);
}

// Predict using uploaded image
async function predict() {
  const imgElement = document.getElementById('face-image');
  if (!imgElement.src || imgElement.style.display === 'none') return;

  const prediction = await model.predict(imgElement);
  const t = translations[currentLang];
  
  labelContainer = document.getElementById("label-container");
  labelContainer.innerHTML = ''; // Clear previous results

  for (let i = 0; i < maxPredictions; i++) {
    const className = prediction[i].className;
    const prob = prediction[i].probability.toFixed(2);
    const labelDisplay = className === "dog" ? t.dog : (className === "cat" ? t.cat : className);
    
    const bar = document.createElement("div");
    bar.className = "result-bar";
    bar.innerHTML = `
      <div class="label-text">${labelDisplay}: ${(prob * 100).toFixed(0)}%</div>
      <div class="bar-bg">
        <div class="bar-fill ${className}-fill" style="width: ${prob * 100}%"></div>
      </div>
    `;
    labelContainer.appendChild(bar);
  }
}

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark-mode');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Init
updateUI();
loadModel(); // Pre-load model
