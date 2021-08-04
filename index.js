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
    dbRef.child("highlightSlider").get().then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            var items = snapshot.val();
            var keys = Object.keys(items);
            console.log(keys);
            var slider = keys[1];
            var sliders = items[slider].sliders;
            var highlight = keys[0];
            var highlights = items[highlight].highlights;
            console.log(sliders);
            console.log(highlights);
            //console.log(snapshot.value);
            /*var div = document.createElement("div");
            div.style.width = "100px";
            div.style.height = "100px";
            div.style.background = "red";
            div.style.color = "white";
            div.innerHTML = "Hello";

            document.getElementById("slider-highlight").appendChild(div);*/
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
    /*<div class="slider-highlight-slider">
                <img class="image-slider" src="./assets/image/slide/1.png">
            </div>
            <div class="slider-highlight-highlight">
                <div class="slider-highlight-highlight-image1">
                    <img class="image-highlight" src="./assets/image/slide/1.jpg">
                </div>
                <div class="slider-highlight-highlight-image2">
                    <img class="image-highlight" src="./assets/image/slide/2.jpg">
                </div>
                <div class="slider-highlight-highlight-image3">
                    <img class="image-highlight" src="./assets/image/slide/3.jpg">
                </div>
                <div class="slider-highlight-highlight-image4">
                    <img class="image-highlight" src="./assets/image/slide/4.jpg">
                </div>
            </div>*/
}

function setData() {
    var data = "rwerrwe";
    var dataRef = database.ref('/setData');
    dataRef.set({
        vaue: data
    });
}