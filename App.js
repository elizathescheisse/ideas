import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Input from './Components/Input/Input';
import CardSwipe from './Components/CardSwipe/CardSwipe';
import { f, auth, database } from './config/config.js';

export default class App extends React.Component {

  state = {
    value: '5',
    jokes: []
  }

  constructor(props) {
    super(props);
    this.registerUser('testemailaddress@gmail.com', 'fakepassword');
  }

  registerUser = (email, password) => {
    console.log(email, password);
    auth.createUserWithEmailAndPassword(email, password)
    .then((userObj) => console.log(email, password, userObj))
    .catch((err) => console.log('error logging in: ', err));
  }

  render() {
    return (
      <View style = {styles.container}>
        <Input
          updateJokes={(jokes) => this.setState({ jokes: jokes })}
          value = {this.state.value}
          onChange = {(value) => this.setState({ value: value })}
          jokes = {this.state.jokes}
        />

        <CardSwipe
          updateJokes={(jokes) => this.setState({ jokes: jokes })}
          jokes = {this.state.jokes}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 100,
    height: 50
  }
});
