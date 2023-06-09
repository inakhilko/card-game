import "./normalize.css";
import "./styles.css";

function createNumbersArray(count) {
  let arr = [];
  for (let i = 1; i <= (count * count) / 2; i++) {
    arr.push(i);
    arr.push(i);
  }
  return arr;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function formCreator() {
  const container = document.querySelector(".root");
  const form = document.createElement("form");
  form.classList.add("form");
  const input = document.createElement("input");
  input.classList.add("input");
  input.type = "number";
  input.placeholder = "Введите четное число";
  const btn = document.createElement("button");
  btn.innerHTML = "Начать игру";
  btn.classList.add("btn");
  form.append(input);
  form.append(btn);
  container.innerHTML = "";
  container.append(form);
  form.onsubmit = (event) => {
    event.preventDefault();
    if (input.value >= 2 && input.value <= 10 && input.value % 2 === 0) {
      startGame(input.value);
    } else {
      startGame(4);
    }
  };
}

function buttonsCreator(count) {
  const buttons = document.createElement("div");
  buttons.classList.add("buttons");
  const btnAgain = document.createElement("button");
  btnAgain.classList.add("btn");
  btnAgain.innerHTML = "Сыграть ещё раз";
  const btnNewGame = document.createElement("button");
  btnNewGame.classList.add("btn");
  btnNewGame.innerHTML = "Поменять поле";
  buttons.append(btnAgain);
  buttons.append(btnNewGame);
  const square = document.querySelector(".root");
  square.append(buttons);
  btnAgain.addEventListener("click", (event) => {
    startGame(count);
  });
  btnNewGame.addEventListener("click", (event) => {
    formCreator();
  });
}

function startGame(count) {
  let firstChosen = null;
  let isClick = true;
  let doneCards = 0;
  let isTimeOut = false;

  const cardsArr = shuffle(createNumbersArray(count));

  const square = document.querySelector(".root");
  square.innerHTML = "";
  const timeContainer = document.createElement("div");
  timeContainer.classList.add("time-container");
  square.append(timeContainer);
  let timeInSeconds = 60;
  const timer = () => {
    const timeContainer = document.querySelector(".time-container");
    let minutes = Math.trunc(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");
    let seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    if (timeInSeconds < 0) {
      clearInterval(id);
      buttonsCreator(count);
      isTimeOut = true;
      isClick = false;
      const cards = document.querySelectorAll(".card");
      for (let card of cards) {
        card.classList.add("card--opened");
        card.classList.add("failed");
      }
    } else {
      let strTimer = `${minutes}:${seconds}`;
      timeContainer.innerHTML = strTimer;
    }
    --timeInSeconds;
  };
  timer();
  const id = setInterval(timer, 1000);

  for (let i = 0; i < count; i++) {
    let row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < count; j++) {
      let card = document.createElement("div");
      const front = document.createElement("div");
      const back = document.createElement("div");
      const value = cardsArr[i * count + j];
      front.innerText = value;
      front.classList.add("front");
      back.classList.add("back");
      card.append(front, back);

      function click(event) {
        if (!isClick) return;
        event.currentTarget.classList.toggle("card--opened");

        if (firstChosen === null) {
          firstChosen = {
            element: event.currentTarget,
            value,
            function: click,
          };
          firstChosen.element.removeEventListener(
            "click",
            firstChosen.function
          );
        } else {
          const secondChosen = event.currentTarget;
          isClick = false;
          setTimeout(() => {
            if (isTimeOut) return;
            if (firstChosen.value === value) {
              firstChosen.element.classList.add("done");
              secondChosen.classList.add("done");
              doneCards += 2;
              if (doneCards === count * count) {
                clearInterval(id);
                buttonsCreator(count);
              }
              secondChosen.removeEventListener("click", click);
            } else {
              firstChosen.element.classList.remove("card--opened");
              firstChosen.element.addEventListener(
                "click",
                firstChosen.function
              );
              secondChosen.classList.remove("card--opened");
            }
            firstChosen = null;
            isClick = true;
          }, 1200);
        }
      }

      card.addEventListener("click", click);

      card.classList.add("card");
      row.append(card);
    }
    square.append(row);
  }
}

formCreator();
