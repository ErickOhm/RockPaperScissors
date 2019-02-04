let userScore = 0;
let computerScore = 0;
let userChoosed;
let userWon = false;
let userDraw = false;
let inARow = 0;
const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const scoreBoard_div = document.querySelector('.scoreboard');
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById('r');
const paper_div = document.getElementById('p');
const scissor_div = document.getElementById('s');
const language = document.querySelector('#language');

if (language.value === 'esp') {
    const nombres = document.querySelector('.badge__user');
    const pc = document.querySelector('.badge__comp');
    nombres.innerHTML = 'Tú';
    pc.innerHTML = 'PC';
    result_p.innerHTML = 'Comienza el juego';

}

function convertWord(letter) {
    if (language.value === 'eng') {
        if (letter === 'r') return "Rock";
        if (letter === 'p') return "Paper";
        return "Scissors"
    } else if (language.value === 'esp') {
        if (letter === 'r') return 'Piedra';
        if (letter === 'p') return 'Papel';
        return 'Tijeras'
    }

};

function win(user, computer) {
    userScore++;
    inARow++;
    userWon = true;
    userDraw = false;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    if (language.value === 'eng') { result_p.innerHTML = `${convertWord(user)} beats ${convertWord(computer)} You Win!`; }
    else if (language.value === 'esp') { result_p.innerHTML = `${convertWord(user)} le gana a ${convertWord(computer)} tu ganas!`; }
    const roundStatus = document.getElementById(user);
    roundStatus.classList.add('winningStyles');
    setTimeout(() => roundStatus.classList.remove('winningStyles'), 300);
};

function lose(user, computer) {
    computerScore++;
    inARow = 0;
    userWon = false;
    userDraw = false;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    if (language.value === 'eng') { result_p.innerHTML = `${convertWord(user)} beats ${convertWord(computer)} You Lose!`; }
    else if (language.value === 'esp') { result_p.innerHTML = `${convertWord(user)} pierde contra ${convertWord(computer)} tu pierdes`; }
    const roundStatus = document.getElementById(user);
    roundStatus.classList.add('losingStyles');
    setTimeout(() => roundStatus.classList.remove('losingStyles'), 300);
};

function draw(user, computer) {
    if (language.value === 'eng') { result_p.innerHTML = `${convertWord(user)} equals ${convertWord(computer)} it's a draw!`; }
    else if (language.value === 'esp') { result_p.innerHTML = `${convertWord(user)} es igual que ${convertWord(computer)} empate!`; }
    const roundStatus = document.getElementById(user);
    roundStatus.classList.add('drawStyles');
    userWon = false;
    inARow = 0;
    userDraw = true;
    setTimeout(() => roundStatus.classList.remove('drawStyles'), 300);
};

function playOnDraw() {
    const choices = ['r', 'p', 's'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

function game(choice, computerChoice) {
    switch (choice + computerChoice) {
        case 'rs':
        case 'pr':
        case 'sp':
            win(choice, computerChoice);
            break;
        case 'rp':
        case 'ps':
        case 'sr':
            lose(choice, computerChoice);
            break;
        case 'rr':
        case 'pp':
        case 'ss':
            draw(choice, computerChoice);
            break;
    }
}

function test(choice) {
    if (inARow > 3) {
        let computerChoice = playOnDraw();
        userChoosed = choice;
        game(choice, computerChoice)
    } else if (userScore === 0 && computerScore === 0) {
        let computerChoice = 'r'
        userChoosed = choice;
        game(choice, computerChoice);
    } else {
        if (userDraw === true) {
            let computerChoice = playOnDraw();
            userChoosed = choice;
            game(choice, computerChoice);
        } else if (userWon === false) {
            if (userChoosed === 'r') {
                let computerChoice = 'r';
                userChoosed = choice;
                game(choice, computerChoice);
            } else if (userChoosed === 'p') {
                let computerChoice = 'p';
                userChoosed = choice;
                game(choice, computerChoice);
            } else if (userChoosed === 's') {
                let computerChoice = 's';
                userChoosed = choice;
                game(choice, computerChoice);
            }
        } else if (userWon === true) {
            if (userChoosed === 'r') {
                let computerChoice = 'p';
                userChoosed = choice;
                game(choice, computerChoice);
            } else if (userChoosed === 'p') {
                let computerChoice = 's';
                userChoosed = choice;
                game(choice, computerChoice);
            } else if (userChoosed === 's') {
                let computerChoice = 'r';
                userChoosed = choice;
                game(choice, computerChoice);
            }
        }
    }
}

function main() {
    rock_div.addEventListener('click', () => test('r'));
    paper_div.addEventListener('click', () => test('p'));
    scissor_div.addEventListener('click', () => test('s'));
}

main();