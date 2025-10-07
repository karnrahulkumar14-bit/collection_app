import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../store/auth";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const location = useLocation();
  const { isLoggedIn, logout } = useAuth();
  const isAdminPage = location.pathname.startsWith("/admin");

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Collections", href: "/collections" },
    { name: "Expenses", href: "/expenses" },
    
  ];

  // Add auth links based on login status
  if (!isLoggedIn) {
    // navigation.push({ name: "Register", href: "/register" });
    navigation.push({ name: "Login", href: "/login" });
  } else {
    navigation.push({ name: "Admin", href: "/admin" });
    navigation.push({ name: "Logout", href: "/logout" });
  }
  // Filter based on current path
  const filteredNav = isAdminPage
    ? navigation.filter(
      (item) => item.name !== "Collections" && item.name !== "Expenses"
    )
    : navigation;
  return (
    <header className="navbar navbar-expand-lg header-wrapper sticky-top shadow-sm">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand secondary-font" to="/">
           श्री चित्रगुप्तजी
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse naviagtion" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {filteredNav.map((item) => {
              const isActive = location.pathname === item.href;

              if (item.name === "Logout") {
                return (
                  <li className="nav-item" key={item.name}>
                    <Link
                      to={item.href}
                      onClick={logout}
                      className={classNames(
                        "nav-link",
                        isActive ? "active fw-bold" : ""
                      )}
                    >
                      Logout
                    </Link>
                  </li>
                );
              }

              return (
                <li className="nav-item" key={item.name}>
                  <Link
                    to={item.href}
                    className={classNames(
                      "nav-link",
                      isActive ? "active fw-bold" : ""
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}
