var $start = document.querySelector("#start"); // возьмем как кодстайл : все элементы, к которым применяем метод querySelector -- пишем со знаком доллара
var $game = document.querySelector("#game");
var $time = document.querySelector("#time");
var $result = document.querySelector("#result");
var $timeHeader = document.querySelector("#time-header");
var $resultHeader = document.querySelector("#result-header");
var $gameTime = document.querySelector("#game-time");

var colors = [
  "#CB356B",
  "#BD3F32",
  "#3A1C71",
  "#D76D77",
  "#283c86",
  "#45a247",
  "#8e44ad",
  "#155799",
  "#159957",
  "#000046",
  "#1CB5E0",
  "#2F80ED",
];
var score = 0;
var isGameStarted = false;

$start.addEventListener("click", startGame);
$game.addEventListener("click", handleBoxClick);
$gameTime.addEventListener("input", setGameTime);

function show($el) {
  $el.classList.remove("hide");
}

function hide($el) {
  $el.classList.add("hide");
}

// -----------------------------------------------------------------  ФУНКЦИЯ ДЛЯ НАЧАЛА ИГРЫ ----------------------------------------------------------------------------
function startGame() {
  score = 0;
  setGameTime();
  $gameTime.setAttribute("disabled", true);
  isGameStarted = true; // при нажатие на кнопку значение задается true (нужно для проверок)
  $game.style.backgroundColor = "#fff"; // задаем фон белым
  hide($start); // добавляем css класс (заранее написаный )

  var interval = setInterval(function () {
    var time = parseFloat($time.textContent);

    if (time <= 0) {
      clearInterval(interval);
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);

  renderBox();
}

function setGameTime() {
  var time = +$gameTime.value;
  $time.textContent = time.toFixed(1);
  show($timeHeader);
  hide($resultHeader);
}

function setGameScore() {
  $result.textContent = score.toString();
}

function endGame() {
  isGameStarted = false;
  setGameScore();
  $gameTime.removeAttribute("disabled");
  show($start); // убираем css-класс  hide
  $game.innerHTML = "";
  $game.style.backgroundColor = "#ccc"; // переназначаем цвет фона
  hide($timeHeader);
  show($resultHeader);
}

function handleBoxClick(event) {
  if (!isGameStarted) {
    return;
  }

  if (event.target.dataset.box) {
    score++;
    renderBox();
  }
}

function renderBox() {
  $game.innerHTML = "";
  var box = document.createElement("div");
  var boxSize = getRandom(30, 100);
  var gameSize = $game.getBoundingClientRect();
  var maxTop = gameSize.height - boxSize;
  var maxLeft = gameSize.width - boxSize;
  var randomColorIndex = getRandom(0, colors.length);

  box.style.height = box.style.width = boxSize + "px";
  box.style.position = "absolute";
  box.style.backgroundColor = colors[randomColorIndex];
  box.style.top = getRandom(0, maxTop) + "px";
  box.style.left = getRandom(0, maxLeft) + "px";
  box.style.cursor = "pointer";
  box.setAttribute("data-box", "true");

  $game.insertAdjacentElement("afterbegin", box);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
