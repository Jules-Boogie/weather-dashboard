$(document).ready(function() {

// {"appid": "ac7f727646315761c418c419133adbbf"};
//5 day weather forecast
//city.name City name
//http://samples.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml&appid=b6907d289e10d714a6e88b30761fae22
//"api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=ac7f727646315761c418c419133adbbf";

//current day data
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
//http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22


var searchHistory = JSON.parse(localStorage.getItem("search")) || [];

var queryURL;
var queryURL2;

let updateDay = function(){
    currentDay = moment().format("MMMM Do YYYY");
    $("#current-date").text("Today's Date is: " + currentDay);
    

}
updateDay(); //call function
setInterval(updateDay,1000); //refresh time every 1000ms




$("#search-button").on("click", function(event) {
    event.preventDefault();
    var cityName = $("input").val().trim();
    
    queryURL2 = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=ac7f727646315761c418c419133adbbf"; //currentday
    

    //console.log(cityName)

    //function weather(){
  

    $.ajax({
        url:queryURL2,
        method: "GET"
    })
    .then(function(response) {
        console.log(response);

        var pic = response.weather[0].icon;
        var picAlt = response.weather[0].description;
        $("#weather-pic").attr("src","http://openweathermap.org/img/wn/"+pic+"@2x.png")
        $("#weather-pic").attr("alt",picAlt)


        var userCity = response.name;
        $("#city-name").text(userCity +"'s Current Weather Conditions ")
        //console.log(userCity)
       
        var wind = response.wind.speed;
        $("#windspeed").text("Wind Speed: " + wind + " MPH")
        var humidity = response.main.humidity;
        $("#humidity").text("Humidity: " + humidity + "%")
        var temperature = response.main.temp;
        $("#temperature").text("Temperature: " + temperature + "F")

        var latitude = response.data.coord.lat;
        var longitude = response.data.coord.lat;
        var UVqueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=ac7f727646315761c418c419133adbbf"
        
        $.ajax({
            url:UVqueryURL,
            method: "GET"
        })
        .then(function(response) {

            var uvindex = response.data[0].value;
        $("#uv-index").text("UV Index:" + uvindex)

        })



        queryURL = "api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=ac7f727646315761c418c419133adbbf";


        $.ajax({
            url:queryURL,
            method: "GET"
        })
        .then(function(response) {
            console.log(response)
        
        
        });
        
    
    
    });



    
});
// function to convert temperature
//on click event to clear search history 
//save search history into local storage



});

