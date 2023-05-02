import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createNota = createAsyncThunk(
    "nota/createNota",
    async ({ updatedNotaData, navigate, toast }, { rejectWithValue }) => {
      try {
        const response = await api.createNota(updatedNotaData);
        toast.success("Nota Pembayaran Added Successfully");
        navigate("/all");
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
);

export const getNotas = createAsyncThunk(
    "nota/getNotas",
    async (page, { rejectWithValue }) => {
      try {
        const response = await api.getNotas(page);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
);

export const getNota = createAsyncThunk(
    "nota/getNota",
    async (id, { rejectWithValue }) => {
      try {
        const response = await api.getNota(id);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
);

export const updateNota = createAsyncThunk(
  "nota/updateNota",
  async ({ id, updatedNotaData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateNota(updatedNotaData, id);
      toast.success("Nota Pembayaran Updated Successfully");
      navigate("/all");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteNota = createAsyncThunk(
  "nota/deleteNota",
  async ({ id, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.deleteNota(id);
      toast.success("Nota Pembayaran Deleted Successfully");
      navigate("/all");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const searchNotas = createAsyncThunk(
  "nota/searchNotas",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getNotasBySearch(searchQuery);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const notasDate = createAsyncThunk(
  "nota/notasDate",
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const response = await api.getNotasByDate(startDate, endDate);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const notasStatus = createAsyncThunk(
  "nota/notasStatus",
  async (statusQuery, { rejectWithValue }) => {
    try {
      const response = await api.getNotasByStatus(statusQuery);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const notasFilter = createAsyncThunk(
  "nota/notasFilter",
  async ({ startDate, endDate, statusQuery, searchQuery }, { rejectWithValue }) => {
    try {
      const response = await api.getNotasByAllFilter(startDate, endDate, statusQuery, searchQuery);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const notaSlice = createSlice({
  name: "nota",
  initialState: {
    nota: {},
    notas: [],
    currentPage: 1,
    numberOfPages: null,
    error: "",
    loading: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: {
    [createNota.pending]: (state, action) => {
      state.loading = true;
    },
    [createNota.fulfilled]: (state, action) => {
      state.loading = false;
      state.notas = [action.payload];
    },
    [createNota.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getNotas.pending]: (state, action) => {
      state.loading = true;
    },
    [getNotas.fulfilled]: (state, action) => {
      state.loading = false;
      state.notas = action.payload.data;
      state.numberOfPages = action.payload.numberOfPages;
      state.currentPage = action.payload.currentPage;
    },
    [getNotas.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getNota.pending]: (state, action) => {
      state.loading = true;
    },
    [getNota.fulfilled]: (state, action) => {
      state.loading = false;
      state.nota = action.payload;
    },
    [getNota.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateNota.pending]: (state, action) => {
      state.loading = true;
    },
    [updateNota.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { _id },
      } = action.meta;
      if (_id) {
          state.notas = state.notas.map((item) =>
          item._id === _id ? action.payload : item
        );
      }
    },
    [updateNota.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteNota.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteNota.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { _id },
      } = action.meta;
      if (_id) {
          state.notas = state.notas.map((item) =>
          item._id === _id ? action.payload : item
        );
      }
    },
    [deleteNota.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [searchNotas.pending]: (state, action) => {
      state.loading = true;
    },
    [searchNotas.fulfilled]: (state, action) => {
      state.loading = false;
      state.notas = action.payload;
    },
    [searchNotas.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [notasDate.pending]: (state, action) => {
      state.loading = true;
    },
    [notasDate.fulfilled]: (state, action) => {
      state.loading = false;
      state.notas = action.payload;
    },
    [notasDate.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [notasStatus.pending]: (state, action) => {
      state.loading = true;
    },
    [notasStatus.fulfilled]: (state, action) => {
      state.loading = false;
      state.notas = action.payload;
    },
    [notasStatus.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [notasFilter.pending]: (state, action) => {
      state.loading = true;
    },
    [notasFilter.fulfilled]: (state, action) => {
      state.loading = false;
      state.notas = action.payload;
    },
    [notasFilter.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  }
})

export const { setCurrentPage } = notaSlice.actions;

export default notaSlice.reducer;