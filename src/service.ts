import { playerModel, searchClass } from "./models";

const URL = "https://nbaserver-q21u.onrender.com/api/filter";

// the request
export async function search(model: searchClass): Promise<playerModel[] | string> {
    try {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(model)
        });

        if (!response.ok) throw new Error(`Status code ${response.status}`);

        const data = await response.json() as playerModel[];
        return data;
    } catch(e) {
        return e as string;
    }
}