import React from 'react';

const STATUS_OPTIONS = ['Todas', 'Pendiente', 'En Progreso', 'Completada'];
const PRIORITY_OPTIONS = ['Todas', 'Alta', 'Media', 'Baja'];
const SORT_OPTIONS = [
  { value: 'createdAt-desc', label: 'Más recientes' },
  { value: 'createdAt-asc', label: 'Más antiguas' },
  { value: 'deadline-asc', label: 'Próximas a vencer' },
  { value: 'priority-desc', label: 'Prioridad: Alta → Baja' },
  { value: 'priority-asc', label: 'Prioridad: Baja → Alta' },
  { value: 'title-asc', label: 'Título A → Z' },
  { value: 'title-desc', label: 'Título Z → A' },
];

export default function FilterBar({ filters, onChange }) {
  return (
    <div className="filterbar">
      <div className="filterbar-group">
        <label className="filterbar-label">Estado</label>
        <div className="filterbar-pills">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              className={`pill ${filters.status === s ? 'pill--active' : ''}`}
              onClick={() => onChange({ ...filters, status: s })}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="filterbar-group">
        <label className="filterbar-label">Prioridad</label>
        <div className="filterbar-pills">
          {PRIORITY_OPTIONS.map((p) => (
            <button
              key={p}
              className={`pill ${filters.priority === p ? 'pill--active' : ''}`}
              onClick={() => onChange({ ...filters, priority: p })}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="filterbar-group">
        <label className="filterbar-label">Ordenar por</label>
        <select
          className="filterbar-select"
          value={filters.sort}
          onChange={(e) => onChange({ ...filters, sort: e.target.value })}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
