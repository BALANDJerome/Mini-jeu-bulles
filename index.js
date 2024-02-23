const section = document.querySelector("section");

let colorRGB;
let click = 0;
let noClick = 0;
let accueilInterval;
let easyInterval;
let time = 0;
let décompte = 3;
let pseudo;
let level = "";
let lastGame = true;
let data = [];

// Fonctions

const stockage = () => {
  if (localStorage.Bubble) {
    dataJSON = localStorage.getItem("Bubble");
    data = dataJSON && JSON.parse(dataJSON);
    choisePseudo.value = data[0].pseudo;
  }
};

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

const makeBubble = () => {
  const bubble = document.createElement("span");
  bubble.classList.add("bubble");
  document.body.appendChild(bubble);

  let size;
  if (window.matchMedia("(min-width: 800px)").matches) {
    size = Math.random() * 100 + 100 + "px";
  } else {
    size = Math.random() * 100 + 50 + "px";
  }
  bubble.style.left = Math.random() * 100 + "vw";
  bubble.style.width = size;
  bubble.style.height = size;
  color();
  bubble.style.background = colorRGB;
  bubble.style.setProperty("--left", Math.random() * 100 + "vw");
  if (extreme.checked || normal.checked) {
    bubble.style.animation = "animbubble 3s forwards linear";
  } else {
    bubble.style.animation = "animbubble 5s forwards linear";
  }

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
    } else if (décompte === 0) {
      timeDécompte.innerHTML = "GO !";
      décompte--;
    } else {
      timeDécompte.innerHTML = "";
      clearInterval(readyInterval);
      timeGame();
      décompte = 3;
    }
  }, 1000);
};

const timeGame = () => {
  time = 120;
  if (facile.checked) {
    easyInterval = setInterval(makeBubble, 1000);
    level = "Facile";
  } else if (normal.checked) {
    easyInterval = setInterval(makeBubble, 600);
    level = "Normal";
  } else {
    easyInterval = setInterval(makeBubble, 300);
    level = "Extrême";
  }
  gameInterval = setInterval(() => {
    let timeMinutes = Math.floor(time / 60);
    let timeSeconds = time % 60;
    timeDécompte.innerHTML = `${timeMinutes} : ${
      timeSeconds < 10 ? "0" + timeSeconds : timeSeconds
    }`;
    if (time > 0) {
      time--;
    } else {
      timeDécompte.innerHTML = "Terminé";
      setTimeout(() => {
        timeDécompte.innerHTML = "";
        if (data.length > 5) {
          data.pop();
        }
        // lastGame = true;
        data.push({ pseudo, click, noClick, level, lastGame });
        data.sort((a, b) => b.click - a.click);
        displayScores();
      }, 2000);
      clearInterval(easyInterval);
      clearInterval(gameInterval);
    }
  }, 1000);
};

const displayScores = () => {
  end.style.top = "50%";
  section.style.filter = "blur(2px)";
  endScores.innerHTML = data
    .map(
      (user) =>
        `<li><p>${user.lastGame ? "<i>&#10132;</i>" : ""} ${
          user.pseudo
        }<span> : ${user.click} ${user.click > 1 ? "touchées" : "touchée"} et ${
          user.noClick
        } ${user.noClick > 1 ? "loupées" : "loupée"}. <em>${
          user.level
        }</em></span></p></li>`
    )
    .join("");
  for (i = 0; i < data.length; i++) {
    data[i].lastGame = false;
  }
  localStorage.setItem("Bubble", JSON.stringify(data));
};

// Evenements

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
    welcomeH1.innerHTML = `Bienvenue<br><span id="welcomePseudo">${pseudo}</span>`;
  }
});

btnWelcome.addEventListener("click", () => {
  clearInterval(accueilInterval);
  ready();
  section.style.filter = "blur(0px)";
  welcome.style.opacity = "0";
  welcome.style.top = "-250px";
  welcome.style.transition = "1s";
});

btnReload.addEventListener("click", () => {
  click = 0;
  noClick = 0;
  n1.textContent = click;
  n2.textContent = noClick;
  end.style.top = "-250px";
  welcome.style.top = "50%";
  welcome.style.opacity = "1";
  welcome.style.transition = "4s";
  welcomeH1.innerHTML = `On y retourne <span id="welcomePseudo">${pseudo}</span> ?`;
  accueilInterval = setInterval(makeBubble, 4100);
});

accueilInterval = setInterval(makeBubble, 4100);
window.addEventListener("load", stockage());
