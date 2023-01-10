import { FlatList } from "react-native";
import IssueItem from "./IssueItem";

function renderIssueItem(itemData) {
    return <IssueItem {...itemData.item} />;
}

function IssuesList({ issues }) {
    return (
        <FlatList
            data={issues}
            renderItem={renderIssueItem}
            keyExtractor={(item) => item.id}
        />
    );
}
export default IssuesList;
