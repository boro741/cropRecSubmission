

// 1.NPK:
var N_soil;
var P_soil;
var K_soil;
function submit(){
    var npk = [];
    
    N_soil = document.getElementById("N_val").value;
    P_soil = document.getElementById("P_val").value;
    K_soil = document.getElementById("K_val").value;

    npk.push(N_soil);
    npk.push(P_soil);
    npk.push(K_soil);

    //console.log(N_soil + P_soil + K_soil);
    var tos = type_soil();
    var season = getSeason();
   // var humidity = getHumidity(lat,lng);
    var plants = getPlants(tos,npk,season);


    pHIndex(tos);
    console.log("tos: "+tos+" npk: "+npk+" season: "+season);
    //getLocation();
}

// 2. Location:
var x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
            x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

var lat;
var lng;

function showPosition(position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    
    
    console.log("lat: "+lat);
    console.log("lng: "+lng);
}



// 3.Type of Soil: 
function type_soil(){
    var e = document.getElementById("type_soil");
    var value = e.options[e.selectedIndex].value;
    var text = e.options[e.selectedIndex].text;

    return value;
}

// Humidity:

// function getHumidity(){
//     var humidity;
//     //document.write("jquery loaded");
//     $.getJSON("http://samples.openweathermap.org/data/2.5/weather?"+"lat="+lat+"&lon="+lng+"&appid=44929f2b3d13549960d30067dee3f481",function(json){
//         //document.write(JSON.stringify(json));
            
//          humidity  =  json.main.humidity;

//          console.log('Humidity: ',humidity);
//         //  return humidity;
        
//     });
//     // console.log('Humidity: ',humidity);
//     // return humidity;
// }


// 4.Season:


function getSeason(){
    var season;

    var d = new Date();
    var month = d.getMonth();

    if(month >= 3 && month <= 5){
        season = 'summer';
    } else if(month >= 6 && month <= 9){
        season = 'rainy';
    } else if(month >= 10 && month <= 11){
        season = 'autmn';
    } else if( month == 12 || month == 1 || month == 2){
        season = 'summer';
    }
    

    return season
    //console.log(season);

}


//--- Plant:
// NPK
// humidity
// season
// type of soil

var plants_data = '[{"name": "apple","npk":[{"N": 2, "P":4, "K": 4}],"pHIndex":0.007 ,"season": "winter","humidity": "50","type_of_soil": "alluvial"},{"name": "sugar cane","npk":[{"N": 40, "P":13, "K": 40}] ,"pHIndex":0.008 ,"season": "summer","humidity": "83","type_of_soil": "black"},{"name": "paddy","npk":[{"N": 46, "P":6, "K": 46}] ,"pHIndex":0.002, "season": "all","humidity": "50","type_of_soil": "alluvial"},{"name": "wheat","npk":[{"N": 80, "P":40, "K": 40}] ,"pHIndex":0.007 ,"season": "winter","humidity": "55","type_of_soil": "arid"},{"name": "ground nut","npk":[{"N": 20, "P":40, "K": 40}] ,"pHIndex":0.008 ,"season": "all","humidity": "65","type_of_soil": "alluvial"}]';

function getPlants(tos,npk,season){
    var plants = JSON.parse(plants_data);
    var plantsArr = [];

    

    plants.forEach(element => {
        console.log(element);
        if(element.type_of_soil == tos ){

            if(element.npk[0].N <= N_soil && element.npk[0].P <= P_soil && element.npk[0].K <= K_soil){
                
                plantsArr.push(element.name);
            }
            
        }
    });

    plantsArr = plantsArr.filter(function(elem, index, self) {
                        return index === self.indexOf(elem);
                    });
 

    plantsArr.forEach(element => {


        document.getElementById("plant_list").innerHTML =  " <div><img src='./img/" + element+".jpg' height='150px'><ul class='plants_align' > </li></ul><h3 id='element'>"+element+"</h3></ul></div>";
    });
   

    console.log(plantsArr);
}

var image = null;
var fgCanvas;


function loadImage() {
    var file = document.getElementById("fgfile");
    image = new SimpleImage(file);
    fgCanvas = document.getElementById("fgcan");
    image.drawTo(fgCanvas);
}

var r = 0;
var g = 0;
var b = 0;
function doRGBScreen(){
    for (var pixel of image.values()) {

                // console.log('r: '+pixel.getRed());
                r = r+pixel.getRed();
                g = g+pixel.getGreen();
                b = b+pixel.getBlue();

    }

    console.log('r: '+r+' g: '+g+' b: '+b);
    clearCanvas();
    image.drawTo(fgCanvas);
}

function pHIndex(tos){
    var pH = r/g/b;

    getpHplant(tos,pH);
}

function getpHplant(tos,pH){
    var plants = JSON.parse(plants_data);
    var plantsArr = [];

    

    plants.forEach(element => {
        console.log(element);
        if(element.type_of_soil == tos ){

                plantsArr.push(element.name);
            
        }
    });

    plantsArr = plantsArr.filter(function(elem, index, self) {
                        return index === self.indexOf(elem);
                    });
 

    plantsArr.forEach(element => {


        document.getElementById("plant_list").innerHTML =  " <div><img src='./img/" + element+".jpg' height='150px'><ul class='plants_align' > </li></ul><h3 id='element'>"+element+"</h3></ul></div>";
    });
   

    console.log(plantsArr);
}

function clearCanvas() {
doClear(fgCanvas);
doClear(bgCanvas);
}

function doClear(canvas) {
var context = canvas.getContext("2d");
context.clearRect(0,0,canvas.width,canvas.height);
}
