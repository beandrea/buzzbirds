var lastSearches = [];

$(document).ready(function () {
    if(localStorage.getItem("searches") != null){
        lastSearches = JSON.parse(localStorage.getItem("searches"));

        var historyDiv = $("#history");

        for (var i = 0; i < lastSearches.length; i++) {
            var btn = $("<button>").addClass("btn");
            btn.text(lastSearches[i]);
            var div = $("<div>").addClass("mt-2 mb-2 col-sm-10");

            div.append(btn);
            historyDiv.append(div);
        }
    }

    $("#search").on("click", function () {
        var cityText = $("#city").val();
        var historyDiv = $("#history");

        if (lastSearches.indexOf(cityText) == -1) {
            lastSearches.push(cityText);
            localStorage.setItem("searches", JSON.stringify(lastSearches));


            historyDiv.empty();

            for (var i = 0; i < lastSearches.length; i++) {
                var btn = $("<button>").addClass("btn");
                btn.text(lastSearches[i]);
                var div = $("<div>").addClass("mt-2 mb-2 col-sm-10");

                div.append(btn);
                historyDiv.append(div);
            }
        }

        var apiKey = "91740392b403e980dc4396057af69b35";

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + cityText + "&appid=" + apiKey,
            type: "GET"
        }).then(function (response) {
            console.log(response);
        });
    });
});