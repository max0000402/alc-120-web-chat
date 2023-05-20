import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../index'

const selectUserFromStore = (state: RootState) => state.auth.user

export const isLoggedIn = createSelector(
    selectUserFromStore,
    (user) => user !== undefined
)

export const selectUser = createSelector(
    selectUserFromStore,
    (user) => user
)