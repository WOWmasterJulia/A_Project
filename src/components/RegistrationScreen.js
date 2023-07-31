import React, {useState} from 'react';
import { StyleSheet, ImageBackground, Image, Text, TextInput, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Button, TouchableHighlight, Pressable } from 'react-native';
import Background from '../assets_new/photos/Photo_BG.png';

import { useNavigation } from '@react-navigation/native';



export default function Registration() {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const navigation = useNavigation();
  
  return (
     
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView // визначаємо ОС та налаштовуємо поведінку клавіатури
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          // style={{ flex: 1 }}
        > 
          <ImageBackground source={Background} resizeMode="cover" style={styles.background}> 
        
            <View style={styles.registrationWrap}>
              <Image source={require('../assets_new/photos/Add_Ava.png')} resizeMode="cover" style={styles.image}></Image>
              <Pressable style={styles.buttonAdd}
                onPress={() => navigation.navigate("Text")}>
                <Image source={require('../assets_new/icons/add.png')}style={styles.btnAdd}></Image> 
              </Pressable>
              <Text style={styles.title}>Реєстрація</Text>

              <TextInput style={styles.input} placeholder="Логін"
              value={login}
              onChangeText={setLogin}/>
              <TextInput style={styles.input} placeholder="Адреса електронної пошти"
              value={email}
              onChangeText={setEmail}/> 
              <TextInput style={styles.input} placeholder="Пароль"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}/>        
              <Pressable style={styles.buttonRegistration}
                onPress={() => navigation.navigate("Posts")}>
                <Text style={styles.btnReg}>Зареєстуватися</Text>
              </Pressable>
              <Pressable style={styles.buttonEntrance}
                onPress={() => navigation.navigate("Login")}>
                <Text style={styles.text}>Вже є акаунт? Увійти</Text>
              </Pressable>
              {/* <Button
                    title="Зареєстуватися"
                    fontSize='16'
                    color="#fff"
                    color='#212121'
                    backgroundColor='#FF6C00'
                    borderColor='#E8E8E8'
                    borderRadius='4'
                    borderWidth='1'
              /> */}
              {/* <TouchableHighlight>
              <Text style={styles.text}>Вже є акаунт? Увійти</Text>  
              </TouchableHighlight>     */}
                  {/* <StatusBar style="auto" /> */}
              {/* </KeyboardAvoidingView> */}
            </View>       
          </ImageBackground>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  // backgroundColor: '#fff',
    // alignItems: 'center',
  // justifyContent: 'center',
    // justifyContent: "flex-end",
    // paddingBottom: 30,
   },
  registrationWrap: {
    backgroundColor: '#fff',
    marginTop: 163,
    paddingBottom: 79,
    paddingLeft: 16,
    paddingRight: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'stretch',
    // flexDirection: column,
    
  },
  // background: {
  //   flex: 1,
  //   justifyContent: 'flex-end',
  // },
  image: {
    width: 132,
    marginTop: -60,  
    alignSelf: 'center', 
  },
  title: {
    fontSize: 30,
    color: '#212121',
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 33,
  },
  input: {
    height: 50,
    // color: '#F6F6F6',
    color: '#212121',
    borderColor: '#E8E8E8',
    borderRadius: 6,
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 16,    
  },
  buttonRegistration: {
    backgroundColor: '#FF6C00',
    borderRadius: 100,
    marginTop: 27,
    marginBottom: 16,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,   
  },
  btnReg: {
    fontSize: 16,
    color: "#fff",
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#1B4371',
    textAlign: 'center',
  },
    
});