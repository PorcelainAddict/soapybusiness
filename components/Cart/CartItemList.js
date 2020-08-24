import { Header, Segment, Button, Icon, Item } from "semantic-ui-react";
import { useRouter} from 'next/router'

function CartItemList({ products, user }) {
  const router =  useRouter()

  function mapCartProductsToItems(products){
    return products.map(p => ({
      childkey: p.product._id,
      header: (
        <Item.Header as="a" onClick={() => router.push(`/product?_id={p.product._id}`)}>
          {p.product.name}
        </Item.Header>
      ),
      image: p.product.mediaUrl,
      meta: `${p.quantity} x $${p.product.price}`,
      fluid: 'true',
      extra: (
        <Button
          basic 
          icon="remove"
          floated="right"
          onClick={() => console.log(p.product._id)}
        />
      )
    }))
  }

  if (products.lenght === 0) {
    return (
      <Segment secondary color="teal" inverted textAlign="center" placeholder>
        <Header icon>
          <Icon name="shopping basket" />
          Nae Items in yer basket pal. Either put some in or get oot!
        </Header>
        <div>
          {user ? (
            <Button color="orange" onClick={() => router.push('/')}>View Products</Button>
          ) : (
            <Button color="pink" onClick={() => router.push('/login')}>Login to Access yer shopping</Button>
          )}
        </div>
      </Segment>
    );
  }

  return <Item.Group items={mapCartProductsToItems(products)}/>
}

export default CartItemList;
