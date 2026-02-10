import { ListTodo, List } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setTodos } from "../redux/todoSlice";
import { setstages } from "../redux/stageSlice";
import type { AppDispatch } from "../redux/store";

interface Task {
  id: number;
  name: string;
  stageId: number;
}

interface StageForm {
  id: number;
  name: string;
}

export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
      fetchTasks();
      fetchStages();
    }, []);

  const fetchTasks = async () => {
      try {
        const res = await axios.get<Task[]>(`http://localhost:5000/api/gettasks`);
        console.log(res.data);
        dispatch(setTodos(res.data));
      } catch (err) {
        console.error("Error loading tasks", err);
      }
    };

  const fetchStages = async () => {
      try {
        const res = await axios.get<StageForm[]>(`http://localhost:5000/api/getstages`);
        dispatch(setstages(res.data));
      } catch (err) {
        console.error("Error loading Stages", err);
      }
    };
  
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-5xl w-full">
        
        <div className="text-center mb-8 sm:mb-12 mt-12 sm:mt-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2 sm:mb-4 px-4">
            Task Management
          </h1>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <button
            onClick={() => navigate('/todo')}
            className="bg-white border border-gray-200 p-6 sm:p-8 rounded-lg hover:shadow-lg"
          >
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-400 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                <ListTodo className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-1 sm:mb-2">
                To Do Board
              </h2>
            </div>
          </button>

          <button
            onClick={() => navigate('/tasklist')}
            className="bg-white border border-gray-200 p-6 sm:p-8 rounded-lg hover:shadow-lg"
          >
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-400 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                <List className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-1 sm:mb-2">
                Task List
              </h2>
            </div>
          </button>


        </div>
      </div>
    </div>
  );
}