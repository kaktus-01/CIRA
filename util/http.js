import axios from "axios";

const BACKEND_URL =
    "https://cira-copy-default-rtdb.europe-west1.firebasedatabase.app/";

export async function storeIssue(issueData) {
    const response = await axios.post(BACKEND_URL + "/issues.json", issueData);
    const id = response.data.name;
    return id;
}

export async function fetchIssues() {
    const response = await axios.get(BACKEND_URL + "/issues.json");

    const issues = [];

    for (const key in response.data) {
        const issueObj = {
            id: key,
            title: response.data[key].title,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
            geolocation: response.data[key.geolocation],
            status: response.data[key].status,
        };
        issues.push(issueObj);
    }

    return issues;
}

export function updateIssue(id, issueData) {
    return axios.put(BACKEND_URL + `/issues/${id}.json`, issueData);
}

export function deleteIssue(id) {
    return axios.delete(BACKEND_URL + `/issues/${id}.json`);
}
