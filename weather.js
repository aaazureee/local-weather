        $(document).ready(function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var lat = position.coords.latitude;
                    var lng = position.coords.longitude;
                    // get address
                    var parameters = {
                        latlng: lat + "," + lng
                    };
                    $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?", parameters, function(data) {
                        var address = data["results"][0]["address_components"];
                        $("#here").append(address[2]["short_name"] + ", " + address[3]["short_name"]);
                    });
                    url = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/60174b206c1ec5ad81b665c91d64730f/" + lat + "," + lng + "?units=si&exclude=minutely,hourly,daily,alert,flags";
                    //get weather
                    $.getJSON(url, function(weather) {
                        $("#weather").html(weather["currently"]["summary"]);
                        $("#temp").html("Temperature: " + "<span id = 'cel'>" + weather["currently"]["temperature"].toFixed() + "</span>" 
                                        +  "<span id = 'change'>&deg;C</span>");
                        $("#humid").html("Humidity: " + weather["currently"]["humidity"] * 100 + "%");
                        $("#wind").html("Windspeed: " + weather["currently"]["windSpeed"] + " m/s");
                        var icon = weather["currently"]["icon"];
                        var skycons = new Skycons({"color": "#42A5F5", "resizeClear": true});
                        skycons.add("icon1", icon);
                        skycons.play();
                        
                        
                    });
                    
                    $(document).on("click", "#change", function() {
                            var fahrenheit = changeCelsiusDegree($("#cel").text());
                            console.log($("#cel"));
                            $("#cel").html(fahrenheit.toFixed());
                            $("#change").html("&deg;F");
                        });
                    
                });
                    
                
            }
            
            function changeCelsiusDegree(cel) {
                return cel * 9 / 5 + 32;
            }
        });