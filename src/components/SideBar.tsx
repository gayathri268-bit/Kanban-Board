import { FaUser, FaClipboardList, FaCalendarAlt, FaTrophy, FaThLarge, FaTasks, FaCog } from "react-icons/fa";

function SideBar() {
  return (
    <aside className="w-90 min-h-screen bg-gradient-to-t from-red-600 to-black/70 shadow-xl text-white p-6 flex flex-col justify-between mb-4">

      <div>
        <h1 className="text-3xl font-bold mb-10 flex items-center gap-3">
          <FaThLarge className="text-cyan-400" />
          KanBan Board
        </h1>

        <div className="text-2xl flex items-center gap-3 p-4 hover:bg-red-500 rounded-xl cursor-pointer transition">
          <FaClipboardList />
          <p className="font-bold">Board</p>
        </div>

        <div className="text-2xl flex items-center gap-3 hover:bg-red-500 p-4 rounded-xl cursor-pointer transition">
          <FaTasks />
          <p className="font-bold">All Tasks</p>
        </div>

        <div className="text-2xl flex items-center gap-3 hover:bg-red-500 p-4 rounded-xl cursor-pointer transition">
          <FaCalendarAlt />
          <p className="font-bold">Calendar</p>
        </div>

        <div className="text-2xl flex items-center gap-3 hover:bg-red-500 p-4 rounded-xl cursor-pointer transition">
          <FaUser size={20} />
          <p className="font-bold">My Tasks</p>
        </div>

        <div className="text-2xl flex items-center gap-3 hover:bg-red-500 p-4 rounded-xl cursor-pointer transition">
          <FaCog />
          <p className="font-bold">Settings</p>
        </div>
      </div>

      <div className="bg-black shadow-xl border border-red-500 p-6 mb-17 rounded-2xl">
        <FaTrophy className="text-3xl mb-4" />
        <h2 className="text-3xl font-bold mb-4">Stay Productive!</h2>
        <p className="text-xl text-gray-200">Organize your work and get things done.</p>
      </div>

    </aside>
  );
}

export default SideBar;