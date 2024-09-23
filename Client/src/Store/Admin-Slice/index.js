import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";  

const initialState = {
    isloading: false,
    employee:[],
}

export const addEmployee = createAsyncThunk("/admin/add-employee", 
    async (formData) =>{
        const result = await axios.post("http://localhost:3001/api/admin/add-employee", formData,{
            headers:{
                "Content-Type": "application/json",
            }
        });
        return result.data;
    }
)

export const deleteEmployee = createAsyncThunk(
    "admin/delete-employee",
    async (id) => {
        await axios.delete(`http://localhost:3001/api/admin/delete-employee/${id}`);
        return id; 
    }
);

export const editEmployee = createAsyncThunk(
    'admin/editEmployee',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const result = await axios.put(`http://localhost:3001/api/admin/edit-employee/${id}`, data);
            return result.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);



export const searchEmployees = createAsyncThunk(
    "admin/search-employees",
    async (searchTerm) => {
        const result = await axios.get(`http://localhost:3001/api/admin/search-employees?query=${searchTerm}`);
        return result.data; 
    }
);

export const fetchEmployees = createAsyncThunk("admin/fetch-employees", async () => {
    const response = await axios.get("http://localhost:3001/api/admin/employees");
    return response.data; 
});


const AdminSlice = createSlice({
    name: "admin-employee",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addEmployee.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addEmployee.fulfilled, (state, action) => {
                state.isLoading = false;
                state.employee.push(action.payload);
            })
            .addCase(addEmployee.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteEmployee.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.isLoading = false;
                state.employee = state.employee.filter((emp) => emp._id !== action.meta.arg);
            })
            .addCase(deleteEmployee.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(editEmployee.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editEmployee.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.employee.findIndex((emp) => emp._id === action.payload._id);
                if (index !== -1) {
                    state.employee[index] = action.payload;
                }
            })
            .addCase(editEmployee.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchEmployees.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.isLoading = false;
                state.employee = action.payload; 
            })
            .addCase(fetchEmployees.rejected, (state) => {
                state.isLoading = false;
            });

    },
});


export default AdminSlice.reducer