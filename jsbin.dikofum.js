'use strict';

var initialState = [{
  id: 0,
  name: 'Product 1',
  quantity: 0
}, {
  id: 1,
  name: 'Product 2',
  quantity: 0
}];

function products(state, action) {
  if (state === undefined) state = initialState;

  if (action.type == 'ADD_TO_CART') {
    state[action.index].quantity += 1;
    return state;
  }
  return state;
}

var store = Redux.createStore(Redux.combineReducers({
  products: products
}));

function Product(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h2',
      null,
      props.name
    ),
    React.createElement(
      'p',
      null,
      'Quantity: ',
      props.quantity
    ),
    React.createElement(
      'button',
      { onClick: function () {
          return store.dispatch({
            type: 'ADD_TO_CART',
            index: props.id
          });
        } },
      'Add to cart'
    )
  );
}

function Header() {
  return React.createElement(
    'div',
    null,
    'Products in cart:',
    store.getState().products.reduce(function (productA, productB) {
      return productA.quantity + productB.quantity;
    })
  );
}

function App() {
  return React.createElement(
    'div',
    null,
    React.createElement(Header, null),
    store.getState().products.map(function (product) {
      return React.createElement(Product, {
        name: product.name,
        quantity: product.quantity,
        id: product.id
      });
    })
  );
}

function render() {
  ReactDOM.render(React.createElement(App, null), document.querySelector('.app'));
}

render();
store.subscribe(render);