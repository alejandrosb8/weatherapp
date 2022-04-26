async function getWeather(city) {
	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b03f6fdd1b7012b88f2dcee5b647aa7b`,
			{ mode: 'cors' }
		);
		const weatherData = await response.json();
		return weatherData;
	} catch {
		return 'error';
	}
}

export { getWeather };
