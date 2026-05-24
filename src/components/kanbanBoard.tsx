import TaskCard from "./TaskCard";
import { DndContext, closestCorners, useDroppable } from "@dnd-kit/core";
import { useState } from "react";

function DroppableColumn({ column, children }: { column: any; children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <div
      ref={setNodeRef}
      key={column.id}
      id={column.id}
      className={`w-full rounded-xl ml-4 text-xl font-bold px-6 py-7 min-h-[400px] h-auto shadow-lg ${
        column.title === "To Do"
          ? "bg-green-900 text-white"
          : column.title === "In Progress"
          ? "bg-purple-900 text-white"
          : "bg-orange-600 text-white"
      }`}
    >
      {children}
    </div>
  );
}

function KanbanBoard({ columns, setColumns }: any) {

  const [newTask, setNewTask] = useState<Record<string, string>>({});
  const [newDescription, setNewDescription] = useState<Record<string, string>>({});
  const [openForms, setOpenForms] = useState<{ id: number; columnId: string }[]>([]);

  const handleDelete = (taskName: string) => {
    const updated = columns.map((column: any) => ({
      ...column,
      tasks: column.tasks.filter((task: any) => task.name !== taskName),
    }));
    setColumns(updated);
  };

  const handleEditSave = (oldName: string, newName: string, newDesc: string) => {
    const updated = columns.map((column: any) => ({
      ...column,
      tasks: column.tasks.map((task: any) =>
        task.name === oldName
          ? { ...task, name: newName, description: newDesc }
          : task
      ),
    }));
    setColumns(updated);
  };

  const handleAddTask = (columnId: string) => {
    if (!newTask[columnId] || !newDescription[columnId]) return;

    const task = {
      name: newTask[columnId],
      description: newDescription[columnId],
    };

    const updated = columns.map((column: any) => {
      if (column.id === columnId) {
        return { ...column, tasks: [...column.tasks, task] };
      }
      return column;
    });

    setColumns(updated);
    setNewTask((prev) => ({ ...prev, [columnId]: "" }));
    setNewDescription((prev) => ({ ...prev, [columnId]: "" }));
    setOpenForms((prev) => prev.filter((form) => form.columnId !== columnId));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = active.id;
    const overColumn = over.data.current?.sortable?.containerId || over.id;

    let draggedTask: any = null;

    const updatedColumns = columns.map((column: any) => {
      const filteredTasks = column.tasks.filter((task: any) => {
        if (task.name === activeTask) {
          draggedTask = task;
          return false;
        }
        return true;
      });
      return { ...column, tasks: filteredTasks };
    });

    if (!draggedTask) return;

    const finalColumns = updatedColumns.map((column: any) => {
      if (String(column.id) === String(overColumn)) {
        return { ...column, tasks: [...column.tasks, draggedTask] };
      }
      return column;
    });

    setColumns(finalColumns);
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 gap-6 px-10">
        {columns.map((column: any) => (
          <DroppableColumn key={column.id} column={column}>

            <h2 className="text-2xl py-2 font-bold rounded-lg mb-4">
              {column.title}
            </h2>

            {openForms
              .filter((form) => form.columnId === column.id)
              .map((form) => (
                <div
                  key={form.id}
                  className="bg-white w-full p-3 mb-4 rounded-lg shadow-lg hover:scale-90 transition duration-300"
                >
                  <input
                    type="text"
                    placeholder="Enter task title"
                    value={newTask[column.id] || ""}
                    onChange={(e) =>
                      setNewTask((prev) => ({ ...prev, [column.id]: e.target.value }))
                    }
                    className="w-full border border-slate-600 p-2 rounded-lg mb-2 text-black hover:bg-purple-200 hover:scale-90 transition duration-300"
                  />

                  <textarea
                    placeholder="Enter Description"
                    value={newDescription[column.id] || ""}
                    onChange={(e) =>
                      setNewDescription((prev) => ({ ...prev, [column.id]: e.target.value }))
                    }
                    className="w-full border border-slate-600 p-2 rounded-lg mb-2 text-black hover:bg-green-100 hover:scale-90 transition duration-300"
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddTask(column.id)}
                      className="bg-white border border-slate-600 mt-6 px-3 py-2 gap-8 rounded-lg shadow-xl text-black font-bold hover:bg-slate-300 hover:text-black hover:scale-90 cursor-pointer transition duration-300"
                    >
                      Add
                    </button>

                    <button
                      onClick={() =>
                        setOpenForms((prev) => prev.filter((f) => f.id !== form.id))
                      }
                      className="bg-white text-black rounded-lg border border-slate-600 shadow mt-6 px-3 py-2 gap-8 hover:bg-blue-200 hover:scale-90 transition duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}

            <div className="space-y-4 px-2 mt-6">
              {column.tasks.map((task: any) => (
                <TaskCard
                  key={task.name}
                  task={task}
                  handleDelete={handleDelete}
                  handleEditSave={handleEditSave}
                />
              ))}
            </div>

            <button
              onClick={() =>
                setOpenForms((prev) => [
                  ...prev,
                  { id: Date.now(), columnId: column.id },
                ])
              }
              className="bg-gray-300 mt-6 px-3 py-2 rounded-lg text-black font-semibold hover:bg-yellow-400 hover:text-black hover:scale-90 cursor-pointer transition duration-300"
            >
              + Add Task
            </button>

          </DroppableColumn>
        ))}
      </div>
    </DndContext>
  );
}

export default KanbanBoard;