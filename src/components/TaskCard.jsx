import React, { useState } from 'react';

const PRIORITY_META = {
  Alta: { label: 'Alta', cls: 'priority--high' },
  Media: { label: 'Media', cls: 'priority--medium' },
  Baja: { label: 'Baja', cls: 'priority--low' },
};

const STATUS_META = {
  Pendiente: { label: 'Pendiente', cls: 'status--pending' },
  'En Progreso': { label: 'En Progreso', cls: 'status--progress' },
  Completada: { label: 'Completada', cls: 'status--done' },
};

function formatDate(dateStr) {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

function isOverdue(dateStr) {
  if (!dateStr) return false;
  return new Date(dateStr) < new Date(new Date().toDateString());
}

export default function TaskCard({ task, onEdit, onDelete, onComplete }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const isCompleted = task.status === 'Completada';
  const overdue = !isCompleted && isOverdue(task.deadline);

  const handleDeleteClick = () => {
    if (confirmDelete) {
      onDelete(task.id);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  const pm = PRIORITY_META[task.priority] || PRIORITY_META.Media;
  const sm = STATUS_META[task.status] || STATUS_META.Pendiente;

  return (
    <article className={`task-card ${isCompleted ? 'task-card--completed' : ''}`}>
      <div className="task-card-header">
        <div className="task-badges">
          <span className={`badge priority-badge ${pm.cls}`}>{pm.label}</span>
          <span className={`badge status-badge ${sm.cls}`}>{sm.label}</span>
        </div>
        {task.deadline && (
          <span className={`deadline ${overdue ? 'deadline--overdue' : ''}`}>
            {overdue ? '⚠ ' : ''}
            {formatDate(task.deadline)}
          </span>
        )}
      </div>

      <h3 className={`task-title ${isCompleted ? 'task-title--done' : ''}`}>
        {task.title}
      </h3>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-card-footer">
        <span className="task-created">
          {new Date(task.createdAt).toLocaleDateString('es-ES')}
        </span>
        <div className="task-actions">
          {!isCompleted && (
            <button
              className="btn-icon btn-icon--complete"
              title="Marcar como completada"
              onClick={() => onComplete(task.id)}
            >
              ✓
            </button>
          )}
          <button
            className="btn-icon btn-icon--edit"
            title="Editar"
            onClick={() => onEdit(task)}
          >
            ✎
          </button>
          <button
            className={`btn-icon btn-icon--delete ${confirmDelete ? 'btn-icon--confirm' : ''}`}
            title={confirmDelete ? 'Haz clic de nuevo para confirmar' : 'Eliminar'}
            onClick={handleDeleteClick}
          >
            {confirmDelete ? '¿Seguro?' : '✕'}
          </button>
        </div>
      </div>
    </article>
  );
}
