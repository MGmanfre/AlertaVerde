const quizData = [
  {
    question: "O que significa ESG?",
    options: [
      "Environmental, Social and Governance",
      "Economic, Social and Green",
      "Environmental, Sustainable and Global",
      "Ecological, Social and Government",
    ],
    correct: 0,
    explanation:
      "ESG significa Environmental, Social and Governance (Ambiental, Social e Governança) - critérios usados para avaliar práticas sustentáveis de empresas.",
  },
  {
    question:
      "Qual é a principal causa de entupimento de bueiros que leva a enchentes urbanas?",
    options: [
      "Excesso de chuva",
      "Descarte inadequado de lixo",
      "Falta de manutenção",
      "Problemas de infraestrutura",
    ],
    correct: 1,
    explanation:
      "O descarte inadequado de lixo é a principal causa evitável de entupimento de bueiros, contribuindo significativamente para enchentes urbanas.",
  },
  {
    question:
      "Quanto tempo leva para uma garrafa plástica se decompor na natureza?",
    options: ["10 anos", "50 anos", "100 anos", "Mais de 400 anos"],
    correct: 3,
    explanation:
      "Garrafas plásticas podem levar mais de 400 anos para se decompor completamente na natureza, por isso a reciclagem é fundamental.",
  },
  {
    question: "Qual dessas práticas NÃO contribui para o consumo consciente?",
    options: [
      "Comprar apenas o necessário",
      "Escolher produtos com embalagem excessiva",
      "Reutilizar materiais",
      "Preferir produtos locais",
    ],
    correct: 1,
    explanation:
      "Escolher produtos com embalagem excessiva gera mais resíduos e vai contra os princípios do consumo consciente.",
  },
  {
    question: "O que é economia circular?",
    options: [
      "Um sistema econômico baseado em moedas",
      "Uma economia que funciona em ciclos",
      "Um modelo que minimiza desperdícios através da reutilização",
      "Uma forma de economia digital",
    ],
    correct: 2,
    explanation:
      "Economia circular é um modelo que busca minimizar desperdícios e maximizar a reutilização de recursos, criando um ciclo sustentável.",
  },
  {
    question: "Qual é o principal gás responsável pelo efeito estufa?",
    options: [
      "Oxigênio (O2)",
      "Nitrogênio (N2)",
      "Dióxido de carbono (CO2)",
      "Hidrogênio (H2)",
    ],
    correct: 2,
    explanation:
      "O dióxido de carbono (CO2) é o principal gás responsável pelo efeito estufa antropogênico, resultante principalmente da queima de combustíveis fósseis.",
  },
  {
    question: "O que são áreas de preservação permanente (APPs)?",
    options: [
      "Parques urbanos",
      "Áreas protegidas por lei para preservação ambiental",
      "Zonas industriais sustentáveis",
      "Reservas de água potável",
    ],
    correct: 1,
    explanation:
      "APPs são áreas protegidas por lei, cobertas por vegetação nativa, que têm a função de preservar recursos hídricos, paisagem e biodiversidade.",
  },
  {
    question: "Qual a importância da coleta seletiva?",
    options: [
      "Apenas organizar o lixo",
      "Facilitar o trabalho dos garis",
      "Permitir reciclagem e reduzir impacto ambiental",
      "Cumprir apenas uma obrigação legal",
    ],
    correct: 2,
    explanation:
      "A coleta seletiva permite a reciclagem adequada dos materiais, reduzindo significativamente o impacto ambiental e promovendo a economia circular.",
  },
  {
    question: "O que caracteriza uma cidade sustentável?",
    options: [
      "Apenas ter muitas áreas verdes",
      "Integrar desenvolvimento urbano com preservação ambiental",
      "Ter apenas transporte público",
      "Usar apenas energia solar",
    ],
    correct: 1,
    explanation:
      "Uma cidade sustentável integra desenvolvimento urbano com preservação ambiental, promovendo qualidade de vida e responsabilidade ecológica.",
  },
  {
    question:
      "Qual é o principal objetivo dos Objetivos de Desenvolvimento Sustentável (ODS) da ONU?",
    options: [
      "Aumentar o crescimento econômico",
      "Erradicar a pobreza até 2030",
      "Promover desenvolvimento sustentável global até 2030",
      "Reduzir apenas a poluição",
    ],
    correct: 2,
    explanation:
      "Os 17 ODS da ONU têm como objetivo promover o desenvolvimento sustentável global até 2030, abordando questões sociais, econômicas e ambientais.",
  },
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let quizStarted = false;
let quizCompleted = false;
const startQuizBtn = document.getElementById("start-quiz");
const nextQuestionBtn = document.getElementById("next-question");
const restartQuizBtn = document.getElementById("restart-quiz");
const quizContent = document.getElementById("quiz-content");
const quizResults = document.getElementById("quiz-results");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const progressFill = document.getElementById("progress-fill");
const progressText = document.getElementById("progress-text");
const finalScore = document.getElementById("final-score");
const scoreMessage = document.getElementById("score-message");
const impactAssessment = document.getElementById("impact-assessment");

document.addEventListener("DOMContentLoaded", function () {
  initializeQuiz();
});

function initializeQuiz() {
  if (!startQuizBtn) return;

  startQuizBtn.addEventListener("click", startQuiz);
  nextQuestionBtn.addEventListener("click", nextQuestion);
  restartQuizBtn.addEventListener("click", restartQuiz);

  hideQuizContent();
}

function startQuiz() {
  quizStarted = true;
  quizCompleted = false;
  currentQuestionIndex = 0;
  score = 0;
  selectedAnswer = null;

  showQuizContent();
  startQuizBtn.style.display = "none";
  nextQuestionBtn.style.display = "inline-block";
  restartQuizBtn.style.display = "none";

  displayQuestion();
}

function showQuizContent() {
  quizContent.style.display = "block";
  quizResults.style.display = "none";
}

function hideQuizContent() {
  quizContent.style.display = "none";
  quizResults.style.display = "none";
}

function displayQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];

  updateProgress();

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const answerButton = document.createElement("button");
    answerButton.className = "answer-option";
    answerButton.textContent = option;
    answerButton.dataset.index = index;
    answerButton.addEventListener("click", () =>
      selectAnswer(index, answerButton)
    );

    answersContainer.appendChild(answerButton);
  });

  selectedAnswer = null;
  nextQuestionBtn.disabled = true;
  nextQuestionBtn.textContent =
    currentQuestionIndex === quizData.length - 1
      ? "Ver Resultado"
      : "Próxima Pergunta";
}

