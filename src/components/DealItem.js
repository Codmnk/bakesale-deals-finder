import React from 'react';
import PropTypes from 'prop-types';
import  {View, Text, FlatList, TouchableOpacity, Image, StyleSheet} from 'react-native';

import { priceDisplay }  from '../utli'

class DealItem extends React.Component{
    static propTypes = {
        deal: PropTypes.object.isRequired,
        onPress: PropTypes.func.isRequired,
    }
    handlePress = () => {
        //render a dealdetail view
        this.props.onPress(this.props.deal.key)
    }
    render(){ 
        const { deal } = this.props
        return (
            <TouchableOpacity 
                style={styles.deal}
                onPress={this.handlePress}
                >
                <Image
                    source={{ uri: deal.media[0] }}
                    style={styles.image}
                />
                <View>
                    <Text style={styles.title}>{deal.title}</Text>
                    <View style={styles.footer}>
                        <Text>{priceDisplay(deal.price)}</Text>
                        <Text>{deal.cause.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    deal: {
        flex: 1,
        margin: 10,
        backgroundColor: '#eee'
    },

  image: {
      width: '100%',
      height: 150
    },

    title: {
    fontWeight: 'bold',
    fontSize: 20
    },

    footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5

    }
})
export default DealItem