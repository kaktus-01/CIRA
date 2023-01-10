import { useContext } from "react";
import IssuesOutput from "../components/IssuesOutput/IssuesOutput";
import { IssuesContext } from "../store/issues-context";

function AllIssues() {
    const issuesCtx = useContext(IssuesContext);
    return (
        <IssuesOutput
            issues={issuesCtx.issues}
            IssuesPeriod="Total"
            fallbackText="No reported issues found"
        />
    );
}

export default AllIssues;
