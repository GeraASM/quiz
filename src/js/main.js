const options = document.querySelectorAll('.option');
const range = document.getElementById('range');
const btnSubmit = document.getElementById('btn-submit');
const btnNext = document.getElementById('btn-next');
const numQuestion = document.getElementById('num-question');

const circle = document.getElementById('circle');
const body = document.getElementById('body')

function changeImgBackground() {
    if (body.classList.contains('dark-mode')) {
        if (window.innerWidth >= 1024) {
            body.style.backgroundImage = 'url(../assets/images/pattern-background--dark.svg)';
        } else if (window.innerWidth >= 768) {
            body.style.backgroundImage = 'url(../assets/images/pattern-background-tablet-dark.svg)';
        } else {body.style.backgroundImage = 'url(../assets/images/pattern-background-mobile-dark.svg)';}  
        
    }
}

window.addEventListener('load', changeImgBackground);

const interruptor = document.querySelector('.switch');
interruptor.addEventListener('click', function() {
    circle.classList.toggle('move');
    body.classList.toggle('dark-mode');
    changeImgBackground()
})

const quiz = {
    HTML: 'icon__html',
    CSS: 'icon__css',
    Javascript: 'icon__js',
    Accessibility: 'icon__accessibility'
}

const blockSelect = document.querySelector('.hero__select');
const choicesQuiz = document.querySelectorAll('.choice-quiz');
const imgShowURL = document.getElementById('icon-select');
const textShow = document.querySelector('.hero__choice');

const startContent = document.querySelector('.start-content');
const startQuestion = document.querySelector('.start-question');

function resetQuizChoice() {
    imgShowURL.src = '';
    imgShowURL.alt = '';
    textShow.textContent = '';
    startContent.style.display = 'flex';
    startQuestion.style.display = 'none';
}

const getUrlandName = {
    getUrl: '',
    getName: ''
} 

function quizOption() {
    blockSelect.style.display = 'flex';
   const url = this.querySelector('.icon').src;
   const nameOption = this.querySelector('.start__text').textContent;
    getUrlandName.getUrl = url;
    getUrlandName.getName = nameOption;

    const choiceClass = quiz[nameOption];
   imgShowURL.src = url;
   imgShowURL.alt = nameOption;
   imgShowURL.classList.remove('icon__html', 'icon__css', 'icon__js', 'icon__accessibility');
   imgShowURL.classList.add(choiceClass);
   textShow.textContent = nameOption;
   startContent.style.display = 'none';
   startQuestion.style.display = 'flex';
}


choicesQuiz.forEach(choice => choice.addEventListener('click', quizOption));






const answersCorrects = {
    1: 'option-a',
    2: 'option-b',
    3: 'option-d',
    4: 'option-c',
    5: 'option-a',
    6: 'option-a',
    7: 'option-d',
    8: 'option-b',
    9: 'option-c',
    10: 'option-a'
}



const iconOptions = document.querySelectorAll('.icon__option'); 
function activeOption(event) {
    event.preventDefault();
    options.forEach(o => o.classList.remove('option--active'));
    this.classList.add('option--active');
    iconOptions.forEach(icon => icon.classList.remove('icon__option--select'));
    this.querySelector('.icon__option').classList.add('icon__option--select');
}

function showBtnNext() {
    btnSubmit.style.display = 'none';
    btnNext.style.display = 'block';
}

function showIconCorrect(correctAnswer) {
    options.forEach(option => {
        if (option.classList.contains(correctAnswer)) {
            option.querySelector('.correct').style.display = 'block';
        }
    })
}

function resetStyles() {
    options.forEach(option => {
        option.classList.remove('option--active', 'option--correct', 'option--incorrect');
        option.querySelector('.icon__option').classList.remove('icon__option--correct', 'icon__option--incorrect')
        const correctIcon = option.querySelector('.correct');
        const incorrectIcon = option.querySelector('.incorrect');

        if (correctIcon) correctIcon.style.display = 'none';
        if (incorrectIcon) incorrectIcon.style.display = 'none';
    });
}

let score = 0;
const noSelect = document.getElementById('no-select');
function isCorrectAnswer(event) {
    event.preventDefault();
    iconOptions.forEach(icon => icon.classList.remove('icon__option--select'));
    const numberQuestion = parseInt(range.value);
    const correctAnswer = answersCorrects[numberQuestion];
    // resetStyles();
    const choiceSomeOption = [...options].some(option => option.classList.contains('option--active'));
    options.forEach(option => {
        if (option.classList.contains('option--active')) {
            if (option.classList.contains(correctAnswer)) {
                option.classList.add('option--correct');
                option.querySelector('.icon__option').classList.add('icon__option--correct');
                option.querySelector('.correct').style.display = 'block';
                score++;
            }
            else {
                option.classList.add('option--incorrect');
                option.querySelector('.icon__option').classList.add('icon__option--incorrect');
                option.querySelector('.incorrect').style.display = 'block';
                showIconCorrect(correctAnswer);

            }
        } 
    });
    if (!choiceSomeOption) {
        noSelect.style.display = 'flex';
        btnSubmit.classList.add('btn-submit--nochoice');
        return
    } else {
        noSelect.style.display = 'none';
        btnSubmit.classList.remove('btn-submit--nochoice');
    }
    showBtnNext();
}

function barIncrement(value) {
  const percentage = (((value - 1) / 9) * 100).toFixed(2);
  return `linear-gradient(to right, var(--clr-purple-600) 0%, var(--clr-purple-600) ${percentage}%, var(--clr-white) ${percentage}%, var(--clr-white) 100%)`;
}

function theNextQuestion() {
    let number = parseInt(range.value) + 1; 
    if (number > 10) {
        formCompleted();
        return
    }
    range.value = number;
    numQuestion.textContent = number;
    resetStyles();
    btnSubmit.style.display = 'block';
    btnNext.style.display = 'none';
}


const scoreContent = document.querySelector('.start-score');

function resetAll() {
    blockSelect.style.display = 'none';
    scoreContent.style.display = 'none';
    range.value = 1;
    range.style.backgroundImage = barIncrement(1);
    iconOptions.forEach(icon => icon.classList.remove('icon__option--select'))
    resetStyles();
    resetQuizChoice();
    resetScore();
    score = 0;

}

const scoreOption = document.querySelector('.score__option');
const imgScore = scoreContent.querySelector('.icon');
const scoreText = scoreContent.querySelector('.score__text');
const scoreShow = document.getElementById('score');



function formCompleted() {
    scoreContent.style.display = 'flex';
    startQuestion.style.display = 'none';
    const nameOption = getUrlandName.getName;
    const classImg = quiz[nameOption];
    imgScore.classList.remove('icon__html', 'icon__css', 'icon__js', 'icon__accessibility');
    imgScore.classList.add(classImg);
    imgScore.src = getUrlandName.getUrl;
    imgScore.alt = nameOption;

    scoreText.textContent = nameOption;
    scoreShow.textContent = score;
}

function resetScore() {
    startContent.style.display = 'flex';
    scoreContent.style.display = 'none';
    imgScore.classList.remove('icon__html', 'icon__css', 'icon__js', 'icon__accessibility');
    imgScore.src = '';
    imgScore.alt = '';
    scoreText.textContent = '';
}

const btnAgain = document.getElementById('btn-again');
btnAgain.addEventListener('click', resetAll);



options.forEach(option => option.addEventListener('click', activeOption))
btnSubmit.addEventListener('click', isCorrectAnswer)
btnNext.addEventListener('click', theNextQuestion);
range.addEventListener('input', barIncrement);
document.addEventListener('DOMContentLoaded', resetAll);