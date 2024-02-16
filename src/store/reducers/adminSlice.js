import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const adminSlice = createSlice({
  name: "adminSlice",
  initialState: {
    adminList: [],
    adminData: {},
    accountList: [],
    accountData: {},
    classList: [],
    classData: {},
    moduleList: [],
    moduleData: {},
    assignmentList: [],
    assignmentData: {},
  },
  reducers: {
    getAdminList: (state, action) => {
      state.adminList = action.payload;
      return state;
    },
    getAdminData: (state, action) => {
      state.adminData = action.payload;
      return state;
    },
    _deleteAdmin: (state, action) => {
      state.adminList = state.adminList.filter(
        (admin) => admin.id !== action.payload.id
      );
      return state;
    },
    getAccountList: (state, action) => {
      state.accountList = action.payload;
      return state;
    },
    getAccountData: (state, action) => {
      state.accountData = action.payload;
      return state;
    },
    _deleteAccount: (state, action) => {
      state.accountList = state.accountList.filter(
        (account) => account.id !== action.payload.id
      );
      return state;
    },
    getClassList: (state, action) => {
      state.classList = action.payload;
      return state;
    },
    getClassData: (state, action) => {
      state.classData = action.payload;
      return state;
    },
    _addClass: (state, action) => {
      state.classList.push(action.payload);
      return state;
    },
    _deleteClass: (state, action) => {
      state.classList = state.classList.filter(
        (singleClass) => singleClass.id !== action.payload.id
      );
      return state;
    },
    getModuleList: (state, action) => {
      state.moduleList = action.payload;
      return state;
    },
    getModuleData: (state, action) => {
      state.moduleData = action.payload;
      return state;
    },
    _addModule: (state, action) => {
      state.moduleList.push(action.payload);
      return state;
    },
    _deleteModule: (state, action) => {
      state.moduleList = state.moduleList.filter(
        (singleModule) => singleModule.id !== action.payload.id
      );
      return state;
    },
    getAssignmentList: (state, action) => {
      state.assignmentList = action.payload;
      return state;
    },
    getAssignmentData: (state, action) => {
      state.assignmentData = action.payload;
      return state;
    },
    _addAssignment: (state, action) => {
      state.assignmentList.push(action.payload);
      return state;
    },
    _deleteAssignment: (state, action) => {
      state.assignmentList = state.assignmentList.filter(
        (assignment) => assignment.id !== action.payload.id
      );
      return state;
    },
    setErrorMsg: (state, action) => {
      state.errorMsg = action.payload;
      return state;
    },
  },
});

export default adminSlice.reducer;
export const {
  getAdminList,
  getAdminData,
  _deleteAdmin,
  getAccountList,
  getAccountData,
  _deleteAccount,
  getClassList,
  getClassData,
  _addClass,
  _deleteClass,
  getModuleList,
  getModuleData,
  _addModule,
  _deleteModule,
  getAssignmentList,
  getAssignmentData,
  _addAssignment,
  _deleteAssignment,
  setErrorMsg,
} = adminSlice.actions;

//thunks go here//
//Admin
export const fetchAdmins = () => async (dispatch) => {
  try {
    const { data: adminList } = await axios.get("/api/admin");
    dispatch(getAdminList(adminList));
  } catch (error) {
    console.log("FETCH ADMINS ERROR", error);
  }
};

export const fetchAdminData = (adminId) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem("token");
    const { data: adminData } = await axios.get(`/api/admin/${adminId}`, {
      headers: {
        authorization: token,
      },
    });
    dispatch(getAdminData(adminData));
  } catch (error) {
    console.log("FETCH ADMIN DATA ERROR", error);
  }
};

export const deleteAdmin = (adminId) => async (dispatch) => {
  try {
    const { data: deletedAdmin } = await axios.delete(`/api/admin/${adminId}`);
    dispatch(_deleteAdmin(deletedAdmin));
    dispatch(logout());
  } catch (error) {
    console.log("DELETE ADMIN ERROR", error);
  }
};

export const updateAdminData = (updatedAdmin, adminId) => async (dispatch) => {
  try {
    const { data: updatedAdminData } = await axios.put(
      `/api/admin/${adminId}`,
      updatedAdmin
    );
    dispatch(getAdminData(updatedAdminData));
  } catch (error) {
    console.log("UPDATE ADMIN ERROR", error);
  }
};

//Accounts
export const fetchAccounts = (adminId) => async (dispatch) => {
  try {
    const { data: accountList } = await axios.get(
      `/api/admin/${adminId}/accounts`
    );
    dispatch(getAccountList(accountList));
  } catch (error) {
    console.log("FETCH ACCOUNTS ERROR", error);
  }
};

export const fetchAccountData = (adminId, accountId) => async (dispatch) => {
  try {
    const { data: accountData } = await axios.get(
      `/api/admin/${accountId}/accounts/${accountId}`,
      adminId,
      accountId
    );
    dispatch(getAccountData(accountData));
  } catch (error) {
    console.log("FETCH ACCOUNT DATA ERROR", error);
  }
};

export const deleteAccount = (accountId) => async (dispatch) => {
  try {
    const { data: deletedAccount } = await axios.delete(
      `/api/admin/:id/accounts/${accountId}`
    );
    dispatch(_deleteAccount(deletedAccount));
  } catch (error) {
    console.log("DELETE ACCOUNT ERROR", error);
  }
};

export const updateAccountData =
  (updatedAccount, adminId, accountId) => async (dispatch) => {
    try {
      const { data: updatedAccountData } = await axios.put(
        `/api/admin/${adminId}/accounts/${accountId}`,
        updatedAccount,
        adminId,
        accountId
      );
      dispatch(getAccountData(updatedAccountData));
    } catch (error) {
      console.log("UPDATE ACCOUNT ERROR", error);
    }
  };

