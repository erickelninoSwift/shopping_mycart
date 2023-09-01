export const getTotals = (cart) => {
  console.log(cart);
  let totalAmount = 0;
  let totalCost = 0;
  for (let item of cart.values()) {
    const { amount, price } = item;
    totalAmount = totalAmount + amount;
    totalCost = totalCost + amount * price;
  }
  return { totalAmount, totalCost };
};
