let allExpenses = [];
let valueName = '';
let valuePrice = '';
let inputName = null;
let inputPrice = null;
const url = 'http://localhost:8000/'

window.onload = async function init() {
    inputName = document.getElementById('add-expenses1');
    inputName.addEventListener('change', updateValueName);
    inputPrice = document.getElementById('add-expenses2');
    inputPrice.addEventListener('change', updateValuePrice);
    const resp = await fetch('http://localhost:8000/allExpenses', {
        method: 'GET'
    });
    let result = await resp.json(); 
    allExpenses = result.data;
    render();
}

const onClickButton = async() => {
    if (valueName !== '' && valuePrice !== '') {
        const resp = await fetch('http://localhost:8000/createExpenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                name: valueName,
                price: valuePrice
            })
        });
    let result = await resp.json();
    allExpenses = allExpenses.concat([result]);
    valueName = '';
    valuePrice = '';
    inputName.value = null;
    inputPrice.value = null;
    render()
    }   
}
const updateValueName = (e) => {
    valueName = e.target.value; // Вносим в valueInput, значение input 
}
const updateValuePrice = (e) => {
    valuePrice = e.target.value; // Вносим в valueInput, значение input 
}

const getDate = (date) => {
    const newDate = new Date(date);
    let day = newDate.getDay(), month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    if (month > 0 && month < 10) {
        month = `0${month}`;
    }
    if (day > 0 && day < 10) {
        day = `0${day}`;
    }
    return `${day}.${month}.${year}`
}

render = () => {
    const content = document.getElementById('content-page');
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
    
    const sumBox = document.getElementById('total');
        while (sumBox.firstChild) {
            sumBox.removeChild(sumBox.firstChild);
        }
    const meaning = document.createElement('p');
        
        let tempSum = null;
        tempSum = _.pluck(allExpenses, "price");
        let finalSum = null;
        finalSum = _.reduce(tempSum, function(memo, num){ return (memo*1) + (num*1); }, 0);
        meaning.innerText = finalSum;
        sumBox.appendChild(meaning);

    allExpenses.map((item, index) => {
        const container = document.createElement('div');
        container.className = 'expenses-container';
        const textName = document.createElement('p');
        const textPrice = document.createElement('p');
        const newDate = getDate(item.date);
        textName.className = 'name';
        textPrice.className = 'price';
        textName.innerText = `${index + 1}) ${item.name} ${newDate}`;
        textPrice.innerText = `${item.price} p.`;
        container.appendChild(textName);
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
            entrance1.value = item.name;
            entrance2.value = item.price;
            container.replaceChild(entrance1, textName);
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
}

const onClickImageEdit = async(item, value1, value2) => {
    const resp = await fetch('http://localhost:8000/updateExpenses', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            name: value1,
            price: value2,
            id: item.id
        })
    });
    const result = await resp.json();
    allExpenses = result; 
    render();
}

const onClickImageDelete = async(index) => {
    const resp = await fetch(url + `deleteExpenses?id=${allExpenses[index].id}`, {
        method: 'DELETE',
    });
    const result = await resp.json();
    allExpenses = result.data;
    render();
}



