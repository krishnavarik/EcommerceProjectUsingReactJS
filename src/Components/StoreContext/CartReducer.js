export const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    let updatedItems;

    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.quantity;
    const existingItemIndex = state.items.findIndex(
      (items) => items.title === action.item.title
    );

    const existingCartItem = state.items[existingItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + action.item.quantity,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = [...state.items, action.item];
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingItemIndex = state.items.findIndex(
      (items) => items.title === action.title
    );

    const existingCartItem = state.items[existingItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedItems;
    if (existingCartItem.quantity === 1) {
      updatedItems = state.items.filter((item) => item.title !== action.title);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return state;
};
