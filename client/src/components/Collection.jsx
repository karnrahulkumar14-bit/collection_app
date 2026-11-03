
import { useState, useEffect, useMemo } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Collection = ({ hideItems = false, selectedYear = new Date().getFullYear() }) => {
    const [donations, setDonations] = useState([]);
    const [form, setForm] = useState({ name: "", date: "", amount: "" });
    const [selectedDonation, setSelectedDonation] = useState(null);

    // Fetch donations
    const fetchDonations = async () => {
        try {
            const res = await fetch("https://pujamoneycollection.vercel.app/api/auth/admin/collection");

            if (!res.ok) throw new Error("Failed to fetch donations");

            const data = await res.json();
            setDonations(data);
        } catch (err) {
            console.error("Error fetching donations:", err);
        }
    };

    useEffect(() => {
        fetchDonations();
    }, []);

    // Filter donations by selected year
    const filteredDonations = useMemo(() => {
        return donations.filter((donation) => {
            if (!donation.date) return false;

            const donationYear = new Date(`${donation.date}T00:00:00`).getFullYear();

            return donationYear === Number(selectedYear);
        });
    }, [donations, selectedYear]);

    // Add / Update donation
    const handleSubmit = async () => {
    try {
        const token = localStorage.getItem("token");
        let url = "https://pujamoneycollection.vercel.app/api/auth/admin/collection";
        let method = "POST";

        if (selectedDonation) {
        url = `https://pujamoneycollection.vercel.app/api/auth/admin/collection/${selectedDonation._id}`;
        method = "PUT";
        }

        const res = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
        });

        if (!res.ok) {
        console.error("Failed to save donation");
        return;
        }

        setForm({ name: "", date: "", amount: "" });
        setSelectedDonation(null);

        await fetchDonations();

        // Close Bootstrap modal
        const modal = document.getElementById("exampleModal");

        if (modal && window.bootstrap) {
        const modalInstance = window.bootstrap.Modal.getInstance(modal);
        modalInstance?.hide();
        }
    } catch (err) {
        console.error("Error saving donation:", err);
    }
    };

    // Delete donation
    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`https://pujamoneycollection.vercel.app/api/auth/admin/collection/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) {
                console.error("Failed to delete donation");
                return;
            }

            fetchDonations();
        } catch (err) {
            console.error("Error deleting donation:", err);
        }
    };

    return (
        <div className="collection">
            <div className="diplay-area">
                <div className="body-content">

                    {!hideItems && (
                        <div className="add-collection text-end">
                            <button
                                type="button"
                                className="btn btn-success"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => {
                                    setSelectedDonation(null);
                                    setForm({ name: "", date: "", amount: "" });
                                }}
                            >
                                <i className="bi bi-plus-circle me-2"></i>
                                Add Donation
                            </button>
                        </div>
                    )}

                    <div className="collections card mt-3">
                        <div className="card-header">
                            <h5 className="card-title">Donation List</h5>
                        </div>

                        <ul className="list-items p-4">
                            <li className="row item d-none d-sm-flex">
                                <div className={`row col-lg-9 col-sm-12 ${hideItems ? "col-lg-12 col-sm-12" : ""}`}>
                                    <div className="hs-name col-6 fw-bold">Donor Name</div>
                                    <div className="hs-date col-3 fw-bold">Date</div>
                                    <div className="hs-amount col-3 fw-bold">Amount</div>
                                </div>

                                {!hideItems && (
                                    <div className="button-wrap row col-lg-3 flex-nowrap col-sm-12 fw-bold">
                                        <div className="col col-12 text-center">Actions</div>
                                    </div>
                                )}
                            </li>

                            {filteredDonations.length > 0 ? (
                                filteredDonations.map((d) => (
                                    <li className="row item" key={d._id}>
                                        <div className={`row col-lg-9 col-sm-12 ${hideItems ? "col-lg-12 col-sm-12" : ""}`}>
                                            <div className="hs-name col-sm-6 col-xs-12">
                                                {d.name}
                                            </div>
                                            <div className="hs-date col-sm-3 col-xs-12">
                                                {d.date}
                                            </div>
                                            <div className="hs-amount col-sm-3 col-xs-12">
                                                ₹{d.amount}
                                            </div>
                                        </div>

                                        {!hideItems && (
                                            <div className="button-wrap col-lg-3 d-flex col-sm-12 justify-content-center">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-primary me-2"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#exampleModal"
                                                    onClick={() => {
                                                        setSelectedDonation(d);
                                                        setForm({
                                                            name: d.name,
                                                            date: d.date,
                                                            amount: d.amount,
                                                        });
                                                    }}
                                                >
                                                    <i className="bi bi-pencil"></i> Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleDelete(d._id)}
                                                >
                                                    <i className="bi bi-trash"></i> Delete
                                                </button>
                                            </div>
                                        )}
                                    </li>
                                ))
                            ) : (
                                <li className="text-center list-unstyled py-3">
                                    No donations found for {selectedYear}.
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            {!hideItems && (
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    {selectedDonation ? "Update Donation" : "Add Donation"}
                                </h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="full-name" className="col-form-label">Full name</label>
                                        <input
                                            id="full-name"
                                            type="text"
                                            placeholder="Name"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="date" className="col-form-label">Date</label>
                                        <input
                                            id="date"
                                            type="date"
                                            value={form.date}
                                            onChange={(e) => setForm({ ...form, date: e.target.value })}
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="amount" className="col-form-label">Amount</label>
                                        <input
                                            id="amount"
                                            type="number"
                                            placeholder="Amount"
                                            value={form.amount}
                                            onChange={(e) => setForm({ ...form, amount: e.target.value })}
                                            className="form-control"
                                        />
                                    </div>
                                </form>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Close
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleSubmit}
                                >
                                    {selectedDonation ? "Update" : "Submit"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Collection;
