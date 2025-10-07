import React, { useState } from "react";
import Collection from "../components/Collection";
import Spend from "../components/Spend";
import Report from "../components/Report";
import { Link } from "react-router-dom";

const Adminpanel = () => {
    const [activeComponent, setActiveComponent] = useState("report"); // default component

    // Function to render the selected component
    const renderContent = () => {
        switch (activeComponent) {
            case "collection":
                return <Collection />;
            case "spend":
                return <Spend />;
            default:
                return <Collection />;
        }
    };
    return (
        <section className="adminpanel-wrapper">
            <div className="container-fuild">
                <div className="row">
                    <div className="sidebar border border-right col-md-3 col-lg-2 p-0 shadow-sm d-sm-block d-block">
                        <div className="sidebarinner">
                            <ul className="nav flex-column">
                                <li className="nav-link">
                                    <Link className="nav-link d-flex align-items-center gap-2" onClick={() => setActiveComponent("collection")}>
                                        <i className="bi bi-collection-fill"></i>
                                        Collections
                                    </Link>
                                </li>
                                <li className="nav-link">
                                    <Link className="nav-link d-flex align-items-center gap-2" onClick={() => setActiveComponent("spend")}>
                                        <i className="bi bi-wallet-fill"></i> Expenses</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="body-content col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <Report />
                        {renderContent()}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Adminpanel;
