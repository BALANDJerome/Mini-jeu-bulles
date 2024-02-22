const section = document.querySelector("section");

let colorRGB;
let click = 0;
let noClick = 0;
let accueilInterval;
let normalInterval;
let time = 0;
let décompte = 5;
let pseudo;
const ring = () => {
  const audio = new Audio();
  audio.src = "./assets/bubble.mp3";
  audio.play();
};

const color = () => {
  colorR = Math.floor(Math.random() * 200);
  colorG = Math.floor(Math.random() * 200);
  colorB = Math.floor(Math.random() * 200);
  colorRGB = `rgb(${colorR},${colorG},${colorB})`;
};

validPseudo.addEventListener("click", (e) => {
  e.preventDefault();
  pseudo = choisePseudo.value;
  if (pseudo.length < 3 || pseudo.length > 20) {
    alert("Le Pseudo doit être compris entre 3 et 20 caractères");
    choisePseudo.value = "";
  } else if (!pseudo.match(/^[a-zA-Z0-9_.-]*$/)) {
    alert(
      "Le Pseudo ne doit pas contenir de caractères spéciaux sauf ( _ et - )"
    );
    choisePseudo.value = "";
  } else {
    accueilPseudo.style.opacity = "0";
    accueilPseudo.style.top = "-250px";
    accueilPseudo.style.transition = "2s";
    welcome.style.opacity = "1";
    welcome.style.transition = "4s";
    welcomePseudo.innerText = pseudo;
  }
});

const makeBubble = () => {
  const bubble = document.createElement("span");
  bubble.classList.add("bubble");
  document.body.appendChild(bubble);

  let size = Math.random() * 100 + 100 + "px";
  bubble.style.left = Math.random() * 100 + "vw";
  bubble.style.width = size;
  bubble.style.height = size;
  color();
  bubble.style.background = colorRGB;
  bubble.style.setProperty("--left", Math.random() * 100 + "vw");

  bubble.addEventListener("click", () => {
    if (time > 0) {
      click++;
    }
    n1.textContent = click;
    ring();
    bubble.remove();
  });
  bubble.addEventListener("animationend", () => {
    if (time > 0) {
      noClick++;
    }
    n2.textContent = noClick;
    bubble.remove();
  });
};

const ready = () => {
  readyInterval = setInterval(() => {
    timeDécompte.innerHTML = `<p>${décompte}</p>`;
    if (décompte > 0) {
      décompte--;
      // ready();
    } else if (décompte === 0) {
      timeDécompte.innerHTML = "GO !";
      décompte--;
    } else {
      timeDécompte.innerHTML = "";
      clearInterval(readyInterval);
      timeGame();
    }
  }, 1000);
};
const timeGame = () => {
  time = 120;
  normalInterval = setInterval(makeBubble, 1000);
  gameInterval = setInterval(() => {
    let timeMinutes = Math.floor(time / 60);
    let timeSeconds = time % 60;
    timeDécompte.innerHTML = `${timeMinutes} : ${
      timeSeconds < 10 ? "0" + timeSeconds : timeSeconds
    }`;
    if (time > 0) {
      time--;
    } else {
      timeDécompte.innerHTML = "Fini";
      clearInterval(normalInterval);
      clearInterval(gameInterval);
    }
  }, 1000);
};

btnWelcome.addEventListener("click", () => {
  clearInterval(accueilInterval);
  // setTimeout(() => {
  // }, 5000);
  ready();
  section.style.filter = "blur(0px)";
  welcome.style.opacity = "0";
  welcome.style.top = "-250px";
  welcome.style.transition = "1s";
});

accueilInterval = setInterval(makeBubble, 4000);

// continuer avec affichage score
