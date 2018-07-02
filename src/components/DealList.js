
import React from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList
} from 'react-native';
import PropTypes from 'prop-types';
import DealItem from './DealItem';

class DealList extends React.Component {
    static propTypes = {
        deals: PropTypes.array.isRequired,
        onItemPress: PropTypes.func.isRequired,
    };

    render() {
        return (
            <View style={styles.lists}>

                <FlatList
                    data={this.props.deals}
                    renderItem={({ item }) => (
                    <DealItem deal={item} onPress={this.props.onItemPress}/>
                    )}
                />
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    //     listView: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#F5FCFF',
    //   },

    lists: {
        backgroundColor: '#ccc', 
        width: '100%', 
    }
});


export default DealList;