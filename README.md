# Weather Dashboard

This project uses the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities and `localStorage` to store any persistent data. The challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.


**Contact:**
[LinkedIn](https://www.linkedin.com/in/juliet-george-864950b8/)


**App Photo**

![Weather DashBoard](https://github.com/Jules-Boogie/weather-dashboard/blob/master/Capture.PNG)


**Code Snippet**

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
        
    
        
        
