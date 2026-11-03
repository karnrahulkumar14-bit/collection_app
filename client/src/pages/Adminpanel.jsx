import { useState } from "react";
import Collection from "../components/Collection";
import Spend from "../components/Spend";
import Report from "../components/Report";

const Adminpanel = () => {
  const [activeComponent, setActiveComponent] = useState("collection");
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear()
  );

  const renderContent = () => {
    switch (activeComponent) {
      case "collection":
        return (
          <Collection
            selectedYear={selectedYear}
          />
        );

      case "spend":
        return (
          <Spend
            selectedYear={selectedYear}
          />
        );

      default:
        return (
          <Collection
            selectedYear={selectedYear}
          />
        );
    }
  };

  return (
    <section className="adminpanel-wrapper">
      <div className="container-fluid">
        <div className="row">

          {/* Sidebar */}
          <div className="sidebar border border-right col-md-3 col-lg-2 p-0 shadow-sm">
            <div className="sidebarinner">
              <ul className="nav flex-column">

                <li className="nav-item">
                  <button
                    type="button"
                    className={`nav-link d-flex align-items-center gap-2 ${
                      activeComponent === "collection" ? "active" : ""
                    }`}
                    onClick={() => setActiveComponent("collection")}
                  >
                    <i className="bi bi-collection-fill"></i>
                    Collections
                  </button>
                </li>

                <li className="nav-item">
                  <button
                    type="button"
                    className={`nav-link d-flex align-items-center gap-2 ${
                      activeComponent === "spend" ? "active" : ""
                    }`}
                    onClick={() => setActiveComponent("spend")}
                  >
                    <i className="bi bi-wallet-fill"></i>
                    Expenses
                  </button>
                </li>

              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="body-content col-md-9 ms-sm-auto col-lg-10 px-md-4">

            {/* Shared Report and Year Selector */}
            <Report
              selectedYear={selectedYear}
              onYearChange={setSelectedYear}
            />

            {/* Selected Component */}
            {renderContent()}

          </div>
        </div>
      </div>
    </section>
  );
};

export default Adminpanel;