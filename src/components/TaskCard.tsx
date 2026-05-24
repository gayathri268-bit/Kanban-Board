import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { FaCalendarAlt, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

function TaskCard(props: any) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.task.name,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(props.task.name);
  const [editedDescription, setEditedDescription] = useState(props.task.description);

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const handleSave = () => {
    props.handleEditSave(props.task.name, editedTask, editedDescription);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask(props.task.name);
    setEditedDescription(props.task.description);
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        p-6
        px-4
        gap-2
        w-full
        mb-4
        rounded-xl
        border
        border-yellow-100
        hover:scale-105
        hover:shadow-2xl
        cursor-grab
        active:cursor-grabbing
        transition duration-300
        ${
            props.task.name === "ZenShop Task"
            ? "bg-green-700 text-xl font-bold hover:bg-green-600 transition duration-300"
            : props.task.name === "PriceCard Task"
            ? "bg-purple-700 text-xl font-bold hover:bg-purple-500 transition duration-300"
            : props.task.name === "Form Creation Task"
            ? "bg-purple-700 text-xl font-bold hover:bg-purple-500 transition duration-300"
            : props.task.name === "Kanban Board Task"
            ? "bg-orange-500 text-xl font-bold hover:bg-amber-400 transition duration-300"
            : "bg-white/10"
        }
        }
      `}
    >
      {isEditing ? (
        <input
          type="text"
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
          onPointerDown={(e) => e.stopPropagation()}
          className="w-full p-2 rounded text-black mb-2 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />
      ) : (
        <h3 className="text-white text-xl font-bold mt-2 hover:underline cursor-pointer">
          {props.task.name}
        </h3>
      )}
       {isEditing ? (
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          onPointerDown={(e) => e.stopPropagation()}
          className="w-full p-2 rounded text-black mb-2 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          rows={3}
        />
      ) : (
        <p className="inline-block mb-4 px-2 py-2 text-l text-white font-semibold gap-2 rounded-lg hover:bg-slate-600 hover:text-white">
          {props.task.description}
        </p>
      )}

      <div className="flex items-center gap-2 text-white/70 text-sm mb-3">
        <FaCalendarAlt className="text-blue-500" />
        <span>{today}</span>
      </div>

      <div className="flex gap-4 mb-4">
        {isEditing ? (
          <>
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={handleSave}
              className="flex items-center gap-1 px-3 py-2 text-s text-white bg-green-600 border border-green-300 font-semibold rounded-lg hover:bg-green-500 hover:scale-105 transition duration-300"
            >
              <FaSave /> Save
            </button>
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={handleCancel}
              className="flex items-center gap-1 px-3 py-2 text-s text-white bg-slate-600 border border-slate-300 font-semibold rounded-lg hover:bg-slate-500 hover:scale-105 transition duration-300"
            >
              <FaTimes /> Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 px-3 py-2 text-s text-white border border-green-200 font-semibold rounded-lg hover:bg-slate-500 hover:scale-105 focus:ring-2 focus:ring-black transition duration-300"
            >
              <FaEdit /> Edit
            </button>

            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => props.handleDelete(props.task.name)}
              className="flex items-center gap-1 px-3 py-2 text-s text-white bg-red-700 border border-white font-semibold rounded-lg hover:bg-slate-500 hover:scale-105 transition duration-300"
            >
              <FaTrash /> Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskCard;