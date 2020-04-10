$( document ).ready(function() {

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
        //queryURL2 = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=ac7f727646315761c418c419133adbbf"; //currentday


        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=ac7f727646315761c418c419133adbbf", //currentday,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);

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
                var longitude = response.coord.lon;
                var UVqueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=ac7f727646315761c418c419133adbbf" + "&cnt=1"
                

                $.ajax({
                    url: UVqueryURL,
                    method: "GET"
                })
                    .then(function (response) {
                        console.log(response)
                        $("#uv-index").empty()

                        var uvindex = response[0].value;
                        var UVbutton = $('<button class="btn bg-primary">').text("UV Index: " + uvindex)
                        $("#uv-index").append(UVbutton);

                    });




                //queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=ac7f727646315761c418c419133adbbf";


                $.ajax({
                    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=ac7f727646315761c418c419133adbbf",
                    method: "GET"

                })
                    .then(function (response) {
                        console.log(response)

               
                         $("#future").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");

                        // loop over all forecasts (by 3-hour increments)
                        for (var i = 0; i < response.list.length; i++) {
                            // only look at forecasts around 3:00pm
                            if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                            // create html elements for a bootstrap card
                            var col = $("<div>").addClass("col-md-2 col-sm-12");
                            var card = $("<div>").addClass("card bg-primary text-white");
                            var body = $("<div>").addClass("card-body p-2");

                            var title = $("<h5>").addClass("card-title").text(new Date(response.list[i].dt_txt).toLocaleDateString());

                            var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");

                            var p1 = $("<p>").addClass("card-text").text("Temp: " + calculateF(response.list[i].main.temp_max) + " °F");
                            var p2 = $("<p>").addClass("card-text").text("Humidity: " + response.list[i].main.humidity + "%");

                            // merge together and put on page
                            col.append(card.append(body.append(title, img, p1, p2)));
                            $("#future .row").append(col);
                            }
                        }


                        // var rowDiv = $("<div>").attr("class","forecast")
                        // futureCond.append(rowDiv)
                        
                        

                        // for (var i = 0; i < futureCond.length; i++) {
                        //     //futureCond.text("");

                        //     const index = i * 8 + 4;
                        //     const futuredate = new Date(response.list[index].dt * 1000);
                        //     console.log(futuredate)
                        //     const day = futuredate.getDate();
                        //     console.log(day)
                        //     const month = futuredate.getMonth() + 1; // date seemed to be decreasing
                        //     console.log(month)
                        //     const year = futuredate.getFullYear();
                        //     //var 
                        //     //var currentDay1 = month + "/" + day + "/" + year
                        //     //console.log(currentDay1)
                        //     var colmn = $("<div>").attr("class","one-fifth");
                        //     rowDiv.append(colmn);
                        //     const dateCard = $('<div>').attr("class","card text-black bg-primary");
                        //     colmn.append(dateCard);
                        //    var cardHead = $("<div>").attr("class","card-header").text(month + "/" + day + "/" + year);
                        //     dateCard.append(cardHead);
                        //     var cardImg = $('<img>').attr("class","card-img-top");
                        //     var description1 = response.list[index].weather[0].description;
            
                        //     var pic1 = response.list[index].weather[0].icon
                        //     cardImg.attr("src", "https://openweathermap.org/img/wn/" + pic1 + "@2x.png")
                        //     cardImg.attr("alt", description1);
                        //     dateCard.append(cardImg);
                        //     var cardBody = $("div").attr("class","card-body");
                        //     dateCard.append(cardBody);
                        //     var pTemp = $('<p>').attr("class","card-text");
                        //     pTemp.text("Temperature: " + temp1 + " °F");
                        //     var temp1 = calculateF(response.list[index].main.temp);
                        //     //$("#p-temp").text("Temperature: " + temp1 + "F");
                        //     cardBody.append(pTemp);
                        //     var pHumid = $('<p>').attr("class","card-text");
                        //     pHumid.text("Humidity: " + humid + "%");;
                        //     var humid = response.list[index].main.humidity;
                        //     console.log(humid)
                        //     cardBody.append(pHumid);
                        // };


                    });
            });

    };











    function renderhistory() {
        $("#cached-cities").empty();
        for (var i = 0; i < searchhistory.length; i++) {
            var searchBar = $("<input>").attr("id", "loc-input").attr("class", " form-control").attr("value", searchhistory[i]).attr("type", "text").attr("readonly", true);
            searchBar.on("click", function (event) {
                event.preventDefault();
                //var myval = searchBar.val();
                isWeather($("#loc-input").val());
                //console.log(myval)



            })
            $("#cached-cities").append(searchBar);


        }
    }
    renderhistory();
    if (searchhistory.length > 0) {
        isWeather(searchhistory[searchhistory.length - 1]);
    }




        $("#search-button").on("click", function () {
            event.preventDefault();
            var cityName = $("input").val().trim();
            searchhistory.push(cityName)
            isWeather(cityName);
            localStorage.setItem("search", JSON.stringify(searchhistory));
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

});
