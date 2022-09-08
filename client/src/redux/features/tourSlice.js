import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import *  as api from "../api";

export const createTourAction = createAsyncThunk("tour/createTour", async({updatedTourData, navigate, toast}, {rejectWithValue}) => {
    try{
        const response = await api.createTourAPI(updatedTourData);
        toast.success("Tour Added Successfully");
        navigate("/");
        return response.data;
    } catch(err){
        return rejectWithValue(err.response.data);
    }
})

export const getToursAction = createAsyncThunk("tour/getTours", async(page, {rejectWithValue}) => {
    try{
        const response = await api.getToursAPI(page);
        return response.data;
    } catch(err){
        return rejectWithValue(err.response.data);
    }
})

export const getTourAction = createAsyncThunk("tour/getTour", async(id, {rejectWithValue}) => {
    try{
        const response = await api.getTourAPI(id);
        return response.data;
    } catch(err){
        return rejectWithValue(err.response.data);
    }
})

export const getToursByUserAction = createAsyncThunk("tour/getToursByUser", async(userId, {rejectWithValue}) => {
    try{
        const response = await api.getToursByUserAPI(userId);
        return response.data;
    } catch(err){
        return rejectWithValue(err.response.data);
    }
})

export const deleteTourAction = createAsyncThunk("tour/deleteTour", async({id, toast}, {rejectWithValue}) => {
    try{
        const response = await api.deleteTourAPI(id);
        toast.success("Tour Deleted Successflly");
        return response.data;
    } catch(err){
        return rejectWithValue(err.response.data);
    }
})

export const updateTourAction = createAsyncThunk("tour/updateTour", async({updatedTourData, id, toast,navigate}, {rejectWithValue}) => {
    try{
        const response = await api.updateTourAPI(updatedTourData,id);
        toast.success("Tour updated Successflly");
        navigate("/");
        return response.data;
    } catch(err){
        return rejectWithValue(err.response.data);
    }
})
export const searchTours = createAsyncThunk("tour/searchTours", async(searchQuery, {rejectWithValue}) => {
    try{
        const response = await api.getToursBySearch(searchQuery);
        return response.data;
    } catch(err){
        return rejectWithValue(err.response.data);
    }
})

export const getToursByTagsAction = createAsyncThunk("tour/getToursByTag", async(tag, {rejectWithValue}) => {
    try{
        const response = await api.getToursByTagAPI(tag);
        return response.data;
    } catch(err){
        return rejectWithValue(err.response.data);
    }
})

export const likeTourAction = createAsyncThunk("tour/likeTour", async({_id}, {rejectWithValue}) => {
    try{
        const response = await api.likeTour(_id);
        return response.data;
    } catch(err){
        return rejectWithValue(err.response.data);
    }
})

const tourSlice = createSlice({
    name: "tour",
    initialState: {
        tour: {},
        tours: [],
        userTours: [],
        tagTours:[],
        currentPage: 1,
        numberOfPages: null,
        error: "",
        loding: false,
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: {
        [createTourAction.pending]: (state, action) => { state.loading = true },
        [createTourAction.fulfilled]: (state, action) => { 
            state.loading = false;
            state.tours = [action.payload];
        },

        [createTourAction.rejected]:(state, action) => {
            state.loading = false;
            state.error  = action.payload.message;
        },

        [getToursAction.pending]: (state, action) => { state.loading = true },
        [getToursAction.fulfilled]: (state, action) => { 
            state.loading = false;
            state.tours = action.payload.data;
            state.numberOfPages = action.payload.numberofPages;
            state.currentPage = action.payload.currentPage
        },

        [getToursAction.rejected]:(state, action) => {
            state.loading = false;
            state.error  = action.payload.message;
        },
        [getTourAction.pending]: (state, action) => { state.loading = true },
        [getTourAction.fulfilled]: (state, action) => { 
            state.loading = false;
            state.tour = action.payload;
        },
        [getTourAction.rejected]:(state, action) => {
            state.loading = false;
            state.error  = action.payload.message;
        },

        [getToursByUserAction.pending]: (state, action) => { state.loading = true },
        [getToursByUserAction.fulfilled]: (state, action) => { 
            state.loading = false;
            state.userTours = action.payload;
        },
        [getToursByUserAction.rejected]:(state, action) => {
            state.loading = false;
            state.error  = action.payload.message;
        },
        [deleteTourAction.pending]: (state, action) => { state.loading = true },
        [deleteTourAction.fulfilled]: (state, action) => { 
            state.loading = false;
            console.log("action",action);
            const {arg: {id}} = action.meta;
            if(id){
                state.userTours = state.userTours.filter(
                    (item) => item._id !== id
                );
                state.tours= state.tours.filter(
                    (item) => item._id !== id
                );
            }
        },
        [deleteTourAction.rejected]:(state, action) => {
            state.loading = false;
            state.error  = action.payload.message;
        },

        [updateTourAction.pending]: (state, action) => { state.loading = true },
        [updateTourAction.fulfilled]: (state, action) => { 
            state.loading = false;
            const {arg: {id}} = action.meta;
            if(id){
                state.userTours = state.userTours.map(
                    (item) => item._id === id ? action.payload : item
                );
                state.tours = state.tours.map(
                    (item) => item._id === id ? action.payload : item
                );
            }
        },
        [updateTourAction.rejected]:(state, action) => {
            state.loading = false;
            state.error  = action.payload.message;
        },
        [searchTours.pending]: (state, action) => { state.loading = true },
        [searchTours.fulfilled]: (state, action) => { 
            state.loading = false;
            state.tours = action.payload;
        },
        [searchTours.rejected]:(state, action) => {
            state.loading = false;
            state.error  = action.payload.message;
        },
        [getToursByTagsAction.pending]: (state, action) => { state.loading = true },
        [getToursByTagsAction.fulfilled]: (state, action) => { 
            state.loading = false;
            state.tagTours = action.payload;
        },
        [getToursByTagsAction.rejected]:(state, action) => {
            state.loading = false;
            state.error  = action.payload.message;
        },
        [likeTourAction.pending]: (state, action) => {},
        [likeTourAction.fulfilled]: (state, action) => { 
            state.loading = false;
            const {arg: {_id}} = action.meta;
            if(_id){
                state.tours = state.tours.map(
                    (item) => item._id === _id ? action.payload : item
                );
            }
        },
        [likeTourAction.rejected]:(state, action) => {
            state.error  = action.payload.message;
        },
    }  
})
export const {setCurrentPage} = tourSlice.actions;
export default tourSlice.reducer;