import React from "react";

function Header({
  activePage,
  setIsOpen,
  searchQuery,
  setSearchQuery,
}) {
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <header className="header">

      {/* Mobile Menu */}
      <button
        className="mobile-menu"
        onClick={() => setIsOpen(true)}
      >
        ☰
      </button>

      {/* Page Title */}
      <div className="header-title">
        <h1>{activePage}</h1>
        <p>Welcome back, Sarah 👋</p>
      </div>

      {/* Search Box */}
      <div className="header-search">

        <span className="search-icon">
          🔍
        </span>

        <input
          type="text"
          placeholder={`Search ${activePage.toLowerCase()}...`}
          value={searchQuery}
          onChange={handleSearchChange}
        />

        {searchQuery.length > 0 && (
          <button
            type="button"
            className="clear-search"
            onClick={clearSearch}
          >
            ✕
          </button>
        )}

      </div>

      {/* Notification */}
      <button
        type="button"
        className="notification"
      >
        🔔
        <span></span>
      </button>

      {/* User */}
      <div className="header-user">

        <div className="user-avatar">
          SC
        </div>

        <div className="user-info">
          <strong>Sarah Collins</strong>
          <small>Patient</small>
        </div>

      </div>

    </header>
  );
}

export default Header;