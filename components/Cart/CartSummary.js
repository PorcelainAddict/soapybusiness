import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { Divider, Segment, Button } from 'semantic-ui-react'
import calculateCartTotal from '../../utils/calculateCartTotal'

function CartSummary({ products, handleCheckout, success }) {
  const [cartAmount, setCartAmount] = React.useState(0)
  const [stripeAmount, setStripeAmount] = React.useState(0)
  const [isCartEmpty, setCartEmpty] = React.useState(false)

  React.useEffect(() => {
    const {cartTotal, stripeTotal} = calculateCartTotal(products)
    setCartAmount(cartTotal)
    setStripeAmount(stripeTotal)
    setCartEmpty(products.length === 0)
  }, [products])

  return <>
  <Divider/>
    <Segment clearing size="large">
      <strong>Sub total:</strong>£{cartAmount}
      <StripeCheckout
        name="Soapy Business"
        amount={stripeAmount}
        image={products.length > 0 ? products[0].product.mediaUrl : ""}
        currency="GBP"
        shippingAddress={true}
        billingAddress={true}
        zipCode={true}
        stripeKey="pk_test_51HJk0hDaTKUHSlU7IGro5lmqNWQS6X6F2JQOVobtWZNLFzYPn6Ss5UokO0KXWPvKKiA6RfGRORjLfZsH1pbaszri00nKNDqzii"
        token={handleCheckout}
        triggerEvent="onClick"

      >
      <Button 
        disabled={isCartEmpty || success}
        icon="cart"
        color="teal"
        floated="right"
        content="Checkout"
      />
      </StripeCheckout>
      
    </Segment>
  </>;
}

export default CartSummary;
