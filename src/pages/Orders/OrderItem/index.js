import React, { useContext } from 'react';
import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View, Clipboard } from 'react-native';
import { format, addHours, formatDistanceToNow } from 'date-fns';

// 
// Waiting expo support for Async Clipboard API
// See the link below:
//    https://expo.canny.io/feature-requests/p/async-clipboard-api
// 
// import Clipboard from '@react-native-community/clipboard';
// 

import ThemeContext from '../../../context/ThemeContext';
import { ptBR } from 'date-fns/locale';

const OrderItem = ({ order }) => {
  const { main, muted, soft, surface, text } = useContext(ThemeContext);

  const { createdAt, paymentMethod, products, status, identifier } = order;
  const { street, number } = JSON.parse(order.andress);

  const onCopyCodeToClipboard = (code) => {
    Clipboard.setString(code);

    ToastAndroid.showWithGravity(
      "Copiado para área de transferência",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  }

  return (
    <View style={{ backgroundColor: surface, marginTop: 20, borderRadius: 10, overflow: 'hidden' }}>
      {/* <View style={{ backgroundColor: soft, height: 100 }} /> */}

      {/* Details */}

      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontFamily: 'Inter Bold', color: text }}>Detalhes do pedido</Text>
        <Text style={{ fontSize: 17, color: text, fontFamily: 'Inter Regular' }}>
          { format(parseInt(createdAt), 'HH:mm') } ~ { format(addHours(parseInt(createdAt), 1), 'HH:mm') }
        </Text>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 12, color: muted, fontFamily: 'Inter Regular' }}>{ `${street} - ${number}` }</Text>  
          <Text style={{ fontSize: 12, color: muted }}>Há { formatDistanceToNow(parseInt(createdAt), { locale: ptBR }) } - { paymentMethod }</Text>
        </View>

      </View>

      {/* Progress */}

      <View style={{ padding: 10 }}>
        <View style={{ flex: 1 }}>
          <View style={{...styles.verticalLine, backgroundColor: muted }}></View>
          <View style={styles.verticalWrap}>
            <View style={styles.itemWrap}>
              <View style={status === 1 ? {...styles.firstPoint, backgroundColor: main } : styles.otherPoint}></View>
              <View style={{ marginLeft: 5, flex: 1, padding: 10 }}>
                <Text style={status === 1 ? {...styles.currentMarker, color: main } : {...styles.disabledMarker, color: text }}>Aguardando confirmação</Text>
              </View>
            </View>


            <View style={styles.itemWrap}>
              <View style={status === 2 ? {...styles.firstPoint, backgroundColor: main } : styles.otherPoint}></View>
              <View style={{ marginLeft: 5, flex: 1, padding: 10 }}>
                <Text style={status === 2 ? {...styles.currentMarker, color: main } : {...styles.disabledMarker, color: text }}>
                  Seu pedido está sendo preparado
                </Text>
              </View>
            </View>           
          </View>        
        </View>
        <View style={styles.itemWrap}>
        <View style={status === 3 ? {...styles.firstPoint, backgroundColor: main } : styles.otherPoint}></View>
          <View style={{ marginLeft: 5, flex: 1, padding: 10 }}>
            <Text style={status === 3 ? {...styles.currentMarker, color: main } : {...styles.disabledMarker, color: text }}>
              Seu pedido saiu para entrega
            </Text>
          </View>
        </View>
      </View>

      {/* Details */}

      <View style={{ padding: 20 }}>

        {
          products.map(({ quantity, observation, productName, price, finalPrice }, index, array) => (
            <View key={Math.random()} style={{ borderBottomColor: soft, borderBottomWidth: index === array.length - 1 ? 0 : 0.5, paddingVertical: 7 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 17, fontFamily: 'Inter Medium', color: main }}>{ quantity } x</Text>
                <Text numberOfLines={1} style={{ color: text, fontSize: 17, fontFamily: 'Inter Medium', marginHorizontal: 10, flex: 1 }}>{ productName }</Text>
                <Text style={{ color: muted, fontSize: 17, fontFamily: 'Inter Medium' }}>R$ { parseFloat(price * quantity).toFixed(2).replace('.', ',') }</Text>
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

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 12, color: muted, fontFamily: 'Inter Regular' }}>O código único do seu pedido é:</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onLongPress={() => onCopyCodeToClipboard(identifier)}
            style={{ ...styles.codeContainer, backgroundColor: soft.lighten(0.1) }}
          >
            <Text style={{ color: muted, fontFamily: 'Inter Medium', fontSize: 17 }}>
              { identifier }
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  codeContainer: {
    marginTop: 10,
    borderRadius: 8,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
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