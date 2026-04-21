let beverageCount = 1;
const translation = {
    // Напитки (beverage)
    espresso: "Эспрессо",
    capuccino: "Капучино",
    cacao: "Какао",

    // Тип молока (milk)
    usual: "обычное",
    "no-fat": "обезжиренное",
    soy: "соевое",
    coconut: "кокосовое",

    // Добавки (options)
    "whipped cream": "взбитые сливки",
    marshmallow: "зефирки",
    chocolate: "шоколад",
    cinnamon: "корица",
};
const addButton = document.querySelector(".add-button");
const form = document.getElementById("coffee-form");
const addButtonContainer = document.getElementById("add-button-container");

addButton.addEventListener("click", () => {
    beverageCount++;
    const firstBeverage = document.querySelector(".beverage");
    const newBeverage = firstBeverage.cloneNode(true);
    newBeverage.querySelector(
        ".beverage-count"
    ).textContent = `Напиток №${beverageCount}`;

    const radioButtons = newBeverage.querySelectorAll('input[type="radio"]');
    radioButtons.forEach((radio) => {
        radio.name = `milk-${beverageCount}`;
    });
    const checkboxes = newBeverage.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.name = `options-${beverageCount}`;
    });

    const select = newBeverage.querySelector("select");
    select.name = `beverage-${beverageCount}`;

    addButtonContainer.before(newBeverage);
});

form.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-beverage")) {
        const allBeverages = document.querySelectorAll(".beverage");
        if (allBeverages.length > 1) {
            event.target.closest(".beverage").remove();
            updateBeverageNumbers();
        }
    }
});
function updateBeverageNumbers() {
    const allBeverages = document.querySelectorAll(".beverage");
    allBeverages.forEach((beverage, index) => {
        const newNumber = index + 1;

        beverage.querySelector(
            ".beverage-count"
        ).textContent = `Напиток №${newNumber}`;

        const select = beverage.querySelector("select");
        if (select) select.name = `beverage-${newNumber}`;

        const radioButtons = beverage.querySelectorAll('input[type="radio"]');
        radioButtons.forEach((radio) => {
            radio.name = `milk-${newNumber}`;
        });

        const checkboxes = beverage.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.name = `options-${newNumber}`;
        });
    });
    beverageCount = allBeverages.length;
}

const modalOverlay = document.getElementById("modal-overlay");
const closeModalBtn = document.getElementById("close-modal");
const modalText = document.getElementById("modal-text");
const modalTableBody = document.getElementById("modal-table-body");

function declensionBeverages(count) {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return "напитков";
    }
    if (lastDigit === 1) {
        return "напиток";
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
        return "напитка";
    }
    return "напитков";
}

function getBeverageIndex(key) {
    const idx = key.indexOf("-");
    return {
        idx: Number.parseInt(key.substring(idx + 1)),
        key: key.substring(0, idx),
    };
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    modalText.textContent = `Вы заказали ${beverageCount} ${declensionBeverages(
        beverageCount
    )}`;
    const formData = new FormData(form);
    const data = {};
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
        const tmp = getBeverageIndex(key);
        if (!data[tmp.idx]) {
            data[tmp.idx] = {
                beverage: "",
                milk: "",
                options: [],
            };
        }
        console.log(data[tmp.idx]);
        if (tmp.key === "options") {
            data[tmp.idx].options.push(value);
        } else {
            data[tmp.idx][tmp.key] = value;
        }
    }
    console.log(data);
    for (const idx of Object.keys(data)) {
        const tr = document.createElement("tr");
        const beverageTd = document.createElement("td");
        beverageTd.textContent = translation[data[idx].beverage];
        tr.appendChild(beverageTd);
        const milkTd = document.createElement("td");
        milkTd.textContent = translation[data[idx].milk];
        tr.appendChild(milkTd);
        const optionsTd = document.createElement("td");
        optionsTd.textContent = data[idx].options
            .map((el) => translation[el])
            .join(", ");
        tr.appendChild(optionsTd);
        modalTableBody.appendChild(tr);
    }
    modalOverlay.classList.add("active");
});

closeModalBtn.addEventListener("click", () => {
    modalOverlay.classList.remove("active");
});

modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
        modalOverlay.classList.remove("active");
    }
});
