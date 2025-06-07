import 'dotenv/config'
import type {FytaUserPlantsResponse} from "./fytaTypes.js";

const accessToken = process.env.FYTA_API_TOKEN;

export async function fetchPlants(): Promise<FytaUserPlantsResponse> {
    const response = await fetch('https://web.fyta.de/api/user-plant', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        console.error(response)
        throw new Error(`Failed to fetch plants: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as FytaUserPlantsResponse;
    console.log(JSON.stringify(data, null, 2));
    return data;
}
