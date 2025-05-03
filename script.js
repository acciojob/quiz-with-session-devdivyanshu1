const questions = [
  {
    question: "What is the capital of India?",
    options: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
    answer: 0
  },
  {
    question: "2 + 3 = ?",
    options: ["4", "5", "6", "7"],
    answer: 1
  },
  {
    question: "HTML stands for?",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Markup Language",
      "Hyper Text Marketing Language",
      "Hyper Tool Markup Language"
    ],
    answer: 1
  },
  {
    question: "Which is a JavaScript framework?",
    options: ["Laravel", "Django", "React", "Flask"],
    answer: 2
  },
  {
    question: "CSS is used for?",
    options: [
      "Database design",
      "Styling web pages",
      "Server-side scripting",
      "Building Android apps"
    ],
    answer: 1
  }
];

const questionsDiv = document.getElementById("questions");
const scoreDiv = document.getElementById("score");
const submitBtn = document.getElementById("submit");

function loadQuiz() {
  const progress = JSON.parse(sessionStorage.getItem("progress") || "{}");
  questionsDiv.innerHTML = "";

  questions.forEach((q, index) => {
    const qBlock = document.createElement("div");
    qBlock.innerHTML = `<p>${index + 1}. ${q.question}</p>`;

    q.options.forEach((opt, i) => {
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q${index}`;
      input.value = i;
      input.checked = progress[`q${index}`] == i;

      input.addEventListener("change", () => {
        const updatedProgress = JSON.parse(sessionStorage.getItem("progress") || "{}");
        updatedProgress[`q${index}`] = i;
        sessionStorage.setItem("progress", JSON.stringify(updatedProgress));
      });

      const label = document.createElement("label");
      label.textContent = opt;

      qBlock.appendChild(input);
      qBlock.appendChild(label);
      qBlock.appendChild(document.createElement("br"));
    });

    questionsDiv.appendChild(qBlock);
  });
}

function calculateScore() {
  const progress = JSON.parse(sessionStorage.getItem("progress") || "{}");
  let score = 0;

  questions.forEach((q, index) => {
    if (progress[`q${index}`] != null && parseInt(progress[`q${index}`]) === q.answer) {
      score++;
    }
  });

  localStorage.setItem("score", score);
  scoreDiv.textContent = `Your score is ${score} out of ${questions.length}.`;
}

submitBtn.addEventListener("click", calculateScore);

window.addEventListener("DOMContentLoaded", () => {
  loadQuiz();

  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreDiv.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
  }
});

