
function postData(endpoint, data) {
    let lookupOptions = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data) 
    };
    fetch(endpoint, lookupOptions).then(
        function(response) {
            return response.json()
        }
    ).then(
        function(responseData) {
            console.log(responseData)
        }
    )
}

function fetchData(endpoint, thisComp, state) {
    let lookupOptions = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch(endpoint, lookupOptions).then(
      function (response) {
          return response.json()
      }
    ).then(
        function (responseData) {
            thisComp.setState({
                state: responseData
            })
        }
    )
}

export  {fetchData, postData}