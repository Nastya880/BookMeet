// выпадающий список для выбора башни (А, Б)
let selectTower = document.getElementById("towerID");
const optionsTower = ["А", "Б"];

let form = document.querySelector('.bookingMeetingRoom')
let tower = form.querySelector('.tower')
let comment = form.querySelector('.comment')
let fields = form.querySelectorAll('.field')

// проверка времени
let dateChoose = form.querySelector('.dateChoose')
let dateCheck = false;

// текущие дата и время
let localDate = new Date().toLocaleDateString('ru-RU');
let localTime = new Date().toTimeString('ru-Ru');
let localMinute = localTime.slice(3,5);
let localHour = localTime.slice(0,2);
let localYear = localDate.slice(6,10);
let localMonth = localDate.slice(3,5);
let localDay = localDate.slice(0,2);

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

function generateError (textError, valueError) {
  let error = document.createElement('div');
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
    dateChoose.parentElement.insertBefore(generateError('Указана прошедшая дата', dateChoose), dateChoose);
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

// проверка даты (выбрана текущая и позже)
dateChoose.addEventListener('change', function (e) {
  // выбранная пользователем дата
  let chooseDateString = e.target.value.toString();
  let chooseYear = chooseDateString.slice(0,4);
  let chooseMonth = chooseDateString.slice(6,7);
  let chooseDay = chooseDateString.slice(8,10);

  if(localYear - chooseYear > 0)
    dateChoose.parentElement.insertBefore(generateError('Указан прошедший год', chooseYear), dateChoose);
  else if (localYear - chooseYear == 0 && localMonth - chooseMonth > 0)
    dateChoose.parentElement.insertBefore(generateError('Указан прошедший месяц', chooseYear), dateChoose);
  else if (localYear - chooseYear == 0 && localMonth - chooseMonth == 0 && localDay - chooseDay > 0)
    dateChoose.parentElement.insertBefore(generateError('Указан прошедший день', chooseYear), dateChoose);
  else
    dateCheck = true;
});

sendButton.addEventListener('click', function handleClick(event) {
  event.preventDefault()
  removeValidation()

  if (!checkFieldsPresence())
    console.log("Error");
  else {
    const Store_Form_Data = {}
    Store_Form_Data.tower = tower.value;
    Store_Form_Data.comment = comment.value;
    Store_Form_Data.date = dateChoose.value;
    console.log("Send form\n", Store_Form_Data)
    alert("Переговорная успешно забронирована")
  }
});

clearButton.addEventListener('click', function handleClick(event) {
  event.preventDefault();
  console.log('Нажата кнопка Очистить');
  for (var i = 0; i < fields.length; i++) {
    if (fields[i].value)
      fields[i].value = clearForm(fields[i].value);
  }
  //alert("clear");
});
