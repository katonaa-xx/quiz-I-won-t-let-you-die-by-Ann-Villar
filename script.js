let startButton = document.getElementById("start-button");
let startScreen = document.getElementById("start-screen");
let quizScreen = document.getElementById("quiz-screen");
let questionElement = document.getElementById("question");
let answersElement = document.getElementById("answers");

let questionNumberElement = document.getElementById("question-number");
let scoreElement = document.getElementById("score");
let progressElement = document.getElementById("progress");

let resultScreen = document.getElementById("result-screen");
let resultScore = document.getElementById("result-score");
let resultRank = document.getElementById("result-rank");
let resultText = document.getElementById("result-text");
let restartButton = document.getElementById("restart-button");

let audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    let oscillator = audioContext.createOscillator();
    let gain = audioContext.createGain();

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    if (type === "correct") {
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(850, audioContext.currentTime + 0.08);

        gain.gain.setValueAtTime(0.15, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(
            0.01,
            audioContext.currentTime + 0.25
        );

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.25);
    }

    if (type === "wrong") {
        oscillator.frequency.setValueAtTime(180, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(
            80,
            audioContext.currentTime + 0.25
        );

        gain.gain.setValueAtTime(0.15, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(
            0.01,
            audioContext.currentTime + 0.25
        );

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.25);
    }

    if (type === "finish") {
        oscillator.frequency.setValueAtTime(500, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(700, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(900, audioContext.currentTime + 0.2);

        gain.gain.setValueAtTime(0.12, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(
            0.01,
            audioContext.currentTime + 0.5
        );

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
    }
}


let questions = [
    {
        question: "яку назву носить перша глава?",
        answers: [
            "«ты совсем меня не знаешь»",
            "«ты просто не видел настоящую меня»",
            "«я никогда не была такой»",
            "«за этой маской меня нет»"
        ],
        correct: 1
    },

    {
        question: "як називає вишеньку її дядя?",
        answers: [
            "ягодка",
            "по имени",
            "косточка",
            "малышка"
        ],
        correct: 2
    },

    {
        question: "у якому віці вишенька почала створювати свою банду?",
        answers: [
            "13",
            "12",
            "14",
            "11"
        ],
        correct: 1
    },

    {
        question: "який мотоцикл належить марку?",
        answers: [
            "honda cbr600rr",
            "kawasaki ninja 650",
            "ducati panigale",
            "yamaha yzf-r6"
        ],
        correct: 3
    },

    {
        question: "яка відмінність банди вишеньки від інших?",
        answers: [
            "пасмо іншого кольору",
            "тату",
            "одяг",
            "пірсинг"
        ],
        correct: 1
    },

    {
        question: "скільки було років т/и, коли її батько загинув?",
        answers: [
            "11",
            "13",
            "10",
            "12"
        ],
        correct: 0
    },

    {
        question: "при перевірці марка, тарас спеціально виводить його на емоції, щоб відкрити його темну сторону. що зупинило хлопця в самий пік злості?",
        answers: [
            "сторонні люди",
            "спогад",
            "крик",
            "зашпортався"
        ],
        correct: 1
    },

    {
        question: "скільки капітанів отрядів у банді?",
        answers: [
            "15",
            "13",
            "14",
            "16"
        ],
        correct: 1
    },

    {
        question: "яку назву має банда т/и?",
        answers: [
            "блек.снэйкс",
            "ред.вайперс",
            "хантеры",
            "сан.снэйкс"
        ],
        correct: 3
    },

    {
        question: "у клубі, після знайомства з марком, вишенька помічає бійку шатена з двома людьми, після чого прямує туди і втихомирює їх. спочатку марк відшучувався перед т/и, але потім виявилось, що він поранений. де і яка була рана?",
        answers: [
            "різана на грудях",
            "колота в правій частині живота",
            "різана на ребрах",
            "пулевое ранение в плече"
        ],
        correct: 2
    },

    {
        question: "як звати тигра вишеньки?",
        answers: [
            "каспер",
            "абсент",
            "нокс",
            "азраель"
        ],
        correct: 1
    },

    {
        question: "яка різниця у віці лідії і вишеньки?",
        answers: [
            "3 роки",
            "1 рік",
            "4 роки",
            "2 роки"
        ],
        correct: 0
    },

    {
        question: "як звати мачуху т/и?",
        answers: [
            "ксюша",
            "мария",
            "екатерина",
            "валерия"
        ],
        correct: 3
    },

    {
        question: "яка знакова зброя у вишеньки?",
        answers: [
            "катана",
            "арбалет",
            "нунчаки",
            "кинджал"
        ],
        correct: 0
    },

    {
        question: "яка причина сварки була між вишенькою і марком, внаслідок якої була спроба самогубства у хлопця?",
        answers: [
            "марк збрехав вишеньці про важливе завдання, через що вона втратила до нього довіру",
            "марк почав загравати з дільничною, щоб дістати доки з участка",
            "марк без дозволу вишеньки провів небезпечну операцію, через яку постраждав один із членів банди",
            "марк відмовився виконувати наказ вишеньки та вирішив самостійно залишити банду"
        ],
        correct: 1
    },

    {
        question: "у якій главі т/и взнала ім'я марка?",
        answers: [
            "11",
            "8",
            "10",
            "9"
        ],
        correct: 2
    },

    {
        question: "яке прізвисько мав хлопець з банди, смерть якого ми побачили першою?",
        answers: [
            "самурай",
            "мотылек",
            "коготь",
            "винчесто"
        ],
        correct: 0
    },

    {
        question: "хто по професії мама марка?",
        answers: [
            "педіатр",
            "юрист",
            "медсестра",
            "санітарка"
        ],
        correct: 2
    },

    {
        question: "яку страву на сніданок марк полюбляє найбільше?",
        answers: [
            "блінчики",
            "скрембл",
            "шакшука",
            "глазунья"
        ],
        correct: 2
    },

    {
        question: "яка була умова суперечки кокса з марком?",
        answers: [
            "марк мав перемогти кокса в бою",
            "марк мав досягти того ж рівня, що і кокс",
            "марк повинен був принести голову ворога кокса",
            "марк мав одружитись на доньці кокса"
        ],
        correct: 1
    }
];


let currentQuestion = 0;
let score = 0;
let redLevel = 0;

startButton.addEventListener("click", function() {

    startScreen.style.display = "none";
    quizScreen.style.display = "block";

    showQuestion();

});


function showQuestion() {

    let question = questions[currentQuestion];

    quizScreen.style.animation = "none";
    quizScreen.offsetHeight;
    quizScreen.style.animation = "quizAppear 0.5s ease";

    questionNumberElement.textContent =
        (currentQuestion + 1) + " / " + questions.length;

    scoreElement.textContent =
        score + " правильних";

    let progress =
        ((currentQuestion + 1) / questions.length) * 100;

    progressElement.style.width = progress + "%";

    questionElement.textContent = question.question;

    answersElement.innerHTML = "";

    question.answers.forEach(function(answer, index) {

        let button = document.createElement("button");

        button.textContent = answer;

        button.addEventListener("click", function() {

            checkAnswer(index);

        });

        answersElement.appendChild(button);

    });

}


function checkAnswer(index) {

    let question = questions[currentQuestion];

    let buttons = answersElement.querySelectorAll("button");

    buttons.forEach(function(button) {
        button.disabled = true;
    });

    let selectedButton = buttons[index];

    if (index === question.correct) {

        score++;

        playSound("correct");
           redLevel = Math.max(0, redLevel - 0.14);

    document.body.style.setProperty(
        "--red-level",
        redLevel
    );

        selectedButton.classList.add("correct");

        selectedButton.textContent =
            "✓ " + selectedButton.textContent +
            " — правильно 🩸";

    } else {
          playSound("wrong");
          redLevel = 0.28;

    document.body.style.setProperty(
        "--red-level",
        redLevel
    );

           correctStreak = 0;
           document.body.classList.add("wrong-flash");

          quizScreen.classList.remove("wrong-effect");
          quizScreen.offsetHeight;
          quizScreen.classList.add("wrong-effect");

           document.body.classList.remove("wrong-flash");
           document.body.offsetHeight;
           document.body.classList.add("wrong-flash");



        selectedButton.classList.add("wrong");

        selectedButton.textContent =
            "✕ " + selectedButton.textContent +
            " — неправильно 💀";

        buttons[question.correct].classList.add("correct");

        buttons[question.correct].textContent =
            "✓ " + buttons[question.correct].textContent +
            " — правильна відповідь 🩸";
    }


    setTimeout(function() {

        currentQuestion++;

        if (currentQuestion < questions.length) {

            showQuestion();

        } else {

             playSound("finish");
            showResult();

        }

    }, 1200);

}


function showResult() {

    quizScreen.style.display = "none";
    resultScreen.style.display = "block";

    resultScore.textContent =
        score + " / " + questions.length;


    if (score === questions.length) {

        resultRank.textContent =
            "легенда sun.snakes";

        resultText.textContent =
            "легенда san.snakes. ти пам'ятаєш цю історію краще за саму вишеньку. схоже, ти знаєш кожну її таємницю.";

    } else if (score >= 17) {

        resultRank.textContent =
            "права рука кобри";

        resultText.textContent =
            "права рука кобри. ти майже ідеально знаєш історію, але кілька деталей усе ж змогли від тебе сховатися.";

    } else if (score >= 14) {

        resultRank.textContent =
            "справжній боєць";

        resultText.textContent =
            "ти добре знаєш цю історію і точно не загубишся серед sun.snakes.";

    } else if (score >= 10) {

        resultRank.textContent =
            "виживший";

        resultText.textContent =
            "ти вижив(ла), але було близько. деякі сторінки явно варто перечитати уважніше.";

    } else if (score >= 5) {

        resultRank.textContent =
            "новенький";

        resultText.textContent =
            "вишенька вже дивиться на тебе з катаною в руках. ти щось пам'ятаєш, але цього явно недостатньо.";

    } else {

        resultRank.textContent =
            "тінь";

        resultText.textContent =
            "ти навіть не встиг(ла) зайти на територію san.snakes. здається, книга чекає на тебе вдруге.";

    }

}


restartButton.addEventListener("click", function() {

    currentQuestion = 0;
    score = 0;
    redLevel = 0;

document.body.style.setProperty("--red-level", "0");

    resultScreen.style.display = "none";
    quizScreen.style.display = "block";

    showQuestion();

});