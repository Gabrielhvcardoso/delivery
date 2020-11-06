import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { formatRelative } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import ThemeContext from '../../../context/ThemeContext';

const capitalizeFirstLetter = (str) => {
  return str.slice(0, 1).toLocaleUpperCase() + str.slice(1);
}

const HistoryItem = ({ order }) => {
  const { mode, main, muted, soft, surface, text } = useContext(ThemeContext);
  
  const { createdAt, paymentMethod, products } = order;
  const { street, number } = JSON.parse(order.andress);

  return (
    <View style={{ backgroundColor: surface, marginTop: 20, borderRadius: 10, padding: 20 }}>
      <Text style={{ fontFamily: 'Inter Bold', fontSize: 20, color: text }}>Detalhes do pedido</Text>
      <Text style={{ fontFamily: 'Inter Regular', fontSize: 16, color: muted }}>
        { capitalizeFirstLetter( formatRelative(parseInt(createdAt), new Date(), { locale: ptBR }) ) }
      </Text>
      
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontFamily: 'Inter Regular',  fontSize: 12, color: muted }}>{ `${street} - ${number}` }</Text>
        <Text style={{ fontFamily: 'Inter Regular', fontSize: 12, color: muted }}>{ paymentMethod }</Text>
      </View>
      
      <View style={{ marginTop: 15 }}>
        <Text style={{ marginBottom: 15, color: main, fontFamily: 'Inter Medium', textTransform: 'uppercase' }}>Itens pedidos</Text>
        {
          products.map(({ quantity, observation, productName, price, finalPrice }, index, array) => (
            <View key={Math.random()} style={{ borderBottomColor: soft, borderBottomWidth: index === array.length - 1 ? 0 : 0.5, paddingVertical: 7 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 17, fontFamily: 'Inter Medium', color: main }}>{ quantity } x</Text>
                <Text numberOfLines={1} style={{ color: text, fontSize: 17, fontFamily: 'Inter Medium', marginHorizontal: 10, flex: 1 }}>{ productName }</Text>
                <Text style={{ color: text, fontSize: 17, fontFamily: 'Inter Medium' }}>R$ { parseFloat(price * quantity).toFixed(2).replace('.', ',') }</Text>
              </View>

              {/* Options */}
              {
                observation?.map(({ item, price: itemPrice }, index, array) => (
                  <View key={Math.random()} style={{ marginLeft: 35 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text numberOfLines={1} style={{ color: muted, fontFamily: 'Inter Regular', flex: 1, marginRight: 10 }}>{ item }</Text>
                      <Text style={{ color: muted, fontFamily: 'Inter Regular' }}>R$  { parseFloat(itemPrice * quantity).toFixed(2).replace('.', ',') }</Text>
                    </View>
                  </View>
                ))
              }

              {
                observation ? (
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5 }}>
                    <Text style={{ color: main, fontFamily: 'Inter SemiBold', fontSize: 14 }}>R$  { parseFloat(finalPrice).toFixed(2).replace('.', ',') }</Text>
                  </View>
                ) : <></>
              }
            </View>
          ))
        }

        <View style={{ marginTop: 15, flexDirection: 'row' }}>
          <Text style={{ color: text, flex: 1, fontSize: 17, fontFamily: 'Inter Medium' }}>Total</Text>
          <Text style={{ color: text, fontSize: 17, fontFamily: 'Inter Medium' }}>
            {
              'R$ ' + products.reduce((total, { finalPrice }) => total += parseFloat(finalPrice), 0).toFixed(2).toString().replace('.', ',')
            }  
          </Text>      
        </View>
      </View>

        
      <TouchableOpacity
        activeOpacity={0.6}
        style={{ backgroundColor: mode === 'light' ? main.lighten(0.9) : main, borderRadius: 10, marginTop: 15, justifyContent: 'center', alignItems: 'center', height: 60 }}
      >
        <Text style={{ color: mode === 'light' ? main : text.negate(), fontFamily: 'Inter Medium', fontSize: 16 }}>
          Reportar pedido
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default HistoryItem;