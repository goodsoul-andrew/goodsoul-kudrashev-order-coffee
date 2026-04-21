document.addEventListener('DOMContentLoaded', () => {
    let beverageCount = 1;
    const addButton = document.querySelector('.add-button');
    const form = document.getElementById('coffee-form');
    const addButtonContainer = document.getElementById('add-button-container');

    // добавление напитка 
    addButton.addEventListener('click', () => {
        beverageCount++;
        
        // Берем первый fieldset в качестве шаблона
        const firstBeverage = document.querySelector('.beverage');
        const newBeverage = firstBeverage.cloneNode(true);
        
        // Обновляем заголовок
        newBeverage.querySelector('.beverage-count').textContent = `Напиток №${beverageCount}`;
        
        // Обновляем name у radioкнопок чтобы они работали независимо
        const radioButtons = newBeverage.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => {
            radio.name = `milk-${beverageCount}`;
        });

        // Вставляем новую форму перед кнопкой Добавить напиток
        addButtonContainer.before(newBeverage);
    });

    //Удаление напитка 
    form.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-beverage')) {
            const allBeverages = document.querySelectorAll('.beverage');
            // Проверка  форма не единственная
            if (allBeverages.length > 1) {
                event.target.closest('.beverage').remove();
                updateBeverageNumbers();
            }
        }
    });

    //  пересчет номеров напитков после удаления
    function updateBeverageNumbers() {
        const allBeverages = document.querySelectorAll('.beverage');
        allBeverages.forEach((beverage, index) => {
            beverage.querySelector('.beverage-count').textContent = `Напиток №${index + 1}`;
        });
        // Синхронизируем счетчик с реальным количеством элементов
        beverageCount = allBeverages.length; 
    }

    //Модальное окно 
    const modalOverlay = document.getElementById('modal-overlay');
    const closeModalBtn = document.getElementById('close-modal');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); 
        modalOverlay.classList.add('active'); // Показываем модалку
    });

    closeModalBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active'); // Скрываем модалку по крестику
    });


    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });
});