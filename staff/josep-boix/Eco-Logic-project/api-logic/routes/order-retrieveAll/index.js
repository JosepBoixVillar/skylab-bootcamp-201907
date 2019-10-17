// const logic = require('../../logic')

// module.exports = async(req, res)=> {
//     const {params: { id } } = req

//     try {
//         const orderId = await logic.retrieveAllOrders(id,orderId)
//         res.status(201).json({ message: 'Orders retrieved successfully', orderId })
//     } catch({ message }) {
//         res.status(400).json({ error: message })
//     }
// }