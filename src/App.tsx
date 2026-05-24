import { useState, useEffect } from "react";
import KanbanBoard from "./components/kanbanBoard";
import SideBar from "./components/SideBar";
import { FaSearch } from "react-icons/fa";
import "./App.css";

const defaultColumns = [
  {
    id: "1",
    title: "To Do",
    tasks: [
      {
        name: "ZenShop Task",
        description: "Create dashboard layout using Tailwind CSS",
      },
    ],
  },
  {
    id: "2",
    title: "In Progress",
    tasks: [
      {
        name: "PriceCard Task",
        description: "Create Pricing Card using FlowBite website",
      },
      {
        name: "Form Creation Task",
        description: "Create Form using 'formik' function",
      },
    ],
  },
  {
    id: "3",
    title: "Done",
    tasks: [
      {
        name: "Kanban Board Task",
        description: "Create Kanban Board with multiple cards and drag function",
      },
    ],
  },
];

function App() {
  const [Columns, setColumns] = useState(() => {
    const saved = localStorage.getItem("kanbanColumns");
    return saved ? JSON.parse(saved) : defaultColumns;
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("kanbanColumns", JSON.stringify(Columns));
  }, [Columns]);

  const filteredColumns = Columns.map((column: any) => ({
    ...column,
    tasks: column.tasks.filter(
      (task: any) =>
        task.name.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  return (
    <div className="flex min-h-screen bg-black">
      <SideBar />

      <main className="flex-1 p-6">

        <div className="flex items-center justify-center bg-black w-full px-8 py-6 mt-6 shadow-xl rounded-xl min-h-[100px]">
          <h1 className="text-5xl font-bold text-white px-4 py-4 tracking-wide">
            KANBAN BOARD
          </h1>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-4xl font-bold text-red-500 px-15 py-5 p-3 mt-3 hover:scale-110 flex justify-center items-center gap-4">
            Kanban Board
          </h2>

          <div className="relative mt-3">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search task.."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-80 h-14 pl-10 pr-4 text-black bg-gray-300 rounded-lg outline-none hover:border-red-500 focus:ring-2 focus:ring-white"
            />
          </div>
        </div>

        <KanbanBoard columns={filteredColumns} setColumns={setColumns} />
      </main>
    </div>
  );
}

export default App;