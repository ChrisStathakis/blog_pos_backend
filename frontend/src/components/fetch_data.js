
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

function putData(endpoint, data) {
    let lookupOptions = {
        method: 'PUT',
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
                [state]: responseData
            })

        }
    )
}



function postQtyChange(action, id) {
    let item;
    let data;
    const endpoint = `http://127.0.0.1:8000/api/order-item-detail/${id}/`;
    switch (action){
        case 'add':
            let lookupOptionsGET = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            fetch(endpoint, lookupOptionsGET).then(
                function(response) {
                    return response.json()
                }
            ).then(
                function(responseData) {
                    item = responseData;
                    data = {
                        id: item.id,
                        product_related: item.product_related,
                        order_related: item.order_related,
                        qty: item.qty + 1
                    };
                    console.log('get data from', data);
                    let lookupOptionsPOST = {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                      };
                    fetch(endpoint, lookupOptionsPOST).then(
                        function(response){
                            return response.json()
                        }
                    ).then(
                        function(responseData){
                            console.log(responseData)
                        }
                    )
                }
            )
            break;
        case 'remove':
            let lookupOptionsGET_ = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            fetch(endpoint, lookupOptionsGET_).then(
                function(response) {
                    return response.json()
                }
            ).then(
                function(responseData) {
                    item = responseData
                    data = {
                        id: item.id,
                        product_related: item.product_related,
                        order_related: item.order_related,
                        qty: parseInt(item.qty) - 1
                    }
                    let lookupOptionsPOST = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                
                    }
                    fetch(endpoint, lookupOptionsPOST).then(
                        function(response){
                            return response.json()
                        }
                    ).then(
                        function(responseData){
                            console.log(responseData)
                        }
                    )
                }
            )
            break;
        default:
            console.log('default')
    }
}


export  {fetchData, postData, postQtyChange, putData}