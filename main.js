const URL = "https://teachablemachine.withgoogle.com/models/X_HrR4tJg/";
let model, labelContainer, maxPredictions;

const translations = {
  ko: {
    title: "인공지능 동물상 테스트 - AI가 알려주는 나의 얼굴상",
    navTest: "테스트", navAbout: "소개", navInfo: "정보",
    mainHeading: "나의 동물상은?",
    subHeading: "강아지상일까, 고양이상일까? AI가 분석해드립니다!",
    uploadBtn: "사진 업로드하기",
    aboutTitle: "AI 동물상 테스트란?",
    aboutContent: "<p>이 테스트는 Google의 <b>Teachable Machine</b> 기술을 활용하여 제작되었습니다. 수만 장의 동물상 데이터를 학습한 인공지능이 당신의 이목구비를 분석하여 가장 닮은 동물상을 찾아드립니다.</p><p>단순히 재미를 넘어, 최근 유행하는 퍼스널 이미지 메이킹의 도구로 활용해 보세요. 당신의 매력을 가장 잘 나타내는 스타일을 찾는 데 도움을 줍니다.</p>",
    dogTitle: "🐶 다정다감한 매력, 강아지상 특징",
    dogDesc: "강아지상은 전체적으로 둥글고 부드러운 얼굴 라인과 선한 눈매가 가장 큰 특징입니다. 눈의 꼬리가 살짝 내려가 있어 보는 사람에게 편안함과 신뢰감을 주며, 코가 둥글고 입꼬리가 올라가 있어 항상 웃는 듯한 인상을 풍깁니다. 이러한 외모는 주변 사람들에게 친근함과 다정다감한 이미지를 전달하며, '호감형'의 대표적인 스타일로 손꼽힙니다. 연예인들 중에서도 팬들에게 친밀하게 다가가는 스타들이 많은 비중을 차지하는 얼굴상입니다.",
    catTitle: "🐱 세련되고 신비로운 매력, 고양이상 특징",
    catDesc: "고양이상은 날렵한 턱선과 위로 살짝 올라간 눈매가 매력적인 스타일입니다. 눈매가 뚜렷하고 눈동자가 커서 지적이면서도 시크한 분위기를 자아내며, 오똑한 콧날이 세련미를 더해줍니다. 차가워 보일 수 있지만 알면 알수록 깊은 매력을 느끼게 하는 '츤데레' 같은 신비로움을 가지고 있습니다. 개성이 뚜렷하고 당당한 이미지를 보여주고 싶을 때 가장 돋보이는 얼굴상으로, 트렌디하고 화려한 스타일이 잘 어울리는 특징이 있습니다.",
    contactHeading: "제휴 문의",
    labelEmail: "이메일 주소",
    labelMessage: "문의 내용",
    submitBtn: "보내기",
    footerPrivacy: "개인정보처리방침",
    footerTerms: "이용약관",
    dog: "강아지상",
    cat: "고양이상"
  },
  en: {
    title: "AI Animal Face Test - Discover Your Face Type",
    navTest: "Test", navAbout: "About", navInfo: "Info",
    mainHeading: "What's Your Animal Face?",
    subHeading: "Dog or Cat? Our AI will analyze your facial features!",
    uploadBtn: "Upload Photo",
    aboutTitle: "What is AI Animal Face Test?",
    aboutContent: "<p>This test is built using Google's <b>Teachable Machine</b> technology. AI trained on tens of thousands of images analyzes your face to find the most similar animal type.</p><p>Beyond just fun, use this as a tool for personal image making. It helps you find the style that best expresses your charm.</p>",
    dogTitle: "🐶 Dog Face Traits",
    dogDesc: "Characterized by kind eyes and a soft impression. Friendly and cute, it creates a likable image that many people find attractive.",
    catTitle: "🐱 Cat Face Traits",
    catDesc: "Known for sharp eyes and a sophisticated, chic aura. It gives off a mysterious and distinct vibe that stands out.",
    contactHeading: "Affiliate Inquiry",
    labelEmail: "Email Address",
    labelMessage: "Message",
    submitBtn: "Send",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Service",
    dog: "Dog Type",
    cat: "Cat Type"
  },
  ja: {
    title: "AI動物顔診断 - AIが教えるあなたの顔タイプ",
    navTest: "テスト", navAbout: "紹介", navInfo: "情報",
    mainHeading: "私の動物顔は？",
    subHeading: "犬顔？猫顔？AIがあなたの顔を分析します！",
    uploadBtn: "写真をアップロード",
    aboutTitle: "AI動物顔診断とは？",
    aboutContent: "<p>このテストはGoogleの<b>Teachable Machine</b>技術を使用して作成されました。数万枚の画像データを学習したAIが、あなたの顔の特徴を分析して最も似ている動物タイプを診断します。</p><p>単なる遊びではなく、パーソナルイメージメイキングのツールとして活用してください。あなたの魅력을最大限に引き出すスタイルを見つけるのに役立ちます。</p>",
    dogTitle: "🐶 犬顔の特徴",
    dogDesc: "優しい目元と柔らかな印象が特徴です。親しみやすさと可愛らしさを兼ね備え、多くの人に好感を与えるイメージです。",
    catTitle: "🐱 猫顔の特徴",
    catDesc: "鋭い目元と都会的でクールな雰囲気が魅力的です。洗練されたシックなイメージを醸し出し、個性的でミステリア스な印象を与えます。",
    contactHeading: "提携のお問い合わせ",
    labelEmail: "メールアドレス",
    labelMessage: "お問い合わせ内容",
    submitBtn: "送信",
    footerPrivacy: "プライバシーポリシー",
    footerTerms: "利用規約",
    dog: "犬顔",
    cat: "猫顔"
  }
};

