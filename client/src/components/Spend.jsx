import { useState, useEffect, useMemo } from "react";
import { Modal } from "bootstrap";
const Spend = ({
    hideIcon = false,
    selectedYear = new Date().getFullYear(),
}) => {
    const [donations, setDonations] = useState([]);
    const [form, setForm] = useState({  
        name: "",
        description: "",
        date: "",
        amount: "" 
    });
    const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toISOString().split("T")[0];
    };
    const [selectedDonation, setSelectedDonation] = useState(null);

    // Fetch expenses
    const fetchDonations = async () => {
        try {
            const res = await fetch(
                "https://pujamoneycollection.vercel.app/api/auth/admin/expenses"
            );

            if (!res.ok) throw new Error("Failed to fetch expenses");

            const data = await res.json();
            setDonations(data);
        } catch (err) {
            console.error("Error fetching expenses:", err);
        }
    };

    useEffect(() => {
        fetchDonations();
    }, []);

    // Filter expenses by selected year
    const filteredExpenses = useMemo(() => {
        return donations.filter((expense) => {
            if (!expense.date) return false;

            return (
                new Date(expense.date).getFullYear() ===
                Number(selectedYear)
            );
        });
    }, [donations, selectedYear]);

    // Add / Update expense
    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem("token");

            let url =
                "https://pujamoneycollection.vercel.app/api/auth/admin/expenses";

            let method = "POST";

            if (selectedDonation) {
                url = `${url}/${selectedDonation._id}`;
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
                console.error("Failed to save expense");
                return false;
            }

            setForm({ 
                name: "",
                description: "",
                date: "",
                amount: ""
            });
            setSelectedDonation(null);

            await fetchDonations();

            // Close Bootstrap modal
        const modalElement = document.getElementById("exampleModal");
        if (modalElement) {
            const modalInstance = Modal.getInstance(modalElement);
            modalInstance?.hide();
        }

            return true;
        } catch (err) {
            console.error("Error saving expense:", err);
            return false;
        }
    };

    // Delete expense
    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                `https://pujamoneycollection.vercel.app/api/auth/admin/expenses/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!res.ok) {
                console.error("Failed to delete expense");
                return;
            }

            await fetchDonations();
        } catch (err) {
            console.error("Error deleting expense:", err);
        }
    };

    return (
        <div className="expenses">
            <div className="diplay-area">
                <div className="body-content">

                    {!hideIcon && (
                        <div className="add-collection text-end">
                            <button
                                type="button"
                                className="btn btn-success"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => {
                                    setSelectedDonation(null);
                                    setForm({
                                        name: "",
                                        date: "",
                                        amount: "",
                                        description: "",
                                    });
                                }}
                            >
                                <i className="bi bi-plus-circle me-2"></i>
                                Add Details
                            </button>
                        </div>
                    )}

                    <div className="collections card mt-3">
                        <div className="card-header">
                            <h5 className="card-title">
                                Expense List
                            </h5>
                        </div>

                        <ul className="list-items p-4">

                            <li className="row item d-none d-sm-flex">
                                <div
                                    className={`row col-lg-9 col-sm-12 ${
                                        hideIcon
                                            ? "col-lg-12 col-sm-12"
                                            : ""
                                    }`}
                                >
                                    <div className="hs-name col-6 fw-bold">
                                        Product Name
                                    </div>
                                    <div className="hs-date col-3 fw-bold">
                                        Date
                                    </div>
                                    <div className="hs-amount col-3 fw-bold">
                                        Amount
                                    </div>
                                </div>

                                {!hideIcon && (
                                    <div className="button-wrap row col-lg-3 flex-nowrap col-sm-12 fw-bold">
                                        <div className="col col-12 text-center">
                                            Actions
                                        </div>
                                    </div>
                                )}
                            </li>

                            {filteredExpenses.length > 0 ? (
                                filteredExpenses.map((d) => (
                                    <li className="row item" key={d._id}>
                                        <div
                                            className={`row col-lg-9 col-sm-12 ${
                                                hideIcon
                                                    ? "col-lg-12 col-sm-12"
                                                    : ""
                                            }`}
                                        >
                                            <div className="hs-name col-sm-6 col-xs-12">
                                                {d.name}
                                                <span className="fs-0.5">{d.description}</span>
                                            </div>
                                             <div className="hs-date col-sm-3 col-xs-12">
                                                {d.date}
                                            </div>
                                            <div className="hs-amount col-sm-3 col-xs-12">
                                                ₹{d.amount}
                                            </div>
                                        </div>

                                        {!hideIcon && (
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
                                                            description: d.description || "",
                                                            date: formatDate(d.date),
                                                            amount: d.amount
                                                        });
                                                    }}
                                                >
                                                    <i className="bi bi-pencil"></i>{" "}
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() =>
                                                        handleDelete(d._id)
                                                    }
                                                >
                                                    <i className="bi bi-trash"></i>{" "}
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </li>
                                ))
                            ) : (
                                <li className="text-center list-unstyled py-3">
                                    No expenses found for {selectedYear}.
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            {!hideIcon && (
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h1
                                    className="modal-title fs-5"
                                    id="exampleModalLabel"
                                >
                                    {selectedDonation
                                        ? "Update Expenses"
                                        : "Add Expenses"}
                                </h1>

                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="full-details"
                                            className="col-form-label"
                                        >
                                            Product Name
                                        </label>

                                        <textarea
                                            id="full-details"
                                            placeholder="Name"
                                            value={form.name}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    name: e.target.value,
                                                })
                                            }
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="description"
                                            className="col-form-label"
                                        >
                                            Description
                                        </label>

                                        <input
                                            type="text"
                                            id="description"
                                            placeholder="Enter description"
                                            value={form.description}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    description: e.target.value,
                                                })
                                            }
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label
                                            htmlFor="date"
                                            className="col-form-label"
                                        >
                                            Date
                                        </label>

                                        <input
                                            id="date"
                                            type="date"
                                            value={form.date}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    date: e.target.value,
                                                })
                                            }
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label
                                            htmlFor="amount"
                                            className="col-form-label"
                                        >
                                            Amount
                                        </label>

                                        <input
                                            id="amount"
                                            type="number"
                                            placeholder="Amount"
                                            value={form.amount}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    amount: e.target.value,
                                                })
                                            }
                                            className="form-control"
                                        />
                                    </div>
                                </form>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={async () => {
                                        if (
                                            form.name.trim() &&
                                            form.description.trim() &&
                                            form.date &&
                                            form.amount !== ""
                                        ) {
                                            await handleSubmit();
                                        } else {
                                            alert("Please fill all fields before submitting.");
                                        }
                                    }}
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

export default Spend;