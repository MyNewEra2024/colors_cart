let shop = document.getElementById('shop');

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
    return (shop.innerHTML= shopIteamData.map((x)=>{
        let {id,name,price,desc,img} = x;
        let search = basket.find((x) => x.id === id) || [];
        return  `
        <div id="product-id-${id}" class="item">
            <img width="320" src="${img}" alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>$${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">
                            ${search.item === undefined?0 : search.item}
                        </div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>`
    }).join(""));
}

generateShop()

let increment = (id) => {
    let selectefItem = id;
    let search = basket.find((x)=> x.id === selectefItem);

    if (search === undefined){
        basket.push({
            id: selectefItem,
            item: 1,
        });
    }else{
        search.item += 1;
    }
    localStorage.setItem("data", JSON.stringify(basket));
    // console.log(basket);
    update(selectefItem);
};

let decrement = (id) => {
    let selectefItem = id;
    let search = basket.find((x) => x.id === selectefItem);

    if(search === undefined) return;
    if(search.item === 0) return;
    else{
        search.item -= 1;
    }

    update(selectefItem);
    //Вибираєм обєкни які не рівні нулю
    basket = basket.filter((x)=>x.item !== 0)
    //Зберігаєм дані з корзини у локальному сервері
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id)
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;

    calculator();
};

let calculator = () => {
    let cartIcon = document.getElementById("cartAmount")
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y)=>x+y,0)
}

calculator();