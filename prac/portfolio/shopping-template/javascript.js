//Fetch the items from the jason file.제이슨 파일에 있는 아이템을 받아옴.
function loadItems(){
    return fetch('data/data.json')
        .then(response => response.json())//fetch를 통해 data를 성공적으로 받아왔을때.response라는 객체의 바디를 json API를 써서 json으로 변환.
        .then(json => json.items);
       
}
// loadItems라는 함수는(2) fetch라는 api를 써서 데이터를 받아온 다음에(3)
//(response)받아온 데이터가 성공적이면.json으로 변환하고(4)
//json안에 있는 items들을 return하게 됨.(5)


//  Update the list with the given items
function displayItems(items){
    const container = document.querySelector('.items');

    container.innerHTML= items.map(item=>createHTMLString(item)).join('');
}


//Creat HTML list items from the given data item.
function createHTMLString(item){
    return`
    <li class="item">
        <img src="${item.img}" alt="${item.type}">
        <span>${item.gender}, ${item.size}</span>
    </li>
    `;
}

//event처리하는 함수 이름 짓기 : 'on+이벤트이름'
function onButtonClick(event, items){
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    //만약 key가 null이거나 value가 null이면. 필터링 할 정보가 들어있지않다면
    //아무것도 처리 하지 않고 함수 끝내랑:
    if(key==null || value==null){
        return;
    }

    //들어있으면 여기로 보내랑//
    const filtered = items.filter(item=>item[key]===value);
    displayItems(filtered);
}




function setEventListeners(items){
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', event => onButtonClick(event, items));
}



//main//promise함수임.호출방법.
loadItems()
    .then(items => {
        displayItems(items);//html 에 items보여줌
        setEventListeners(items);//eventlistener등록해서 버튼 등록시 필터링.
    })
    .catch(console.log);