import React from "react";

function StatCard({ title, value, subtitle, icon, type }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${type}`}>
        {icon}
      </div>

      <div className="stat-content">
        <p>{title}</p>
        <h2>{value}</h2>
        <span>{subtitle}</span>
      </div>
    </div>
  );
}

export default StatCard;