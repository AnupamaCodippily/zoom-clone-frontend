import { CLASSROOMS_SERVER_BASE_URL } from "../constants/urls";

export async function checkClassroom(code: string) {
    const resultJson = await fetch(CLASSROOMS_SERVER_BASE_URL + "/" + code);
    const result = await resultJson.json()

    return result.classroom?.exists;
}