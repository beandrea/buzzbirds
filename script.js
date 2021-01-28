$(document).ready(function () {
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
        var apiKey = "91740392b403e980dc4396057af69b35";

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

                var title = $("<h3>").addClass("");
            }
    

            var day = new Date;
            var date = day.toDateString();
            var h1 = $("<h1>").text(cityText + " (" + date + ")");
            $("#current").append(h1);
        });
    }
});