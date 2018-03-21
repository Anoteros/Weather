$(document).ready(function() {
    $("#weatherTitle").hide()
var x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {

// Request from OpenWeatherMap.org current weather data
var lat = position.coords.latitude;
var long = position.coords.longitude;
$.get("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&units=imperial&APPID=295c42a20e3a0eb791878dd61a5bf46e", function(data, status){


// Weather code conditions
var thunderstorm = data.weather[0].id >= 200 && data.weather[0].id <=232;
var rain = data.weather[0].id >= 500 && data.weather[0].id <= 531;
var misty = data.weather[0].id == 701;
var drizzle = data.weather[0].id >= 300 && data.weather[0].id <= 321;
var snow = data.weather[0].id >= 600 && data.weather[0].id <= 622;
var clearSky = data.weather[0].id == 800;
var cloudy = data.weather[0].id >= 801 && data.weather[0].id <= 804;
var day  = data.dt > data.sys.sunrise && data.dt < data.sys.sunset;
var night = !day;
var celcius = ((data.main.temp - 32) * 5) / 9;




        $("#weatherTitle").fadeIn(1000);

       // Weather Code
       // console.log(data.weather[0].id);


		// Current Location (City)
		$("#weatherLocation").append(data.name).hide().fadeIn(2000);
        // Current Location (Country)
        $("#weatherLocation").append(", " + data.sys.country).hide().fadeIn(2000);

        // Weather Condition
        $("#condition").html('<img src="images/SVG/thunderstorm.svg" height="75px" width="75px">').hide().fadeIn(1000);
        // $("#condition").append(data.weather[0].main);

        // Temperature
        if(data.sys.country = "US") {
        $("#temp").append(Math.round(data.main.temp) + String.fromCharCode(176) + "F");
        } else {
        $("#temp").append(Math.round(celcius) + String.fromCharCode(176) + "C").hide().fadeIn(1000);
        }
        // Display Farenheit (toggle)
        // $("#far").append('<img class="metric" src="images/SVG/f.svg" width="50px" height="50px">').hide().fadeIn(1000);

        
        // Weather Code # 200-232 - Thunderstorm
        if(thunderstorm) {
            console.log("Thunderstorm");
            // Set Weather Icon to Thunderstorm
            $("#condition").html('<img src="images/SVG/thunderstorm.svg" height="75px" width="75px">').hide().fadeIn(1000);
            // Set Body Background to Thunderstorm
            $('#container').css('background-image', 'url("images/bgs/thunderstorm.jpg")').addClass("load");

        } else if (misty) {
        // Weather Code # 701 - Misty
            console.log("Misty");
            // Set Weather Icon to Misty
            $("#condition").html('<img src="images/SVG/misty.svg" height="75px" width="75px">').hide().fadeIn(1000);
            // Set Body Background to Misty
            $("#container").css('background-image', 'url("images/bgs/rain.jpg")').addClass("load");
            // Weather Code # 300-321 - Drizzle
        } else if (drizzle) {
            console.log("Drizzle");
            // Set Weather Icon to Drizzle
            $("#condition").html('<img src="images/SVG/drizzle.svg" height="75px" width="75px">').hide().fadeIn(1000);
            // Set Body Background to Drizzle
            $("#container").css('background-image', 'url("images/bgs/rain.jpg")').addClass("load");
        } else if (rain) {
        // Weather Code # 500-531 - Rain
            console.log("Rain");
            // Set Weather Icon to Rain
            $("#condition").html('<img src="images/SVG/rain.svg" height="75px" width="75px">').hide().fadeIn(1000);
            // Set Body Background to Rain
            $("#container").css('background-image', 'url("images/bgs/rain.jpg")').addClass("load");

        } else if (snow) {
        // Weather Code # 600-622 - Snow
            console.log("Snow");
            // Set Weather Icon to Snow
            $("#condition").html('<img src="images/SVG/snow.svg" height="75px" width="75px">').hide().fadeIn(1000);
            // Set Body Background to Snow
            $("#container").css('background-image', 'url("images/bgs/snow.jpg")').addClass("load");

        } else if (clearSky) {
            if (day) {
                // Weather Code # 800     - Clear sky
                console.log("Clear sky today.");
                // Set Weather Icon to [Day] Clear Skies
                $("#condition").html('<img src="images/SVG/clearsky.svg" height="75px" width="75px">').hide().fadeIn(1000);
                // Set Body Background to [Day] Clear Skies
                $('#container').css('background-image', 'url("images/bgs/clear.jpg")').addClass("load");
            } else {
                console.log("Clear sky tonight.");
                // Set Weather Icon to [Day] Clear Skies
                $("#condition").html('<img src="images/SVG/nightclearskies.svg" height="75px" width="75px">').hide().fadeIn(1000);
                // Set Body Background to [Day] Clear Skies
                $('#container').css('background-image', 'url("images/bgs/nightclearskies.jpeg")').addClass("load");
            }

        } else if (cloudy) {
        // Weather Code # 801-804 - Cloudy
            console.log("Cloudy");
            // Set Weather Icon to [Day] Clear Skies
            $("#condition").html('<img src="images/SVG/cloudy.svg" height="75px" width="75px">').hide().fadeIn(1000);
            // Set Body Background to [Day] Clear Skies
            $('#container').css('background-image', 'url("images/bgs/cloudy2.jpg")').addClass("load");
            } else {
        // Error ...probably
        console.log("Something went wrong...");
        }

	console.log(data);
	console.log(status);

});
}

getLocation();






});





