function gettingJSON(){
    var api_key = 'a3469be6620fcdcf5c254fd4a2a7938a'
    document.querySelector("#forecast").style.display = "block";

    let location;

    location = document.querySelector("#location").value;
    if (location == "") {
        location = "Ann Arbor"
    }
    console.log("Location is: " + location);

    let format;

    if (document.querySelector("#celcius").checked) {
        format = "metric";
    } else {
        format = "imperial";
    }
    console.log("Format is: " + format);

    let query;
    let country;
    if (location.split(", ").length == 1) {
        country = "US";
    } else {
        country = location.split(", ")[1];
    }
    let city_or_zip = location.split(", ")[0];
    let query_type;
    if (isNaN(Number(city_or_zip))) {
        query_type = "q";
    } else {
        city_or_zip = Number(city_or_zip);
        query_type = "zip";
    }
    query = "https://api.openweathermap.org/data/2.5/weather?" + query_type + "=" + city_or_zip + "," + country + "&units=" + format + "&appid=" + api_key;
    
    console.log("Query is: " + query);

    let loc;
    let temp;
    let tempImg;

    $.getJSON(query,function(json){
        console.log(JSON.stringify(json));
        loc = json.name;
        temp = json.main.temp
        tempImg =  "http://openweathermap.org/img/wn/" + json.weather[0].icon + ".png";

        document.querySelector("#loc").innerHTML = loc;
        document.querySelector("#temp").innerHTML = temp;
        document.querySelector("#tempImg").src = tempImg;
        document.querySelector("#tempImg").alt = json.weather[0].description;
    });
}
