import React, { useContext } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import Container from './Container';
import OptionList from './OptionList';
import Footer from './Footer';

import BasketContext from '../../context/BasketContext';
import { ProductContextProvider } from './context';
import { Title, Subtitle } from './styles';

const Product = ({ navigation, route }) => {
  const { showBasket } = useContext(BasketContext);
  const { product } = route.params;

  return (
    <ProductContextProvider>
      <Container image={product.image} favorite={product.favorite}>

        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <Button
            onPress={showBasket}
            style={{ marginRight: 5, flex: 1 }}
            mode="outlined"
            icon="cart-outline"
          >
            carrinho
          </Button>
          <Button
            style={{ marginLeft: 5, flex: 1 }}
            mode={product.favorite ? "contained" : "outlined"}
            icon={product.favorite ? "heart" : "heart-outline"}
          >
            favoritos
          </Button>
        </View>
        

        <Title numberOfLines={2}>{ product.name }</Title>
        <Subtitle>{ product.details }</Subtitle>
        
        <OptionList options={product.options} />
        <Footer product={product} />

      </Container>
    </ProductContextProvider>
  );
}

export default Product;