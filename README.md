# JS Slider

My contacts: 
- telegram - https://www.t.me/kznws
- facebook - https://www.facebook.com/AlexanderKuznecov11

## Task
```
Слайдер для фото

*ВАЖНО! Это задание не является обязательным. Вы можете отработать изученные в этом модуле темы в тренажере JavaScript. Но если вы хотите больше заданий и чувствуете в себе силы на реализацию чего-то более сложного, предлагаем выполнить следующее задание.

Реализуйте слайдер для фото, исходя из требований ниже.

Общие требования:

    Должна быть возможность пролистывать фото. Например, добавить 2 кнопки вперед и назад (предыдущее, следующее и так далее);
    При клике «назад» на первом фото должно открываться последнее. При клике «вперед» на последнем фото должно открываться первое;

    Блок, в котором располагаются изображения, не должен меняться под размер картинок;
    Добавить анимацию при переключении фото;
    На входе — массив изображений. Их может быть любое количество. Нельзя завязываться на порядковый номер элемента;
    Картинки можно положить в папку asset. Либо использовать стороннее API, сделав GET запрос для получения изображений;
    Соблюдать семантическую верстку;
    Использовать селекторы по тегу для задания стилей нельзя. Использовать классы. В случае, когда есть необходимость — селектор по id;
    Дизайн произвольный. Минимум — застилизовать кнопки (добавить hover) и обеспечить для них accessibility: переключение по tab, outline, cursor.

При возникновении проблем по ходу решения вы всегда можете обратиться к ментору в Slack.

Удачи!
```

## My solution
# 1) Подготовка к работе
Перед тем как начать делать задание нужно распределить папки, где будут картинки, где скрипты, где стили и так далее. Лично я создал такие папки как __script__ где будет находиться наш js, папку __style__ где хранятся наши стили для слайдера, а также папка __img__ где хранятся наши изображения, ну и само собой файл __index.html__ находится вне какой либо папки.

# 2) HTML
В файле __html__ я сделал блок __slider__, который хранит в себе картинку и кнопки. 
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Slider JS</title>
    <link rel="stylesheet" href="style/style.css">
</head>
<body>
    <div class="slider">
        <button class="slider-btn" id="prevImg">Previous</button>
        <img class="slider__img" src="img/slide1.jpg" id="slide" alt="">
        <button class="slider-btn" id="nextImg">Next</button>
    </div>
    <script src="scripts/slider.js"></script>
</body>
</html>
```

# 3) CSS
В стилях я сделал так, чтобы кнопки находились над картинкой используя `position: absolute`, а также чтобы находились по середине вертикально. Кнопки не уезжают за картинку, потомучто для их родителя __slider__ я задал `position: relative`, также для кнопок как написано в тз я сделал при наведении стили. Для самой картинки я сделал плавную анимацию используя `transition: opacity 0.5s ease`. В самом конце я сделал адаптивную верстку для определенных широт экрана устройства. Хочу отметить, что каждые блоки стилей я отделял комментариями в виде __start__ и __end__.
```
/*! basic options start ============================================================= */
body, html{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
}

*{
    margin: 0;
    padding: 0;
    color: #000;
    font-size: 16px;
    border: none;
    outline: none;
}
/*! basic options end ============================================================= */


/*! slider block start ============================================================= */
.slider {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.slider__img{
    width: 600px;
    height: 300px;
    transition: opacity 0.5s ease;
}

.slider-btn {
    position: absolute;
    top: calc(50% - 10px);
    padding: 10px;
    background-color: rgb(251, 255, 0, .7);
    cursor: pointer;
    transition: .2s linear;
    z-index: 1000;
}

.slider-btn:hover{
    opacity: .7;
}

.slider-btn:first-child {
    left: 0;
}

.slider-btn:last-child {
    right: 0;
}
/*! slider block end ============================================================= */


/*! media screens start ============================================================= */
@media screen and (max-width: 630px){
    .slider__img{
        width: 400px;
    }
}

@media screen and (max-width: 430px){
    .slider__img{
        width: 300px;
        height: 200px;
    }
}

@media screen and (max-width: 330px){
    .slider__img{
        width: 200px;
        height: 200px;
    }
}

@media screen and (max-width: 210px){
    .slider-btn{
        top: calc(50% - 2px);
        font-size: 12px;
        padding: 2px;
    }
    
    .slider__img{
        width: 150px;
        height: 100px;
    }
}
/*! media screens end ============================================================= */
```

# 4) JS
В этом блоке я расскажу подробнее свои решения.

## 1 - variables creating
В самом начале я создал все переменны для работы со слайдером. __images__ содержит массив с путями для картинок, __btnPrevious, btnNext__ это кнопки, __slideImg__ это блок html где находится картинка, а в __currentImg__ находится цифра для перебора массива.
```
let images = ['img/slide1.jpg', 'img/slide2.jpg', 'img/slide3.jpg', 'img/slide4.jpg'];

let btnPrevious = document.getElementById('prevImg');
let btnNext = document.getElementById('nextImg');
let slideImg = document.getElementById('slide');
let currentImg = 0;
```

## 2 - event for btn previous
Тут я создал событие `addEventListener` при нажатии на кнопку, которая идёт назад. При нажатии число в __currentImg__ уменьшается на 1,после этого проверяем если число меньше 0 то показываем картинку последнюю как написано в тз. С анимацией тут дело было так, сначала я задал картинке `slideImg.style.opacity = 0;`, затем с задержкой в 300мс вставляет новая фотография и делаем картинку видимой, а также изменяем путь на картинку с помощью массива картинок и числом.
```
btnPrevious.addEventListener('click', () => {
    currentImg -= 1;
    if(currentImg < 0){
        currentImg = images.length - 1
    }
    slideImg.style.opacity = 0;
    setTimeout(() => {
        slideImg.src = images[currentImg];
        slideImg.style.opacity = 1;
    }, 300);
})
```

## 3 - event for btn next
Тут я также создал событие, которое включает функцию __nextSlide__ (сделал это в виде функции, потому что в самом конце придется использовать её). При нажатии на кнопку вперёд срабатывает функция, которая добавляет числу __currentImg__ единицу (тем самым открывает следующую картинку). Если число больше массива, то будет первая картинка в блоке. Точно такая же анимация, как и в прошлом примере.
```
btnNext.addEventListener('click', nextSlide);

// Here you can see a function, because I use it in interval
function nextSlide(){
    currentImg += 1;
    if(currentImg > (images.length - 1)){
        currentImg = 0
    }
    slideImg.style.opacity = 0;
    setTimeout(() => {
        slideImg.src = images[currentImg];
        slideImg.style.opacity = 1;
    }, 300);
}
```

## 3 - interval
Также я улучшил программу и сделал так, чтобы картинки менялись сами каждые 5 секунд, благодаря __setInterval__.
```
setInterval(nextSlide , 5000); // After 5 seconds we will see next slide
```

# Источники
- pixabay.com (картинки)
