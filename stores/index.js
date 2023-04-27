import { configureStore } from '@reduxjs/toolkit'
import iconslice from './icon-slice'
import counterSlice from './counter-slice'
import todoSlice from './todo-slice'

const store= configureStore({
    reducer: {
        icon: iconslice.reducer,
        counter: counterSlice.reducer,
        todo: todoSlice.reducer,
    },
})

export default store