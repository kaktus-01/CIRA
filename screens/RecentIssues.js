import { useContext, useEffect, useState } from "react";
import IssuesOutput from "../components/IssuesOutput/IssuesOutput";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { IssuesContext } from "../store/issues-context";
import { getDateMinusDays } from "../util/date";
import { fetchIssues } from "../util/http";

function RecentIssues() {
    const [isFetching, setIsFetching] = useState(true);

    const issuesCtx = useContext(IssuesContext);

    useEffect(() => {
        setIsFetching(true);
        async function getIssues() {
            const issues = await fetchIssues();
            setIsFetching(false);
            issuesCtx.setIssues(issues);
        }
        getIssues();
    }, []);

    if (isFetching) {
        return <LoadingOverlay />;
    }

    const recentIssues = issuesCtx.issues.filter((issues) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return issues.date >= date7DaysAgo && issues.date <= today;
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
