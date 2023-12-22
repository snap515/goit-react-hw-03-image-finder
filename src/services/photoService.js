import axios from 'axios';

const URL = `https://pixabay.com/api/`;
const API_KEY = '39808878-d17211b11e4a3c923ce198349';

export async function fetchImages(searchText, page) {
  const params = {
    key: API_KEY,
    per_page: 12,
  };

  const data = await axios
    .get(`${URL}?page=${page}&q=${searchText}`, { params })
    .then(response => {
      return response.data;
    });
  return data;
}
