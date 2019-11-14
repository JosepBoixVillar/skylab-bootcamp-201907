import React, { useEffect, useState } from 'react'
// import { withRouter } from 'react-router-dom'
// import './index.sass'

import logic from '../../logic'
import Feedback from '../Feedback'

function ShowAllOrders() {
    // const [user] = useState()
    const [orders, setOrders] = useState(undefined)
    const [error, setError] = useState(undefined)

    let total = 0
  
    useEffect(() => {
        ( async ()=> {
            try {
                const orders = await logic.showAllOrders()
                setOrders(orders)
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
        <h4>YOUR ORDERS:</h4>

        {!orders &&
            <p>Add our <a href="/home">products</a> to your <a href="/cart">cart</a></p>}

        {orders &&
            <ul>
                {orders.map(item=> {
                    return<>
                        <ul className='ordersPanel'>
                            {/* <div className='yourOrdersPanel__order'> */}
                                <li className="ordersPanel__order--title">Order day:
                                <li className="ordersPanel__order--delete" onClick={event => {
                                    event.preventDefault()
                                    
                                    // let orderId = item.items._id
                                    // handleUpdateOrders(orderId)
                                }}><a href="/"> X </a></li>
                                </li>
                                <li className="yourOrdersPanel__order--time">{ item.date.slice(0,10)+ ' / Hour ' + item.date.slice(11,20) }</li>
                                {/* </li> */}
                            {/* </div> */}
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

                        </ul>
                        
                        <li className="userCart-hidden">{ item.items.map(prod => 'Total: ' + (total += (prod.product.price * prod.quantity)) + " €") }</li>  
                            <p>{ "Total: " + total + " €" }</p>
                        <p className="userCart-hidden">{ total = 0 }</p>
                    </>
                })} 

            </ul> 
        }     

        <div className="productList">
            <a className="ancor" href="/#/home">Go home</a>
        </div>
                
        {error !== undefined && <Feedback message={error} />} 

    </>
}

export default ShowAllOrders