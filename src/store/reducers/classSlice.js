import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const classSlice = createSlice({
  name: "classSlice",
  initialState: {
    classList: [],
    classData: {},
  },
  reducers: {
    getClassList: (state, action) => {
      state.classList = action.payload;
      return state;
    },
    getClassData: (state, action) => {
      state.classData = action.payload;
      return state;
    },

    setErrorMsg: (state, action) => {
      state.errorMsg = action.payload;
      return state;
    },
  },
});

export default classSlice.reducer;
export const { getClassList, getClassData, setErrorMsg } = classSlice.actions;

//thunks go here//

export const fetchClassList = () => async (dispatch) => {
  try {
    const { data: classList } = await axios.get("/api/classes");
    dispatch(getClassList(classList));
  } catch (error) {
    console.log("FETCH CLASSES ERROR", error);
  }
};

export const fetchClassData = (classId) => async (dispatch) => {
  try {
    const { data: classData } = await axios.get(`/api/classes/${classId}`);
    dispatch(getClassData(classData));
  } catch (error) {
    console.log("FETCH CLASS DATA ERROR", error);
  }
};
