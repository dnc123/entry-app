export default function (ENDPOINT, params) {
    const TARGET_URL = buildRequestURL(ENDPOINT, params);

    return fetch(TARGET_URL).then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }

        return response.json();
    }).catch(() => {
        console.log('Handling general error...');
    });
}

function buildRequestURL(ENDPOINT, params) {
    let CURRENT_URL = new URL(getCurrentAbsoluteURL(ENDPOINT));
    buildQueryParameters(CURRENT_URL, params);

    return CURRENT_URL;
}

function buildQueryParameters(URL, params) {
    Object.keys(params).forEach(key => URL.searchParams.append(key, params[key]))
}

function getCurrentAbsoluteURL(ENDPOINT) {
    let currentLocation = window.location;
    return `${currentLocation.protocol}//${currentLocation.host}/${currentLocation.pathname.split('/')[1]}${ENDPOINT}`;
}