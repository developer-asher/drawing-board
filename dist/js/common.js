const canvas = document.querySelector('.draw_wrap');
const ctx = canvas.getContext('2d');

// # 1
// canvas의 css 너비, 높이와 연동.
const canvasWidth = window.getComputedStyle(canvas, null).width.split('px');
const canvasHeight = window.getComputedStyle(canvas, null).height.split('px');

canvas.width = canvasWidth[0];
canvas.height = canvasHeight[0];

// # 2
// view port의 너비, 높이의 값으로 canvas 너비, 높이 결정.
// canvas.width =
//   window.innerWidth < 1024 ? window.innerWidth / 1.5 : view.innerWidth / 2;
// canvas.height = window.innerHeight / 1.5;

const defaultColor = '#000';

ctx.strokeStyle = defaultColor;
ctx.fillStyle = defaultColor;
ctx.lineWidth = 2;

let painting = false;
let filling = false;

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function moveMouse(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  // 순서: 마우스 클릭(true) > 경로초기화 > 시작경로 설정 > 마우스 뗌(false)> 지나온 경로의 끝점까지 직선으로 연결 > stroke 로 직선을 그림.
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function mouseEvnetListener() {
  canvas.addEventListener('mousemove', moveMouse);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', handleCanvasClick);
}

function selectColor(event) {
  let colors = event.target.innerText;

  if (colors === 'light-blue') {
    colors = '#0099ff';
  }
  ctx.strokeStyle = colors;
  ctx.fillStyle = colors;
}

function btnColorEventListener() {
  const colorLists = document.querySelector('.list_colors');

  colorLists.addEventListener('click', (event) => selectColor(event));
}

function changeBrushThickness(event) {
  const step = event.target.value;

  ctx.lineWidth = step;
}

function inputEventListener() {
  const range = document.querySelector('#thickness');

  range.addEventListener('change', (event) => changeBrushThickness(event));
}

function selectMode(mode) {
  if (filling === true) {
    filling = false;
    mode.innerHTML = '<button>Fill</button>';
  } else {
    filling = true;
    mode.innerHTML = '<button>Paint</button>';
  }
}

function modeEventListener() {
  const btnMode = document.querySelector('.btn_mode');

  btnMode.addEventListener('click', () => selectMode(btnMode));
}

function setInitialCanvasBgColor() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function init() {
  setInitialCanvasBgColor();
  mouseEvnetListener();
  btnColorEventListener();
  inputEventListener();
  modeEventListener();
}

init();
