import { createContext, useState } from "react";

export const CurrencyContext = createContext();

const CurrencyProvider = ({ children }) => {
  const [fromCurrency, setFromCurrency] = useState("🇺🇸 USD - United States");
  const [toCurrency, setToCurrency] = useState("🇦🇺 AUD - Australia");
  const [firstAmount, setFirstAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState(0);
  const [minAmount, setMinAmount] = useState(0);

  const value = {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
    setFirstAmount,
    maxAmount,
    setMaxAmount,
    minAmount,
    setMinAmount,
  };
  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
