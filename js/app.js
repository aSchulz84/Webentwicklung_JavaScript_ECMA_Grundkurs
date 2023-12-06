// Das gesamte Spiel "Whac A Mole" in einer Funktion zusammengefasst
function whacMole() {
  let holes,
    count,
    score,
    result,
    countDown,
    startTime,
    moles,
    firstRow,
    secondRow,
    thirdRow,
    audio,
    cursor,
    soundSwitch;

  cursor = el("#cursor");
  holes = group(".hole");
  count = el("#count");
  score = el("#score");
  firstRow = group(".row1");
  secondRow = group(".row2");
  thirdRow = group(".row3");

  const sounds = {
    molePlus: "sound/break.mp3",
    moleMinus: "sound/shot.mp3",
    winner: "sound/winner.mp3",
  };

  function initVaris() {
    result = 0;
    countDown = 60;
    startTime = null;
    moles = null;
    soundSwitch = true;

    el("#result").innerText = `Score: ${result}`;
    el("#countdown").innerText = `Time: ${countDown}`;
  }

  function removeMoles(array) {
    array.forEach((row) => {
      row.classList.remove("mole10");
      row.classList.remove("mole25");
      row.classList.remove("mole50");
      row.classList.remove("mole-minus");
    });
  }

  function randomHole(row) {
    removeMoles(row);
    const moleArray = [
      "mole10",
      "mole10",
      "mole-minus",
      "mole25",
      "mole-minus",
      "mole50",
      "mole-minus",
      "mole10",
      "mole-minus",
    ];

    let randomPostion = row[Math.floor(Math.random() * 3)];
    return randomPostion.classList.add(
      moleArray[Math.floor(Math.random() * 9)]
    );
  }

  function randomMoles() {
    randomHole(firstRow);
    randomHole(secondRow);
    randomHole(thirdRow);
  }

  function moveMoles() {
    moles = setInterval(randomMoles, 1000);
  }

  function playAudio(path) {
    if (soundSwitch) {
      audio = new Audio();
      audio.volume = 0.5;
      audio.src = path;
      audio.play();
    }
  }

  function soundOnOff() {
    soundSwitch = !soundSwitch;
    if (soundSwitch) {
      el("#sound").innerText = "Sound Off";
    } else {
      el("#sound").innerText = "Sound On";
    }
  }

  function scoreCounter() {
    if (this.classList.contains("mole10")) {
      result += 10;
      playAudio(sounds.molePlus);
    } else if (this.classList.contains("mole25")) {
      result += 25;
      playAudio(sounds.molePlus);
    } else if (this.classList.contains("mole50")) {
      result += 50;
      playAudio(sounds.molePlus);
    } else if (this.classList.contains("mole-minus")) {
      result -= 25;
      playAudio(sounds.moleMinus);
    }

    el("#result").innerText = `Score : ${result}`;
  }

  function start() {
    startTime = setInterval(time, 1000);
    moveMoles();
    el("#start").className = "passive";
    el("#cursor").className = "active";
    el("#game").className = "nocursor";
    el("#sound").className = "active";
  }

  function time() {
    countDown--;
    if (countDown === 0) {
      clearInterval(startTime);
      clearInterval(moles);
      removeMoles(holes);
      gameOver();
      el("#cursor").className = "passive";
    }

    el("#countdown").innerText = `Time: ${countDown}`;
  }

  function createEnd() {
    el("#endGame").className = "active";
    el("#finalscore").innerText = `Score: ${result}`;
  }

  function gameOver() {
    createEnd();
    playAudio(sounds.winner);
    el("#wrapper").className = "passive";
  }

  function newGame() {
    el("#game").classList.remove("nocursor");
    el("#sound").className = "passive";
    el("#wrapper").className = "active";
    el("#endGame").className = "passive";
    el("#start").className = "active";
    audio.pause();
    initVaris();
  }

  initVaris();

  holes.forEach((hole) => {
    hole.addEventListener("click", scoreCounter);
  });

  el("#game").addEventListener("mousemove", (e) => {
    cursor.style.top = e.pageY + "px";
    cursor.style.left = e.pageX + "px";
  });

  el("#replay").addEventListener("click", newGame);

  el("#sound").addEventListener("click", soundOnOff);

  el("#start").addEventListener("click", start);
}

whacMole();
