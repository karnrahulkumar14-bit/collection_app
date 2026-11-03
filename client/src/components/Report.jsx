import { useState, useMemo } from "react";
import { useDonation } from "../store/useDonation";
import YearSelector from "../components/YearSelector";


const inr = (value) => `₹${Number(value).toLocaleString("en-IN")}`;

const getYear = (dateString) =>
  new Date(`${dateString}T00:00:00`).getFullYear();

// Defined outside the component so it isn't a hook dependency
const filterByYear = (items, year) =>
  items.filter((item) => item.date && getYear(item.date) === Number(year));

const sum = (items) =>
  items.reduce((total, item) => total + Number(item.amount || 0), 0);

const Report = ({ selectedYear: externalYear, onYearChange }) => {
  const [internalYear, setInternalYear] = useState(new Date().getFullYear());

  // Use parent year if provided; otherwise use internal year
  const selectedYear = externalYear ?? internalYear;

  const handleYearChange = (year) => {
    setInternalYear(year);
    onYearChange?.(year);
  };

  const { donations, expenses, reloadData, loading, error } = useDonation();

  const filteredDonations = useMemo(
    () => filterByYear(donations, selectedYear),
    [donations, selectedYear]
  );

  const filteredExpenses = useMemo(
    () => filterByYear(expenses, selectedYear),
    [expenses, selectedYear]
  );

  const totalDonations = sum(filteredDonations);
  const totalExpenses = sum(filteredExpenses);
  const balance = totalDonations - totalExpenses;
  const totalContributors = filteredDonations.length;

  const spentPercent =
    totalDonations > 0
      ? Math.min(100, Math.round((totalExpenses / totalDonations) * 100))
      : 0;

  if (loading) {
    return (
      <section className="rp-wrapper">
        <div className="rp-state">
          <div className="rp-spinner" />
          <p>Loading report…</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rp-wrapper">
        <div className="rp-state rp-state--error">
          <i className="bi bi-exclamation-circle fs-3"></i>
          <p>{error}</p>
          <button type="button" className="rp-btn" onClick={reloadData}>
            Try again
          </button>
        </div>
      </section>
    );
  }

  const cards = [
    {
      key: "donations",
      label: "Total Collection",
      value: inr(totalDonations),
      icon: "bi-currency-dollar",
      tone: "blue",
      hint: `${totalContributors} contribution${totalContributors === 1 ? "" : "s"}`,
    },
    {
      key: "expenses",
      label: "Total Expenses",
      value: inr(totalExpenses),
      icon: "bi-receipt",
      tone: "red",
      hint: `${filteredExpenses.length} expense${filteredExpenses.length === 1 ? "" : "s"}`,
    },
    {
      key: "balance",
      label: "Available Balance",
      value: inr(balance),
      icon: "bi-piggy-bank",
      tone: balance < 0 ? "red" : "green",
      hint: balance < 0 ? "Spending exceeds collection" : "Remaining funds",
    },
    {
      key: "contributors",
      label: "Total Contributors",
      value: totalContributors.toLocaleString("en-IN"),
      icon: "bi-people-fill",
      tone: "cyan",
      hint: `Donors in ${selectedYear}`,
    },
  ];

  return (
    <section className="rp-wrapper">
      {/* Top bar */}
      <div className="rp-topbar">
        <span className="rp-topbar__text">
          Showing report for {selectedYear}
        </span>
        <button type="button" className="rp-btn" onClick={reloadData}>
          <i className="bi bi-arrow-repeat"></i>
          Refresh Data
        </button>
      </div>

      {/* Header card */}
      <div className="rp-panel">
        <div className="rp-panel__head">
          <div>
            <h1 className="rp-title">Annual Report</h1>
            <p className="rp-subtitle">
              Collection, expenses and balance · Selected year {selectedYear}
            </p>
          </div>
          <div className="rp-year">
            <YearSelector
              defaultYear={selectedYear}
              onChange={handleYearChange}
            />
          </div>
        </div>

        {/* Stat cards */}
        <div className="rp-grid">
          {cards.map((card) => (
            <article key={card.key} className={`rp-card rp-card--${card.tone}`}>
              <div className="rp-card__info">
                <span className="rp-card__label">{card.label}</span>
                <strong className="rp-card__value">{card.value}</strong>
                <span className="rp-card__hint">{card.hint}</span>
              </div>
              <div className="rp-card__icon">
                <i className={`bi ${card.icon}`}></i>
              </div>
            </article>
          ))}
        </div>

        {/* Spending progress */}
        <div className="rp-progress">
          <div className="rp-progress__row">
            <span>Funds used</span>
            <span>{spentPercent}%</span>
          </div>
          <div className="rp-progress__track">
            <div
              className={`rp-progress__bar ${
                spentPercent >= 100 ? "is-full" : ""
              }`}
              style={{ width: `${spentPercent}%` }}
            />
          </div>
        </div>

        {/* Footer summary */}
        <div className="rp-summary">
          <div>
            <strong>Net balance</strong>
            <small>
              {totalContributors} records · {selectedYear}
            </small>
          </div>
          <span
            className={`rp-summary__amount ${balance < 0 ? "is-negative" : ""}`}
          >
            {inr(balance)}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Report;
