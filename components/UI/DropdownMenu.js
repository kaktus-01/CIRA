import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";

function DropdownMenu() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: "Apple", value: "apple" },
        { label: "Banana", value: "banana" },
    ]);

    return (
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
        />
    );
}

export default DropdownMenu;
