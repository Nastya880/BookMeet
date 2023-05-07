var timerDate = 0;
var timerTime = 0;

const textErrorDate = 'Указана прошедшая дата';
const textErrorTime = 'Указано прошедшее время';

// элементы с выпадающим списком
let selectTower = document.getElementById("towerID");
let selectFloor = document.getElementById("floorID");
let selectNumberRoom = document.getElementById("numberRoomID");

// содержимое выпадающего списка  для поля "Башня"
const optionsTower = ["А", "Б"];

let form = document.querySelector('.bookingMeetingRoom')
let comment = form.querySelector('.comment')
let fields = form.querySelectorAll('.field')

// проверка даты
let dateChoose = form.querySelector('.dateChoose')
var dateCheck = false;

// проверка времени
let timeStartChoose = form.querySelector('.timeStartChoose')
let timeEndChoose = form.querySelector('.timeEndChoose')
let timeStartCheck = false;

// текущие дата и время
let localDate = new Date().toLocaleDateString('ru-RU');
let localTime = new Date().toTimeString('ru-Ru');
let localMinute = localTime.slice(3,5);
let localHour = localTime.slice(0,2);
let localYear = localDate.slice(6,10);
let localMonth = localDate.slice(3,5);
let localDay = localDate.slice(0,2);

var chooseYear;
var chooseMonth;
var chooseDay;

const clearButton = document.getElementById('clearButtonID');
const sendButton = document.getElementById('sendButtonID');

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

var error = document.createElement('div');

function generateError (textError, valueError) {
  error = document.createElement('div');
  error.className = 'error';
  error.style.color = 'red';
  error.innerHTML = textError;
  console.log(textError, valueError);
  return error;
}

function removeValidation () {
  let errors = form.querySelectorAll('.error');
  for (let i = 0; i < errors.length; i++) {
    errors[i].remove();
  }
}

function checkFieldsPresence () {
  for (var i = 0; i < fields.length; i++) {
    if (!fields[i].value) {
      form[i].parentElement.insertBefore(generateError('Заполните поле', fields[i]), fields[i]);
      return false;
    }
  }
  if (!dateCheck)
  {
    dateChoose.parentElement.insertBefore(generateError(textErrorDate, dateChoose), dateChoose);
    return false;
  }
  if (!timeStartCheck)
  {
    timeStartChoose.parentElement.insertBefore(generateError(textErrorTime, timeStartChoose), timeStartChoose);
    return false;
  }
  return true;
}

function clearForm(valueClear)
{
  console.log('Значение', valueClear, ' удалено');
  valueClear = '';
  return valueClear;
}

optionTower();
optionFloor();
optionNumberRoom();

// проверка даты (выбрана текущая и позже)
dateChoose.addEventListener('change', function (e) {
  if(!dateCheck)
    error.innerHTML = '';
  // выбранная пользователем дата
  var chooseDateString = e.target.value.toString();
  chooseYear = chooseDateString.slice(0,4);
  chooseMonth = chooseDateString.slice(6,7);
  chooseDay = chooseDateString.slice(8,10);

  if(localYear - chooseYear > 0) {
    dateChoose.parentElement.insertBefore(generateError("Неверный год", chooseYear), dateChoose);
    dateCheck = false;
  }
  else if (localYear - chooseYear == 0 && localMonth - chooseMonth > 0) {
    dateChoose.parentElement.insertBefore(generateError("Неверный месяц", chooseYear), dateChoose);
    dateCheck = false;
  }
  else if (localYear - chooseYear == 0 && localMonth - chooseMonth == 0 && localDay - chooseDay > 0) {
    dateChoose.parentElement.insertBefore(generateError("Неверный день", chooseYear), dateChoose);
    dateCheck = false;
  }
  else
  {
    dateCheck = true;
   // console.log('first date ' + dateCheck);
  }
});

// проверка времени (выбрана текущая и позже)
timeStartChoose.addEventListener('change', function (e) {
  if(!timeStartCheck)
    error.innerHTML = '';
  // выбранное пользователем время начала бронирования
  let chooseTimeStartString = e.target.value.toString();
  let chooseStartMinute = chooseTimeStartString.slice(3,5);
  let chooseStartHour = chooseTimeStartString.slice(0,2);
 // console.log('datecheck' + dateCheck);
  if(!dateCheck)
  {
    timeStartChoose.parentElement.insertBefore(generateError('Указана прошедшая дата', dateChoose), timeStartChoose);
    timeStartCheck = false;
  }
  else if (localYear - chooseYear == 0 && localMonth - chooseMonth == 0 && localDay - chooseDay == 0) {
    if (localHour - chooseStartHour > 0)
    {
      timeStartCheck = false;
      timeStartChoose.parentElement.insertBefore(generateError(textErrorTime, chooseStartHour), timeStartChoose);
    }
    else if (localHour - chooseStartHour == 0 && localMinute - chooseStartMinute > 0) {
      timeStartCheck = false;
      timeStartChoose.parentElement.insertBefore(generateError(textErrorTime, chooseStartMinute), timeStartChoose);
    }
  } else
    timeStartCheck = true;
});

sendButton.addEventListener('click', function handleClick(event) {
  event.preventDefault()
  removeValidation()

  if (!checkFieldsPresence())
    console.log("Error");
  else {
    timerTime = 0;
    timerDate = 0;
    const Store_Form_Data = {}
    Store_Form_Data.tower = selectTower.value;
    Store_Form_Data.floor = selectFloor.value;
    Store_Form_Data.numberRoom = selectNumberRoom.value;
    Store_Form_Data.date = dateChoose.value;
    Store_Form_Data.timeStart = timeStartChoose.value;
    Store_Form_Data.timeEnd = timeEndChoose.value;
    Store_Form_Data.comment = comment.value;
    console.log("Send form\n", Store_Form_Data)
    alert("Переговорная успешно забронирована")
  }
});

clearButton.addEventListener('click', function handleClick(event) {
  event.preventDefault();
  console.log('Нажата кнопка Очистить');
  timerDate = 0;
  timerTime = 0;
  for (var i = 0; i < fields.length; i++) {
    if (fields[i].value)
      fields[i].value = clearForm(fields[i].value);
  }
  //alert("clear");
});
