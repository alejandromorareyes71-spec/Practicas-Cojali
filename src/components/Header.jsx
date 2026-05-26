import React from 'react';

export default function Header({ totalTasks, pendingTasks }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <h1 className="header-title">Gestor de Tareas</h1>
        </div>
        <div className="header-stats">
          <div className="stat-pill">
            <span className="stat-num">{totalTasks}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-pill stat-pill--pending">
            <span className="stat-num">{pendingTasks}</span>
            <span className="stat-label">Pendientes</span>
          </div>
        </div>
      </div>
    </header>
  );
}
