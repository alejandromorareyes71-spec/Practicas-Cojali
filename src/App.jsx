import React, { useState } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { useTasks } from './hooks/useTasks';
import './styles/main.css';

const DEFAULT_FILTERS = {
  status: 'Todas',
  priority: 'Todas',
  sort: 'createdAt-desc',
};

export default function App() {
  const { tasks, addTask, updateTask, deleteTask, completeTask } = useTasks();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleCreate = (data) => {
    addTask(data);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdate = (data) => {
    updateTask(editingTask.id, data);
    setEditingTask(null);
  };

  const handleCancelEdit = () => setEditingTask(null);

  const pendingCount = tasks.filter((t) => t.status === 'Pendiente').length;

  return (
    <div className="app">
      <Header totalTasks={tasks.length} pendingTasks={pendingCount} />

      <main className="main">
        <div className="container">
          {/* Panel de formulario */}
          <section className="form-section">
            {editingTask ? (
              <TaskForm
                initial={editingTask}
                onSubmit={handleUpdate}
                onCancel={handleCancelEdit}
              />
            ) : (
              <>
                <button
                  className={`toggle-form-btn ${showForm ? 'toggle-form-btn--open' : ''}`}
                  onClick={() => setShowForm((v) => !v)}
                >
                  {showForm ? '− Cerrar formulario' : '+ Nueva tarea'}
                </button>
                {showForm && (
                  <TaskForm onSubmit={handleCreate} />
                )}
              </>
            )}
          </section>

          {/* Filtros */}
          <FilterBar filters={filters} onChange={setFilters} />

          {/* Contador */}
          <div className="task-count">
            Mostrando{' '}
            <strong>
              {tasks.filter((t) => {
                if (filters.status !== 'Todas' && t.status !== filters.status) return false;
                if (filters.priority !== 'Todas' && t.priority !== filters.priority) return false;
                return true;
              }).length}
            </strong>{' '}
            de <strong>{tasks.length}</strong> tareas
          </div>

          {/* Lista */}
          <TaskList
            tasks={tasks}
            filters={filters}
            onEdit={handleEdit}
            onDelete={deleteTask}
            onComplete={completeTask}
          />
        </div>
      </main>
    </div>
  );
}
