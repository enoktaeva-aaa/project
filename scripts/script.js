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
}
);