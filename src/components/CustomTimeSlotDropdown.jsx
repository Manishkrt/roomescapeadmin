import { useState } from "react";

const CustomTimeSlotDropdown = ({ availableSlot, formHandle, setTimeSlotErr, setselectedTimeSlot }) => {
    const [selectedSlot, setSelectedSlot] = useState("Choose Time Slot");
    const [isOpen, setIsOpen] = useState(false);

    const getColor = (slots) => {
        if (slots === 0) return "text-danger"; // Red for 0
        if (slots <= 2) return "text-warning"; // Orange for 1-2
        return "text-success"; // Green for 3+
    };

    const handleSelect = (value) => {
        setSelectedSlot(value.timeSlot);
        setTimeSlotErr("")
        setselectedTimeSlot(value.id)
        formHandle({ target: { name: "timeSlot", value: value.timeSlot } }); // Mimicking event
        setIsOpen(false);
    };

    const convertTo12HourFormat = (time) => {
        const [hours, minutes] = time.split(":");
        const date = new Date();
        date.setHours(hours, minutes);

        return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
    };

    return (
        <div className="dropdown">
            {/* Dropdown Button */}
            <button
                className="btn border dropdown-toggle w-100 text-start"
                // className="btn btn-outline-secondary dropdown-toggle w-100 text-start"
                type="button"
                onClick={() => setIsOpen(!isOpen)}
            >
                {convertTo12HourFormat(selectedSlot)}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="dropdown-menu w-100 show" style={{ maxHeight: "250px", overflowY: "auto" }}>
                    <div
                        className="dropdown-item d-flex justify-content-between align-items-center border-bottom" 
                    >
                        <span className="text-muted"> Time Slot</span>
                        <span className="text-muted"> Remaining Sheet</span>
                    </div>
                    {availableSlot.map((value) => (
                        <div
                            key={value.timeSlot}
                            className="dropdown-item d-flex justify-content-between align-items-center border-bottom"
                            onClick={() => handleSelect(value)}
                            style={{ cursor: "pointer" }}
                        >
                            <span>{convertTo12HourFormat(value.timeSlot)}</span>
                            <span className={getColor(value.remainingSlots)}>{value.remainingSlots}</span>
                        </div>
                    ))}
                    {availableSlot.length <= 0 &&
                        <div
                            className="dropdown-item text-center" 
                        >
                            <p className="mb-0"> No Time Slot <br/> Select Game & Date</p> 
                        </div>
                    }
                </div>
            )}
        </div>
    );
};

export default CustomTimeSlotDropdown;
