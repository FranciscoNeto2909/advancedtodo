import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "./api"

export const getTasks = createAsyncThunk("getTasks", async () => {
    try {
        const res = await api.get('tasks')
            .then(data => data.data)
            .catch(err => err)
        return res
    } catch (error) {
        return error
    }
})

export const postTask = createAsyncThunk("postTask", async task => {
    try {
        const res = await api.post("tasks", task)
            .then(res => res.data)
            .catch(err => err)
        return res
    } catch (error) {
        return console.log(error)
    }
})

export const updateTask = createAsyncThunk("updateTask", async task => {

    try {
        const res = await api.put(`tasks/${task.id}`, task)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        return res
    } catch (error) {
        return console.log(error)
    }
})

export const deleteTask = createAsyncThunk("deleteTask", async id => {
    try {
        await api.delete(`tasks/${id}`)
            .then(data => data.data)
    } catch (error) {
        return console.log(error)
    }
})

const tasksSlice = createSlice({
    name: "task",
    initialState: {
        tasks: []
    },
    reducers: {},
    extraReducers: (build) => {
        build
            .addCase(getTasks.fulfilled, (state, action) => {
                return { ...state, tasks: action.payload }
            })
    }

})

export const {  } = tasksSlice.actions

export default tasksSlice.reducer
