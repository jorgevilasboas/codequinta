import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import api from './services/api';

export default class App extends Component {
  state = {
    loggedInUser: null,
    errorMessage: 'err',
    projects: [],
  };


  signIn = async () => {
    try {
      const response = await api.post('/auth/authenticate', {
        email: 'diego@rocketseat.com.br',
        password: '123456',
      });

      const { token, user } = response.data;

      await AsyncStorage.multiSet([
        ['@CodeApi:token', token],
        ['@CodeApi:user', JSON.stringify(user)],
      ]);

      this.setState({ loggedInUser: user });

      Alert.alert('Logado com sucesso!');
    } catch (err) {
      this.setState({ errorMessage: err.data.error });      
    }
  
  
    //response.headers - cabecalho da requisição
    //response.data - dados da requisicao
    //response.ok - Bool que retorna se a requisicao deu certo
}

  render() {
    return (
      <View style={styles.container}>
      {!!this.state.errorMessage && <Text>{this.state.errorMessage}</Text>}
         <Button onPress={this.signIn} title="Entrar"/>
         
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
