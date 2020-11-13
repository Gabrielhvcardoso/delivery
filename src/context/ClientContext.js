import React, { createContext, useEffect, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { useToken } from '../hooks/useToken';

const default_data = {
  andresses: null,
  businessHours: null,
  forceClose: false
}

const ClientContext = createContext(default_data);

export function ClientContextProvider ({ children }) {
  const [client, setClient] = useState(default_data);

  useEffect(() => {
    useFetch.post('/p/cli', { token: useToken() }, (response) => {
      if (!response.code) {
        setClient(response);
      }
    });
  }, []);

  return (
    <ClientContext.Provider value={client}>
      { children }
    </ClientContext.Provider>
  );
}

export default ClientContext;
