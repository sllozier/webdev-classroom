import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const accountSlice = createSlice({
  name: "accountSlice",
  initialState: {
    accountList: [],
    accountData: {},
    classList: [],
    classData: {},
    moduleList: [],
    moduleData: {},
    assignmentList: [],
    assignmentData: {},
    announcements: [],
    announcementData: {},
  },
  reducers: {
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
    getClasses: (state, action) => {
      state.classList = action.payload;
    },
    getClass: (state, action) => {
      state.classData = action.payload;
      return state;
    },
    getModuleList: (state, action) => {
      state.moduleList = action.payload;
    },
    getModule: (state, action) => {
      state.moduleData = action.payload;
      return state;
    },
    getAssignment: (state, action) => {
      state.assignmentData = action.payload;
      return state;
    },
    getAnnouncements: (state, action) => {
      state.announcements = action.payload;
      return state;
    },
    getAnnouncementData: (state, action) => {
      state.announcementData = action.payload;
      return state;
    },
    _addAnnouncement: (state, action) => {
      state.announcements.push(action.payload);
      return state;
    },
    setErrorMsg: (state, action) => {
      state.errorMsg = action.payload;
      return state;
    },
  },
});

export default accountSlice.reducer;
export const {
  getAccountList,
  getAccountData,
  _deleteAccount,
  getClasses,
  getClass,
  getModuleList,
  getModule,
  getAssignment,
  getAnnouncements,
  getAnnouncementData,
  _addAnnouncement,
  setErrorMsg,
} = accountSlice.actions;

//thunks go here//

//Account
export const fetchAccounts = () => {
  return async (dispatch) => {
    try {
      const { data: accountList } = await axios.get("/api/accounts");
      dispatch(getAccountList(accountList));
    } catch (error) {
      console.log("FETCH ACCOUNTS ERROR", error);
    }
  };
};

export const fetchAccountData = (accountId) => async (dispatch) => {
  try {
    console.log("REDUX ACCOUNT ID", accountId);
    const token = window.localStorage.getItem("token");
    const { data: accountData } = await axios.get(
      `/api/accounts/${accountId}`,
      {
        headers: {
          authorization: token,
        },
      }
    );

    dispatch(getAccountData(accountData));
  } catch (error) {
    console.log("FETCH ACCOUNT DATA ERROR", error);
  }
};

export const updateAccountData =
  (accountInfo, accountId) => async (dispatch) => {
    try {
      const { data: updatedAccount } = await axios.put(
        `/api/accounts/${accountId}`,
        accountInfo,
        accountId
      );
      dispatch(getAccountData(updatedAccount));
    } catch (error) {
      console.log("UPDATE ACCOUNT ERROR", error);
    }
  };

export const deleteAccountData = (accountId) => async (dispatch) => {
  try {
    const { data: deletedAccount } = await axios.delete(
      `/api/accounts/${accountId}`
    );
    dispatch(_deleteAccount(deletedAccount));
    dispatch(logout());
  } catch (error) {
    console.log("DELETE ACCOUNT DATA ERROR", error);
  }
};

//Class
export const fetchClasses = (accountId) => async (dispatch) => {
  try {
    const { data: classes } = await axios.get(
      `/api/accounts/${accountId}/classes`,
      {}
    );
    dispatch(getClasses(classes));
  } catch (error) {
    console.log("FETCH CLASSES THUNK ERROR", error);
  }
};

export const fetchClassData = (accountId, classId) => async (dispatch) => {
  try {
    const { data: classData } = await axios.get(
      `/api/accounts/${accountId}/classes/${classId}`,
      accountId,
      classId
    );
    dispatch(getClass(classData));
  } catch (error) {
    console.log("FETCH CLASS DATA ERROR", error);
  }
};

export const addAClass = (accountId, classId) => async (dispatch) => {
  try {
    await axios.put(`/api/accounts/${accountId}`, classId);
    dispatch(fetchClassData(accountId, classId));
  } catch (error) {
    console.log("ACCT ADD CLASS ERROR", error);
  }
};

export const updateClassSize =
  (accountId, classId, op, num = 1) =>
  async (dispatch) => {
    try {
      await axios.put(`/api/accounts/${accountId}`, {
        accountId,
        classId,
        op,
        num,
      });
      dispatch(fetchClassData(accountId, classId));
    } catch (error) {
      console.log("UPDATE CLASS SIZE ERROR", error);
    }
  };

export const quitClass = (accountId, classId) => async (dispatch) => {
  try {
    const { data: removedStudent } = await axios.delete(
      `/api/accounts/${accountId}`,
      classId
    );
    dispatch(updateClassSize(accountId, classId, "remove", 1));
  } catch (error) {
    console.log("QUIT CLASS ERROR", error);
  }
};

export const fetchModules = (accountId, classId) => async (dispatch) => {
  try {
    const { data: moduleList } = await axios.get(
      `/api/accounts/${accountId}/classes/${classId}/modules`,
      accountId,
      classId
    );
    console.log("GET MODULES THUNK", moduleList);
    dispatch(getModuleList(moduleList));
  } catch (error) {
    console.log("FETCH MODULES ERROR", error);
  }
};

export const fetchModuleData =
  (accountId, classId, moduleId) => async (dispatch) => {
    try {
      const { data: moduleData } = await axios.get(
        `/api/accounts/${accountId}/classes/${classId}/modules/${moduleId}`,
        accountId,
        classId,
        moduleId
      );
      dispatch(getModule(moduleData));
    } catch (error) {
      console.log("FETCH MODULE DATA ERROR", error);
    }
  };

export const fetchAssignmentData =
  (accountId, moduleId, assignmentId) => async (dispatch) => {
    try {
      const { data: assignmentData } = await axios.get(
        `/api/accounts/${accountId}/modules/${moduleId}/assignments/${assignmentId}`,
        accountId,
        moduleId,
        assignmentId
      );
      dispatch(getAssignment(assignmentData));
    } catch (error) {
      console.log("FETCH ASSIGNMENT DATA ERROR", error);
    }
  };

export const fetchAnnouncements = (accountId, classId) => async (dispatch) => {
  try {
    const { data: announcements } = await axios.get(
      `/api/accounts/${accountId}/classes/${classId}/announcements`,
      accountId,
      classId
    );
    console.log("FETCH ANNOUNCEMENTS", announcements);
    dispatch(getAnnouncements(announcements));
  } catch (error) {
    console.log("FETCH ANNOUNCEMENTS ERROR", error);
  }
};

export const fetchAnnouncementData =
  (accountId, classId, announcementId) => async (dispatch) => {
    try {
      const { data: announcementData } = await axios.get(
        `/api/accounts/${accountId}/classes/${classId}/announcements/${announcementId}`,
        accountId,
        classId,
        announcementId
      );
      dispatch(getAnnouncementData(announcementData));
    } catch (error) {
      console.log("FETCH ANNOUNCEMENT ERROR", error);
    }
  };

export const addAnnouncement =
  (newAnnouncement, accountId, classId) => async (dispatch) => {
    try {
      const { data: newAnnouncementData } = await axios.post(
        `/api/accounts/${accountId}/classes/${classId}/announcements`,
        newAnnouncement,
        accountId,
        classId
      );
      dispatch(_addAnnouncement(newAnnouncementData));
    } catch (error) {
      console.log("ADD ANNOUNCEMENT ERROR", error);
    }
  };
