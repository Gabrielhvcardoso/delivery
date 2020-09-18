import React from 'react';
import { ScrollView, View, Image } from 'react-native';

const HorinzontalList = ({ style = {}, images, size = 'sm' }) => {
  if (!images) {
    images = [
      'https://julestillman.com/wp-content/uploads/2016/10/10Jesse.jpg',
      'https://i.pinimg.com/originals/c3/1f/f4/c31ff4ad7db82309dc8f1e3e201b22d6.jpg',
      'https://i.pinimg.com/originals/30/96/18/309618745caa0dc7699db22c1052da4b.jpg',
      'https://i.pinimg.com/originals/8b/45/8c/8b458c60804e58c26b09cf1f4253eb29.jpg',
      'https://i.pinimg.com/originals/d2/ef/dd/d2efdd565077907df353951b49cfebec.jpg',
      'https://cdn.shopify.com/s/files/1/1257/2887/products/12c29b93ebc1c5893e159beca0a4f32a_grande.jpg?v=1478206847',
      'https://cdn.shopify.com/s/files/1/1257/2887/products/c8050bee51353be05b32402be75f660d_grande.jpg?v=1478206979',
      'https://cdn.shopify.com/s/files/1/1257/2887/products/bf13d58aee79079797e5b4e1c99fe207_grande.jpg?v=1478206737',
    ];
  }
  
  return (
    <ScrollView
      style={style ? style : {}}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ padding: 15 }}
    >
      {
        images.map(item => (
          <View key={Math.random() * Math.random()} style={{ marginHorizontal: 5 }}>
            <Image
              style={{ width: 120, height: 120, borderRadius: 12 }}
              source={{ uri: item }}
            />
          </View>
        ))
      }
    </ScrollView>
  );
}

export default HorinzontalList;
