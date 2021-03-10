const canvas = document.querySelector('.draw_wrap');
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

const ctx = canvas.getContext('2d');
ctx.strokeStyle = '#000';
ctx.lineWidth = 2;

let painting = false;

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

function downMouse(event) {
  painting = true;
}

function mouseEvnetListener() {
  canvas.addEventListener('mousemove', moveMouse);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
}

function selectColor(event) {
  let colors = event.target.innerText;

  if (colors === 'light-blue') {
    colors = '#0099ff';
  }
  ctx.strokeStyle = colors;
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

function init() {
  mouseEvnetListener();
  btnColorEventListener();
  inputEventListener();
}

init();
