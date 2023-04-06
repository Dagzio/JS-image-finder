import axios from 'axios';

const options = {
  BASE_URL: 'https://pixabay.com/api/',
  API_KEY: '34850720-57991e278d678856824bddd81',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
}



export default async function fetchImages(name, page) {
  const { BASE_URL, API_KEY, image_type, orientation, safesearch, per_page} = options;
  try {
    const response = await
      axios.get(`${BASE_URL}?key=${API_KEY}&q=${name}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}&page=${page}&per_page=${per_page}`);
    return response.data;
  } catch (error) {
    console.error(error);
    }
}
