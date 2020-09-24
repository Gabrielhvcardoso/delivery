const BASE_URL = 'https://dinamica-delivery-server.herokuapp.com';

export const useFetch = {
  get: (url = '/', onEnd = () => {}) => {
    fetch(BASE_URL + url).then((response) => {
      response.json().then((data) => {
        onEnd(data);
      })
    });
  },

  post: async (url = '/', body, onEnd = () => {}) => {
    fetch(BASE_URL + url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then((response) => {
      response.json().then(data => {
        onEnd(data);
      });
    });
  }
};
