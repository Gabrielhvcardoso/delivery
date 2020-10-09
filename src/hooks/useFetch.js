const BASE_URL = 'http://dmihost.com.br:21084';

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
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(body),
    }).then((response) => {
      response.json()
        .then(data => {
          onEnd(data);
        })
        .catch(() => {
          onEnd({ code: 'error' })
        });
    });
  },

  postFormData: async (url = '/', body, onEnd = () => {}) => {
    fetch(BASE_URL + url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      body,
    }).then((response) => {
      response.json()
        .then(data => {
          onEnd(data);
        })
        .catch((error) => {
          onEnd({ code: 'error', message: 'Erro genérico', ...error })
        });
    });
  },

  delete: async (url = '/', onEnd = () => {}) => {
    fetch(BASE_URL + url, {
      method: 'DELETE',
    }).then((response) => {
      response.json()
        .then(data => {
          onEnd(data);
        })
        .catch((e) => {
          console.log(e)
          onEnd({ code: 'error', ...e })
        });
    });
  },

};
