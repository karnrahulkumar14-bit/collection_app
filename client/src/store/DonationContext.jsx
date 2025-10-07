import { createContext, useContext, useState, useEffect } from "react";

const DonationContext = createContext();
export const useDonation = () => useContext(DonationContext);

export const DonationProvider = ({ children }) => {
  const [donations, setDonations] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Calculate totals
  const totalDonations = donations.reduce((sum, d) => sum + Number(d.amount || 0), 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const balance = totalDonations - totalExpenses;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [donRes, expRes] = await Promise.all([
        fetch("http://localhost:8080/api/auth/admin/collection"),
        fetch("http://localhost:8080/api/auth/admin/expenses")
      ]);

      if (!donRes.ok || !expRes.ok) throw new Error("Failed to fetch data");

      const [donData, expData] = await Promise.all([donRes.json(), expRes.json()]);
      setDonations(donData);
      setExpenses(expData);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DonationContext.Provider
      value={{
        donations,
        expenses,
        totalDonations,
        totalExpenses,
        balance,
        reloadData: fetchData,
        loading,
        error
      }}
    >
      {children}
    </DonationContext.Provider>
  );
};
