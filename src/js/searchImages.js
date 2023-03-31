import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const keyAPI = '34850720-57991e278d678856824bddd81';

export default async function fetchImages(name) {
  try {
      const response = await axios.get(`${BASE_URL}?key=${keyAPI}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`);
      return response;
  } catch (error) {
    console.error(error);
    }
}