function fetchData(endpoint) {
    let responseData_ = undefined
    let lookupOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return fetch(endpoint, lookupOptions).then(
        function(response) {
            return response.json()
        }
    ).then(function(responseData) {
        console.log('inside', responseData)
        return  responseData
        
    })
    
    
}


export default fetchData;