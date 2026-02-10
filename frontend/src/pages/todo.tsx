import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Container,
} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from "react-hook-form";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from '@mui/material/MenuItem';
import Grid from "@mui/material/Grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';

import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import {
  createTodo,
  updateTodo,
  deleteTodo,
} from "../redux/todoSlice";
import { useDispatch } from "react-redux";

interface TaskForm {
  name: string;
  stageId: number;
}

interface Task {
  id: number;
  name: string;
  stageId: number;
}

const TodoBoard = () => {
  const [newTask, setNewTask] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [stageId, setstageId] = useState<number>(0);
  const { register, handleSubmit, reset } = useForm<TaskForm>();
  
  const dispatch = useDispatch<any>();
  const rows = useSelector((state: RootState) => state.todos.rows);
  const stages = useSelector((state: RootState) => state.stages.rows);

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleAddTask = () => {
    if (!newTask.trim()) return;

    dispatch(createTodo({ name: newTask, stageId: 1 }));
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

  const getTasksByStage = (stageId: number) => {
    return rows.filter((t: Task) => t.stageId === stageId);
  };

  const onSubmit = (data: TaskForm) => {
    if (!selectedTaskId) return;

    dispatch(updateTodo({ id: selectedTaskId, name: data.name, stageId }));
    handleClose();
  };

  const handleSelectChange = (event: any) => {
    setstageId(event.target.value as number);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Get the task ID from draggableId
    const taskId = Number(draggableId);
    
    // Get the new stage ID from destination droppableId
    const newStageId = Number(destination.droppableId);

    // Find the task
    const task = rows.find((t: Task) => t.id === taskId);
    
    if (task) {
      dispatch(updateTodo({ 
        id: taskId, 
        name: task.name, 
        stageId: newStageId 
      }));
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
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

      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={2}>
          {stages.map((stage) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={stage.id}>
              <Paper
                sx={{
                  p: 2,
                  minHeight: 460,
                  bgcolor: "#f5f5f5",
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {stage.name}
                </Typography>

                <Droppable droppableId={String(stage.id)}>
                  {(provided, snapshot) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      sx={{
                        minHeight: 400,
                        bgcolor: snapshot.isDraggingOver ? '#e0e0e0' : 'transparent',
                      }}
                    >
                      {getTasksByStage(stage.id).map((task: Task, index: number) => (
                        <Draggable
                          draggableId={String(task.id)}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              sx={{
                                mb: 2,
                                // boxShadow: snapshot.isDragging
                                //   ? '0 8px 16px rgba(0,0,0,0.2)'
                                //   : undefined,
                              }}
                            >
                              <CardContent sx={{ p: 1 }}>
                                <Typography>{task.name}</Typography>
                                <Box
                                  sx={{
                                    mt: 1,
                                    display: "flex",
                                    justifyContent: "flex-end",
                                  }}
                                >
                                  <Button
                                    size="small"
                                    startIcon={<EditIcon />}
                                    color="primary"
                                    onClick={() => handleClickOpen(task.id)}
                                  />
                                  <Button
                                    size="small"
                                    color="error"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => handleDelete(task.id)}
                                  />
                                </Box>
                              </CardContent>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                    </Box>
                  )}
                </Droppable>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>TASK UPDATE</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update task, please enter new task name here and select Stage.
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
                  <MenuItem key={s.id} value={s.id}>
                    {s.name}
                  </MenuItem>
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
    </Container>
  );
};

export default TodoBoard;