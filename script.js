$(document).ready(function () {
    var apiKey = "91740392b403e980dc4396057af69b35";

    $("#search-btn").on("click", function () {
        var value = $("#search-val").val();
        $("#search-val").val("");
        searchWeather(value);
    });

    $(".history").on("click", "li", function () {
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
            success: function (data) {
                console.log(data);

                if (history.indexOf(value) === -1) {
                    history.push(value);
                    localStorage.setItem("history", JSON.stringify(history));

                    makeRow(value);
                }

                $("#today").empty();

                var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ") ");
                var card = $("<div>").addClass("card");
                var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.list[0].wind.speed + " MPH");
                var humid = $("<p>").addClass("card-text").text("Humidity: " + data.list[0].main.humidity + "%");
                var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");
                var cardBody = $("<div>").addClass("card-body");
                var img = $("<img>").attr("src", "https://openweather.org/img/w/" + data.list[0].weather[0].icon + ".png");

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
            success: function (data) {
                $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");

                for (let i = 0; i < data.list.length; i++) {
                    if (data.list[i].dt_text.indexOf("15:00:00") !== -1) {
                        var col = $("<div>").addClass("col-md-2");
                        var card = $("<div>").addClass("card bg-primary text-white");
                        var body = $("<div>").addClass("card-body p-2");
                        var title = $("<h5>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
                        var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
                        var p1 = $("<p>").addClass("card-text").text("Temp: " + data.list[i].main.temp_max + " °F");
                        var p2 = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");

                        col.append(card.append(body.append(title, img, p1, p2)));
                        $("#forecast .row").append(col);
                    }
                }
            }
        });
    }

    function getUVIndex(kat, lon) {
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/uvi?appid" + apiKey + "&lat=" + lat + "&lon=" + lon,
            dataType: "json",
            success: function (data) {
                var uv = $("<p>").text("UV Index: ");
                var btn = $("<span>").addClass("btn btn-sm").text(data.value);

                if (data.value < 3) {
                    btn.addClass("btn-success");
                } else if (data.value < 7) {
                    btn.addClass("btn-warning");
                } else {
                    btn.addClass("btn-danger");
                }

                $("#today .card-body").append(uv.append(btn));
            }
        });
    }

    var history = JSON.parse(localStorage.getItem("history")) || [];

    if (history.length > 0) {
        searchWeather(history[history.length - 1]);
    }

    for (let i = 0; i < history.length; i++) {
        makeRow(history[i]);
    }
});