import React, { createRef, useEffect, useLayoutEffect, useState } from 'react';
import MapView from 'react-native-maps';
import { View, StyleSheet, TouchableOpacity, Dimensions, Image, StatusBar, TextInput, Text, Alert, YellowBox } from 'react-native';

import * as Location from 'expo-location';

import { HeaderBackButton } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import mapStyle from './mapStyle.json';
import { Icon } from 'react-native-elements';
const markerImage = { uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/512px-Map_marker.svg.png' };

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);

const AndressSelector = ({ navigation, route }) => {
  const [location, setLocation] = useState(null);
  const [andress, setAndress] = useState('');
  const [finalAndress, setFinalAndress] = useState('');
  const [possibleAndress, setPossibleAndress] = useState('');
  const [isLookingGPS, setIsLookingGPS] = useState(false);

  const textInputRef = createRef();

  // Get Actual Position
  const getActualPosition = async () => {
    let { status } = await Location.requestPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Erro', 
        'É necessário conceder permissão para que o aplicativo possa acessar sua localização.',
        [{ text: 'Ok' }],
      );
    } else {
      setIsLookingGPS(true);
    }

    let loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
    setIsLookingGPS(false);
  }

  useEffect(() => {
    if (location === null) {
      getActualPosition();
    }
  });


  // Text Input Auto Complete
  const handleSearchPlace = async (text) => {
    setAndress(text);
    
    if (!textInputRef.current.isFocused()) {
      return;
    }
    
    const locationObj = await Location.geocodeAsync(text);

    if (locationObj[0]) {
      const andressObj = (await Location.reverseGeocodeAsync(locationObj[0]))[0];
      const andressStr = `${andressObj.street ?? 'Rua desconhecida'}, ${andressObj.region}`
      setPossibleAndress(andressStr)
    } else {
      setPossibleAndress(null)
    }
  }

  // On select andress search by coordinates
  const handleEndEditting =  async () => {
    setPossibleAndress('');
    if (!textInputRef.current?.isFocused()) {
      const locationObj = await Location.geocodeAsync(finalAndress);
      if (locationObj[0]) {
        setLocation(locationObj[0])
      }  
    }
  }

  // set andress text on set map position
  const [processing, setProcessing] = useState(false);

  useLayoutEffect(() => {
    const getAndress = async () => {
      if (location) {
        const andressObj = (await Location.reverseGeocodeAsync(location))[0];
        const andressStr = `${andressObj.street ?? 'Rua desconhecida'}, ${andressObj.name}`;
        
        if (processing) {
          setAndress(andressStr);
          setFinalAndress(andressStr);
        }
      }

      setTimeout(() => {
        setProcessing(false);        
      }, 1000);
    }
    
    setProcessing(true);
    getAndress();
  }, [location]);

  navigation.setOptions({
    headerLeft: () => (
      <HeaderBackButton
        style={styles.headerButton}
        onPress={() => {
          const goBack = route.params?.goBack ? route.params.goBack : () => {};

          navigation.goBack();
          goBack();
        }}
      />
    ),
  });


  const onRegionChange = (event) => {
    if (processing) {
      return;
    } else {
      setLocation(event);
      setProcessing(true);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {
        location ? (
          <>
            <MapView
              style={styles.mapStyle}
              onRegionChangeComplete={onRegionChange}
              customMapStyle={mapStyle}
              region={location.latitudeDelta ? location : {...location, latitudeDelta: 0.01, longitudeDelta: 0.01 }}
            />

            <View pointerEvents="none" style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}>
              <Image
                pointerEvents="none"
                source={markerImage}
                style={{ width: 40, height: 40, resizeMode: 'contain' }}
              />
            </View>

            <TouchableOpacity
              style={styles.floatingbutton}
              activeOpacity={0.8}
              onPress={getActualPosition}
            >
              {
                isLookingGPS ? (
                  <Icon name="crosshairs-gps" type="material-community" color="#0088ff" />
                ) : (
                  <Icon name="crosshairs-gps" type="material-community" />
                )
              }
            </TouchableOpacity>
          </>
        ) : <></>
      }
      <SafeAreaView style={styles.safetextinput}>
        <TextInput
          clearTextOnFocus
          ref={textInputRef}
          value={andress}
          onChangeText={handleSearchPlace}
          onEndEditing={handleEndEditting}
          returnKeyLabel="search"
          returnKeyType="search"
          style={styles.textinput}
        />      
      </SafeAreaView>

      {
        possibleAndress ? (
          <TouchableOpacity style={styles.sugestion} onPress={() => {
            setAndress(possibleAndress);
            setFinalAndress(possibleAndress);
            setPossibleAndress('');
            textInputRef.current.blur();
          }}>
            <Text numberOfLines={1} style={{ fontSize: 18 }}>
              { possibleAndress }
            </Text>
          </TouchableOpacity>
        ) : <></>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBE3CD',
    alignItems: 'center',
    justifyContent: 'center'
  },

  mapStyle: {
    height: Dimensions.get('window').height + StatusBar.currentHeight,
    width: Dimensions.get('window').width
  },

  headerButton: {
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#fff',
    elevation: 10,
    height: 50,
    justifyContent: 'center',
    top: 10,
    width: 50,
    borderRadius: 25
  },

  safetextinput: {
    position: 'absolute',
    left: 70,
    top: 13,
  },

  textinput: {
    backgroundColor: '#fff',
    borderRadius: 25,
    elevation: 10,
    fontSize: 18,
    height: 50,
    paddingHorizontal: 15,
    width: Dimensions.get('window').width - 80,
  },

  sugestion: {
    backgroundColor: 'white',
    borderRadius: 25,
    elevation: 10,
    padding: 25,
    position: 'absolute',
    top: 100,
    width: Dimensions.get('window').width - 20,
  },

  floatingbutton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    bottom: 20,
    elevation: 10,
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    width: 50,
  }
})

export default AndressSelector;
