const autumn = document.querySelector(".autumn");
const winter = document.querySelector(".winter");
const sunrise = document.querySelector(".sunrise");
const summer = document.querySelector(".summer");
const rainy = document.querySelector(".rainy");
const nature = document.querySelector(".nature");

const temperatureForBg = document.querySelector(".temp");
const descriptionForBg = document.querySelector(".description");

const weather = {
    "apiKey": "1e6470aac8b245f781330e8a02b960cf",
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + this.apiKey
        ).then((response) => response.json())
        .then((data) => this.displayWeather(data)); 
    },

    displayWeather: function(data) {
        const{name} = data;
        const{icon, description} = data.weather[0];
        const{temp, humidity} = data.main;
        const{speed} = data.wind;
        document.querySelector(".city").innerHTML = `Weather in ${name}`;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".temp").innerHTML = `${Math.floor(temp)} °C`;
        document.querySelector(".humidity").innerHTML = `Humidity ${humidity}`;
        document.querySelector(".wind").innerHTML = `Wind speed ${speed}`;
        document.querySelector(".weather").classList.remove("loading");

        //sonradan eklenen kod
        
        if( descriptionForBg.innerText === "Light Intensity Drizzle" || descriptionForBg.innerText === "Light Rain" || descriptionForBg.innerText === "Light Intensity Shower Rain" || descriptionForBg.innerText === "Rainy" ) {
            winter.style.display = "none";
            autumn.style.display = "none";
            summer.style.display = "none";
            rainy.style.display = "Block";
            sunrise.style.display = "none";
            nature.style.display = "none";
        } else if( parseInt(temperatureForBg.innerHTML) <= 0 ) {
            nature.style.display = "none";
            autumn.style.display = "none";
            summer.style.display = "none";
            rainy.style.display = "none";
            sunrise.style.display = "none";
            winter.style.display = "block";
        } else if( parseInt(temperatureForBg.innerHTML) <= 5 ) {
            sunrise.style.display = "none";
            autumn.style.display = "none";
            summer.style.display = "none";
            rainy.style.display = "none";
            winter.style.display = "none";
            nature.style.display = "block";
        }else if( parseInt(temperatureForBg.innerHTML) <= 10 ) {
            sunrise.style.display = "block";
            autumn.style.display = "none";
            summer.style.display = "none";
            rainy.style.display = "none";
            winter.style.display = "none";
            nature.style.display = "none";
        } else if( parseInt(temperatureForBg.innerHTML) <= 15 ) {
            autumn.style.display = "block";
            winter.style.display = "none";
            summer.style.display = "none";
            rainy.style.display = "none";
            sunrise.style.display = "none";
            nature.style.display = "none";
        } else if( parseInt(temperatureForBg.innerHTML) <= 20 ) {
            summer.style.display = "block";
            autumn.style.display = "none";
            winter.style.display = "none";
            rainy.style.display = "none";
            sunrise.style.display = "none";
            nature.style.display = "none";
        } else if( parseInt(temperatureForBg.innerHTML) <= 100 ) {
            summer.style.display = "none";
            autumn.style.display = "block";
            winter.style.display = "none";
            rainy.style.display = "none";
            sunrise.style.display = "none";
            nature.style.display = "none";
        }
    },

    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }

};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if(event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Istanbul");