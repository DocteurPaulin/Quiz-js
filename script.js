const questions = [
    { 
        theme: "Informatique", 
        question: "Que signifie HTML ?", 
        answers: [ "HyperText Markup Language", "HighText Machine Language", "Hyper Transfer Markup Level", "Home Tool Markup Language" ], 
        correct: 0 
    }, 
    { 
        theme: "Culture générale", 
        question: "Quelle est la capitale du Japon ?", 
        answers: ["Pékin", "Séoul", "Tokyo", "Bangkok"], 
        correct: 2 
    }, 
    { 
        theme: "Science", 
        question: "Quelle planète est la plus proche du soleil ?", 
        answers: ["Terre", "Mars", "Mercure", "Vénus"], 
        correct: 2 
    },
    {
        theme: "Culture générale",
        question : "Quelle est la capitale du cameroun ?",
        answers : ["Maroua", "Libreville", "Douala", "Yaoundé"],
        correct : 3
    },
    {
        theme : "Culture générale",
        question : "Quel est le seul pays au monde qui est aussi un continent ?",
        answers : ["Australie", "Etats-unis", "Madagascar", "Russie"],
        correct : 0
    },
    {
        theme : "Culture générale",
        question : "Quel est le fleuve qui traverse la ville de Douala ?",
        answers : ["Sanaga", "Wouri", "Nkam", "Logone"],
        correct : 1
    } 
];

let currentQuestion = 0; 
let score = 0;

const questionEl = document.getElementById("question"); 
const themeEl = document.getElementById("theme"); 
const answersEl = document.getElementById("answers"); 
const nextBtn = document.getElementById("nextBtn");
const retryBtn = document.getElementById("retryBtn") 
const scoreEl = document.getElementById("score"); 
const feedbackEl = document.getElementById("feedback");

function loadQuestion() { 
    resetState();

    const q = questions[currentQuestion];

    questionEl.textContent = q.question; 
    themeEl.textContent = "Thème : " + q.theme;

    q.answers.forEach((answer, index) => { 
        const btn = document.createElement("button"); 
        btn.textContent = answer; 
        btn.addEventListener("click", () => selectAnswer(btn, index)); 
        answersEl.appendChild(btn);     
    }); 
}

function resetState() { 
    nextBtn.style.display = "none";
    retryBtn.style.display = "none"; 
    feedbackEl.textContent = ""; 
    answersEl.innerHTML = ""; 
}

function selectAnswer(button, index) { 
    const correctIndex = questions[currentQuestion].correct; 
    const buttons = answersEl.children;

    for (let btn of buttons) { 
        btn.disabled = true; 
    }

    if (index === correctIndex) { 
        button.classList.add("correct"); 
        feedbackEl.textContent = "Bonne réponse ! Bravo 🎉"; 
        score++; 
    } else { 
        button.classList.add("wrong"); 
        buttons[correctIndex].classList.add("correct"); 
        feedbackEl.textContent = "Mauvaise réponse 😢"; 
    }

    nextBtn.style.display = "block"; 
}

nextBtn.addEventListener("click", () => { 
    currentQuestion++;

    if (currentQuestion < questions.length) { 
        loadQuestion(); 
    } else { 
        showScore(); 
    } 
});

retryBtn.addEventListener("click", () => {
    resetState();
    scoreEl.textContent = "";
    currentQuestion = 0;
    score = 0;
    loadQuestion();
})

function showScore() { 
    questionEl.textContent = "Quiz terminé !"; 
    themeEl.textContent = ""; 
    answersEl.innerHTML = ""; 
    feedbackEl.textContent = ""; 
    nextBtn.style.display = "none";
    retryBtn.style.display = "inline-block"

    scoreEl.textContent = `Score : ${score} / ${questions.length}`; 
}

// Lancement initial 
loadQuestion();
