var firebaseConfig = {
    apiKey: "AIzaSyACLKdjBdru78iTD-kccstiuZgKrn0bosY",
    authDomain: "hdmb-c2e03.firebaseapp.com",
    projectId: "hdmb-c2e03",
    storageBucket: "hdmb-c2e03.appspot.com",
    messagingSenderId: "1041928921433",
    appId: "1:1041928921433:web:1774f0a8aab1ccda106c48",
    measurementId: "G-N7QRF48JVC"
};
var menuActive = Boolean(false);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

//Gettinng data
db.collection('stores').doc().get().then((snapshot) => {
    if (snapshot.exists) {
        console.log("Document data:", snapshot.data());
        snapshot.docs.forEach(doc => {
            //console.log(doc.data());
            //renderList(doc);
        });
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});


//Create html fe element and render
function renderList(doc) {
    console.log(doc.data());
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    console.log(doc.data().name, doc.data().city);

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;

    li.appendChild(name);
    li.appendChild(city);

    document.getElementById("list").appendChild(li);
}

//Saving data
function addProduct() {
    var select = document.getElementById('select-product');
    var brand = select.options[select.selectedIndex].value;
    var name = document.getElementById('name').value;
    var color = document.getElementById('color').value;
    var price = document.getElementById('price').value;
    var amount = document.getElementById('amount').value;
    console.log(brand, name, color, price, amount);

    db.collection('stores').doc(brand + ' ' + name).set({
        brand: brand,
        name: brand + ' ' + name,
        detail: {
            color: {
                color: {
                    price: price,
                    at: {
                        1: 11,
                        2: 12
                    }
                }
            }
        }
    });
}

//Search data
function searchData() {
    let searchText = document.getElementById('searchText').value;
    db.collection('phones').where('name', '>', searchText).get().then((snapshot) => {
        console.log(snapshot.docs);
        document.getElementById("list").innerHTML = "";
        snapshot.docs.forEach(doc => {
            //console.log(doc.data());
            renderList(doc);
        });
    });
}

//Open menu
function clickMenu() {
    console.log(menuActive);
    var menu = document.getElementById("menu");
    var menuButton = document.getElementById("menuButton");
    if (menuActive) {
        menu.classList.remove("is-active");
        menuButton.classList.remove("is-active");
        menuActive = false;
    } else {
        menu.classList.add("is-active");
        menuButton.classList.add("is-active");
        menuActive = true;
    }
}

function calculatewidth() {
    return 500;
}