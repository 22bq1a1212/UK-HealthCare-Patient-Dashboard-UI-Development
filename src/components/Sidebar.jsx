import React from "react";

function Sidebar({ activePage, setActivePage, isOpen, setIsOpen }) {
  const menuItems = [
    { name: "Dashboard", icon: "🏠" },
    { name: "Patients", icon: "👥" },
    { name: "Appointments", icon: "📅" },
    { name: "Profile", icon: "👤" },
  ];

  const handleNavigation = (page) => {
    setActivePage(page);
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="logo-section">
          <div className="logo-icon">+</div>
          <div>
            <h2>UK Healthcare</h2>
            <span>Patient Portal</span>
          </div>
        </div>

        <nav className="navigation">
          <p className="menu-title">MAIN MENU</p>

          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${
                activePage === item.name ? "active" : ""
              }`}
              onClick={() => handleNavigation(item.name)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button className="nav-item">
            <span className="nav-icon">⚙️</span>
            <span>Settings</span>
          </button>

          <button className="nav-item logout">
            <span className="nav-icon">↪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;