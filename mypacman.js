const pacmanImages = {
  openRight: "pm1.png",
  closedRight: "pm2.png",
  openLeft: "pm3.png",
  closedLeft: "pm4.png",
};

const pacmen = [];

function setRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

function makePacman() {
  const velocity = setRandom(8);
  const position = setRandom(200);

  let element = document.createElement("img");
  element.style.position = "absolute";
  element.src = pacmanImages.openRight;
  element.style.width = 100;
  element.style.left = position.x;
  element.style.top = position.y;

  const game = document.getElementById("game");
  game.appendChild(element);

  pacmen.push({
    position,
    velocity,
    element,
  });
}

function deletePacman() {
  const pacman = pacmen.shift();

  if (pacman) {
    const game = document.getElementById("game");
    game.removeChild(pacman.element);
  }
}

function checkCollisions(pacman) {
  const xMax = window.innerWidth;
  const xMin = 0;

  const yMax = window.innerHeight;
  const yMin = 0;

  const currentX = pacman.position.x + pacman.velocity.x;
  const currentY = pacman.position.y + pacman.velocity.y;

  if (currentX + pacman.element.width > xMax) {
    pacman.velocity.x = -pacman.velocity.x;
    pacman.element.src = pacmanImages.openLeft;
  }

  if (currentX < xMin) {
    pacman.velocity.x = -pacman.velocity.x;
    pacman.element.src = pacmanImages.openRight;
  }

  if (currentY + pacman.element.height > yMax) {
    pacman.velocity.y = -pacman.velocity.y;
  }

  if (currentY < yMin) {
    pacman.velocity.y = -pacman.velocity.y;
  }
}

function update() {
  for (const pacman of pacmen) {
    checkCollisions(pacman);
    pacman.position.x += pacman.velocity.x;
    pacman.position.y += pacman.velocity.y;

    pacman.element.style.left = pacman.position.x + "px";
    pacman.element.style.top = pacman.position.y + "px";

    if (pacman.element.src.includes(pacmanImages.openRight)) {
      pacman.element.src = pacmanImages.closedRight;
    } else if (pacman.element.src.includes(pacmanImages.closedRight)) {
      pacman.element.src = pacmanImages.openRight;
    }

    if (pacman.element.src.includes(pacmanImages.openLeft)) {
      pacman.element.src = pacmanImages.closedLeft;
    } else if (pacman.element.src.includes(pacmanImages.closedLeft)) {
      pacman.element.src = pacmanImages.openLeft;
    }
  }
}

setInterval(update, 100);
