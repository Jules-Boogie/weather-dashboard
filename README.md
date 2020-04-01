# weather-dashboard

 06 Server-Side APIs: Weather Dashboard

Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

Use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. The documentation includes a section called "How to start" that will provide basic setup and usage instructions. Use `localStorage` to store any persistent data.


**Contact:**
[LinkedIn](https://www.linkedin.com/in/juliet-george-864950b8/)

**Built With**
https://www.w3schools.com/jsref/prop_button_value.asp

https://www.geeksforgeeks.org/jquery-set-the-value-of-an-input-text-field/

https://www.w3schools.com/jsref/jsref_push.asp

https://developer.mozilla.org/en-US/docs/Web/API/History_API

https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

https://medium.com/@monica1109/scheduling-settimeout-and-setinterval-ca2ee50cd99f

**Resources Used to Build**
[Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[Jquery](https://jquery.com/)
[Bootstrap 4](https://getbootstrap.com/docs/4.4/getting-started/introduction/)
[HTML](https://html.com/)
[CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
[GitPages](https://pages.github.com/)
[Git](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control)






**Code Snippet**
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
        
    
        
        
