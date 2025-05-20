const options = document.querySelectorAll('.option');
const range = document.getElementById('range');
const btnSubmit = document.getElementById('btn-submit');

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



function activeOption(event) {
    event.preventDefault();
    options.forEach(o => o.classList.remove('option--active'));
    this.classList.add('option--active');
}

function isCorrectAnswer(event) {
    event.preventDefault();
    const numberQuestion = parseInt(range.value);
    const correctAnswer = answersCorrects[numberQuestion];
    
    options.forEach(option => {
        if (option.classList.contains('option--active')) {
            if (option.classList.contains(correctAnswer)) {
                option.classList.add('option--correct')
                option.querySelector('.icon__option').classList.add('icon__option--correct');
                option.querySelector('.correct').style.display = 'block';
                return true;
            }
        }
    });
    
    return false;
}





options.forEach(option => option.addEventListener('click', activeOption))
btnSubmit.addEventListener('click', isCorrectAnswer)