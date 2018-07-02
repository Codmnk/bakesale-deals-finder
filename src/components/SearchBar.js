import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'

import { Text, TextInput, StyleSheet } from 'react-native'

class SearchBar extends React.Component{

    static propTypes = {
        searchDeals: PropTypes.func.isRequired,
        initialSearchTerm: PropTypes.string.isRequired,
    }

    state = {
        searchTerm : this.props.initialSearchTerm,
    };

    searchDeals = (searchTerm) => {
        this.props.searchDeals(searchTerm) 
        //blur the text inpute
        this.inputElement.blur();
    };


    debouncedSearchDeals = debounce(this.searchDeals, 300)
    handleChange = (searchTerm) => {
        this.setState({searchTerm}, ()=>{
            this.debouncedSearchDeals(this.state.searchTerm)
        })
    }
    render(){
        return (
            <TextInput
                ref={(inputElement) => { this.inputElement = inputElement; }}
                value={this.state.searchTerm}
                style={styles.input}
                placeholder='Searcha a Deals ...'
                onChangeText={this.handleChange}
            />
        )
    }

}

const styles = StyleSheet.create({
    input: {
        height: 40,
        marginHorizontal: 12,
        
    }
})

export default SearchBar;
