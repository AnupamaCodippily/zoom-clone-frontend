export const SERVER_URL = process.env.REACT_APP_SERVER_URL;
export const ADMIN_LOGIN_URL = SERVER_URL + "/auth/admin/login";
export const STUDENT_LOGIN_URL = SERVER_URL + "/auth/student/login";

export const ZOOM_CLONE_SERVER_URL = process.env.REACT_APP_SERVER_URL;
export const ZOOM_CLONE_SERVER_ROOM_BASE_URL = ZOOM_CLONE_SERVER_URL + "/rooms";

export const CLASSROOMS_SERVER_BASE_URL = SERVER_URL + "/api/classrooms";
export const CLASSROOMS_CLIENT_URL = SERVER_URL + "/classrooms";
