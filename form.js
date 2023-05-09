//'use strict'
// элементы с выпадающим списком
const selectElements = {
  tower: document.getElementById("towerID"),
  floor: document.getElementById("floorID"),
  numberRoom: document.getElementById("numberRoomID"),
  optionsTower: ["А", "Б"]  // содержимое выпадающего списка  для поля "Башня"
}

const form = document.querySelector(".form");
const comment = form.querySelector(".comment");
const fields = form.querySelectorAll(".field");

// текущие дата и время
const localDate = new Date().toLocaleDateString("ru-RU");
const localTime = new Date().toTimeString("ru-Ru");

// проверка даты
const checkInputDate = {
  input: form.querySelector(".dateInput"),
  dateCheck: false,
  localYear: localDate.slice(6,10),
  localMonth: localDate.slice(3,5),
  localDay: localDate.slice(0,2)
}

// проверка времени
const checkInputTime = {
  startInput: form.querySelector(".timeStartInput"),
  endInput: form.querySelector(".timeEndInput"),
  startCheck: false,
  endCheck: false,
  localMinute: localTime.slice(3,5),
  localHour: localTime.slice(0,2)
}

//checkInputTime.startInput.value = "";

const clearButton = document.getElementById("clearButtonID");
const sendButton = document.getElementById("sendButtonID");

optionTower();
optionFloor();
optionNumberRoom();

function optionTower()
{
  for (let i = 0; i < selectElements.optionsTower.length; i++) {
    let elTower = document.createElement("option");
    elTower.textContent = selectElements.optionsTower[i];
    elTower.value = selectElements.optionsTower[i];
    selectElements.tower.appendChild(elTower);
  }
}

function optionFloor()
{
  for (let i = 3; i < 28; i++) {
    let elFloor = document.createElement("option");
    elFloor.textContent = i;
    elFloor.value = i;
    selectElements.floor.appendChild(elFloor);
  }
}

function optionNumberRoom()
{
  for (let i = 1; i < 11; i++) {
    let elNumberRoom = document.createElement("option");
    elNumberRoom.textContent = i;
    elNumberRoom.value = i;
    selectElements.numberRoom.appendChild(elNumberRoom);
  }
}

function generateError (textError, valueError, element) {
  element.style.color = "red";
  console.log(textError + ' ' + valueError);
  return false;
}

function removeValidation () {
  let errors = form.querySelectorAll(".error");
  for (let i = 0; i < errors.length; i++) {
    errors[i].remove();
  }
}

function checkFieldsPresence () {
  for (let i = 0; i < fields.length; i++) {
    fields[i].style.color = "black";
    if (!fields[i].value)
      return (generateError("Поле не заполнено", fields[i], fields[i]));
  }
  if (!checkInputDate.dateCheck)
    return (generateError("Неверное значение поля", checkInputDate.input, checkInputDate.input));
  if (!checkInputTime.startCheck)
    return (generateError("Неверное значение поля", checkInputTime.startInput, checkInputTime.startInput));
  if (!checkInputTime.endCheck)
    return (generateError("Неверное значение поля", checkInputTime.endInput, checkInputTime.endInput));
  return true;
}

function clearForm(valueClear)
{
  valueClear = "";
  return valueClear;
}

// проверка даты (выбрана текущая и позже)
checkInputDate.input.addEventListener("change", function (event) {
  if(!checkInputDate.dateCheck)
    event.target.style.color = "black";
  // выбранная пользователем дата
  let inputDateString = event.target.value.toString();
  checkInputDate.inputYear = inputDateString.slice(0,4);
  checkInputDate.inputMonth = inputDateString.slice(6,7);
  checkInputDate.inputDay = inputDateString.slice(8,10);

  if(checkInputDate.localYear - checkInputDate.inputYear > 0)
    checkInputDate.dateCheck = generateError("Неверный год", checkInputDate.inputYear, event.target);
  else if (checkInputDate.localYear - checkInputDate.inputYear == 0 && checkInputDate.localMonth - checkInputDate.inputMonth > 0)
    checkInputDate.dateCheck = generateError("Неверный месяц", checkInputDate.inputMonth, event.target);
  else if (checkInputDate.localYear - checkInputDate.inputYear == 0 && checkInputDate.localMonth - checkInputDate.inputMonth == 0 && checkInputDate.localDay - checkInputDate.inputDay > 0)
    checkInputDate.dateCheck = generateError("Неверный день", checkInputDate.inputDay, event.target);
  else {
    event.target.style.color = "black";
    checkInputDate.dateCheck = true;
  }
});

