export function getImage(searchValue) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '43825908-e00f2a501e8ab3b01ba78a8cd';
    const params = `?key=${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true`;
  
    return fetch(`${BASE_URL}${params}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
}