function selectAnswer(answerIndex, buttonElement) {
  const allAnswers = document.querySelectorAll(".answer-option");
  allAnswers.forEach((answer) => {
    answer.classList.remove("selected");
  });

  buttonElement.classList.add("selected");
  selectedAnswer = answerIndex;

  nextQuestionBtn.disabled = false;
}

function nextQuestion() {
  if (selectedAnswer === null) return;

  const currentQuestion = quizData[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correct;

  showAnswerFeedback(isCorrect);

  if (isCorrect) {
    score++;
  }

  const allAnswers = document.querySelectorAll(".answer-option");
  allAnswers.forEach((answer) => {
    answer.disabled = true;
  });

  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex >= quizData.length) {
      showResults();
    } else {
      displayQuestion();
    }
  }, 2000);
}

function showAnswerFeedback(isCorrect) {
  const currentQuestion = quizData[currentQuestionIndex];
  const allAnswers = document.querySelectorAll(".answer-option");

  allAnswers.forEach((answer, index) => {
    if (index === currentQuestion.correct) {
      answer.classList.add("correct");
    } else if (index === selectedAnswer && !isCorrect) {
      answer.classList.add("incorrect");
    }
  });

  const explanationDiv = document.createElement("div");
  explanationDiv.className = "answer-explanation";
  explanationDiv.innerHTML = `
        <div style="margin-top: 1rem; padding: 1rem; background-color: var(--bg-tertiary); border-radius: var(--spacing-sm); border-left: 4px solid var(--primary-color);">
            <strong>Explicação:</strong> ${currentQuestion.explanation}
        </div>
    `;

  answersContainer.appendChild(explanationDiv);
}

function updateProgress() {
  const progressPercentage =
    ((currentQuestionIndex + 1) / quizData.length) * 100;
  progressFill.style.width = `${progressPercentage}%`;
  progressText.textContent = `Pergunta ${currentQuestionIndex + 1} de ${
    quizData.length
  }`;
}

