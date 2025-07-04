export const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat('vi-VN').format(number);
};