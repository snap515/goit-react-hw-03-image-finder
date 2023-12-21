import axios from 'axios';

const URL = `https://pixabay.com/api/`;
const API_KEY = '39808878-d17211b11e4a3c923ce198349';

export async function getImages(searchText) {
  const params = {
    key: API_KEY,
    per_page: 12,
  };

  const data = await axios
    .get(`${URL}?page=1&q=${searchText}`, { params })
    .then(response => {
      console.log(response.data);
      return response.data;
    });
  return data;
}