let currentLang = localStorage.getItem('lang') || 'ko';

function updateUI() {
  const t = translations[currentLang];
  document.getElementById('site-title').textContent = t.title;
  document.getElementById('nav-test').textContent = t.navTest;
  document.getElementById('nav-about').textContent = t.navAbout;
  document.getElementById('nav-info').textContent = t.navInfo;
  document.getElementById('main-heading').textContent = t.mainHeading;
  document.getElementById('sub-heading').textContent = t.subHeading;
  document.getElementById('upload-btn').textContent = t.uploadBtn;
  document.getElementById('about-title').textContent = t.aboutTitle;
  document.getElementById('about-content').innerHTML = t.aboutContent;
  document.getElementById('dog-title').textContent = t.dogTitle;
  document.getElementById('dog-desc').textContent = t.dogDesc;
  document.getElementById('cat-title').textContent = t.catTitle;
  document.getElementById('cat-desc').textContent = t.catDesc;
  document.getElementById('contact-heading').textContent = t.contactHeading;
  document.getElementById('label-email').textContent = t.labelEmail;
  document.getElementById('label-message').textContent = t.labelMessage;
  document.getElementById('submit-btn').textContent = t.submitBtn;
  document.getElementById('footer-privacy').textContent = t.footerPrivacy;
  document.getElementById('footer-terms').textContent = t.footerTerms;
}

function changeLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  updateUI();
  if (model && document.getElementById('face-image').src) predict();
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
  document.getElementById('loading-spinner').style.display = 'block';
  
  reader.onload = async function(e) {
    const imgElement = document.getElementById('face-image');
    imgElement.src = e.target.result;
    imgElement.style.display = 'block';
    
    if (!model) await loadModel();
    await predict();
    document.getElementById('loading-spinner').style.display = 'none';
  };
  reader.readAsDataURL(file);
}

// Predict
async function predict() {
  const imgElement = document.getElementById('face-image');
  const prediction = await model.predict(imgElement);
  const t = translations[currentLang];
  
  labelContainer = document.getElementById("label-container");
  labelContainer.innerHTML = '';

  for (let i = 0; i < maxPredictions; i++) {
    const className = prediction[i].className;
    const prob = prediction[i].probability.toFixed(2);
    const labelDisplay = className === "dog" ? t.dog : (className === "cat" ? t.cat : className);
    
    const bar = document.createElement("div");
    bar.className = "result-bar";
    bar.innerHTML = `
      <div class="label-text" style="font-weight: bold; margin-bottom: 5px;">${labelDisplay}: ${(prob * 100).toFixed(0)}%</div>
      <div class="bar-bg" style="background: #eee; height: 12px; border-radius: 6px; margin-bottom: 15px; overflow: hidden;">
        <div class="bar-fill ${className}-fill" style="width: ${prob * 100}%; height: 100%; transition: width 0.5s;"></div>
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
loadModel();
