const apiHost = 'https:/bakesaleforgood.com'
export default {
    async fetchInitialDeals(){
        try{
            let response = await fetch(apiHost + '/api/deals')
            let responseJson = await response.json()
            return responseJson
        }catch(error){
            console.log(error)
        }
    },

    async fetchDealDeals(dealId){
        try{
            let response = await fetch(apiHost + '/api/deals/' + dealId)
            let responseJson = await response.json()
            return responseJson
        }catch(error){
            console.log(error)
        }
    },

    
    async fetchDealSearchResults(searchTerm){
        try{
            let response = await fetch(apiHost + '/api/deals?searchTerm=' + searchTerm)
            let responseJson = await response.json()
            return responseJson
        }catch(error){
            console.log(error)
        }
    }

}
