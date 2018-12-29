import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';

class Card extends React.Component {
  render() {
    return (
      <View style={styles.card}>
        <Text>
          {this.props.joke}
        </Text>
      </View>
    )
  }
}

class NoMoreCards extends React.Component {
  render() {
    return (
      <View>
        <Text>
          No jokes to show
        </Text>
      </View>
    )
  }
}

export default class CardSwipe extends React.Component {

  handleAccept() {
    console.log('I like this joke')
  }

  handleReject() {
    console.log('I dont like this joke')
  }

  cardRemoved(index) {
    if (index+1 == this.props.jokes.length) {
      this.props.updateJokes([{joke:"No more jokes"}]);
    }
  }

  render() {
    return (
      <SwipeCards
        cards={this.props.jokes}
        renderCard={(jokeObject) => <Card joke={jokeObject.joke} />}
        renderNoMoreCards={() => <NoMoreCards />}
        handleYup={this.handleAccept}
        handleNope={this.handleReject}
        cardRemoved={this.cardRemoved.bind(this)}
      />
    )
  }
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 300,
    borderRadius: 10,
    borderColor: '#ea394b',
    borderWidth: 2,
    backgroundColor: '#04b1ff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
