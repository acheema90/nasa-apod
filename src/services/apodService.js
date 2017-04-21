/*
* the image request service
* returns json data
*/
import 'whatwg-fetch';

const APIKEY = 'ikyEHyh0ZmirOWJmwluc9mUKyuTt1NEFiMkoLsgU';

const URL = `https://api.nasa.gov/planetary/apod?api_key=${APIKEY}&hd=true`;

let myHeaders = new Headers( {"Content-Type": "application/json"});

let myInit = { 
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default' 
};

export default function getApod(){
    let myRequest = new Request(URL, myInit);
    return fetch(myRequest)
            .then((response) => {
                return response.json();
             });
};