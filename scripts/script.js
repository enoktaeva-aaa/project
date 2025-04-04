'use strict'

document.addEventListener("DOMContentLoaded", () => {

    const aboutImage = document.querySelector('.about__image');  // создаем переменную находя блок по классу
    if (aboutImage) {                                           // проверяем существование элемента в DOM
        console.log('Константа about__image существует');
        const aboutDescription = document.querySelector('.about__desctription');
        /* 1. Исключение накладывания контента на хедер при скроле/прокрутке страницы */

        /* 
         *   Алгоритм
         *
         *   1. Начало.
         *   2. Находим кнопку Оставить заявку
         *   3. Проверка условия нажата ли кнопка Оставить заявку(навешиваем слушатель событий на кнопку страницы и ожидаем ответа): если конпка нажата.
         *       3.1. Да: Получаем модальное окно с заявкой (создание переменной, которая будет меняться).
         *         3.1.1.2. Нет (если кнопка не нажата)
         *   4. Конец
         * 
         *   Блок-схема: /images/блок схема.png
         */


        aboutImage.addEventListener('mouseenter', () => {
            aboutImage.style.opacity = 0.5;
            // aboutDescription.removeAttribute('hidden');
            aboutDescription.style.opacity = 1;
            aboutDescription.style.visibility = "visible";


        });

        aboutImage.addEventListener('mouseleave', () => {
            aboutImage.style.opacity = 1;
            // aboutDescription.setAttribute('hidden', true);
            aboutDescription.style.opacity = 0;
            aboutDescription.style.visibility = "hidden";
        });
    }
    /* 2. Появление модальной формы заявки*/
    const menuButton = document.querySelector('.menu__button');
    const dialogSend = document.querySelector('.send');
    if (menuButton && dialogSend) {
        const sendButton = dialogSend.querySelector('.send__close');
        menuButton.addEventListener('click', () => {
            dialogSend.removeAttribute('hidden');
        });
        // Закрытие модального окна при клике на кнопку закрытия
        sendButton.addEventListener('click', () => {
            dialogSend.setAttribute('hidden', true);
        });

        // Закрытие модального окна при клике вне его области
        window.addEventListener('click', (event) => {
            if (event.target === dialogSend) {
                dialogSend.setAttribute('hidden', true);
            }
        });
    }
    /*3 Формируем объект из элементов цена  и выводим блок динамически*/
    //Объявляем переменную cardsPrice и сохраняем в нее элемент с классом price
    const cardsPrice = document.querySelectorAll('.price__price');
    console.log(cardsPrice);
    // Если такой элемент существует
    if (cardsPrice) {

        //Создаем объект cardsPriceData, которая содержит данные для трех карточки.
        const cardsPriceData = {
            // каждая ссылка содержит level (название тарифа), price (цена), description (описание тарифа), button (кнопку для оформления заявки).
            0: {
                weight: '100 грамм',
                price: '350 ₽',

            },
            1: {
                weight: '1 шт',
                price: '300 ₽',

            },
            2: {
                weight: '1 шт',
                price: '260 ₽',

            },
            3: {
                weight: '1 шт',
                price: '260 ₽',

            }
        }

        //Создаем функцию createCard, которая будет добавлять карточку. Внутри функции 4 переменные: level (название тарифа), price (цена), description (описание тарифа), button (кнопку для оформления заявки)
        const createCard = (weight, price) => {
            // Создаем переменную  card, которая будет содержать HTML-код карточки и вставляем туда 4 переменные
            const card = `
        цена ${price} за ${weight}
           
        `;
            //  Возвращаем значение переменной card
            return card;
        }
        // Создаем цикл for и проходим по всем элементам объекта cardsPriceData.
        for (const cardKey in cardsPriceData) {
            //Получаем данные одной карточки из объекта cardsPriceData 
            const card = cardsPriceData[cardKey];
            //создаем переменную cardElement и вызываем функцию createLink, куда передаем тариф, цену, описание и кнопку (то, из чего будет состоять ваша карточка).
            const cardElement = createCard(card.weight, card.price);

            // с помощью метода insertAdjacentHTML добавляем созданный HTML-код в конец списка priceList.
            cardsPrice[cardKey].innerHTML = cardElement;
        }
    }
    /*4 Преобразуем данные из предыдущего задания в файл json и выводим их с помощью fetch*/
    const programsContainer = document.querySelector('.programs');
    if (programsContainer) {
        const programList = programsContainer.querySelector('.programs__list');

        // Пример URL для получения данных с сервера
        const apiUrl = 'data.json';

        // Функция для создания карточки
        const  createProgram = (image, title, description) => {

            // Шаблонные строки и подстановки
            const card = `
                <li class="programs__kard">
                <img class="programs__image" src="${image}">
                <h3 class="programs__name">${title}</h3>
                    <p class="programs__desk">${description}</p>
                </li>
            `;

            return card;
        }

        // Загрузка данных с сервера
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Данные
                console.log(typeof (data)); // Тип полученных данных

                // for (const item in data) {
                //     const card = data[item];

                //     const cardElement = createCard(card.link, card.icon, card.iconAlt, card.iconWidth, card.iconHeight, card.title, card.description);
                //     cardList.insertAdjacentHTML('beforeend', cardElement);
                // }

                data.forEach(item => {
                    const cardElement = createProgram(item.image, item.title, item.description);
                    programList.insertAdjacentHTML('beforeend', cardElement);
                });
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных:', error);
            });
    }


    //7.
    const slider = document.querySelector('.swiper');

    if (slider) {
        const swiper = new Swiper(slider, {
            // Дополнительные параметры
            slidesPerView: 3, // Количество слайдов на экране
            spaceBetween: 40, // Расстояние между слайдами
            loop: true,  // Зацикливание слайдов

            // Пагинация
            pagination: {
                el: '.swiper-pagination',
            },

            // Навигационные стрелки
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

});



