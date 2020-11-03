var lastSearches = [];

$(document).ready(function () {
    if(localStorage.getItem("searches") != null){
        lastSearches = JSON.parse(localStorage.getItem("searches"));

        console.log(lastSearches);
        var historyDiv = $("#history");

        for (var i = 0; i < lastSearches; i++) {
            var btn = $("<button>").text(lastSearches[i]);
            historyDiv.append(btn);
        }
    }

    $("#search").on("click", function () {
        var cityText = $("#city").val();
        var historyDiv = $("#history");

        if (lastSearches.indexOf(cityText)) {
            lastSearches.push(cityText);
            localStorage.setItem("searches", JSON.stringify(lastSearches));

            console.log(lastSearches);

            historyDiv.empty();

            for (var i = 0; i < lastSearches; i++) {
                var btn = $("<button>").text(lastSearches[i]);
                historyDiv.append(btn);
            }
        }
    });
});