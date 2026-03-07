const API_KEY = 'bf9c8c9c300c37d6cecdf9533366763e';

export async function getWeather(city) {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);

  if (!res.ok) {
    throw new Error('City not found');
  }

  return res.json();
}

export async function searchCities(query) {
  const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`);

  if (!res.ok) {
    throw new Error('Cities request failed');
  }

  return res.json();
}
