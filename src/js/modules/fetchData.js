import sendRequest from './sendRequest';

async function fetchData() {
  const requestURL = './api/updates.json';
  let data = await sendRequest('GET', requestURL);
  return data;
}

export default fetchData;