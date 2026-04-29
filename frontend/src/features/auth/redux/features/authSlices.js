import { createSlice } from '@reduxjs/toolkit'

export const authslices = createSlice({
  name: 'auth',
  initialState:{
    user:null,
    loading:false
  },
  reducers: {
    setUser:(state,actions)=>{
        state.user=actions.payload
    },
    setLoading:(state,actions)=>{
        state.loading=actions.payload
    },
  },
})

export const { setUser,setLoading } = authslices.actions

export default authslices.reducer