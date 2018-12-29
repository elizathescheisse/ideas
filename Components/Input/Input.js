import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableHighlight, Keyboard } from 'react-native';

export default class Input extends React.Component {

  fetchData() {
    // console.log(this.props.value);
    fetch(`http://api.icndb.com/jokes/random/${this.props.value}`)
    .then((response) => { return response.json() })
    .then((data) => this.props.updateJokes(data.value))
    .then(() => console.log(this.props.jokes))
    .done();
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput ref={input => { this.textInput = input }}
          keyboardType = {'numeric'}
          value = {this.props.value}
          style = {styles.input}
          onChangeText = {(text) => this.props.onChange(text)}
        />

        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            this.fetchData();
            Keyboard.dismiss();
            this.textInput.clear()
          }}
        >
          <Text
            style={styles.text}
          >
            Search
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

// flex: 1 = entire screen height
// alignItems = horizontal
// justifyContent = vertical
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 2
  },
  button: {
    backgroundColor: 'blue',
    height: 40,
    width: 100,
    borderColor: 'gray',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white'
  }
})
