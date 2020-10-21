import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { format, addHours } from 'date-fns';

import ThemeContext from '../../../context/ThemeContext';

const OrderItem = ({ order }) => {
  const { main } = useContext(ThemeContext);

  const { createdAt, products, status } = order;
  const { street, number } = JSON.parse(order.andress);

  return (
    <View style={{ backgroundColor: 'white', marginTop: 20, borderRadius: 10, overflow: 'hidden' }}>
      {/* <View style={{ backgroundColor: '#333', height: 100 }} /> */}

      {/* Details */}

      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontFamily: 'Inter Bold', color: '#333' }}>Detalhes do pedido</Text>
        <Text style={{ fontSize: 17, color: '#666', fontFamily: 'Inter Regular' }}>
          { `${street} - ${number}` }
        </Text>
        <Text style={{ fontSize: 17, color: '#222', fontFamily: 'Inter Regular' }}>
          { format(parseInt(createdAt), 'HH:mm') } ~ { format(addHours(parseInt(createdAt), 1), 'HH:mm') }
        </Text>
      </View>

      {/* Progress */}

      <View style={{ padding: 10 }}>
        <View style={{ flex: 1 }}>
          <View style={styles.verticalLine}></View>
          <View style={styles.verticalWrap}>
            <View style={styles.itemWrap}>
              <View style={status === 1 ? {...styles.firstPoint, backgroundColor: main } : styles.otherPoint}></View>
              <View style={{ marginLeft: 5, flex: 1, padding: 10 }}>
                <Text style={status === 1 ? {...styles.currentMarker, color: main } : styles.disabledMarker}>Aguardando confirmação</Text>
              </View>
            </View>


            <View style={styles.itemWrap}>
              <View style={status === 2 ? {...styles.firstPoint, backgroundColor: main } : styles.otherPoint}></View>
              <View style={{ marginLeft: 5, flex: 1, padding: 10 }}>
                <Text style={status === 2 ? {...styles.currentMarker, color: main } : styles.disabledMarker}>
                  Seu pedido está sendo preparado
                </Text>
              </View>
            </View>           
          </View>        
        </View>
        <View style={styles.itemWrap}>
        <View style={status === 3 ? {...styles.firstPoint, backgroundColor: main } : styles.otherPoint}></View>
          <View style={{ marginLeft: 5, flex: 1, padding: 10 }}>
            <Text style={status === 3 ? {...styles.currentMarker, color: main } : styles.disabledMarker}>
              Seu pedido saiu para entrega
            </Text>
          </View>
        </View>
      </View>

      {/* Details */}

      <View style={{ padding: 20 }}>

        {
          products.map(({ quantity, observation, productName, price, finalPrice }, index, array) => (
            <View key={Math.random()} style={{ borderBottomColor: '#ccc', borderBottomWidth: index === array.length - 1 ? 0 : 0.5, paddingVertical: 7 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 17, fontFamily: 'Inter Medium', color: main }}>{ quantity } x</Text>
                <Text numberOfLines={1} style={{ fontSize: 17, fontFamily: 'Inter Medium', marginHorizontal: 10, flex: 1 }}>{ productName }</Text>
                <Text style={{ fontSize: 17, fontFamily: 'Inter Medium' }}>R$ { parseFloat(price * quantity).toFixed(2).replace('.', ',') }</Text>
              </View>

              {/* Options */}
              {
                observation?.map(({ item, price: itemPrice }, index, array) => (
                  <View key={Math.random()} style={{ marginLeft: 35 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text numberOfLines={1} style={{ color: '#666', fontFamily: 'Inter Regular', flex: 1, marginRight: 10 }}>{ item }</Text>
                      <Text style={{ color: '#666', fontFamily: 'Inter Regular' }}>R$  { parseFloat(itemPrice * quantity).toFixed(2).replace('.', ',') }</Text>
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
          <Text style={{ flex: 1, fontSize: 17, fontFamily: 'Inter Medium' }}>Total</Text>
          <Text style={{ fontSize: 17, fontFamily: 'Inter Medium' }}>
            {
              'R$ ' + products.reduce((total, { finalPrice }) => total += parseFloat(finalPrice), 0).toFixed(2).toString().replace('.', ',')
            }  
          </Text>      
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  verticalLine: {
    backgroundColor: '#555',
    width: 2,
    height: '100%',
    position: 'absolute',
    marginLeft: 34,
    marginTop: 20,
  },
  verticalWrap: {
    justifyContent: 'space-between',
    height: '100%',
  },
  itemWrap: {
    height: 40,
    marginLeft: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointWrap: {
    backgroundColor: 'black',
    height: 20,
    width: 20,
    marginLeft: 5,
    alignItems: 'center',
  },
  otherPoint: {
    backgroundColor: '#555',
    borderRadius: 20,
    height: 10,
    width: 10,
    marginLeft: 10,
  },
  firstPoint: {
    borderRadius: 20,
    height: 15,
    width: 15,
    marginLeft: 8.5,
  },
  markerText: { color: 'white' },
  currentMarker: { fontSize: 20, fontFamily: 'Inter SemiBold' },
  disabledMarker: { fontFamily: 'Inter Regular' }
});

export default OrderItem;