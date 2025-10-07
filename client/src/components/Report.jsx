import { useDonation } from "../store/DonationContext";
import { Link } from "react-router-dom";

const Report = () => {
    const { totalDonations, totalExpenses, balance, loading, reloadData } = useDonation();

    return (
        <section className='report-wrapper mt-5 mb-5'>
            <h2 className="fs-2 mb-3">Collection</h2>
            <div className='row'>
                <div className="col-sm-12 col-lg-4 mb-3 mb-lg-0 wow animate__fadeInUp">
                    <div className="card stats-card donations">
                        <div className="card-body">
                            <Link to="/collections">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <h6 className="text-uppercase text-muted mb-3">Total Donations</h6>
                                        <h3 className="mb-0">{loading ? <span className="spinner-border spinner-border-sm" /> : `₹ ${totalDonations}`}</h3>
                                    </div>
                                    <div className="col-auto"><i className="bi bi-currency-dollar text-primary fs-2"></i></div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-lg-4 mb-3 mb-lg-0 wow animate__fadeInUp">
                    <div className="card stats-card expenses">
                        <div className="card-body">
                            <Link to="/expenses">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <h6 className="text-uppercase text-muted mb-3">Total Expenses</h6>
                                        <h3 className="mb-0">{loading ? <span className="spinner-border spinner-border-sm" /> : `₹ ${totalExpenses}`}</h3>
                                    </div>
                                    <div className="col-auto"><i className="bi bi-currency-exchange text-danger fs-2"></i></div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-lg-4 wow animate__fadeInUp">
                    <div className="card stats-card balance">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col">
                                    <h6 className="text-uppercase text-muted mb-3">Current Balance</h6>
                                    <h3 className="mb-0"> {loading ? <span className="spinner-border spinner-border-sm" /> : `₹ ${balance}`}</h3>
                                </div>
                                <div className="col-auto"><i className="bi bi-piggy-bank text-success fs-2"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button className="btn btn-primary mt-3" onClick={reloadData}>
                Refresh Data
            </button>
        </section>
    )
}

export default Report