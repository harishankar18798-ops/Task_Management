import stageReducer, { setstages } from "./stageSlice";

describe("stageSlice", () => {

  test("should set stages", () => {

    const initialState = { rows: [] };

    const data = [
      { id: 1, name: "New" },
      { id: 2, name: "Done" },
    ];

    const action = setstages(data);

    const result = stageReducer(initialState, action);

    expect(result.rows).toEqual(data);
    console.log(result.rows);

  });

});