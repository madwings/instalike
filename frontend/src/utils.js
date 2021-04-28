export const fetchJson = async (url) => {
	let result = '';
    if (!url) {
        throw new Error('Empty url.');
    }

    const response = await fetch(url);
    if (response.ok) {
        result = await response.json();
    } else {
        throw new Error('There was an error with your request. Please try again.');
    }

    return result;
};
