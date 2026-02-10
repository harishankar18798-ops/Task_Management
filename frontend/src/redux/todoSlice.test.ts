import todoReducer, {
  setTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "./todoSlice";

describe("todoSlice", () => {

  const initialState = {
    rows: [],
  };

  test("should set todos", () => {

    const data = [
      { id: 1, name: "Task 1", stageId: 1 },
      { id: 2, name: "Task 2", stageId: 2 },
    ];

    const result = todoReducer(initialState, setTodos(data));

    expect(result.rows).toEqual(data);

  });

  test("should add todo on createTodo fulfilled", () => {

    const newTodo = {
      id: 1,
      name: "New Task",
      stageId: 1,
    };

    const action = {
      type: createTodo.fulfilled.type,
      payload: newTodo,
    };

    const result = todoReducer(initialState, action);

    expect(result.rows).toEqual([newTodo]);

  });

  test("should update todo on updateTodo fulfilled", () => {

    const startState = {
      rows: [
        { id: 1, name: "Old Task", stageId: 1 },
      ],
    };

    const updatedTodo = {
      id: 1,
      name: "Updated Task",
      stageId: 2,
    };

    const action = {
      type: updateTodo.fulfilled.type,
      payload: updatedTodo,
    };

    const result = todoReducer(startState, action);

    expect(result.rows[0]).toEqual(updatedTodo);

  });

  test("should delete todo on deleteTodo fulfilled", () => {

    const startState = {
      rows: [
        { id: 1, name: "Task 1", stageId: 1 },
        { id: 2, name: "Task 2", stageId: 2 },
      ],
    };

    const action = {
      type: deleteTodo.fulfilled.type,
      payload: 1,
    };

    const result = todoReducer(startState, action);

    expect(result.rows).toEqual([
      { id: 2, name: "Task 2", stageId: 2 },
    ]);

  });

  });