// Дано 3 блоки
// 1. В лівій частині сторінки - перелік категорій.
// 2. При натисканні на категорію в середній блок виводиться список товарів цієї категорії.
// 3. Клац на товар - інформацію про товар у правому блоці.
// 4. В інформації товару - кнопка “купити”.
// 5. При натисканні на “купити” з'являється повідомлення, що товар куплений і повернення у вихідний стан програми
//    (коли відображається лише список категорій).

const linkStorage = {
    categoriesUl: document.querySelector('#categories > ul'),
    itemsUl: document.querySelector('#items > ul'),
    description: document.querySelector('#description > article'),
    buyItem: document.querySelector('#buyItem')
};

function returnDefaultColorsToLi(type) {
    [...linkStorage[`${type}Ul`].children].forEach(i => {
        i.style.backgroundColor = ''
        i.style.color = 'black';
    });
}

function findCategory(name) {
    return database.find(i => i.category === name);
}

function findItem(categoryName, itemName) {
    return findCategory(categoryName).items.find(i => i.name === itemName);
}

function clickItemHandler(e) {
    const item = e.target;
    const itemName = item.textContent;
    const itemDescription = findItem(sessionStorage.getItem('category'), itemName).description;

    returnDefaultColorsToLi('items');

    sessionStorage.setItem('item', itemName);
    item.style.backgroundColor = 'dimgray';
    item.style.color = 'white';
    linkStorage.description.innerHTML = itemDescription;
    linkStorage.buyItem.classList.remove('d-none');
}

function clickCategoryHandler(e) {
    const category = e.target;
    const categoryName = category.textContent;
    const categoryItems = findCategory(categoryName).items;

    returnDefaultColorsToLi('categories');

    sessionStorage.setItem('category', categoryName);
    category.style.backgroundColor = 'dimgray';
    category.style.color = 'white';
    linkStorage.itemsUl.innerHTML = '';
    linkStorage.description.innerHTML = '';
    linkStorage.buyItem.classList.add('d-none');

    categoryItems.forEach(i => {
       const item = document.createElement('li');

       item.textContent = i.name;
       item.addEventListener('click', clickItemHandler);
       linkStorage.itemsUl.appendChild(item);
    });
}

function buyItemHandler(e) {
   alert(`Congratulations! You've bought "${sessionStorage.getItem('item')}"`);
   showCategories();
}

function showCategories() {
    linkStorage.categoriesUl.innerHTML = '';
    linkStorage.itemsUl.innerHTML = '';
    linkStorage.description.innerHTML = '';
    linkStorage.buyItem.classList.add('d-none');

    database.map(i => i.category).forEach(name => {
        const category = document.createElement('li');

        category.textContent = name;
        linkStorage.categoriesUl.appendChild(category);
    });

    linkStorage.categoriesUl.querySelectorAll('li').forEach(c => {
        c.addEventListener('click', clickCategoryHandler);
    });
}

showCategories();


linkStorage.buyItem.addEventListener('click', buyItemHandler);

