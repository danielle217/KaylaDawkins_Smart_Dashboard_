import React, { useState, useEffect } from "react";

function Weather() {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(true);
    const [usingGeo, setUsingGeo] = useState(false);

    // Fetch by city name
    const fetchByCity = async (cityName) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=17bfbf700c3861a7acaa1a4aab2fad92&units=imperial`
            );
            if (!response.ok) throw new Error('City not found');
            const data = await response.json();
            setWeather(data);
            setCity(cityName);
        } catch (err) {
            setError('Weather currently unavailable');
        } finally {
            setLoading(false);
        }
    };

    // Fetch by coordinates (used by geolocation)
    const fetchByCoords = async (lat, lon) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=17bfbf700c3861a7acaa1a4aab2fad92&units=imperial`
            );
            if (!response.ok) throw new Error('Weather data not available');
            const data = await response.json();
            setWeather(data);
            setCity(data.name); 
        } catch (err) {
            setError('Weather currently unavailable');
        } finally {
            setLoading(false);
        }
    };

    // On mount: try geolocation, fall back to Detroit
    useEffect(() => {
        if (navigator.geolocation) {
            setUsingGeo(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchByCoords(position.coords.latitude, position.coords.longitude);
                },
                () => {
                    setUsingGeo(false);
                    fetchByCity('Detroit');
                }
            );
        } else {
            fetchByCity('Detroit');
        }
    }, []);

    const handleCitySearch = (e) => {
        if (e.key === 'Enter' && city.trim()) {
            setUsingGeo(false);
            fetchByCity(city.trim());
        }
    };

    return (
        <div className="card">
            <h2>Weather {usingGeo && <span className="geo-badge">: Auto-detected</span>}</h2>
            <input
                type="text"
                placeholder="Enter city and press Enter"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleCitySearch}
            />
            {loading && <p>Loading weather...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && weather && (
                <div>
                    <h3>{weather.name}, {weather.sys?.country}</h3>
                    <p>Temperature: {weather.main.temp}°F</p>
                    <p> Humidity: {weather.main.humidity}%</p>
                    <p>Wind: {weather.wind.speed} mph</p>
                    <p>{weather.weather[0].description}</p>
                </div>
            )}
        </div>
    );
}

export default Weather;