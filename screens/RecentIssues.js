import { useContext } from "react";
import IssuesOutput from "../components/IssuesOutput/IssuesOutput";
import { IssuesContext } from "../store/issues-context";
import { getDateMinusDays } from "../util/date";

function RecentIssues() {
    const issuesCtx = useContext(IssuesContext);

    const recentIssues = issuesCtx.issues.filter((issue) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return issue.date >= date7DaysAgo && issue.date <= today;
    });

    return (
        <IssuesOutput
            issues={recentIssues}
            IssuesPeriod="Last 7 Days"
            fallbackText="No recently reported issues in the last 7 days"
        />
    );
}

export default RecentIssues;
