# BookMeet

## Задание

![subject width=10%](/img/задание-1.png)

## Результат

![result](/img/форма-Chrome.png)

При вводе корректных данных и отправке формы в консоль выодятся данные в виде JSON, пример:

![json-date](/img/JSON-в-консоли.png)

При ошибке заполнения полей инпут форма меняет цвет на красный
![correct-error](/img/отображение-ошибки-при-нажатии-"Отправить".png)

![correct-error-2](/img/ошибки.png)

## Нереализованый функционал:
- при незаполненных полях выпадающего списка и(или) поля "Комментарий" и нажатии "Отправить" ошибки отображаются в виде изменения цвета инпут формы на красный -> обновление на черный автоматически не происходит
- всплывающие подсказки имеют прозрачный бэкграунд
- при ошибке комментария поле не подсвечивается

![help](/img/некрасивое-отображение-подсказки(2).png)

## Стек

- JavaScript
- Html (без использования "required")
- CSS
