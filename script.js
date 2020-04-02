$(document).ready(function() {

// {"appid": "ac7f727646315761c418c419133adbbf"};
//5 day weather forecast
//city.name City name
//http://samples.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml&appid=b6907d289e10d714a6e88b30761fae22
//"api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=ac7f727646315761c418c419133adbbf";

//current day data
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
//http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22

// function to convert temperature

function calculateF(k){
    return Math.floor((k - 273.15) *1.8 +32);

};

var searchhistory = JSON.parse(localStorage.getItem("search")) || [];

var queryURL;
var queryURL2;

let updateDay = function(){
    currentDay = moment().format("MMMM Do YYYY");
    $("#current-date").text("Today's Date is: " + currentDay);
    

}
updateDay(); //call function
setInterval(updateDay,1000); //refresh time every 1000ms





    
    
    

    //console.log(cityName)

function Isweather(cityName){
    queryURL2 = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=ac7f727646315761c418c419133adbbf"; //currentday
  

    $.ajax({
        url:queryURL2,
        method: "GET"
    })
    .then(function(response) {
        //console.log(response);

        var pic = response.weather[0].icon;
        var picAlt = response.weather[0].description;
        $("#weather-pic").attr("src","http://openweathermap.org/img/wn/"+pic+"@2x.png")
        $("#weather-pic").attr("alt",picAlt)


        var userCity = response.name;
        $("#city-name").text(userCity +"'s Current Weather Conditions ")
        //console.log(userCity)
        console.log(response)
       
        var wind = response.wind.speed;
        $("#windspeed").text("Wind Speed: " + wind + " MPH")
        var humidity = response.main.humidity;
        $("#humidity").text("Humidity: " + humidity + "%")
        var temperature = calculateF(response.main.temp);
        $("#temperature").text("Temperature: " + temperature + "F")

        var latitude = response.coord.lat;
        var longitude = response.coord.lat;
        var UVqueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=ac7f727646315761c418c419133adbbf"
        
        $.ajax({
            url:UVqueryURL,
            method: "GET"
        })
        .then(function(response) {

            var uvindex = response.value;
            var UVbutton = $('<button class="btn bg-primary">').text("UV Index: " + uvindex)
            $("#uv-index").append(UVbutton)
        
        })



        queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=ac7f727646315761c418c419133adbbf";


        $.ajax({
            url:queryURL,
            method: "GET"
        })
        .then(function(response) {
            console.log(response)

            var futureCond = $(".future")
            futureCond.empty();

            for ( var i = 0; i < futureCond.length; i++){
               
                var index = i*8 + 4;
                var futuredate = new Date(response.list[index].dt * 1000);
                //var 
               var currentDay1 = moment().format("MMMM Do YYYY");
                var p = $("<p>");
                p.attr("class", "mt-3 mb-0 forecast-date");
                p.text(currentDay1);
                futureCond[i].append(p);
                var img = $('<img />')
                var description = response.list[index].weather[0].description;
                var pic1 = response.list[index].weather[0].icon
                img.attr("src", "https://openweathermap.org/img/wn/" + pic + "@2x.png")
                img.attr("src", description);
                futureCond[i].append(img);
                var pTemp = $("<p></p>");
                var temp1 = calculateF(response.list[index].main.temp);
                pTemp.text("Temperature: " + temp1 + "F" );
                futureCond[i].append(pTemp);
                var pHumid = $("<p></p>");
                var humid = response.list[index].main.humidity;
                pHumid.text("Humidity: " + humid + "%");
                futureCond[i].append(pHumid);








            };
        
        
        });
        
    
    
    });



    
};
function renderhistory(){
    $("#cached-cities").empty();
    for(var i = 0; i < searchhistory.length; i++){
        var button = $("<a>").attr("href", "#").attr("id", "loc-btn").text(searchhistory[i]);
        $("loc-btn").on("click", function(){
            var val = $("loc-btn").val()
            Isweather(val);



        })
        $("#cached-cities").append(button);


    }

}
renderhistory();


$("#search-button").on("click", function(event) {
    event.preventDefault();
    var cityName = $("input").val().trim();
    searchhistory.push(cityName)
    Isweather(cityName);
    localStorage.setItem("search cities",JSON.stringify(searchhistory));
    renderhistory();


});

$("#clear-search").on("click", function(event){
searchhistory = [];
renderhistory();


})


//on click event to clear search history 
//save search history into local storage

})
