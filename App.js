import React, {useState} from "react";
import { Alert, Button, TextInput, View, StyleSheet, Image, TouchableOpacity,Text } from 'react-native';
import AppLoading from "expo-app-loading";
import { useFonts } from '@use-expo/font';
import { Asset } from "expo-asset";
import { Block, GalioProvider } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";

// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";
enableScreens();

import Screens from "./navigation/Screens";
import { Images, articles, argonTheme } from "./constants";

// cache app images
const assetImages = [
  Images.Onboarding,
  Images.LogoOnboarding,
  Images.Logo,
  Images.Pro,
  Images.ArgonLogo,
  Images.iOSLogo,
  Images.androidLogo
];

// cache product images
articles.map(article => assetImages.push(article.image));

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

  function _loadResourcesAsync() {
    return Promise.all([...cacheImages(assetImages)]);
  }

  function _handleLoadingError(error) {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

 function _handleFinishLoading() {
    setLoading(true);
  };

 export default class App extends React.Component {
   
   constructor(props) {
    super(props);
	
	console.log(props)
	
	 
    this.state = {
     isLoadingComplete: false,
	 isLoginButton: false,
	 isLogIn:false,
	 username: '',
     password: '',
   };
	
	
  }
  
   onLogin = (username, password) => {
	
	var isLogInVar = false;
	
    if(username == "Admin" && password == "123" ){
		isLogInVar = true;		
		this.setState({isLogIn: isLogInVar})
	}else{
		isLogInVar = false;
	}
	
			
  }
  
  
  handleUsername = (text) => {
      this.setState({ username: text })
  }
  
  
  handlePassword = (text) => {
      this.setState({ password: text })
  }
  
   render() {
	 

      
	   
	   
     if (!this.state.isLoadingComplete) {
       return (
         <AppLoading
           startAsync={this._loadResourcesAsync}
           onError={this._handleLoadingError}
           onFinish={this._handleFinishLoading}
         />
       );
	 } else if(!this.state.isLogIn ){
		 return (
		<View style={styles.container}>
		
		
		
        <Image style={styles.logo} source={require("./assets/logo_agence.png")}/>
        <TextInput
          value={this.state.username}
          onChangeText={this.handleUsername}
          placeholder={'Username'}
          style={styles.buttonTextStyle}
        />
        <TextInput
          value={this.state.password}
          onChangeText={this.handlePassword}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.buttonTextStyle}
        />
		
	
        <Button
          title={'Login'}
          style={styles.input}
		  onPress={() => this.onLogin(this.state.username, this.state.password)}
		  
        />
		<Button
          title={'Olvidé mi contraseña'}
          style={styles.input}
          //onPress={this.onLogin()}
        />
		
		<TouchableOpacity
          style={styles.buttonFacebookStyle}
          activeOpacity={0.5}>
          <Image
            source={require("./assets/logo_facebook.png")}			
            style={styles.buttonImageIconStyle}
          />
          <View style={styles.buttonIconSeparatorStyle} />
          <Text style={styles.buttonTextStyleSpecial}>Login Using Facebook</Text>
        </TouchableOpacity>
		
		<TouchableOpacity
          style={styles.buttonGoogleStyle}
          activeOpacity={0.5}
		  
          >
          <Image
            source={require("./assets/logo_google.png")}			
            style={styles.buttonImageIconStyle}						
          />
          <View style={styles.buttonIconSeparatorStyle} />
          <Text style={styles.buttonTextStyleSpecial} //onPress={}
		  >Login Using Google</Text>
		  
        </TouchableOpacity>
		</View>
      
		 );
     } else {
       return (
         <NavigationContainer>
           <GalioProvider theme={argonTheme}>
             <Block flex>
               <Screens />
             </Block>
           </GalioProvider>
         </NavigationContainer>
       );
     }
   }

   _loadResourcesAsync = async () => {
     return Promise.all([...cacheImages(assetImages)]);
   };

   _handleLoadingError = error => {
     // In this case, you might want to report the error to your error
     // reporting service, for example Sentry
     console.warn(error);
   };

   _handleFinishLoading = () => {
     this.setState({ isLoadingComplete: true });
   };
 }
 
 
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
	
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
	borderRadius: 5,
  },
  logo: {
    height: 128,
    width: 128,
  },
  logogoogle: {
    backgroundColor: "#056ecf",
    height: 128,
    width: 128,
  },
  logofacebook: {
    backgroundColor: "#056ecf",
    height: 128,
    width: 128,
  },
  buttonFacebookStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#485a96',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    borderRadius: 5,
    margin: 5,
  },
  buttonGoogleStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    borderRadius: 5,
    margin: 5,
  },
  buttonImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
  buttonTextStyleSpecial: {
    color: '#fff',
    marginBottom: 4,
    marginLeft: 10,
  },
  buttonTextStyle: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
	borderRadius: 5,
  },
  buttonIconSeparatorStyle: {
    backgroundColor: '#fff',
    width: 1,
    height: 40,
  },
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 50,
    height: 50
  }
});

