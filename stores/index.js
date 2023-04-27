import { configureStore } from '@reduxjs/toolkit'
import iconslice from './icon-slice'
import counterSlice from './counter-slice'

const store= configureStore({
    reducer: {
        icon: iconslice.reducer,
        counter: counterSlice.reducer
    }
})

export default store