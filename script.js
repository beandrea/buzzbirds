$(document).ready(function () {
    $("search").on("click", function() {
        var value = $("#city").val();
        $("#city").val("");
        seachWeather(value);
    });

    $(".history").on("click", "li", function() {
        seachWeather($(this).text());
    });

    function makeRow(text) {
        var li = $("<li>").addClass("list-group-item list-group-item-action");
    }

    
        var apiKey = "91740392b403e980dc4396057af69b35";

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + cityText + "&appid=" + apiKey,
            type: "GET"
        }).then(function (response) {
            console.log(response);

            var day = new Date;
            var date = day.toDateString();
            var h1 = $("<h1>").text(cityText + " (" + date + ")");
            $("#current").append(h1);
        });
});