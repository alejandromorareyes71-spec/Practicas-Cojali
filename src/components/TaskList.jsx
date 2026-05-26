import React from 'react';
import TaskCard from './TaskCard';

const PRIORITY_ORDER = { Alta: 3, Media: 2, Baja: 1 };

function applyFiltersAndSort(tasks, filters) {
  let result = [...tasks];

  if (filters.status !== 'Todas') {
    result = result.filter((t) => t.status === filters.status);
  }
  if (filters.priority !== 'Todas') {
    result = result.filter((t) => t.priority === filters.priority);
  }

  const [field, dir] = filters.sort.split('-');
  result.sort((a, b) => {
    let va, vb;
    if (field === 'createdAt') {
      va = new Date(a.createdAt);
      vb = new Date(b.createdAt);
    } else if (field === 'deadline') {
      va = a.deadline ? new Date(a.deadline) : new Date('9999');
      vb = b.deadline ? new Date(b.deadline) : new Date('9999');
    } else if (field === 'priority') {
      va = PRIORITY_ORDER[a.priority] || 0;
      vb = PRIORITY_ORDER[b.priority] || 0;
    } else if (field === 'title') {
      va = a.title.toLowerCase();
      vb = b.title.toLowerCase();
    }
    if (va < vb) return dir === 'asc' ? -1 : 1;
    if (va > vb) return dir === 'asc' ? 1 : -1;
    return 0;
  });

  return result;
}

export default function TaskList({ tasks, filters, onEdit, onDelete, onComplete }) {
  const filtered = applyFiltersAndSort(tasks, filters);

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <h3>Sin tareas todavía</h3>
        <p>Crea tu primera tarea usando el formulario de arriba.</p>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="empty-state">
        <h3>Sin resultados</h3>
        <p>Ninguna tarea coincide con los filtros seleccionados.</p>
      </div>
    );
  }

  return (
    <div className="task-grid">
      {filtered.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onComplete={onComplete}
        />
      ))}
    </div>
  );
}
