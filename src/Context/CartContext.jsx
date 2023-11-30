import React, {
  useState,
  createContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const addToCart = useCallback(
    (product, quantityToAdd) => {
      const existingProductIndex = cart.findIndex(
        (item) => item.producto.id === product.id
      );

      if (existingProductIndex !== -1) {
        const updatedCart = cart.map((item, index) => {
          if (index === existingProductIndex) {
            return {
              ...item,
              quantityToAdd: item.quantityToAdd + quantityToAdd,
            };
          }
          return item;
        });

        setCart(updatedCart);
      } else {
        setCart((prevCart) => [
          ...prevCart,
          { producto: product, quantityToAdd },
        ]);
      }
    },
    [cart]
  );

  const isInCart = useCallback(
    (itemId) => {
      return cart.some((i) => i.producto.id === itemId);
    },
    [cart]
  );

  const getTotalItems = useCallback(() => {
    let cant = 0;
    cart.forEach((e) => (cant += e.quantityToAdd));
    return cant;
  }, [cart]);

  const removeItem = useCallback(
    (id) => {
      const filtrarCarrito = cart.filter((item) => item.producto.id !== id);
      setCart(filtrarCarrito);
    },
    [cart]
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const getSubtotal = useCallback(
    (productId) => {
      const cartItem = cart.find((item) => item.producto.id === productId);
      if (cartItem) {
        return cartItem.quantityToAdd * cartItem.producto.price;
      }
      return 0;
    },
    [cart]
  );

  const increaseQuantity = useCallback(
    (productId) => {
      const updatedCart = cart.map((item) => {
        if (item.producto.id === productId) {
          const newQuantity =
            item.quantityToAdd + 1 > item.producto.stock
              ? item.producto.stock
              : item.quantityToAdd + 1;
          return {
            ...item,
            quantityToAdd: newQuantity,
          };
        }
        return item;
      });

      setCart(updatedCart);
    },
    [cart]
  );

  const decreaseQuantity = useCallback(
    (productId) => {
      const updatedCart = cart.map((item) => {
        if (item.producto.id === productId) {
          const newQuantity =
            item.quantityToAdd - 1 < 1 ? 1 : item.quantityToAdd - 1;
          return {
            ...item,
            quantityToAdd: newQuantity,
          };
        }
        return item;
      });

      setCart(updatedCart);
    },
    [cart]
  );

  const total = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + item.quantityToAdd * item.producto.price,
      0
    );
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const contextValue = useMemo(
    () => ({
      cart,
      setCart,
      addToCart,
      isInCart,
      getTotalItems,
      removeItem,
      clearCart,
      increaseQuantity,
      decreaseQuantity,
      total,
      getSubtotal,
    }),
    [
      cart,
      setCart,
      addToCart,
      isInCart,
      getTotalItems,
      removeItem,
      clearCart,
      increaseQuantity,
      decreaseQuantity,
      total,
      getSubtotal,
    ]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
