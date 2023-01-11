import { createContext, useReducer } from "react";

export const IssuesContext = createContext({
    issues: [],
    addIssue: ({ description, date, title, geolocation, status }) => {},
    setIssues: (issues) => {},
    deleteIssue: (id) => {},
    updateIssue: (id, { description, date, title, geolocation, status }) => {},
});

function issuesReducer(state, action) {
    switch (action.type) {
        case "ADD":
            return [action.payload, ...state];
        case "SET":
            const inverted = action.payload.reverse();
            return action.payload;
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
    const [issuesState, dispatch] = useReducer(issuesReducer, []);

    function addIssue(issueData) {
        dispatch({ type: "ADD", payload: issueData });
    }

    function setIssues(issues) {
        dispatch({ type: "SET", payload: issues });
    }

    function deleteIssue(id) {
        dispatch({ type: "DELETE", payload: id });
    }

    function updateIssue(id, issueData) {
        dispatch({ type: "UPDATE", payload: { id: id, data: issueData } });
    }

    const value = {
        issues: issuesState,
        setIssues: setIssues,
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
