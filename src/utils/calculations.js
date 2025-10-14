export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const calculateSubItemCost = (mainProduct, subItem) => {
  const quantity = parseFloat(mainProduct.quantity) || 0;
  const specification = parseFloat(subItem.specification) || 0;
  const weight = parseFloat(subItem.weight) || 0;
  const totalCost = subItem.catalogItem.pricing.totalCost;
  const adjustmentFactor = subItem.catalogItem.pricing.adjustmentFactor;

  return quantity * specification * weight * totalCost * adjustmentFactor;
};

export const getTotalSubItemsCount = (subItems) => {
  return Object.values(subItems).reduce((sum, items) => sum + items.length, 0);
};

export const getTotalCost = (mainProducts, subItems) => {
  let total = 0;
  mainProducts.forEach((mainProduct, index) => {
    if (subItems[index]) {
      subItems[index].forEach(subItem => {
        total += calculateSubItemCost(mainProduct, subItem);
      });
    }
  });
  return total;
};
