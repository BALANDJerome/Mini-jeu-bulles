let colorRGB;
let click = 0;
let noClick = 0;

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

  let size = Math.random() * 100 + 100 + "px";
  bubble.style.left = Math.random() * 100 + "vw";
  bubble.style.width = size;
  bubble.style.height = size;
  color();
  bubble.style.background = colorRGB;
  bubble.style.setProperty("--left", Math.random() * 100 + "vw");

  bubble.addEventListener("click", () => {
    click++;
    n1.textContent = click;
    bubble.remove();
  });
  bubble.addEventListener("animationend", () => {
    noClick++;
    n2.textContent = noClick;
    bubble.remove();
  });

  setTimeout(() => {
    bubble.remove();
  }, 8000);
};

setInterval(makeBubble, 1000);
