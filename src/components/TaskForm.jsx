import React, { useState, useEffect } from 'react';

const EMPTY_FORM = {
  title: '',
  description: '',
  priority: 'Media',
  status: 'Pendiente',
  deadline: '',
};

export default function TaskForm({ onSubmit, onCancel, initial }) {
  const [form, setForm] = useState(initial || EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(initial || EMPTY_FORM);
    setErrors({});
    setSaved(false);
  }, [initial]);

  const set = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'El título es obligatorio';
    else if (form.title.length > 100) errs.title = 'Máximo 100 caracteres';
    if (form.description.length > 500) errs.description = 'Máximo 500 caracteres';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onSubmit(form);
    setSaved(true);
    if (!initial) {
      setForm(EMPTY_FORM);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const isEditing = !!initial;

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <h2 className="form-title">{isEditing ? 'Editar tarea' : 'Nueva tarea'}</h2>

      <div className="form-field">
        <label className="form-label">
          Título <span className="required">*</span>
        </label>
        <input
          className={`form-input ${errors.title ? 'form-input--error' : ''}`}
          type="text"
          value={form.title}
          maxLength={100}
          placeholder="¿Qué hay que hacer?"
          onChange={(e) => set('title', e.target.value)}
        />
        <div className="form-meta">
          {errors.title && <span className="form-error">{errors.title}</span>}
          <span className="char-count">{form.title.length}/100</span>
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">Descripción</label>
        <textarea
          className={`form-textarea ${errors.description ? 'form-input--error' : ''}`}
          value={form.description}
          maxLength={500}
          placeholder="Detalles adicionales (opcional)..."
          rows={3}
          onChange={(e) => set('description', e.target.value)}
        />
        <div className="form-meta">
          {errors.description && <span className="form-error">{errors.description}</span>}
          <span className="char-count">{form.description.length}/500</span>
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label className="form-label">Prioridad</label>
          <select
            className="form-select"
            value={form.priority}
            onChange={(e) => set('priority', e.target.value)}
          >
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
        </div>

        <div className="form-field">
          <label className="form-label">Estado</label>
          <select
            className="form-select"
            value={form.status}
            onChange={(e) => set('status', e.target.value)}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="En Progreso">En Progreso</option>
            <option value="Completada">Completada</option>
          </select>
        </div>

        <div className="form-field">
          <label className="form-label">Fecha límite</label>
          <input
            className="form-input"
            type="date"
            value={form.deadline}
            onChange={(e) => set('deadline', e.target.value)}
          />
        </div>
      </div>

      <div className="form-actions">
        {onCancel && (
          <button type="button" className="btn btn--ghost" onClick={onCancel}>
            Cancelar
          </button>
        )}
        <button type="submit" className="btn btn--primary">
          {isEditing ? 'Guardar cambios' : 'Crear tarea'}
        </button>
        {saved && !isEditing && (
          <span className="form-success">✓ Tarea creada</span>
        )}
      </div>
    </form>
  );
}
