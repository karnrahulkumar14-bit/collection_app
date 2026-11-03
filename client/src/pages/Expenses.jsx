import { useState } from "react";
import Spend from "../components/Spend";
import Report from "../components/Report";

const Expenses = () => {
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear()
  );

  return (
    <div className="container">
      <Report
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
      />

      <Spend
        hideIcon={true}
        selectedYear={selectedYear}
      />
    </div>
  );
};

export default Expenses;