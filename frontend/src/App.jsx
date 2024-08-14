import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import FinalStatusPage from "./pages/FinalStatusPage";
import PaymentPage from "./pages/PaymentPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/final-status" element={<FinalStatusPage />} />
      </Routes>
    </Router>
  );
}

export default App;
