$(document).ready(function () {

    // {"appid": "ac7f727646315761c418c419133adbbf"};
    //5 day weather forecast
    //city.name City name
    //http://samples.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml&appid=b6907d289e10d714a6e88b30761fae22
    //"api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=ac7f727646315761c418c419133adbbf";

    //current day data
    //api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
    //http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22

    // function to convert temperature
    var searchhistory = JSON.parse(localStorage.getItem("search")) || [];
    var queryURL;
    var queryURL2;

    function calculateF(k) {
        return Math.floor((k - 273.15) * 1.8 + 32);

    };



    let updateDay = function () {
        currentDay = moment().format("MMMM Do YYYY");
        $("#current-date").text("Today's Date is: " + currentDay);


    }
    updateDay(); //call function
    setInterval(updateDay, 1000); //refresh time every 1000ms






    //console.log(cityName)

    function isWeather(cityName) {
      var  queryURL2 = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=ac7f727646315761c418c419133adbbf"; //currentday


        $.ajax({
            url: queryURL2,
            method: "GET"
        })
            .then(function (response) {
                //console.log(response);

                var pic = response.weather[0].icon;
                var picAlt = response.weather[0].description;
                $("#weather-pic").attr("src", "http://openweathermap.org/img/wn/" + pic + "@2x.png")
                $("#weather-pic").attr("alt", picAlt)


                var userCity = response.name;
                $("#city-name").text(userCity + "'s Current Weather Conditions ")
                //console.log(userCity)
                //console.log(response)

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
                    url: UVqueryURL,
                    method: "GET"
                })
                    .then(function (response) {

                        var uvindex = response.value;
                        var UVbutton = $('<button class="btn bg-primary">').text("UV Index: " + uvindex)
                        $("#uv-index").append(UVbutton);

                    });



                
                queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=ac7f727646315761c418c419133adbbf";
                

                $.ajax({
                    url: queryURL,
                    method: "GET"
                    
                })
                    .then(function (response) {
                        console.log(response)

                        var futureCond = $(".future")
                        futureCond.val('');

                        for (var i = 0; i < futureCond.length; i++) {

                            var index = i * 8 + 4;
                            var futuredate = new Date(response.list[i].dt * 1000);
                            console.log(futuredate)
                            var day = futuredate.getDate();
                            console.log(day)
                            var month = futuredate.getMonth() + 1; // date seemed to be decreasing
                            console.log(month)
                            var year = futuredate.getFullYear();
                            //var 
                            var currentDay1 = month + "/" + day + "/" + year
                            console.log(currentDay1)
                            var p = $('<p>').text(currentDay1)
                            futureCond.append(p);
                            var img = $('<img id="weather-pc"/>')
                            var description1 = response.list[index].weather[0].description;
                            var pic1 = response.list[index].weather[0].icon
                            $("#weather-pc").attr("src", "https://openweathermap.org/img/wn/" + pic1 + "@2x.png")
                            $("#weather-pc").attr("alt", description1);
                            futureCond.append(img);
                            var pTemp = $('<p id="p-temp"> </p>').text("Temperature: " + temp1 + " °F");
                            var temp1 = calculateF(response.list[index].main.temp);
                            //$("#p-temp").text("Temperature: " + temp1 + "F");
                            futureCond.append(pTemp);
                            var pHumid = $('<p id="p-humid"></p>').text("Humidity: " + humid + "%");;
                            var humid = response.list[index].main.humidity;
                            console.log(humid)
                            futureCond.append(pHumid);
                        };


                    });   
            });

    };
            
        









function renderhistory() {
    $("#cached-cities").empty();
    for (var i = 0; i < searchhistory.length; i++) {
        var searchBar = $("<input>").attr("id", "loc-input").attr("class","form-control").attr("value",searchhistory[i]);
        $("loc-input").on("click", function () {
            var val = $("loc-input").val()
            Isweather(val);



        })
        $("#cached-cities").append(searchBar);


    }

}
renderhistory();
if (searchhistory.length > 0) {
    Isweather(searchhistory[searchhistory.length - 1]);
}



$("#search-button").on("click", function (event) {
    event.preventDefault();
    var cityName = $("input").val().trim();
    searchhistory.push(cityName)
    isWeather(cityName);
    localStorage.setItem("search cities", JSON.stringify(searchhistory));
    renderhistory();


});

$("#clear-search").on("click", function (event) {
    searchhistory = [];
    renderhistory();


});


        //on click event to clear search history 
        //save search history into local storage


        /*
        const birthday = new Date('6/13/2018 06:27:39');
        
        birthday.getMonth() // 5 (0 is January)
        birthday.getDate() // 13
        birthday.getDay() // 3 (0 is Sunday)
        birthday.getFullYear() // 2018
        birthday.getTime() // 1528838859000 (milliseconds since the Unix Epoch)
        birthday.getHours() // 6
        birthday.getMinutes() // 27
        birthday.getSeconds() // 39
        birthday.getTimezoneOffset() // -540 (time zone offset in minutes based on your browser's location)
        
        */
})

