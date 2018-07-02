/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  Dimensions
} from 'react-native';
import ajax from './src/ajax';
import DealList from './src/components/DealList'
import DealDetail from './src/components/DealDetail';
import SearchBar from './src/components/SearchBar';

 
class App extends React.Component {

  titleXPos = new Animated.Value(0)
  state = {
    deals : [],
    dealsFromSearch: [],
    currentdealId: null,
    activeSearchTearm: ''
  }

  animatedTitle = (direction = 1) =>{
    const width = Dimensions.get('window').width - 100
    Animated.timing(
      this.titleXPos,
      {
        toValue: direction * (width/2), 
        duration: 1000,
       easing: Easing.linear,
      }
    ).start(({ finished })=>{
      if(finished){
        this.animatedTitle( -1 * direction)
      }
    });
  }
  async componentDidMount(){
    this.animatedTitle()

    const deals = await ajax.fetchInitialDeals()
    this.setState({ deals }) 
  }

  setCurrentDeal = (dealId) =>{
    this.setState({
      currentDealId: dealId
    })
    
  };

   searchDeals = async(searchTerms) => {
    let dealsFromSearch = []
    if(searchTerms){
       dealsFromSearch = await ajax.fetchDealSearchResults(searchTerms)
    } 
    this.setState({ dealsFromSearch, activeSearchTearm: searchTerms })
  };

  unsetCurrentDeal = () =>{
    this.setState({
      currentDealId: null
    })
    
  }
   currentDeal = () =>{
     return this.state.deals.find((deal)=> deal.key === this.state.currentDealId)
   }
  render() {
    if(this.state.currentDealId){
      return ( 
            <DealDetail 
             initialDealData={this.currentDeal()} 
             onBack={this.unsetCurrentDeal}
      />
    )
    }
    const dealsToDisplay = 
      this.state.dealsFromSearch.length > 0 
      ? this.state.dealsFromSearch 
      : this.state.deals;

    if(dealsToDisplay.length > 0){
      return   (
        <View>
          <SearchBar 
          searchDeals={this.searchDeals} 
          initialSearchTerm={this.state.activeSearchTearm}
          />
          <DealList deals={dealsToDisplay} onItemPress={this.setCurrentDeal} />
        </View>
        )
    }
    return (
      <Animated.View style={[{left: this.titleXPos }, styles.container]}> 
          <Text style={styles.header}> Deals.. </Text>
      </Animated.View>
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
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  lists: {
    backgroundColor: '#eee',
    flex: 1,
  }
});


export default App;