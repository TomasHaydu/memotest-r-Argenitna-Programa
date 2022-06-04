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

  /*for (let i = 0; i < $imgHTMLRefs.length; i++) {
    if ($imgHTMLRefs[i].className == "imgborderyellow") {
      $imgHTMLRefs[i].src = ".img/neutroNN.jpg";
    } else {
      continue;
    }
  }*/
}

$imgHTMLRefs.forEach(function ($cuadro) {
  $cuadro.onclick = inputClicked;
});

let similarInputClicked = [];

function inputClicked(e) {
  const $cuadro = e.target;
  if ($cuadro.type == "image") {
    similarInputClicked.push($cuadro);

    if (similarInputClicked[0] === similarInputClicked[1]) {
      similarInputClicked.length = 1
      return;
    } else {
      if (similarInputClicked.length > 2) {
        bloquearInputUsuario;
        similarInputClicked.length = 2;
        //counterInputClicked = 0
      } else {
        $cuadro.className = "imgborder";
      }

      if (similarInputClicked.length == 2) {
        if (similarInputClicked[0].src == similarInputClicked[1].src) {
          similarInputClicked[0].className = "oculto";
          similarInputClicked[1].className = "oculto";
          similarInputClicked.length = 0;
        } else {
          //volver a ponerlas dadas vuelta
          similarInputClicked[0].className = "imgborderyellow";
          similarInputClicked[1].className = "imgborderyellow";
          similarInputClicked.length = 0;
        }
      }
      let contadorImgBorderYellow = 0;
      for (let i = 0; i < $imgHTMLRefs.length; i++) {
        if ($imgHTMLRefs[i].className !== "imgborderyellow") {
          contadorImgBorderYellow++;
        } else {
          contadorImgBorderYellow = 0;
        }
        if (contadorImgBorderYellow == $imgHTMLRefs.length) {
          ganarJuego();
        }
      }
    }
  }

  function bloquearInputUsuario() {
    $imgHTMLRefs.forEach(function ($cuadro) {
      $cuadro.onclick = function () {};
    });
  }
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
