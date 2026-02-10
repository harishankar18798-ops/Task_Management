import { Routes, Route } from "react-router-dom";
import TodoBoard from "./pages/todo";
import HomePage from "./pages/home";
import TaskTable from "./pages/tasklist";

function App() {
  return (
    <Routes>
      <Route path="/todo" element={<TodoBoard />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/tasklist" element={<TaskTable />} />
    </Routes>
  );
}

export default App;
