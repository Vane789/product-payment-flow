import visaLogo from "../assets/img/visa-logo.png";
import masterCardLogo from "../assets/img/mastercard-logo.png";
import creditCardType from "credit-card-type";
import "../components/Modal/CreditCardModal.scss";

export const getCardLogo = (cardNumber) => {
  const card = creditCardType(cardNumber)[0];
  if (!card) return null;

  switch (card.type) {
    case "visa":
      return visaLogo;
    case "mastercard":
      return masterCardLogo;
    default:
      return null;
  }
};
