import { useMemo } from 'react';
import { useProjectStore } from '../store/project-store';
import { useTaskStore } from '../store/task-store';

function isDoneColumn(columnId) {
  return columnId?.endsWith('_done');
}

function isTaskDone(task) {
  return task.completedAt || isDoneColumn(task.columnId);
}

/**
 * Calculate progress for a single module by aggregating tasks
 * across all projects tagged with that moduleId.
 */
export function useModuleProgress(moduleId) {
  const projects = useProjectStore((s) => s.projects);
  const tasksByProject = useTaskStore((s) => s.tasksByProject);

  return useMemo(() => {
    const moduleProjects = projects.filter((p) => p.moduleId === moduleId);
    let total = 0;
    let completed = 0;

    for (const proj of moduleProjects) {
      const tasks = tasksByProject[proj.id] || [];
      total += tasks.length;
      completed += tasks.filter(isTaskDone).length;
    }

    return {
      total,
      completed,
      pct: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [moduleId, projects, tasksByProject]);
}

/**
 * Calculate progress for multiple modules at once.
 * @param {string[]} moduleIds - submodule identifiers (e.g. 'shahada', 'salat')
 * @param {string} [level] - optional level filter ('core', 'growth', 'excellence').
 *   When provided, only projects whose id ends with `_${level}` are counted.
 * Returns a map of moduleId → { total, completed, pct } plus an overallPct.
 */
export function useModulesProgress(moduleIds, level) {
  const projects = useProjectStore((s) => s.projects);
  const tasksByProject = useTaskStore((s) => s.tasksByProject);

  return useMemo(() => {
    const progressMap = {};
    let grandTotal = 0;
    let grandCompleted = 0;

    for (const moduleId of moduleIds) {
      let moduleProjects = projects.filter((p) => p.moduleId === moduleId);
      if (level) {
        moduleProjects = moduleProjects.filter((p) => p.id.endsWith('_' + level));
      }
      let total = 0;
      let completed = 0;

      for (const proj of moduleProjects) {
        const tasks = tasksByProject[proj.id] || [];
        total += tasks.length;
        completed += tasks.filter(isTaskDone).length;
      }

      progressMap[moduleId] = {
        total,
        completed,
        pct: total > 0 ? Math.round((completed / total) * 100) : 0,
      };

      grandTotal += total;
      grandCompleted += completed;
    }

    return {
      progressMap,
      overallPct: grandTotal > 0 ? Math.round((grandCompleted / grandTotal) * 100) : 0,
    };
  }, [moduleIds, level, projects, tasksByProject]);
}