//Class
export const fetchClassList = (adminId) => async (dispatch) => {
  try {
    const { data: classList } = await axios.get(
      `/api/admin/${adminId}/classes`
    );
    dispatch(getClassList(classList));
  } catch (error) {
    console.log("FETCH CLASSES ERROR", error);
  }
};

export const fetchClassData = (adminId, classId) => async (dispatch) => {
  try {
    const { data: classData } = await axios.get(
      `/api/admin/${adminId}/classes/${classId}`,
      adminId,
      classId
    );
    dispatch(getClassData(classData));
  } catch (error) {
    console.log("FETCH CLASS DATA ERROR", error);
  }
};

export const addNewClass = (newClass, adminId) => async (dispatch) => {
  try {
    const { data: newClassData } = await axios.post(
      `/api/admin/${adminId}/classes`,
      newClass
    );
    dispatch(_addClass(newClassData));
  } catch (error) {
    console.log("ADD CLASS ERROR", error);
  }
};

export const deleteClass = (classId) => async (dispatch) => {
  try {
    const { data: deletedClass } = await axios.delete(
      `/api/admin/:id/classes/${classId}`
    );
    dispatch(_deleteClass(deletedClass));
  } catch (error) {
    console.log("DELETE CLASS ERROR", error);
  }
};

export const updateClassData =
  (updatedClass, adminId, classId) => async (dispatch) => {
    try {
      const { data: updatedClassData } = await axios.put(
        `/api/admin/${adminId}/classes/${classId}`,
        updatedClass,
        adminId,
        classId
      );
      dispatch(getClassData(updatedClassData));
    } catch (error) {
      console.log("UPDATE CLASS ERROR", error);
    }
  };

//Module
export const fetchModules = (adminId) => async (dispatch) => {
  try {
    const { data: moduleList } = await axios.get(
      `/api/admin/${adminId}/modules`
    );
    dispatch(getModuleList(moduleList));
  } catch (error) {
    console.log("FETCH MODULES ERROR", error);
  }
};

export const fetchModuleData = (adminId, moduleId) => async (dispatch) => {
  try {
    const { data: moduleData } = await axios.get(
      `/api/admin/${adminId}/modules/${moduleId}`,
      adminId,
      moduleId
    );
    dispatch(getModuleData(moduleData));
  } catch (error) {
    console.log("FETCH MODULE DATA ERROR", error);
  }
};

export const addModule = (newModule, adminId) => async (dispatch) => {
  try {
    const { data: newModuleData } = await axios.post(
      `/api/admin/${adminId}/modules`,
      newModule
    );
    dispatch(_addModule(newModuleData));
  } catch (error) {
    console.log("ADD MODULE ERROR", error);
  }
};

export const deleteModule = (moduleId) => async (dispatch) => {
  try {
    const { data: deletedModule } = await axios.delete(
      `/api/admin/:id/modules/${moduleId}`
    );
    dispatch(_deleteModule(deletedModule));
  } catch (error) {
    console.log("DELETE MODULE ERROR", error);
  }
};

export const updateModuleData =
  (updatedModule, adminId, moduleId) => async (dispatch) => {
    try {
      const { data: updatedModuleData } = await axios.put(
        `/api/admin/${adminId}/modules/${moduleId}`,
        updatedModule,
        adminId,
        moduleId
      );
      dispatch(getModuleData(updatedModuleData));
    } catch (error) {
      console.log("UPDATE MODULE ERROR", error);
    }
  };

//Assignment

export const fetchAssignments = (adminId) => async (dispatch) => {
  try {
    const { data: assignmentList } = await axios.get(
      `/api/admin/${adminId}/assignments`
    );
    dispatch(getAssignmentList(assignmentList));
  } catch (error) {
    console.log("FETCH ASSIGNMENTS ERROR", error);
  }
};

export const fetchAssignmentData =
  (adminId, assignmentId) => async (dispatch) => {
    try {
      const { data: assignmentData } = await axios.get(
        `/api/admin/${adminId}/assignments/${assignmentId}`,
        adminId,
        assignmentId
      );
      dispatch(getAssignmentData(assignmentData));
    } catch (error) {
      console.log("FETCH ASSIGNMENT DATA ERROR", error);
    }
  };

export const addAssignment = (newAssignment, adminId) => async (dispatch) => {
  try {
    const { data: newAssignmentData } = await axios.post(
      `/api/admin/${adminId}/assignments`,
      newAssignment
    );
    dispatch(_addAssignment(newAssignmentData));
  } catch (error) {
    console.log("ADD ASSIGNMENT ERROR", error);
  }
};

export const deleteAssignment = (assignmentId) => async (dispatch) => {
  try {
    const { data: deletedAssignment } = await axios.delete(
      `/api/admin/:id/assignments/${assignmentId}`
    );
    dispatch(_deleteAssignment(deletedAssignment));
  } catch (error) {
    console.log("DELETE ASSIGNMENT ERROR", error);
  }
};

export const updateAssignmentData =
  (updatedAssignment, adminId, assignmentId) => async (dispatch) => {
    try {
      const { data: updatedAssignmentData } = await axios.put(
        `/api/admin/${adminId}/assignments/${assignmentId}`,
        updatedAssignment,
        adminId,
        assignmentId
      );
      dispatch(getAssignmentData(updatedAssignmentData));
    } catch (error) {
      console.log("UPDATE ASSIGNMENT ERROR", error);
    }
  };
