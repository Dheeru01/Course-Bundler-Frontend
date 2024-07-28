import {configureStore} from '@reduxjs/toolkit';
import { profileReducer, subscriptionReducer, userReducer } from './reducers/userReducer';
import { courseReducer } from './reducers/courseReducer';
import { adminReducer } from './reducers/adminReducers';
import { otherReducer } from './reducers/otherReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer,
        courses:courseReducer,
        subscription:subscriptionReducer,
        admin:adminReducer,
        others:otherReducer
    },
})

export default store;

export const server = "https://course-bundler-8wrn.onrender.com/api/v1"