// элементы с выпадающим списком
let selectTower = document.getElementById("towerID");
let selectFloor = document.getElementById("floorID");
let selectNumberRoom = document.getElementById("numberRoomID");

// содержимое выпадающего списка  для поля "Башня"
const optionsTower = ["А", "Б"];

let form = document.querySelector(".bookingMeetingRoom");
let comment = form.querySelector(".comment");
let fields = form.querySelectorAll(".field");

// проверка даты
let dateChoose = form.querySelector(".dateChoose");
let dateCheck = false;

// проверка времени
let timeStartChoose = form.querySelector(".timeStartChoose");
timeStartChoose.value = "";
let timeEndChoose = form.querySelector(".timeEndChoose");
let timeStartCheck = false;
let timeEndCheck = false;

// текущие дата и время
let localDate = new Date().toLocaleDateString("ru-RU");
let localTime = new Date().toTimeString("ru-Ru");
let localMinute = localTime.slice(3,5);
let localHour = localTime.slice(0,2);
let localYear = localDate.slice(6,10);
let localMonth = localDate.slice(3,5);
let localDay = localDate.slice(0,2);

var chooseYear;
var chooseMonth;
var chooseDay;
var chooseStartMinute;
var chooseStartHour;

const clearButton = document.getElementById("clearButtonID");
const sendButton = document.getElementById("sendButtonID");

function optionTower()
{
  for (let i = 0; i < optionsTower.length; i++) {
    let elTower = document.createElement("option");
    elTower.textContent = optionsTower[i];
    elTower.value = optionsTower[i];
    selectTower.appendChild(elTower);
  }
}

function optionFloor()
{
  for (let i = 3; i < 28; i++) {
    let elFloor = document.createElement("option");
    elFloor.textContent = i;
    elFloor.value = i;
    selectFloor.appendChild(elFloor);
  }
}

function optionNumberRoom()
{
  for (let i = 1; i < 11; i++) {
    let elNumberRoom = document.createElement("option");
    elNumberRoom.textContent = i;
    elNumberRoom.value = i;
    selectNumberRoom.appendChild(elNumberRoom);
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
  for (var i = 0; i < fields.length; i++) {
    fields[i].style.color = "black";
    if (!fields[i].value)
    {
      return (generateError("Поле не заполнено", fields[i], fields[i]));
    }
  }
  if (!dateCheck)
    return (generateError("Неверное значение поля", dateChoose, dateChoose));
  if (!timeStartCheck)
    return (generateError("Неверное значение поля", timeStartChoose, timeStartChoose));
  if (!timeEndCheck)
    return (generateError("Неверное значение поля", timeEndChoose, timeEndChoose));
  return true;
}

function clearForm(valueClear)
{
  console.log("Значение ", valueClear, " удалено");
  valueClear = "";
  return valueClear;
}

optionTower();
optionFloor();
optionNumberRoom();

// проверка даты (выбрана текущая и позже)
dateChoose.addEventListener("change", function (e) {
  if(!dateCheck)
    e.target.style.color = "black";
  // выбранная пользователем дата
  let chooseDateString = e.target.value.toString();
  chooseYear = chooseDateString.slice(0,4);
  chooseMonth = chooseDateString.slice(6,7);
  chooseDay = chooseDateString.slice(8,10);

  if(localYear - chooseYear > 0)
    dateCheck = generateError("Неверный год", chooseYear,  e.target);
  else if (localYear - chooseYear == 0 && localMonth - chooseMonth > 0)
    dateCheck = generateError("Неверный месяц", chooseMonth,  e.target);
  else if (localYear - chooseYear == 0 && localMonth - chooseMonth == 0 && localDay - chooseDay > 0)
    dateCheck = generateError("Неверный день", chooseDay, e.target);
  else {
    e.target.style.color= "black";
    dateCheck = true;
  }
});

// проверка времени начала (выбрана текущая и позже)
timeStartChoose.addEventListener("change", function (e) {
  if(!timeStartCheck)
    e.target.style.color= "black";
  // выбранное пользователем время начала бронирования
  let chooseTimeStartString = e.target.value.toString();
  chooseStartMinute = chooseTimeStartString.slice(3,5);
  chooseStartHour = chooseTimeStartString.slice(0,2);
  if(!dateCheck)
    timeStartCheck = generateError("Указана неверная дата", dateChoose, e.target);
  else if (localYear - chooseYear == 0 && localMonth - chooseMonth == 0 && localDay - chooseDay == 0) {
    if (localHour - chooseStartHour > 0)
      timeStartCheck = generateError("Указано прошедшее время (час)", chooseStartHour, e.target);
    else if (localHour - chooseStartHour == 0 && localMinute - chooseStartMinute > 0)
      timeStartCheck = generateError("Указано прошедшее время (минуты)", chooseStartMinute, e.target);
  } else {
    e.target.style.color= "black";
    timeStartCheck = true;
  }
});

// проверка времени окончания (выбрана текущая и позже)
timeEndChoose.addEventListener("change", function (e) {
  if(!timeEndCheck)
    e.target.style.color= "black";
  // выбранное пользователем время окончания бронирования
  let chooseTimeEndString = e.target.value.toString();
  let chooseEndMinute = chooseTimeEndString.slice(3,5);
  let chooseEndHour = chooseTimeEndString.slice(0,2);
  if(!timeStartCheck)
    timeEndCheck = generateError("Указано неверное время начала бронирования переговорной", timeStartChoose, e.target);
  else if (chooseStartHour - chooseEndHour > 0)
    timeEndCheck = generateError("Время окончания бронирования должно быть после время начала (час)", timeEndChoose, e.target);
  else if (chooseStartHour - chooseEndHour == 0 && chooseStartMinute - chooseEndMinute >= 0)
    timeEndCheck = generateError("Время окончания бронирования должно быть после время начала (минуты)", timeEndChoose, e.target);
  else {
    e.target.style.color= "black";
    timeEndCheck = true;
  }
});

sendButton.addEventListener("click", function handleClick(event) {
  event.preventDefault()
  removeValidation()

  if (!checkFieldsPresence())
    console.log("Ошибка при отправке формы");
  else {
    const Store_Form_Data = {}
    Store_Form_Data.tower = selectTower.value;
    Store_Form_Data.floor = selectFloor.value;
    Store_Form_Data.numberRoom = selectNumberRoom.value;
    Store_Form_Data.date = dateChoose.value;
    Store_Form_Data.timeStart = timeStartChoose.value;
    Store_Form_Data.timeEnd = timeEndChoose.value;
    Store_Form_Data.comment = comment.value;
    console.log("Форма отправлена\n", Store_Form_Data)
    alert("Переговорная успешно забронирована")
  }
});

clearButton.addEventListener('click', function handleClick(event) {
  event.preventDefault();
  console.log("Нажата кнопка 'Очистить'");

  for (var i = 0; i < fields.length; i++) {
    fields[i].style.color = "black";
    if (fields[i].value)
      fields[i].value = clearForm(fields[i].value);
  }
  alert("Значения полей формы удалены");
});
