import { useState, useMemo } from 'react';
import {
  DndContext,
  pointerWithin,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useTaskStore } from '../../store/task-store';
import { getTaskAccessLevel } from '../../data/bbos-role-access';
import KanbanColumn from './KanbanColumn';
import KanbanCard from './KanbanCard';
import './KanbanBoard.css';

export default function KanbanBoard({ project, onSelectTask, filters, bbosFilter, bbosRole }) {
  const tasksByProject = useTaskStore((s) => s.tasksByProject);
  const getFilteredTasks = useTaskStore((s) => s.getFilteredTasks);
  const moveTask = useTaskStore((s) => s.moveTask);
  const createTask = useTaskStore((s) => s.createTask);
  const [activeId, setActiveId] = useState(null);

  const allTasks = tasksByProject[project.id] || [];
  const filteredTasks = useMemo(
    () => getFilteredTasks(project.id, filters),
    [allTasks, filters, project.id, getFilteredTasks]
  );

  // Apply role-based access filtering: hide tasks with '-' access
  const tasks = useMemo(() => {
    if (!bbosRole || bbosRole === 'all') return filteredTasks;
    return filteredTasks.filter((t) => getTaskAccessLevel(bbosRole, t.bbosTaskType) !== '-');
  }, [filteredTasks, bbosRole]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } })
  );

  const getTasksByColumn = (columnId) =>
    tasks.filter((t) => t.columnId === columnId).sort((a, b) => a.order - b.order);

  const activeTask = activeId ? allTasks.find((t) => t.id === activeId) : null;

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = allTasks.find((t) => t.id === active.id);
    if (!activeTask) return;

    const overTask = allTasks.find((t) => t.id === over.id);
    if (overTask && activeTask.columnId !== overTask.columnId) {
      moveTask(project.id, active.id, overTask.columnId, overTask.order);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const taskId = active.id;
    const task = allTasks.find((t) => t.id === taskId);
    if (!task) return;

    let targetColumnId;
    let targetOrder;

    const overTask = allTasks.find((t) => t.id === over.id);
    if (overTask) {
      targetColumnId = overTask.columnId;
      targetOrder = overTask.order;
    } else {
      targetColumnId = over.id;
      const colTasks = getTasksByColumn(targetColumnId);
      targetOrder = colTasks.length;
    }

    if (task.columnId === targetColumnId && task.order === targetOrder) return;

    moveTask(project.id, taskId, targetColumnId, targetOrder);
  };

  const handleAddTask = (columnId) => {
    const opts = bbosFilter ? { bbosStage: bbosFilter } : {};
    const task = createTask(project.id, columnId, 'Untitled', opts);
    onSelectTask(task.id);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="kanban-board">
        {project.columns.map((col) => {
          const colTasks = getTasksByColumn(col.id);
          return (
            <SortableContext
              key={col.id}
              items={colTasks.map((t) => t.id)}
              strategy={verticalListSortingStrategy}
            >
              <KanbanColumn
                column={col}
                tasks={colTasks}
                onSelectTask={onSelectTask}
                onAddTask={() => handleAddTask(col.id)}
                bbosRole={bbosRole}
              />
            </SortableContext>
          );
        })}
      </div>

      <DragOverlay>
        {activeTask ? (
          <KanbanCard task={activeTask} isDragOverlay />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
