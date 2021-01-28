$(document).ready(function () {
    var apiKey = "91740392b403e980dc4396057af69b35";

    $("search").on("click", function() {
        var value = $("#city").val();
        $("#city").val("");
        searchWeather(value);
    });

    $(".history").on("click", "li", function() {
        searchWeather($(this).text());
    });

    function makeRow(text) {
        var li = $("<li>").addClass("list-group-item list-group-item-action");
        $(".history").append(li);
    }

    function searchWeather(value) {
        $.ajax({
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + value + "&appid=" + apiKey,
            dataType: "json",
            success: function(data) {
                if(history.indexOf(value) === -1){
                    history.pushState(value);
                    localStorage.setItem("history", JSON.stringify(history));

                    makeRow(value);
                }

                $("#today").empty();

                var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ") ");
                var card = $("<div>").addClass("card");
                var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
                var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity +"%");
                var cardBody = $("<div>").addClass("card-body");
                var img = $("<img>").attr("src", "https://openweather.org/img/w/" + data.weather[0].icon + ".png");

                title.append(img);
                cardBody.append(title, temp, humid, wind);
                card.append(cardBody);
                $("#today").append(card);

                getForcast(value);
                getUVIndex(data.coord.lat, data.coord.lon);
            }
        });
    }

    function getForcast(value) {
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/forecast?q=" + value + "&appid=" + apiKey + "&units=imperial",
            dataType: "json",
            success: function(data) {
                $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");

                for(let i = 0; i < data.list.length; i++){
                    
                }
            }
        });
    }
});