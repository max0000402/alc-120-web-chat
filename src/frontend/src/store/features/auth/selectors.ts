import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../index'

const selectToken = (state: RootState) => state.auth.token

export const isUserAuth = createSelector(selectToken, (token) => token !== '')