import React, { useState } from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./Pages/Dashboard";
import Patients from "./Pages/Patients";
import Appointments from "./Pages/Appointments";
import Profile from "./Pages/Profile";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // This controls whether the appointment booking modal opens
  const [openBooking, setOpenBooking] = useState(false);

  const handlePageChange = (page) => {
    setActivePage(page);
    setSearchQuery("");
    setIsOpen(false);
  };

  const handleBookAppointment = () => {
    setActivePage("Appointments");
    setOpenBooking(true);
    setIsOpen(false);
  };

  return (
    <div className="app">

      <Sidebar
        activePage={activePage}
        setActivePage={handlePageChange}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="main">

        <Header
          activePage={activePage}
          setIsOpen={setIsOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <main>

          {activePage === "Dashboard" && (
            <Dashboard
              searchQuery={searchQuery}
              setActivePage={handlePageChange}
              onBookAppointment={handleBookAppointment}
            />
          )}

          {activePage === "Patients" && (
            <Patients searchQuery={searchQuery} />
          )}

          {activePage === "Appointments" && (
            <Appointments
              searchQuery={searchQuery}
              openBooking={openBooking}
              setOpenBooking={setOpenBooking}
            />
          )}

          {activePage === "Profile" && (
            <Profile />
          )}

        </main>

      </div>
    </div>
  );
}

export default App;