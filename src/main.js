let imgMemoCardsPath = [
  "trumpet_draw",
  "bass_draw",
  "guitar_draw",
  "piano_draw",
  "violin_draw",
  "drums_draw",
  "sing_draw",
  "saxo_draw",
];

let memoCards = [];

let $imgHTMLRefs = document.querySelectorAll("input");

let imgHTMLCurrentIndex = 0;

function ganarJuego() {
  document.querySelector("#ganaste").className = "desoculto";
  ganarReloj;
}

$botonEmpezar = document.querySelector("#boton-empezar");
$botonReiniciar = document.querySelector("#boton-reiniciar");

imgRandomOrder();

$botonEmpezar.onclick = function () {
  for (let i = 0; i < $imgHTMLRefs.length; i++) {
    $imgHTMLRefs[i].className = "imgborderyellow";
  }
  imgRandomOrder();
};

$botonReiniciar.onclick = function () {
  for (let i = 0; i < $imgHTMLRefs.length; i++) {
    $imgHTMLRefs[i].className = "imgborderyellow";
  }
  imgRandomOrder();
};

function imgRandomOrder() {
  memoCards.length = 0;
  for (let i = 0; i < imgMemoCardsPath.length; i++) {
    const cardMemoPath = imgMemoCardsPath[i];
    for (let j = 0; j < 2; j++) {
      memoCards.push({
        imgName: cardMemoPath,
      });
      imgHTMLCurrentIndex++;
    }
  }

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  shuffle(memoCards);

  for (let i = 0; i < memoCards.length; i++) {
    const memoCard = memoCards[i];
    memoCard.$imgHTMLRef = $imgHTMLRefs[i];
    memoCard.$imgHTMLRef.src = ".img/" + memoCard.imgName + ".jpg";
  }

  for (let i = 0; i < $imgHTMLRefs.length; i++) {
    if ($imgHTMLRefs[i].className == "imgborderyellow") {
      $imgHTMLRefs[i].src = ".img/neutroNN.jpg";
    } else {
      continue;
    }
  }
}

$imgHTMLRefs.forEach(function ($cuadro) {
  $cuadro.onclick = inputClicked;
});

let similarInputClicked = [];
let contadorGanador = 0;

function inputClicked(e) {
  const $cuadro = e.target;
  if ($cuadro.type == "image") {
    similarInputClicked.push($cuadro);
    $imgHTMLRefs[$cuadro.id].src =
      "file:///D:/Programacion/MIO/memotest-r-Argenitna-Programa-main/.img/" +
      memoCards[$cuadro.id].imgName +
      ".jpg";
  }

  if (similarInputClicked.length <= 2) {
    similarInputClicked[0].className = "imgborder";
    similarInputClicked[1].className = "imgborder";
    bloquearInputUsuario();
  }

  if (similarInputClicked[0] === similarInputClicked[1]) {
    similarInputClicked.length = 1;
    console.log(similarInputClicked)
    return;
  }

  if (similarInputClicked[0].src == similarInputClicked[1].src) {
    setTimeout(function () {
      similarInputClicked[0].className = "oculto";
      similarInputClicked[1].className = "oculto";
      contadorGanador++;
      similarInputClicked.length = 0;
      bloquearInputUsuario();
    }, 500);
  } else {
    setTimeout(function () {
      similarInputClicked[0].src =
        "file:///D:/Programacion/MIO/memotest-r-Argenitna-Programa-main/.img/neutroNN.jpg";
      similarInputClicked[0].className = "imgborderyellow";
      similarInputClicked[1].src =
        "file:///D:/Programacion/MIO/memotest-r-Argenitna-Programa-main/.img/neutroNN.jpg";
      similarInputClicked[1].className = "imgborderyellow";
      similarInputClicked.length = 0;
      bloquearInputUsuario();
    }, 500);
  }
  desbloquearInputUsuario();
  if (contadorGanador == 6) {
    ganarJuego();
  }
}

function bloquearInputUsuario() {
  $imgHTMLRefs.forEach(function ($cuadro) {
    $cuadro.onclick = function () {};
  });
}

function desbloquearInputUsuario() {
  $imgHTMLRefs.forEach(function ($cuadro) {
    $cuadro.onclick = inputClicked;
  });
}

$reloj = document.querySelector("#reloj");

let sec = 0;
let min = 0;
let hrs = 0;
let t;

function tick() {
  sec++;
  if (sec >= 60) {
    sec = 0;
    min++;
    if (min >= 60) {
      min = 0;
      hrs++;
    }
  }
}
function add() {
  tick();
  $reloj.textContent =
    (hrs > 9 ? hrs : "0" + hrs) +
    ":" +
    (min > 9 ? min : "0" + min) +
    ":" +
    (sec > 9 ? sec : "0" + sec);
  timer();
}
function addWithOutTimer() {
  tick();
  $reloj.textContent =
    (hrs > 9 ? hrs : "0" + hrs) +
    ":" +
    (min > 9 ? min : "0" + min) +
    ":" +
    (sec > 9 ? sec : "0" + sec);
}
function timer() {
  t = setTimeout(add, 1000);
}

$botonEmpezar.onclick = timer;
function ganarReloj() {
  addWithOutTimer();
}
$botonReiniciar.onclick = function () {
  $reloj.textContent = "00:00:00";
  sec = 0;
  min = 0;
  hrs = 0;
};
