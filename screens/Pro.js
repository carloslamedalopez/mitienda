import React, {useEffect} from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform, Linking,ScrollView, Alert, Modal, View, Pressable } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');
import { Images, argonTheme } from '../constants/';
import { HeaderHeight } from "../constants/utils";

import MapView,{Marker} from 'react-native-maps';

import { Card } from '../components';
import articles from '../constants/articles';

import * as Location from 'expo-location';

export default class Pro extends React.Component {
	
  state = {
    modalVisible: false,
	location: "",
	errorMsg: "",
	status: null,
	navigation: null,
  };
  
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }  
  
  
  setLocation = (locationVar) => {
    this.setState({ location: locationVar });
  }

  setErrorMsg = (errorMsgVar) => {
    this.setState({ errorMsg: errorMsgVar });
  }

  setStatus = (statusVar) => {
    this.setState({ status: statusVar });
  }  
  
  
  async componentDidMount() {    
  
      Location.requestPermissionsAsync();
      
	  let statusVar =  await Location.requestBackgroundPermissionsAsync();
	  this.setStatus(statusVar);
	    
	  
	  //Alert.alert("PASS2 " + this.status)
	  
	  
      if (this.status !== 'granted') {
        this.setErrorMsg("");
        //return;
      }

      let location = await Location.getCurrentPositionAsync({});
      this.setLocation(location);
      //Alert.alert("PASS3 " + location)
	  
    
  }
    
  createTwoButtonAlert () {
    this.setModalVisible(false);
	
    Alert.alert(
      "Estatus de la compra",
      "¡Compra realizada correctamente!",
      [        
        { 
		   text: "OK", onPress: () => {
			   console.log("OK Pressed");
			   this.navigation.goBack();
		   }			   
		}
      ]
    );
  }
  
	
  render() {
    
	const { modalVisible } = this.state;
	const { location } = this.state;
	const { errorMsg } = this.state;
	const {navigation} = this.props;
	
	this.navigation = navigation
	
	
	 let textPosition = ".loading";
	  if (errorMsg!="") {
		textPosition = errorMsg;
		
	  } 
	  if (location!="") {
		textPosition = JSON.stringify(location);
	  } 
   

    return (
	
	
	
	<ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
		
		<Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>		    
		      <Text style={styles.modalTextRow}>¿Desea realizar la compra?</Text>		    
            <View style={styles.modalView}>              
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.createTwoButtonAlert()}
              >
			    <Text style={styles.textStyle}>Si</Text>
			  </Pressable>
			  <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>No</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
		
		  
		  
		  
	      <MapView style={styles.map} region={{
                latitude: location.coords==undefined?0:location.coords.latitude,
                longitude: location.coords==undefined?0:location.coords.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            }} >
			<Marker coordinate={{
                latitude: location.coords==undefined?0:location.coords.latitude,
                longitude: location.coords==undefined?0:location.coords.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            }} 
			title="Mi Ubicacion"
            description="Aqui estoy"
			/>
			</MapView>
		     
		  
		  
	      <Block flex >
            <Block flex row>
		      <Card item={ articles[this.props.route.params.itemId] } horizontal  style={{ marginRight: theme.SIZES.BASE }}  />
		    </Block>
		  </Block>
		  <Button
                shadowless
                style={styles.button}
                color={argonTheme.COLORS.INFO}
                //onPress={() => Linking.openURL('https://www.creative-tim.com/product/argon-pro-react-native').catch((err) => console.error('An error occurred', err))}>
				onPress={() => this.setModalVisible(true)}>
                <Text bold color={theme.COLORS.WHITE}>BUY NOW</Text>
              </Button>
	 </ScrollView>	
	/*
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex>
          <ImageBackground
            source={Images.Pro}
            style={{  zIndex: 1 }}
          />
		  
		  <MapView style={styles.map} />
		  
		  /*
          <Block space="between" style={styles.padded}>
            <Block>
              <Block>
                <Image source={Images.ArgonLogo}
                  style={{ marginBottom: theme.SIZES.BASE * 1.5 }}/>
              </Block>
              <Block >
                <Block>
                  <Text color="white" size={60}>Argon</Text>
                </Block>
                <Block>
                  <Text color="white" size={60}>Design</Text>
                </Block>
                <Block row>
                  <Text color="white" size={60}>System</Text>
                  <Block middle style={styles.pro}>
                    <Text size={16} color="white">PRO</Text>
                  </Block>
                </Block>
              </Block>
              <Text size={16} color='rgba(255,255,255,0.6)' style={{ marginTop: 35 }}>
                Take advantage of all the features and screens made upon Galio Design System, coded on React Native for both.
              </Text>
              <Block row style={{ marginTop: theme.SIZES.BASE * 1.5, marginBottom: theme.SIZES.BASE * 4 }}>
                <Image
                  source={Images.iOSLogo}
                  style={{ height: 38, width: 82, marginRight: theme.SIZES.BASE * 1.5 }} />
                <Image
                  source={Images.androidLogo}
                  style={{ height: 38, width: 140 }} />
              </Block>
              <Button
                shadowless
                style={styles.button}
                color={argonTheme.COLORS.INFO}
                onPress={() => Linking.openURL('https://www.creative-tim.com/product/argon-pro-react-native').catch((err) => console.error('An error occurred', err))}>
                <Text bold color={theme.COLORS.WHITE}>BUY NOW</Text>
              </Button>
            </Block>			
          </Block>
        </Block>
      </Block>
	  */
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  pro: {
    backgroundColor: argonTheme.COLORS.INFO,
    paddingHorizontal: 8,
    marginLeft: 3,
    borderRadius: 4,
    height: 22,
    marginTop: 15
  },
  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 66,
  },
  map: {
    width: '100%',
    height: '33%',
  },
   articles: {
    width: '100%',
    height: '100%',
  },
  centeredView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
	flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalViewText: {
	  margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