function showResults() {
  quizCompleted = true;

  quizContent.style.display = "none";

  quizResults.style.display = "block";

  finalScore.textContent = score;

  generateScoreMessage();
  generateImpactAssessment();

  nextQuestionBtn.style.display = "none";
  restartQuizBtn.style.display = "inline-block";

  animateScoreCircle();
}

function generateScoreMessage() {
  let message = "";

  if (score >= 9) {
    message = "Excelente! Você tem uma consciência ambiental excepcional!";
  } else if (score >= 7) {
    message =
      "Muito bom! Você está no caminho certo para ser mais sustentável.";
  } else if (score >= 5) {
    message =
      "Bom trabalho! Há espaço para melhorar sua consciência ambiental.";
  } else if (score >= 3) {
    message =
      "Você está começando a desenvolver consciência ambiental. Continue aprendendo!";
  } else {
    message =
      "Há muito espaço para crescimento. Que tal começar pequenas mudanças hoje?";
  }

  scoreMessage.textContent = message;
}

function generateImpactAssessment() {
  let assessment = "";

  if (score >= 9) {
    assessment = `
            <h4>Impacto Ambiental: Muito Positivo</h4>
            <p>Suas escolhas demonstram um compromisso sério com a sustentabilidade. Você provavelmente já pratica ações como coleta seletiva, consumo consciente e prevenção de desperdícios. Continue sendo um exemplo e inspire outros ao seu redor!</p>
        `;
  } else if (score >= 7) {
    assessment = `
            <h4>Impacto Ambiental: Positivo</h4>
            <p>Você tem uma boa base de conhecimento ambiental. Considere aprofundar seus conhecimentos sobre economia circular e práticas ESG. Pequenas mudanças no dia a dia podem amplificar seu impacto positivo.</p>
        `;
  } else if (score >= 5) {
    assessment = `
            <h4>Impacto Ambiental: Moderado</h4>
            <p>Você está no caminho certo, mas há oportunidades de melhoria. Foque em práticas básicas como descarte adequado de lixo, economia de água e energia, e escolhas de consumo mais conscientes.</p>
        `;
  } else if (score >= 3) {
    assessment = `
            <h4>Impacto Ambiental: Em Desenvolvimento</h4>
            <p>Este é um ótimo momento para começar a implementar mudanças. Comece com ações simples: separe o lixo, evite desperdício de água, use menos plástico descartável e informe-se sobre sustentabilidade.</p>
        `;
  } else {
    assessment = `
            <h4>Impacto Ambiental: Precisa de Atenção</h4>
            <p>Nunca é tarde para começar! Pequenas ações fazem grande diferença. Comece hoje: não jogue lixo na rua, economize água, prefira produtos locais e aprenda sobre reciclagem. Cada passo conta!</p>
        `;
  }

  impactAssessment.innerHTML = assessment;
}

function animateScoreCircle() {
  const scoreCircle = document.querySelector(".score-circle");
  if (!scoreCircle) return;

  scoreCircle.style.transform = "scale(0)";
  scoreCircle.style.transition = "transform 0.5s ease";

  setTimeout(() => {
    scoreCircle.style.transform = "scale(1)";
  }, 100);
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  selectedAnswer = null;
  quizStarted = false;
  quizCompleted = false;

  startQuizBtn.style.display = "inline-block";
  nextQuestionBtn.style.display = "none";
  restartQuizBtn.style.display = "none";

  hideQuizContent();

  progressFill.style.width = "0%";
  progressText.textContent = "Pergunta 1 de 10";

  document.getElementById("quiz").scrollIntoView({ behavior: "smooth" });
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

document.addEventListener("keydown", (e) => {
  if (!quizStarted || quizCompleted) return;

  if (e.key >= "1" && e.key <= "4") {
    const answerIndex = parseInt(e.key) - 1;
    const answerButtons = document.querySelectorAll(".answer-option");

    if (answerButtons[answerIndex] && !answerButtons[answerIndex].disabled) {
      answerButtons[answerIndex].click();
    }
  }

  if (
    e.key === "Enter" &&
    selectedAnswer !== null &&
    !nextQuestionBtn.disabled
  ) {
    nextQuestionBtn.click();
  }
});
