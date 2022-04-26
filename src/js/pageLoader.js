import { getWeather } from './getData';

function initPage() {
	const root = document.getElementById('app');

	const mainContent =
		'<header>' +
		'<div>' +
		'<input type="text" placeholder="Search city..." id="cityName">' +
		'<button type="button" id="searchBtn"></button>' +
		'</div>' +
		'<h1 id="cityTitle"></h1>' +
		'</header><main>' +
		'<div class="main__tempDiv">' +
		'<span class="tempDiv__grades"></span><span class="tempDiv__celcius">ºC</span>' +
		'</div>' +
		'<h2 id="weather"></h2>' +
		'<div class="main__divData">' +
		'<div class="divData__data"><h3>Feels like</h3><span id="feelsLike"></span></div>' +
		'<div class="divData__data"><h3>Pressure</h3><span id="pressure"></span></div>' +
		'<div class="divData__data"><h3>Cloudiness</h3><span id="cloudiness"></span></div>' +
		'<div class="divData__data"><h3>Humidity</h3><span id="humidity"></span></div>' +
		'<div class="divData__data"><h3>Wind speed</h3><span id="windSpeed"></span></div>' +
		'<div class="divData__data"><h3>Visibility</h3><span id="visibility"></span></div>' +
		'</div>' +
		'</main>';

	root.innerHTML = mainContent;

	const button = document.getElementById('searchBtn');
	button.addEventListener('click', (e) => {
		updateContent();
	});

	const input = document.getElementById('cityName');
	input.addEventListener('keypress', (e) => {
		e.key === 'Enter' && updateContent();
	});
}

function updateContent() {
	const cityName = document.getElementById('cityName');
	const dataPromise = getWeather(cityName.value);

	const cityTitle = document.getElementById('cityTitle');
	const tempText = document.getElementsByClassName('tempDiv__grades')[0];

	const weather = document.getElementById('weather');

	const feelsLike = document.getElementById('feelsLike');
	const pressure = document.getElementById('pressure');
	const cloudiness = document.getElementById('cloudiness');
	const humidity = document.getElementById('humidity');
	const windSpeed = document.getElementById('windSpeed');
	const visibility = document.getElementById('visibility');

	dataPromise
		.then((data) => {
			cityTitle.textContent = cityName.value;
			tempText.textContent = Math.floor(data.main.temp);
			weather.textContent = data.weather[0].description;
			feelsLike.textContent = Math.floor(data.main.feels_like) + 'ºC';
			cloudiness.textContent = data.clouds.all + '%';
			pressure.textContent = data.main.pressure + 'hPa';
			humidity.textContent = data.main.humidity + '%';
			windSpeed.textContent = data.wind.speed + 'm/s';
			visibility.textContent = data.visibility / 1000 + 'km';
		})
		.catch((err) => {
			console.log(err);
		});
}

export { initPage };
