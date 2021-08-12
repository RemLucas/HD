// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyC1MCfW_zFPKd1_52oXDhR1k31-wUpQYVE",
    authDomain: "apptest-ef186.firebaseapp.com",
    databaseURL: "https://apptest-ef186.firebaseio.com",
    projectId: "apptest-ef186",
    storageBucket: "apptest-ef186.appspot.com",
    messagingSenderId: "458386818031",
    appId: "1:458386818031:web:1341216a6497ec3365ec1a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

var database = firebase.database();
var ip = "";

function today() {
    var today = new Date().getTime();
    //today.now;
    return today;
    //console.log(today);
}


function text(url) {
    return fetch(url).then(res => res.text());
}

text('https://www.cloudflare.com/cdn-cgi/trace').then(data => {
    let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/
    ip = data.match(ipRegex)[0].split('.').join("");
    console.log(ip);
});

function push() {
    var date = Date();
    date.toString();
    var data = document.getElementById("searchTerm").value;
    //var dataRef = database.ref('/searchHistory/' + ip + '/' + today).push();
    var dataRef = database.ref('/searchHistory/' + ip + '/' + today());
    dataRef.set({
        search: data,
        time: date
    });
    console.log(ip);
    console.log(today());
    getData();
}

function getData() {
    const dbRef = firebase.database().ref();
    dbRef.child("Product").get().then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            var data = snapshot.val();
            var con = 1;
            for (const keys in data) {
                var items = data[keys]
                for (const key in items) {
                    var item = items[key];
                    console.log(item);
                }
            }
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

//console.log(snapshot.value);
/*var div = document.createElement("div");
div.style.width = "100px";
div.style.height = "100px";
div.style.background = "red";
div.style.color = "white";
div.innerHTML = "Hello";

document.getElementById("slider-highlight").appendChild(div);*/

function setData() {
    var data = "rwerrwe";
    var dataRef = database.ref('/setData');
    dataRef.set({
        vaue: data
    });
}

/*Test add data*/
function addProduct() {
    var select = document.getElementById('select-product');
    var value = select.options[select.selectedIndex].value;
    var name = document.getElementById('name').value;
    var color = document.getElementById('color').value;
    var price = document.getElementById('price').value;
    var amount = document.getElementById('amount').value;
    console.log(value, name, color, price, amount);

    var dataRef = database.ref('/Product').push();
    dataRef.set({
        name: value + ' ' + name,
        color: color,
        price: price,
        amount: amount
    });
}

function searchProduct() {
    let searchText = document.getElementById('searchText').value;
    console.log(searchText);
    const dbRef = firebase.database().ref('Product');
    dbRef.orderByChild('name').equalTo(searchText).on('value', function(snapshot) {
        console.log(snapshot.key);
    });
    /*dbRef.orderByChild('name').on('child_added', snap => {
        console.log(snap.val());
        const li = document.createElement('li');
        li.innerText = snap.val().book;
        li.id = snap.key;
        ulList.appendChild(li);
    });*/
    /*dbRef.child("Product").get().then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            var data = snapshot.val();
            var con = 1;
            for (const keys in data) {
                var items = data[keys]
                for (const key in items) {
                    var item = items[key];
                    console.log(item);
                }
            }
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });*/
}