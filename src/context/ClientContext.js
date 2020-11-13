import { compareAsc, compareDesc, format, setHours, setMinutes, subDays } from 'date-fns';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { useToken } from '../hooks/useToken';

const default_data = {
  andresses: null,
  businessHours: null,
  forceClose: false,
  isOpen: false
}

const ClientContext = createContext(default_data);

export function ClientContextProvider ({ children }) {
  const [client, setClient] = useState(default_data);

  const isOpen = useMemo(() => {
    if (client.forceClose) return false;

    const businessHours = JSON.parse(client.businessHours);
    if (!businessHours) return true;
    
    // Base dates
    const now = new Date();
    const weekday = format(now, 'EEE').toLocaleLowerCase(); 
    const yWeekday = format(subDays(now, 1), 'EEE').toLocaleLowerCase();
  
    const { open, close } = businessHours[weekday];
    const { open: yOpen, close: yClose } = businessHours[yWeekday];
    
    let openning = setMinutes(setHours(now, open.split(":")[0]), open.split(":")[1]);
    let closing = setMinutes(setHours(now, close.split(":")[0]), close.split(":")[1]);

    let yesterdayEndToday = compareAsc(setMinutes(setHours(now, yOpen.split(":")[0]), yOpen.split(":")[1]), setMinutes(setHours(now, yClose.split(":")[0]), yClose.split(":")[1])) === 1 ? true : false;
    let yClosing = setMinutes(setHours( yesterdayEndToday ? now : subDays(now, 1), yClose.split(":")[0]), yClose.split(":")[1]);
  
    return (compareAsc(now, openning) === 1 && compareDesc(now, closing) === 1) || compareDesc(now, yClosing) === 1;

  }, [client.businessHours, client.forceClose]);

  useEffect(() => {
    useFetch.post('/p/cli', { token: useToken() }, (response) => {
      if (!response.code) {
        setClient(response);
      }
    });
  }, []);

  return (
    <ClientContext.Provider value={{...client, isOpen}}>
      { children }
    </ClientContext.Provider>
  );
}

export default ClientContext;
