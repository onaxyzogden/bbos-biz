import { create } from 'zustand';
import { safeGetJSON, safeSet } from '../services/storage';
import { genTaskId, genSubtaskId, genCheckId } from '../services/id';

function persistTasks(projectId, tasks) {
  safeSet(`tasks_${projectId}`, tasks);
}

export const useTaskStore = create((set, get) => ({
  // { [projectId]: Task[] }
  tasksByProject: {},

  loadTasks: (projectId) => {
    const tasks = safeGetJSON(`tasks_${projectId}`, []);
    set((s) => ({
      tasksByProject: { ...s.tasksByProject, [projectId]: tasks },
    }));
  },

  getTasksByColumn: (projectId, columnId) => {
    const tasks = get().tasksByProject[projectId] || [];
    return tasks
      .filter((t) => t.columnId === columnId)
      .sort((a, b) => a.order - b.order);
  },

  getTask: (projectId, taskId) => {
    const tasks = get().tasksByProject[projectId] || [];
    return tasks.find((t) => t.id === taskId) || null;
  },

  createTask: (projectId, columnId, title, opts = {}) => {
    const tasks = get().tasksByProject[projectId] || [];
    const colTasks = tasks.filter((t) => t.columnId === columnId);
    const task = {
      id: genTaskId(),
      projectId,
      columnId,
      title,
      description: '',
      priority: 'medium',
      dueDate: null,
      tags: [],
      subtasks: [],
      checklist: [],
      order: colTasks.length,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completedAt: null,
      ...opts,
    };
    set((s) => {
      const updated = [...(s.tasksByProject[projectId] || []), task];
      persistTasks(projectId, updated);
      return { tasksByProject: { ...s.tasksByProject, [projectId]: updated } };
    });
    return task;
  },

  updateTask: (projectId, taskId, updates) => set((s) => {
    const tasks = (s.tasksByProject[projectId] || []).map((t) =>
      t.id === taskId ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
    );
    persistTasks(projectId, tasks);
    return { tasksByProject: { ...s.tasksByProject, [projectId]: tasks } };
  }),

  deleteTask: (projectId, taskId) => set((s) => {
    const tasks = (s.tasksByProject[projectId] || []).filter((t) => t.id !== taskId);
    persistTasks(projectId, tasks);
    return { tasksByProject: { ...s.tasksByProject, [projectId]: tasks } };
  }),

  moveTask: (projectId, taskId, toColumnId, newOrder) => set((s) => {
    let tasks = [...(s.tasksByProject[projectId] || [])];
    const taskIdx = tasks.findIndex((t) => t.id === taskId);
    if (taskIdx === -1) return {};

    const task = { ...tasks[taskIdx] };
    const fromColumnId = task.columnId;
    task.columnId = toColumnId;
    task.order = newOrder;
    task.updatedAt = new Date().toISOString();

    // Set completedAt when moved to last column (assumed "Done")
    if (fromColumnId !== toColumnId) {
      // We'll check column name in the component; here just track the move
      task.completedAt = null; // Reset; component sets this if needed
    }

    tasks[taskIdx] = task;

    // Reorder tasks in the target column
    const colTasks = tasks
      .filter((t) => t.columnId === toColumnId && t.id !== taskId)
      .sort((a, b) => a.order - b.order);

    colTasks.splice(newOrder, 0, task);
    colTasks.forEach((t, i) => {
      const idx = tasks.findIndex((x) => x.id === t.id);
      if (idx !== -1) tasks[idx] = { ...tasks[idx], order: i };
    });

    persistTasks(projectId, tasks);
    return { tasksByProject: { ...s.tasksByProject, [projectId]: tasks } };
  }),

  addSubtask: (projectId, taskId, title) => set((s) => {
    const tasks = (s.tasksByProject[projectId] || []).map((t) => {
      if (t.id !== taskId) return t;
      return {
        ...t,
        subtasks: [...t.subtasks, { id: genSubtaskId(), title, done: false }],
        updatedAt: new Date().toISOString(),
      };
    });
    persistTasks(projectId, tasks);
    return { tasksByProject: { ...s.tasksByProject, [projectId]: tasks } };
  }),

  toggleSubtask: (projectId, taskId, subtaskId) => set((s) => {
    const tasks = (s.tasksByProject[projectId] || []).map((t) => {
      if (t.id !== taskId) return t;
      return {
        ...t,
        subtasks: t.subtasks.map((st) =>
          st.id === subtaskId ? { ...st, done: !st.done } : st
        ),
        updatedAt: new Date().toISOString(),
      };
    });
    persistTasks(projectId, tasks);
    return { tasksByProject: { ...s.tasksByProject, [projectId]: tasks } };
  }),

  removeSubtask: (projectId, taskId, subtaskId) => set((s) => {
    const tasks = (s.tasksByProject[projectId] || []).map((t) => {
      if (t.id !== taskId) return t;
      return {
        ...t,
        subtasks: t.subtasks.filter((st) => st.id !== subtaskId),
        updatedAt: new Date().toISOString(),
      };
    });
    persistTasks(projectId, tasks);
    return { tasksByProject: { ...s.tasksByProject, [projectId]: tasks } };
  }),

  addChecklistItem: (projectId, taskId, text) => set((s) => {
    const tasks = (s.tasksByProject[projectId] || []).map((t) => {
      if (t.id !== taskId) return t;
      return {
        ...t,
        checklist: [...t.checklist, { id: genCheckId(), text, done: false }],
        updatedAt: new Date().toISOString(),
      };
    });
    persistTasks(projectId, tasks);
    return { tasksByProject: { ...s.tasksByProject, [projectId]: tasks } };
  }),

  toggleChecklistItem: (projectId, taskId, checkId) => set((s) => {
    const tasks = (s.tasksByProject[projectId] || []).map((t) => {
      if (t.id !== taskId) return t;
      return {
        ...t,
        checklist: t.checklist.map((c) =>
          c.id === checkId ? { ...c, done: !c.done } : c
        ),
        updatedAt: new Date().toISOString(),
      };
    });
    persistTasks(projectId, tasks);
    return { tasksByProject: { ...s.tasksByProject, [projectId]: tasks } };
  }),

  getTaskStats: (projectId) => {
    const tasks = get().tasksByProject[projectId] || [];
    return {
      total: tasks.length,
      completed: tasks.filter((t) => t.completedAt).length,
      overdue: tasks.filter((t) => t.dueDate && new Date(t.dueDate) < new Date() && !t.completedAt).length,
    };
  },

  searchAllTasks: (query) => {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    const results = [];
    const all = get().tasksByProject;
    for (const [projectId, tasks] of Object.entries(all)) {
      for (const task of tasks) {
        if (results.length >= 15) break;
        const matchTitle = task.title?.toLowerCase().includes(q);
        const matchDesc = task.description?.toLowerCase().includes(q);
        const matchTag = task.tags?.some((t) => t.toLowerCase().includes(q));
        if (matchTitle || matchDesc || matchTag) {
          results.push({ ...task, projectId });
        }
      }
      if (results.length >= 15) break;
    }
    return results;
  },

  getFilteredTasks: (projectId, filters) => {
    const tasks = get().tasksByProject[projectId] || [];
    if (!filters) return tasks;
    const { priorities, dueDate, tags } = filters;
    const hasFilters = (priorities?.length > 0) || dueDate || (tags?.length > 0);
    if (!hasFilters) return tasks;

    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(now);
    endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()));

    return tasks.filter((task) => {
      if (priorities?.length > 0 && !priorities.includes(task.priority)) return false;
      if (dueDate) {
        const d = task.dueDate ? new Date(task.dueDate) : null;
        if (d) d.setHours(0, 0, 0, 0);
        switch (dueDate) {
          case 'overdue': if (!d || d >= now) return false; break;
          case 'today': if (!d || d.getTime() !== now.getTime()) return false; break;
          case 'this-week': if (!d || d < now || d > endOfWeek) return false; break;
          case 'no-date': if (d) return false; break;
        }
      }
      if (tags?.length > 0 && !tags.every((t) => task.tags?.includes(t))) return false;
      return true;
    });
  },
}));
