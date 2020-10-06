import React, { createContext, useContext, useState } from 'react';
import { Alert, Text } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import { useFetch } from '../hooks/useFetch';
import { useToken } from '../hooks/useToken';

import AuthContext from './AuthContext';

const BasketContext = createContext({
  products: [],
  increaseItem: () => {},
  decreaseItem: () => {},

  // basket modal
  isBasketVisible: false,
  showBasket: () => {},
  dismissBasket: () => {},

  handleSendOrder: () => {}
});

export const BasketContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  
  const [products, setProducts] = useState([]);
  const [isBasketVisible, setIsBasketVisible] = useState(false);

  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const showBasket = () => setIsBasketVisible(true);
  const dismissBasket = () => setIsBasketVisible(false);

  const increaseItem = (item) => {
    setProducts([...products, {...item, id: Math.random() * Math.random() }]);
  }

  const decreaseItem = (id) => {
    let array = products.filter(item => item.id !== id);
    setProducts(array);
  }

  const handleSendOrder = (andressId, paymentMethod) => {
    if (!andressId) {
      Alert.alert("Atenção", "Selecione um endereço para entrega", [{
        text: 'Ok'
      }]);
      return;
    }
  
    useFetch.post('/p/order/' + useToken(), {
      userId: user.userId,
      andressId,
      paymentMethod,
      products
    }, (response) => {
      if (response.code === 'error') {
        Alert.alert("Algo de errado aconteceu", "Por favor tente novamente, se o erro persistir contate a loja");
      } else if (response.code === 'success') {
        setProducts([]);
        dismissBasket();
        setIsDialogVisible(true);
      }
    })
  }

  return (
    <BasketContext.Provider value={{
      products,
      increaseItem,
      decreaseItem,
      isBasketVisible,
      showBasket,
      dismissBasket,
      handleSendOrder
    }}>
      <Portal>
        <Dialog visible={isDialogVisible} onDismiss={() => setIsDialogVisible(false)}>
          <Dialog.Content>
            <Text>Tudo certo, seu pedido já foi entregue! Você pode acompanhar o processo na guia "Pedidos"</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setIsDialogVisible(false)}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      { children }
    </BasketContext.Provider>
  );
}

export default BasketContext;
