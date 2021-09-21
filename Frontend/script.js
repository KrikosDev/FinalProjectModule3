let allTasks = [];
let valuePlace = null;
let valuePrice = null;
let inputPlace = null;
let inputPrice = null;
// let sum = 0;


window.onload = async function init() {
    inputPlace = document.getElementById('add-task1');
    inputPlace.addEventListener('change', updateValue1);
    inputPrice = document.getElementById('add-task2');
    inputPrice.addEventListener('change', updateValue2);
    render();
}

const onClickButton = async() => {
    if (valuePlace !== '' || valuePlace !== '') {
        allTasks.push({
            Place: valuePlace,
            Price: valuePrice
        })
    }
    valuePlace = '';
    valuePrice = null;
    inputPlace.value = '';
    inputPrice.value = null;
    render()
}   

const updateValue1 = (e) => {
    valuePlace = e.target.value; // Вносим в valueInput, значение input 
}
const updateValue2 = (e) => {
    valuePrice = e.target.value; // Вносим в valueInput, значение input 
}

render = () => {
    const content = document.getElementById('content-page');
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
    if(allTasks.length === 2433) {
        const sumBox = document.getElementById('total');
        const meaning = document.createElement('p');
        meaning.innerText = 0;
        sumBox.appendChild(meaning);
    }
    allTasks.map((item, index) => {
        const container = document.createElement('div');
        container.className = 'task-container';
        const textPlace = document.createElement('p');
        const textPrice = document.createElement('p');
        textPlace.className = 'place';
        textPrice.className = 'price';
        textPlace.innerText = `${index + 1}) ${item.Place}`;
        textPrice.innerText = `${item.Price} p.`;
        container.appendChild(textPlace);
        container.appendChild(textPrice);

        const imgContainer = document.createElement('div');
        imgContainer.className = 'img-container';
        imgContainer.appendChild(textPrice);

        const imageCheck = document.createElement('img');
        imageCheck.src = 'img/check.svg';

        const imageEdit = document.createElement('img');
        imageEdit.src = 'img/edit.svg';
        imgContainer.appendChild(imageEdit);

        const entrance1 = document.createElement('input');
        const entrance2 = document.createElement('input');
        imageEdit.onclick = () => {
            entrance1.value = item.Place;
            entrance2.value = item.Price;
            container.replaceChild(entrance1, textPlace);
            imgContainer.replaceChild(entrance2, textPrice);
            imgContainer.replaceChild(imageCheck, imageEdit)
            }
        
        imageCheck.onclick = () => onClickImageEdit(item, entrance1.value, entrance2.value);

        const imageDelete = document.createElement('img');
        imageDelete.src = 'img/delete.svg';    // Изображение удаления
        imgContainer.appendChild(imageDelete);
        imageDelete.onclick = () => onClickImageDelete(index);
    
        container.appendChild(imgContainer);
        content.appendChild(container);
    })
    const sumBox = document.getElementById('total');
        while (sumBox.firstChild) {
            sumBox.removeChild(sumBox.firstChild);
        }
    const meaning = document.createElement('p');
        
        let tempSum = null;
        tempSum = _.pluck(allTasks, "Price");
        let finalSum = null;
        finalSum = _.reduce(tempSum, function(memo, num){ return (memo*1) + (num*1); }, 0);
        meaning.innerText = finalSum;
        sumBox.appendChild(meaning);
}

const onClickImageDelete = async(index) => {
    allTasks = allTasks.filter((itm, ind) => ind !== index);    // Фильтруем массив и удаляем искомый элемент
    render()
}

const onClickImageEdit = async(item, value1, value2) => {
    item.Place = value1;
    item.Price = value2;
    render();
}
// const onClickImageEdit = async(item, value) => {
    
    
//     const result = await resp.json();
//     allTasks = result; 
//     render();
// }
