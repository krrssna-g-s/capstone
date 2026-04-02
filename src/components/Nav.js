import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/menu", label: "Menu" },
  { to: "/reservations", label: "Reservations" },
  { to: "/order-online", label: "Order Online" },
  { to: "/login", label: "Login" },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);

  return (
    <nav className="navbar">
      {/* Desktop links */}
      <ul className="nav-links">
        {links.map(({ to, label, end }) => (
          <li key={to}>
            <NavLink to={to} end={end}>{label}</NavLink>
          </li>
        ))}
      </ul>

      {/* Hamburger button — mobile only */}
      <button
        className="hamburger"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <img src="/🦆 icon _hamburger menu.svg" alt="Menu" className="hamburger-icon" />
      </button>

      {/* Overlay */}
      {isOpen && <div className="nav-overlay" onClick={close} />}

      {/* Drawer */}
      <div className={`nav-drawer ${isOpen ? "nav-drawer--open" : ""}`}>
        <button className="nav-drawer-close" onClick={close} aria-label="Close menu">
          ✕
        </button>
        <ul className="nav-drawer-links">
          {links.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink to={to} end={end} onClick={close}>{label}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
