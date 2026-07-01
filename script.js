async function getWeather(){

    let city=document.getElementById("city").value;

    if(city==""){
        alert("Please enter city name");
        return;
    }

    try{

        // Step 1 : Find latitude and longitude

        let geo=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);

        let geoData=await geo.json();

        if(!geoData.results){
            document.getElementById("result").innerHTML="City not found";
            return;
        }

        let lat=geoData.results[0].latitude;
        let lon=geoData.results[0].longitude;

        // Step 2 : Get weather

        let weather=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`);

        let data=await weather.json();

        document.getElementById("result").innerHTML=`
        <h3>${city}</h3>
        <p>Temperature : ${data.current.temperature_2m} °C</p>
        <p>Humidity : ${data.current.relative_humidity_2m}%</p>
        <p>Wind Speed : ${data.current.wind_speed_10m} km/h</p>
        `;

    }
    catch(error){
        document.getElementById("result").innerHTML="Something went wrong";
    }

}
