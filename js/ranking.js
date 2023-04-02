const spanPlayerNickname = document.querySelector('.player-nickname');
const spanPlayerScore = document.querySelector('.player-score');
const button = document.querySelector('.back-button');

const returnGame = () => {
  window.location = '../pages/game.html'
}

window.onload = () => {
  spanPlayerNickname.innerHTML = localStorage.getItem('player');
  spanPlayerScore.innerHTML = localStorage.getItem('score');
}

button.addEventListener('click', returnGame);