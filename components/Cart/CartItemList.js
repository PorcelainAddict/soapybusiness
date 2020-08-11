import {Header, Segment, Button, Icon } from 'semantic-ui-react'

function CartItemList() {
  const user = false;

  return (
    <Segment  secondary color ="teal" inverted textAlign="center" placeholder>
      <Header icon>
        <Icon name="shopping basket" />
        Nae Items in yer basket pal. Either put some in or get oot!
      </Header>
      <div>
        {user ? (
          <Button color="orange">
            View Products
          </Button>
        ) : (
          <Button color="pink">
            Login to Access yer shopping
          </Button>
        )}
      </div>

    </Segment>
  )
}

export default CartItemList;
