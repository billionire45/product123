const URL = "https://teachablemachine.withgoogle.com/models/X_HrR4tJg/";
let model, webcam, labelContainer, maxPredictions;

const translations = {
  ko: {
    title: "인공지능 동물상 테스트",
    heading: "나의 동물상은?",
    subHeading: "강아지상일까, 고양이상일까? AI가 분석해드립니다!",
    startBtn: "테스트 시작하기 (웹캠)",
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
    startBtn: "Start Test (Webcam)",
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
    subHeading: "犬顔？猫顔？AIが分析します！",
    startBtn: "診断開始 (ウェブカメラ)",
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
  document.getElementById('start-btn').textContent = t.startBtn;
  document.getElementById('contact-heading').textContent = t.contactHeading;
  document.getElementById('label-email').textContent = t.labelEmail;
  document.getElementById('label-message').textContent = t.labelMessage;
  document.getElementById('submit-btn').textContent = t.submitBtn;
}

function changeLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  updateUI();
}

// Teachable Machine Logic
async function init() {
  document.getElementById('start-btn').style.display = 'none';
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  const flip = true;
  webcam = new tmImage.Webcam(300, 300, flip);
  await webcam.setup();
  await webcam.play();
  window.requestAnimationFrame(loop);

  document.getElementById("webcam-container").appendChild(webcam.canvas);
  labelContainer = document.getElementById("label-container");
  for (let i = 0; i < maxPredictions; i++) {
    const bar = document.createElement("div");
    bar.className = "result-bar";
    bar.innerHTML = `
      <div class="label-text"></div>
      <div class="bar-bg">
        <div class="bar-fill"></div>
      </div>
    `;
    labelContainer.appendChild(bar);
  }
}

async function loop() {
  webcam.update();
  await predict();
  window.requestAnimationFrame(loop);
}

async function predict() {
  const prediction = await model.predict(webcam.canvas);
  const t = translations[currentLang];
  
  for (let i = 0; i < maxPredictions; i++) {
    const className = prediction[i].className; // "dog" or "cat"
    const prob = prediction[i].probability.toFixed(2);
    const labelDisplay = className === "dog" ? t.dog : (className === "cat" ? t.cat : className);
    
    const bar = labelContainer.childNodes[i];
    bar.querySelector('.label-text').textContent = `${labelDisplay}: ${(prob * 100).toFixed(0)}%`;
    const fill = bar.querySelector('.bar-fill');
    fill.style.width = (prob * 100) + "%";
    fill.className = `bar-fill ${className}-fill`;
  }
}

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark-mode');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

updateUI();
