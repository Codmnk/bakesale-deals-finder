import React from 'react';
import PropTypes from 'prop-types';
import {
   View, 
   Text,
   Image, 
   ScrollView,
   Dimensions, 
   PanResponder, 
   TouchableOpacity, 
   Animated,
  Button,
  Linking,
  StyleSheet 
} from 'react-native';

import { priceDisplay } from '../utli'
import ajax from '../ajax'

class DealDetail extends React.Component {

  imageXPos = new Animated.Value(0)

  imagePanResponder = PanResponder.create({

    onStartShouldSetPanResponder: (evt, gs)=> true,

    onPanResponderMove: (evt, gs) => {
      this.imageXPos.setValue(gs.dx)
    },
    
    onPanResponderRelease: (evt, gs) => {
      this.width = Dimensions.get('window').width
      if(Math.abs(gs.dx) > this.width * 0.4){
        const direction = Math.sign(gs.dx)

        Animated.timing(this.imageXPos, {
          toValue: direction * this.width,
          duration: 100
        }).start(()=> this.handleSwipe( -1 * direction))

      }else{
        Animated.spring(this.imageXPos, {
          toValue: 0
        }).start()
      }
    }
  });
  
  handleSwipe = (indexDirection) => {
    if(!this.state.deal.media[this.state.imageIndex + indexDirection]){
      Animated.spring(this.imageXPos, {
        toValue: 0
      }).start()

      return;
    };

    this.setState((prevState) =>({
      imageIndex: prevState.imageIndex + indexDirection
    }), ()=>{
      this.imageXPos.setValue(indexDirection * this.width)
      Animated.spring(this.imageXPos, {
        toValue: 0,
      }).start()
    })
  }
    static propTypes = {
        initialDealData: PropTypes.object.isRequired,
        onBack: PropTypes.func.isRequired
    }

    state = {
        deal: this.props.initialDealData,
        imageIndex: 0
    }

    async componentDidMount() {
        const fullDeal = await ajax.fetchDealDeals(this.state.deal.key)
        // console.log(fullDeal)
        this.setState({
            deal: fullDeal
        })
    }

    openDealURL = () => {
      Linking.openURL(this.state.deal.url)
    }
    
    render() {
        const { deal } = this.state;
    return (
        <ScrollView>
        <TouchableOpacity 
        onPress={this.props.onBack}
        style={styles.onBack}
        >
            <Text>Back</Text>
        </TouchableOpacity>
      <View  style={styles.deal}>
        <Animated.Image 
        {...this.imagePanResponder.panHandlers}
        source={{ uri: deal.media[this.state.imageIndex]  }} 
        style={[{ left: this.imageXPos }, styles.image]} 
        />
        <View style={styles.detail}>
          <View>
            <Text style={styles.title}>{deal.title}</Text>
          </View>
          <View style={styles.footer}>
            <View style={styles.info}>
              <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
              <Text style={styles.cause}>{deal.cause.name}</Text>
            </View>
            {deal.user && (
              <View style={styles.user}>
                <Image source={{ uri: deal.user.avatar }} style={styles.avatar} />
                <Text>{deal.user.name}</Text>
              </View>
            )}
          </View>
          <View style={styles.description}>
            <Text>{deal.description}</Text>
          </View>
          
          <Button title='Buy this deal!' onPress={this.openDealURL} />
        </View>
      </View>
      </ScrollView>
    );
  }
}
        
const styles = StyleSheet.create({
    onBack: {
        height: 25,
        padding: 5,
        width: '100%',
        marginBottom: 5,
    },
                    deal: { 
                marginTop: 10,
                borderColor: '#bbb', 
              },
      image: {
                    width: '100%',
                height: 150,
                backgroundColor: '#ccc',
              },
      deal: {
        marginBottom: 15
                },
      title: {
                    fontSize: 16,
                padding: 10,
                fontWeight: 'bold',
                backgroundColor: 'rgba(237, 149, 45, 0.4)',
              },
      footer: {
                    flexDirection: 'row',
                justifyContent: 'space-around',
                // alignItems: 'center',
                marginTop: 15,
              },
      info: {
                    alignItems: 'center',
              },
      user: {
                    alignItems: 'center',
              },
      cause: {
                    marginVertical: 10,
              },
      price: {
                    fontWeight: 'bold'
              },
      avatar: {
                    width: 60,
                height: 60,
                borderRadius: 30,
              },
      description: {
                    borderColor: '#ddd',
                borderWidth: 1,
                borderStyle: 'dotted',
                margin: 10,
                padding: 10,
              },
              
            });
export default DealDetail