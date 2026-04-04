import { create } from 'zustand';
import { safeGetJSON, safeSet, safeRemove } from '../services/storage';
import { genProjectId, genColumnId } from '../services/id';
import { DEFAULT_COLUMNS, PROJECT_COLORS } from '../data/modules';

function persistProjects(projects) {
  safeSet('projects', projects);
}

export const useProjectStore = create((set, get) => ({
  projects: safeGetJSON('projects', []),

  createProject: ({ name, description = '', color, icon = 'Folder' }) => {
    const project = {
      id: genProjectId(),
      name,
      description,
      color: color || PROJECT_COLORS[Math.floor(Math.random() * PROJECT_COLORS.length)],
      icon,
      columns: DEFAULT_COLUMNS.map((col) => ({
        id: genColumnId(),
        name: col.name,
        color: col.color,
      })),
      defaultView: 'board',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      archived: false,
    };
    set((s) => {
      const projects = [...s.projects, project];
      persistProjects(projects);
      return { projects };
    });
    return project;
  },

  updateProject: (id, updates) => set((s) => {
    const projects = s.projects.map((p) =>
      p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
    );
    persistProjects(projects);
    return { projects };
  }),

  deleteProject: (id) => {
    safeRemove(`tasks_${id}`);
    set((s) => {
      const projects = s.projects.filter((p) => p.id !== id);
      persistProjects(projects);
      return { projects };
    });
  },

  archiveProject: (id) => set((s) => {
    const projects = s.projects.map((p) =>
      p.id === id ? { ...p, archived: !p.archived, updatedAt: new Date().toISOString() } : p
    );
    persistProjects(projects);
    return { projects };
  }),

  addColumn: (projectId, name, color = 'var(--col-todo)') => set((s) => {
    const projects = s.projects.map((p) =>
      p.id === projectId
        ? { ...p, columns: [...p.columns, { id: genColumnId(), name, color }], updatedAt: new Date().toISOString() }
        : p
    );
    persistProjects(projects);
    return { projects };
  }),

  removeColumn: (projectId, columnId) => set((s) => {
    const projects = s.projects.map((p) =>
      p.id === projectId
        ? { ...p, columns: p.columns.filter((c) => c.id !== columnId), updatedAt: new Date().toISOString() }
        : p
    );
    persistProjects(projects);
    return { projects };
  }),

  getProject: (id) => get().projects.find((p) => p.id === id) || null,
  getActiveProjects: () => get().projects.filter((p) => !p.archived),
}));
