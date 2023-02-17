import { setAuthJwtToken } from "../../state/slices/auth";
import { store } from "../../state/store"
import { UserType } from "../constants/user-types"

export function getLocalStorageTokenAdmin() {
    return localStorage.getItem('admin-access-token')
}

export function getLocalStorageTokenStudent() {
    return localStorage.getItem('student-token')
}

export function setTypeOfUserInLocalStorage(userType: UserType) {
    localStorage.setItem('germoda-user-type', userType.toString())
}

export function getUserTypeFromLocalStorage() {
   return localStorage.getItem('germoda-user-type')
}

export function tryFindLocalToken () {
    if (getUserTypeFromLocalStorage() === UserType.ADMIN.toString()) {
        const t = getLocalStorageTokenAdmin();
        if (t) {
            store.dispatch(setAuthJwtToken(t))
        }
        return t;
    }
    else if (getUserTypeFromLocalStorage() === UserType.STUDENT.toString()) {
        const t = getLocalStorageTokenStudent();
        if (t) {
            store.dispatch(setAuthJwtToken(t))
        }
        return t;
    }

    return false;
}