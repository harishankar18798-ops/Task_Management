import { useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from '@mui/material/MenuItem';
import { useForm } from "react-hook-form";

import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import {
  deleteTodo,
  createTodo,
  updateTodo,
} from "../redux/todoSlice";
import { useDispatch } from "react-redux";

interface TaskForm {
  name: string;
  stageId: number;
}

const paginationModel = { page: 0, pageSize: 10 };

export default function TaskTable() {
  const [newTask, setNewTask] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [stageId, setstageId] = useState<number>(0);
  const { register, handleSubmit, reset } = useForm<TaskForm>();
  const dispatch = useDispatch<any>();
  const rows = useSelector((state: RootState) => state.todos.rows);
  const stages = useSelector((state: RootState) => state.stages.rows);

  const columns: GridColDef[] = [
    {
      field: 'sno',
      headerName: 'S.No',
      flex:0.5,
      sortable: false,
      renderCell: (params) => {
        return params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1;
    }},
    // { field: 'id', headerName: 'ID',  flex: 0.3 },
    { field: 'name', headerName: 'Task name',  flex: 1 },
    { field: 'stage', headerName: 'Stage',  flex: 1, renderCell: (params) => params.row.stage?.name },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
        <Button
          size="small"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => handleDelete(params.row.id)}
        />
        <Button
          size="small"
          color="primary"
          startIcon={<EditIcon />}
          onClick={() => handleClickOpen(params.row.id)}
        />
        </>
      ),
    },
  ];

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleAddTask = () => {
      if (!newTask.trim()) return;
  
      dispatch( createTodo({name: newTask, stageId: 1}) );
      setNewTask("");
  };

  const handleClickOpen = (id: number) => {
    const task = rows.find(row => row.id === id);
      if (task) {
        reset({ name: task.name });
        setstageId(task.stage?.id || 0);
      }
    setSelectedTaskId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTaskId(null);
  };

  const onSubmit = (data: TaskForm) => {
      if (!selectedTaskId) return;
  
      dispatch( updateTodo({ id: selectedTaskId, name: data.name, stageId }) );
      handleClose();
    };

  const handleSelectChange = (event: any) => {
    setstageId(event.target.value as number);
  };

  return (
    <Box sx={{ p: 1 }}>
      <Paper sx={{ height: '100%', width: '100%' }}>

        <Box sx={{ display: "flex", gap: 2, p: 2 }}>
          <TextField
            size="small"
            placeholder="New Task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            sx={{ width: 250 }}
          />

          <Button
            variant="contained"
            onClick={handleAddTask}
            sx={{ bgcolor: "#7b1fa2" }}
          >
            Add
          </Button>
        </Box>

        <Box sx={{ height: 'calc(100vh - 160px)', mt: 4, px: 2 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10, 20]}
            disableColumnMenu
            disableRowSelectionOnClick
            sx={{ border: 0 }}
          />
        </Box>

        <Dialog open={open} onClose={handleClose}>
                <DialogTitle>TASK UPDATE</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To update task , please enter new task name here and select Stage.
                  </DialogContentText>
                  <form onSubmit={handleSubmit(onSubmit)} id="task-form">
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="name"
                      label="Task Name"
                      type="text"
                      fullWidth
                      variant="standard"
                      {...register("name")}
                    />
                    <FormControl fullWidth margin="dense" sx={{ mt: 2 }}>
                        <InputLabel htmlFor="stage-select">Stage</InputLabel>
        
                        <Select
                          value={stageId}
                          onChange={handleSelectChange}
                          input={<OutlinedInput label="Stage" id="stage-select" />}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 300,
                              },
                            },
                          }}
                        >
                          {stages.map((s) => (
                            <MenuItem  key={s.id} value={s.id}>
                              {s.name}
                            </MenuItem >
                          ))}
                        </Select>
                      </FormControl>
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit" form="task-form">
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
        
      </Paper>
    </Box>
  );
}