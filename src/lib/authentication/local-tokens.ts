import { setAuthJwtToken } from "../../state/slices/auth";
import { store } from "../../state/store"
import { UserType } from "../constants/user-types"

export function getLocalStorageTokenAdmin() {
    return localStorage.getItem('admin-access-token')
}

export function getLocalStorageTokenStudent() {
    return localStorage.getItem('student-token')
}

export function tryFindLocalToken () {
    if (store.getState().auth.userType === UserType.ADMIN) {
        const t = getLocalStorageTokenAdmin();
        if (t) {
            store.dispatch(setAuthJwtToken(t))
        }
        return t;
    }
    else if (store.getState().auth.userType === UserType.STUDENT) {
        const t = getLocalStorageTokenStudent();
        if (t) {
            store.dispatch(setAuthJwtToken(t))
        }
        return t;
    }

    return false;
}