// проверка времени начала (выбрана текущая и позже)
checkInputTime.startInput.addEventListener("change", function (event) {
  if(!checkInputTime.startCheck)
    event.target.style.color= "black";
  // выбранное пользователем время начала бронирования
  let inputTimeStartString = event.target.value.toString();
  checkInputTime.inputStartMinute = inputTimeStartString.slice(3,5);
  checkInputTime.inputStartHour = inputTimeStartString.slice(0,2);
  if(!checkInputDate.dateCheck)
  checkInputTime.startCheck = generateError("Указана неверная дата", checkInputDate.input, event.target);
  else if (checkInputDate.localYear - checkInputDate.inputYear == 0 && checkInputDate.localMonth - checkInputDate.inputMonth == 0 && checkInputDate.localDay - checkInputDate.inputDay == 0) {
    if (checkInputTime.localHour - checkInputTime.inputStartHour > 0)
      checkInputTime.startCheck = generateError("Указано прошедшее время (час)", checkInputTime.inputStartHour, event.target);
    else if (checkInputTime.localHour - checkInputTime.inputStartHour == 0 && checkInputTime.localMinute - checkInputTime.inputStartMinute > 0)
      checkInputTime.startCheck = generateError("Указано прошедшее время (минуты)", checkInputTime.inputStartMinute, event.target);
  } else {
    event.target.style.color= "black";
    checkInputTime.startCheck = true;
  }
});

// проверка времени окончания (выбрана текущая и позже)
checkInputTime.endInput.addEventListener("change", function (event) {
  if(!checkInputTime.endCheck)
    event.target.style.color= "black";
  // выбранное пользователем время окончания бронирования
  let inputTimeEndString = event.target.value.toString();
  checkInputTime.inputEndMinute = inputTimeEndString.slice(3,5);
  checkInputTime.inputEndHour = inputTimeEndString.slice(0,2);
  if(!checkInputTime.startCheck)
    checkInputTime.endCheck = generateError("Указано неверное время начала бронирования переговорной", checkInputTime.startInput, event.target);
  else if (checkInputTime.inputStartHour - checkInputTime.inputEndHour > 0)
    checkInputTime.endCheck = generateError("Время окончания бронирования должно быть после время начала (час)", checkInputTime.endInput, event.target);
  else if (checkInputTime.inputStartHour - checkInputTime.inputEndHour == 0 && checkInputTime.inputStartMinute - checkInputTime.inputEndMinute >= 0)
    checkInputTime.endCheck = generateError("Время окончания бронирования должно быть после время начала (минуты)", checkInputTime.endInput, event.target);
  else {
    event.target.style.color= "black";
    checkInputTime.endCheck = true;
  }
});

sendButton.addEventListener("click", function handleClick(event) {
  event.preventDefault()
  removeValidation()

  if (!checkFieldsPresence())
    console.log("Ошибка при отправке формы");
  else {
    const eventData = {
      tower: selectElements.tower.value,
      floor: +selectElements.floor.value, // превращаю в число
      numberRoom: +selectElements.numberRoom.value, // превращаю в число
      date: checkInputDate.input.value,
      timeStart: checkInputTime.startInput.value,
      timeEnd: checkInputTime.endInput.value,
      comment: comment.value
    }

    console.log("Форма отправлена\n", JSON.stringify(eventData));
    console.log("Поля формы очищены после отправки формы");
    alert("Переговорная успешно забронирована");
    for (let i = 0; i < fields.length; i++) {
      fields[i].style.color = "black";
      if (fields[i].value)
        fields[i].value = clearForm(fields[i].value);
    }
  }
});

clearButton.addEventListener('click', function handleClick(event) {
  event.preventDefault();
  console.log("Нажата кнопка 'Очистить'");

  for (let i = 0; i < fields.length; i++) {
    fields[i].style.color = "black";
    if (fields[i].value)
      console.log("Значение ", fields[i].value, " удалено");
      fields[i].value = clearForm(fields[i].value);
  }
  alert("Значения полей формы удалены");
});
