const PRODUCTS = [
    {
        pret: 2000,
        nume: 'PC Hardware 1',
        id: 1,
        stoc: 20,
        reviews: [],
        discount: true,
        percentageOfDiscount: 20,
        descriere: 'Lorem ipsum',
        count: 0
    },
    {
        pret: 15000,
        nume: 'PC Hardware 2',
        id: 2,
        stoc: 20,
        reviews: [],
        discount: true,
        percentageOfDiscount: 20,
        descriere: 'Lorem ipsum',
        count: 0
    },
    {
        pret: 150000,
        nume: 'PC Hardware 3',
        id: 3,
        stoc: 5,
        reviews: [],
        discount: true,
        percentageOfDiscount: 20,
        descriere: 'Lorem ipsum',
        count: 0
    },
    {
        pret: 7000,
        nume: 'PC Hardware 4',
        id: 4,
        stoc: 0,
        reviews: [],
        discount: false,
        percentageOfDiscount: 0,
        descriere: 'Lorem ipsum',
        count: 0
    },
]
const SECTION_PRODUCTS_ELEM = document.getElementById('sectionProducts');
const SECTION_CART_ELEM = document.getElementById('shoppingCart');
const SHOPPING_CART_BUTTON_ELEM = document.getElementById('shoppingCartButton');
const TOTAL_PRICE_ELEM = document.getElementById('costTotal');
const shoppingCartList = document.getElementById('shoppingCartList');
const HOME_PAGE_LOGO = document.getElementById('logo');
const ALERT_TEXT = 'Ai adaugat un produs cu succes !';
const ALERT_TEXT_STOC = "Nu este pe stoc";
const REMOVE_CART = document.getElementById('remove');
const COUNTER = document.getElementById('counter');


if (sessionStorage.getItem('counter')) {
    COUNTER.innerHTML = sessionStorage.getItem('counter'); // Should return the counter 
}

/*Peste icoana de shopping cart adaugati un counter pentru cate produse are in cos 3 de exemplu
        (puteti folosi badge de la bootstrap https://getbootstrap.com/docs/4.0/components/badge/)
        Se calculeaza cu shoppingCart.length*/
function addCounter() {
    COUNTER.innerHTML = shoppingCart.length + 1;
}
function removeCounterItem() {
    COUNTER.innerHTML = shoppingCart.length;
}

/*La click pe logo sa iti arate pagine de produse in loc de shopping cart utilizand clasa hidden*/
function homePage() {
    HOME_PAGE_LOGO.addEventListener('click', function (ev) {
        SECTION_CART_ELEM.classList = 'hidden';
        SECTION_PRODUCTS_ELEM.classList = 'row';
        shoppingCart.forEach(function (product) {
            $('#' + product.id).remove();
        })
    });
}
homePage();

function addToShoppingCart(id) {
    PRODUCTS.forEach(function (product) {
        /*  Cand dam click pe adaugare produs sa verificam cantitatea acelui produs cu ajutorul 
        proprietatii stoc si daca nu e in stoc sa afisam un mesaj de eroare Nu mai e in stoc(puteti seta
            un produs cu stoc 0 sa fie mai usor) */
        if (product.id === id) {
            if (product.stoc > 0) {
                addCounter();
                shoppingCart.push(product);
                sessionStorage.setItem('counter', shoppingCart.length);
                product.stoc--;
                alert("Pe stoc sunt: " + product.stoc + " produse " + ALERT_TEXT);
            }
            else {
                alert(ALERT_TEXT_STOC);
            }

        }


    });
    sessionStorage.setItem('shopingCart', JSON.stringify(shoppingCart));
}

function generateItem(products) {
    const sectionProducts = document.getElementById('sectionProducts');
    products.forEach(function (product) {
        $('#sectionProducts').append(
            '<div class="col-md-3 col-xs-12">' +
            '<div class="card">' +
            '<div class="card-body">' +
            '<h5 class="card-title">' + product.nume + '</h5>' +
            '<p class="card-text">' + product.descriere + '</p>' +
            '<button onclick="addToShoppingCart(' + product.id + ')' + '" class="btn btn-primary">Adauga in cos</a>' +
            '</div>' +
            '</div>' +
            '</div>'
        )
    });
}

function generateShoppingCartList() {
    if (sessionStorage.getItem('shopingCart')) {
        shoppingCart = JSON.parse(sessionStorage.getItem('shopingCart'));
        console.log(shoppingCart);
    }
    shoppingCart.forEach(function (product) {
        $('#shoppingCartList').append('<li id="' + product.id + '"><p>Denumire produs:' + product.nume + ', Descriere produs:' + product.descriere + 'lorem <button class="btn btn-danger" onclick="removeShoppingCartItem(' + product.id + ')" id="remove">-</button></p></li>')
        /* In shopping cart cand se da click pe minus ar trebui inlaturat produsul din shopping cart
        si inlaturat si vizual(sters acel li) */
        // $('#shoppingCartList').on('click', '#remove', function (product) {
        //     removeCounterItem();
        //     /* Am incercat sa modific si pretul atunci cand sterg un element, insa primesc valoarea de NaN daca poti sa-mi explici cum se face. */
        //     $(this).closest('li').remove();
        // })
    })
    calculatePrice();
}

function removeShoppingCartItem(id) {
    // Remove list item from DOM
    $('#' + id).remove();
    // Update shopping list
    shoppingCart.forEach(function (product, index) {
        if (product.id === id) {
            shoppingCart.splice(index, 1);
        }
    });
    // Recalculate total price
    TOTAL_PRICE_ELEM.innerHTML = calculatePrice();
    // Update the stock for this product
    PRODUCTS.forEach(function (product) {
        if (product.id === id) {
            product.stoc += 1;
        }
    });
    // Update counter item
    removeCounterItem();
    sessionStorage.setItem('counter', shoppingCart.length);
}



generateItem(PRODUCTS);

function calculatePrice() {
    let price = 0;
    shoppingCart.forEach(function (produs) {
        price += produs.pret;


    })
    return price;
}

let shoppingCart = [];

SHOPPING_CART_BUTTON_ELEM.addEventListener('click', function (ev) {

    SECTION_PRODUCTS_ELEM.classList = 'hidden';
    SECTION_CART_ELEM.classList = '';
    TOTAL_PRICE_ELEM.innerHTML = calculatePrice();
    generateShoppingCartList();

});

window.sessionStorage.setItem('alex', 'fhdslkfjsdl ');



