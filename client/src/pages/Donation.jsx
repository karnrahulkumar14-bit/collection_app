import { useState } from "react";
import Collection from "../components/Collection";
import Report from "../components/Report";

const Donation = () => {
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear()
  );

  return (
    <div className="container">
      <Report
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
      />

      <Collection
        hideItems={true}
        selectedYear={selectedYear}
      />
    </div>
  );
};

export default Donation;