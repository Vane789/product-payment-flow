import creditCardType from "credit-card-type";

export const isValidCreditCardNumber = (number) => {
  const card = creditCardType(number)[0];
  return card && (card.type === "visa" || card.type === "mastercard");
};

export const isValidExpiryDate = (month, year) => {
  const currentDate = new Date();
  const cardExpiryDate = new Date(year, month - 1);
  return cardExpiryDate >= currentDate;
};

export const isValidCVV = (cvv) => {
  return /^[0-9]{3,4}$/.test(cvv);
};
