import React from 'react';
import {Redirect} from 'react-router-dom';


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
            console.log('almost redirect!');
            return <Redirect to='/' />;
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


function postQtyChange(action, id, thisComp) {
    let item;
    let data;
    const endpoint = `http://127.0.0.1:8000/api/order-item-detail/${id}/`;
    switch (action){
        case 'ADD':
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
                    let lookupOptionsPOST = {
                        method: 'PUT',
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
                            thisComp.componentDidMount()
                        }
                    )
                }
            )
            break;
        case 'REMOVE':
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
                        method: 'PUT',
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
                            thisComp.componentDidMount()
                        }
                    )
                }
            )
            break;
        case 'DELETE':
            let lookupOptionsDEL = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            fetch(endpoint, lookupOptionsDEL).then(
                function(){
                    thisComp.componentDidMount()
                }
            )
        default:
            thisComp.componentDidMount()
    }
}


function addOrEditProduct(order_id, product_id, thisComp) {
    const endpoint = `http://127.0.0.1:8000/api/order-item-list?product_related=${product_id}&order_related=${order_id}`;
    const lookupOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch(endpoint, lookupOptions).then(
        function(response){
            return response.json()
        }
    ).then(function(responseData){
        let data = {}
        if (responseData.length > 0){
            console.log('edit product', responseData)
            data = {
                id: responseData[0].id,
                product_related: responseData[0].product_related,
                order_related: responseData[0].order_related,
                qty: responseData[0].qty + 1
            }
            console.log('edit product data', data)
            let lookupOptionsPUT = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
            fetch(`http://127.0.0.1:8000/api/order-item-detail/${responseData[0].id}/`, lookupOptionsPUT).then(
                function(response){
                    return response.json()
                }
            ).then(function(responseData){thisComp.componentDidMount()})
        } else {
            console.log('new product');
            const data_ = {
                product_related: product_id,
                order_related: order_id,
                qty: 1
            };
            let lookupOptionsPOST = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data_)
            };
            fetch('http://127.0.0.1:8000/api/order-item-list', lookupOptionsPOST).then(
                function(response){
                    return response.json()
                }
            ).then(function(responseData){
                console.log(thisComp.componentDidMount())
            })
        }
    })
}

export {fetchData, postData, postQtyChange, putData, addOrEditProduct}