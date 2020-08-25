import Stripe from 'stripe'
import uuidv4 from 'uuid/v4'
import jwt from 'jsonwebtoken'
import Cart from '../../models/Cart'
import Order from '../../models/Order'
import calculateCartTotal from '../../utils/calculateCartTotal'


const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

export default async(req, res) => {
    const { paymentData } = req.body

    try{
        //verify and get user id from token
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        //find cart based on user id + populate
        const cart = await Cart.findOne({ user: userId }).populate({
            path: "products.product",
            model: "Product"
        })
        //calculate cart totals again from cart products
        const {cartTotal, stripeTotal} = calculateCartTotal(cart.products)
        //get email from payment data, see if email is linked with existing stripe cus
        const previousCustomer = await stripe.customers.list({
            email: paymentData.email,
            limit: 1
        })
        const isExistingCustomer = previousCustomer.data.length > 0;
        //if not existing cus, create them based on email
        let newCustomer;
        if(!isExistingCustomer) {
            newCustomer = await stripe.customers.create({
                email: paymentData.email,
                source: paymentData.id
            })
        }
        const customer = (isExistingCustomer && previousCustomer.data[0].id) || newCustomer.id;
        //Create charge with total, send receipt
        const charge = await stripe.charges.create({
            currency: "GBP",
            amount: stripeTotal,
            receipt_email: paymentData.email,
            customer,
            description: `Checkout | ${paymentData.email} | ${paymentData.id}`
        }, {
            idempotency_key: uuidv4()
        })
        //add order data to db 
        await new Order({
            user: userId,
            email: paymentData.email,
            total: cartTotal,
            products: cart.products
        }).save()
        //clear products in cart 
        await Cart.findOneAndUpdate(
            { _id: cart._id},
            { $set: { products: []}}
        )
        //send back success (200)
        res.status(200).send("Checkout Successful")
    } catch (error) {
        console.error(error)
        res.status(500).send("Error in charge")
    }
}