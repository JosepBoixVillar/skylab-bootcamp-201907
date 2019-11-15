import React, { useEffect, useState } from 'react'
// import { withRouter } from 'react-router-dom'
// import './index.sass'

import logic from '../../logic'
import Feedback from '../Feedback'

const REACT_APP_API_PUBLIC = process.env.REACT_APP_API_PUBLIC 

function ShowAllOrders() {
    // const [user] = useState()
    const [orders, setOrders] = useState(undefined)
    const [error, setError] = useState(undefined)

    let total = 0
    let counter = 0
  
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
        <h4 className="ordersPanel__titleOrders">YOUR ORDERS:</h4>

        {!orders &&
            <p>Add our <a href="/home">products</a> to your <a href="/cart">cart</a></p>}

        {orders &&
            <ul>
                {orders.map(item=> {
                    return<>
                        <ul className='ordersPanel'>
                            {/* <div className='yourOrdersPanel__order'> */}
                                <li className="ordersPanel__order--title">Order {counter += 1}
                                <li className="ordersPanel__order--delete" onClick={event => {
                                    event.preventDefault()
                                    
                                    // let orderId = item.items._id
                                    // handleUpdateOrders(orderId)
                                }}><a href="/"> X </a></li>
                                </li>
                                {/* </li> */}
                            {/* </div> */}
                            <label className="orders-label">ITEMS:</label>
                            <li className="ordersPanel__order--time">{ item.date.slice(0,10)+ ' / Hour ' + item.date.slice(11,20) }</li>
                            <ul className='ordersPanel'>
                                { item.items.map(prod => {
                                    return<>
                                    <li className="ordersPanel__order--product">{ "Product: " + prod.product.title }</li>
                                    <div className="ordersPanel__order">
                                        <li className="ordersPanel__order"><img src={ `${REACT_APP_API_PUBLIC}${prod.product.image }`} alt="product_image" width="70"/></li>
                                        <div>
                                            <li className="ordersPanel__order--img">{ "Quantity: " + prod.quantity + " u"}</li>
                                            <li className="ordersPanel__order--img">{ "Price: " + prod.product.price + " €"}</li>
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <li className="ordersPanel__order--ftotal">{ "First total: " + (prod.quantity * prod.product.price) + " €" }</li>
                                    <hr></hr>
                                    </>
                                })}
                            </ul>

                        </ul>
                        
                        <li className="userCart-hidden">{ item.items.map(prod => 'Total: ' + (total += (prod.product.price * prod.quantity)) + " €") }</li>  
                        <p className="ordersPanel__order--total">{ "Total order: " + total + " €" }</p>
                        <p className="userCart-hidden">{ total = 0 }</p>
                        <hr></hr>                       
                        <hr></hr>                       
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