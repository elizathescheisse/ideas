import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput } from 'react-native';
import Input from './Components/Input/Input';
import CardSwipe from './Components/CardSwipe/CardSwipe';
import { f, auth, database } from './config/config.js';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    // this.registerUser('testemail@gmail.com', 'fakepassword');

    this.state = {
      value: '5',
      jokes: [],
      loggedin: false
    };

    var that = this;

    f.auth().onAuthStateChanged(function(user) {
      if(user) {
        that.setState({
          loggedin: true
        });
        console.log('Logged in', user);
      }
      else {
        that.setState({
          loggedin: false
        });
        console.log('Logged out');
      }
    });
  }

  loginUser = async(email, pass) => {
    if(email != '' && pass != '') {
      try {
        let user = await auth.signInWithEmailAndPassword(email, pass);
        console.log(user);
      } catch(err) {
        console.log(error);
      }
    } else {
      alert('Missing email or password');
    }
  }

  registerUser = (email, password) => {
    console.log(email, password);
    // this createUser also logs the user in
    auth.createUserWithEmailAndPassword(email, password)
    .then((userObj) => console.log(email, password, userObj))
    .catch((err) => console.log('error logging in: ', err));
  }

  signUserOut = () => {
    auth.signOut()
    .then(() => {
      console.log('Logged out...')
    }).catch((err) => {
      console.log('Error: ', err);
    });
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

        { this.state.loggedin == true ? (
          <View>
            <TouchableHighlight
            onPress={ () => this.signUserOut() }
            style={{backgroundColor: 'red'}}>
              <Text>Log Out</Text>
            </TouchableHighlight>
            <Text>Logged in!!!</Text>
          </View>
        ) : (
          <View>
            { this.state.emailloginView == true ? (
              <View>
                <Text>Email: </Text>
                <TextInput
                  onChangeText={(text) => this.setState({email: text})}
                  value={this.state.email}
                />

                <Text>Password: </Text>
                <TextInput
                  onChangeText={(text) => this.setState({pass: text})}
                  secureTextEntry={true}
                  value={this.state.pass}
                />

                <TouchableHighlight
                  onPress={ () => this.loginUser(this.state.email, this.state.pass) }
                  style={{backgroundColor: 'blue'}}>
                    <Text>Login</Text>
                </TouchableHighlight>

              </View>
            ) : (
              <View></View>
            )}

            <TouchableHighlight
            onPress={() => this.setState({emailloginView: true})}
            style={{backgroundColor: 'green'}}>
              <Text style={{color:'white'}}>Login</Text>
            </TouchableHighlight>

            <Text>Logged out :/</Text>
          </View>
        )}
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
