import { createContext, useReducer } from "react";

const DUMMY_ISSUES = [
    {
        id: "i1",
        description: "A pothole",
        severity: "mid",
        date: new Date("2022-12-11"),
        resolved: "resolved",
    },
    {
        id: "i2",
        description: "Garbage on street",
        severity: "low",
        date: new Date("2010-10-10"),
        resolved: "unresolved",
    },
    {
        id: "i3",
        description: "Broken traffic sign",
        severity: "high",
        date: new Date("2022-12-24"),
        resolved: "unresolved",
    },
    {
        id: "i4",
        description: "Trash",
        severity: "low",
        date: new Date("2023-12-11"),
        resolved: "unresolved",
    },
];

export const IssuesContext = createContext({
    issues: [],
    addIssue: ({ description, date }) => {},
    deleteIssue: (id) => {},
    updateIssue: (id, { description, date }) => {},
});

function issuesReducer(state, action) {
    switch (action.type) {
        case "ADD":
            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, id: id }, ...state];
        case "UPDATE":
            const updatableIssueIndex = state.findIndex(
                (issue) => issue.id === action.payload.id
            );
            const updatableIssue = state[updatableIssueIndex];
            const updatedItem = { ...updatableIssue, ...action.payload.data };
            const updatedIssues = [...state];
            updatedIssues[updatableIssueIndex] = updatedItem;
            return updatedIssues;
        case "DELETE":
            return state.filter((issue) => issue.id !== action.payload);
        default:
            return state;
    }
}

function IssuesContextProvider({ children }) {
    const [issuesState, dispatch] = useReducer(issuesReducer, DUMMY_ISSUES);

    function addIssue(issueData) {
        dispatch({ type: "ADD", payload: issueData });
    }

    function deleteIssue(id) {
        dispatch({ type: "DELETE", payload: id });
    }

    function updateIssue(id, issueData) {
        dispatch({ type: "UPDATE", payload: { id: id, data: issueData } });
    }

    const value = {
        issues: issuesState,
        addIssue: addIssue,
        deleteIssue: deleteIssue,
        updateIssue: updateIssue,
    };

    return (
        <IssuesContext.Provider value={value}>
            {children}
        </IssuesContext.Provider>
    );
}

export default IssuesContextProvider;
