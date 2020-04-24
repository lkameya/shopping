import PropTypes from 'prop-types';
import formatMoney from '../../lib/formatMoney';
import RemoveFromCart from '../RemoveFromCart';
import CartItemContainer from './styles';

function CartItem({ cartItem }) {
  if (!cartItem.item)
    return (
      <CartItemContainer>
        <p>This Item has been removed</p>
        <RemoveFromCart id={cartItem.id} />
      </CartItemContainer>
    );
  return (
    <CartItemContainer>
      <img width="100" src={cartItem.item.image} alt={cartItem.item.title} />
      <div className="cart-item-details">
        <h3>{cartItem.item.title}</h3>
        <p>
          {formatMoney(cartItem.item.price * cartItem.quantity)}
          {' - '}
          <em>
            {cartItem.quantity} &times; {formatMoney(cartItem.item.price)} each
          </em>
        </p>
      </div>
      <RemoveFromCart id={cartItem.id} />
    </CartItemContainer>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired,
};

export default CartItem;