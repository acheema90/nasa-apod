import { API_KEY } from './constants';

const URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&hd=true`;
const myHeaders = new Headers({ 'Content-Type': 'application/json' });
const myInit = {
	method: 'GET',
	headers: myHeaders,
	mode: 'cors',
	cache: 'default',
};

export default function getApod() {
	let myRequest = new Request(URL, myInit);
	return fetch(myRequest).then((response) => {
		return response.json();
	});
}
