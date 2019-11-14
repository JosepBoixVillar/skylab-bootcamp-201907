import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
// import './index.sass'

import logic from '../../logic'
import Feedback from '../Feedback'

function ShowAllOrdersUser() {
    // const [user] = useState()
    const [orders, setOrders] = useState()
    const [error, setError] = useState()

    let total = 0
  
    useEffect(() => {
        ( async ()=> {
            try {
                const orders = await logic.showAllOrders()
                setOrders(orders)

                // if(!orderId) {
                // setOrders(undefined)      
                // }
                // setOrders(orderId)      
                // setError(undefined)                 
                // console.log('is order? '+ orderId)
            } catch(error) {
                setError(error.message)
            }
        })()
    }, [])

    // async function handleUpdateOrders(orderId) {
    //     try {
    //       await logic.removeCart(orderId)
    //     } catch (error) {
    //       setError(error.message)
    //     }
    // }

    return <>
        <div>
        <h4>YOUR ORDERS:</h4>

        {orders &&
            <ul>
                {orders.map(item=> {
                    return<>
                        <ul className='orders'>
                            <a className="ancor">X</a>
                            <label className="orders-label">Order day:
                            <li className="">{ item.date.slice(0,10)+ ' / Hour ' + item.date.slice(11,20) }</li></label>
                            <label className="orders-label">ITEMS:</label>
                            <ul className='orders'>
                                { item.items.map(prod => {
                                    return<>
                                    <li>{ "Product: " + prod.product.title }</li>
                                    <li>{ "Quantity: " + prod.quantity }</li>
                                    <li>{ "Price: " + prod.product.price }</li>
                                    <hr></hr>
                                    <li className="">{ "Total Order: " + (prod.quantity * prod.product.price) + " €" }</li>
                                    <hr></hr>
                                    <hr></hr>
                                    </>
                                })}
                            </ul>

                            <li className="userCart-hidden">{ item.items.map(prod => 'Total: ' + (total += (prod.product.price * prod.quantity)) + " €") }</li>  
                            <p>{ "Total: " + total + " €" }</p>
                            <p className="userCart-hidden">{ total = 0 }</p>
                        </ul>
                    </>
                })} 

            </ul> 
        }     
        </div>

        <div className="productList">
            <a className="ancor" href="/#/home">Go home</a>
        </div>
                
        {error !== undefined && <Feedback message={error} />} 

    </>
}

export default withRouter(ShowAllOrdersUser)