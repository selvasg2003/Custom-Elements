import React, { useState, useEffect } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Height } from "@mui/icons-material";

const InpersonEvent = ({}) => {
  const allTimeZones = Intl.supportedValuesOf("timeZone");
  const [timeZones, setTimeZones] = useState(allTimeZones[0]);
  const [startTime, setStartTime] = useState("12:00 PM");
  const [endTime, setEndTime] = useState("12:30 PM");
  const [duration, setDuration] = useState("30 minutes");
  const [isOpen, setIsOpen] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [startDate, setStartDate] = useState("");

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleSave = () => {
    if (!startDate.trim()) {
      alert("Date is required.");
      return;
    }
    if (!timeZones.trim()) {
      alert("Time zone is required.");
      return;
    }
    if (!startTime.trim()) {
      alert("Start time is required.");
      return;
    }
    if (!endTime.trim()) {
      alert("End time is required.");
      return;
    }
    if (!duration.trim() || duration === "Invalid time selection") {
      alert("Valid duration is required.");
      return;
    }

    const data = {
      date: startDate,
      timeZones,
      startTime,
      endTime,
      duration,
    };
    window.CustomElement.setValue(JSON.stringify(data));
    alert("Event Date & Time Saved Successfully!");
  };

  if (!isOpen) return null;

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const toggleDaySelection = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const timeOptions = Array.from({ length: 96 }, (_, i) => {
    const hours = Math.floor(i / 4); // Each hour has 4 slots (15 min each)
    const minutes = (i % 4) * 15; // Minutes: 0, 15, 30, 45
    const period = hours < 12 ? "AM" : "PM";
    const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHour}:${minutes.toString().padStart(2, "0")} ${period}`;
  });

  const timeToMinutes = (time) => {
    let [hours, minutes] = time.split(/[: ]/);
    let isPM = time.includes("PM");
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);

    if (isPM && hours !== 12) hours += 12;
    if (!isPM && hours === 12) hours = 0;

    return hours * 60 + minutes;
  };

  const updateDuration = (newStartTime, newEndTime) => {
    let startMinutes = timeToMinutes(newStartTime);
    let endMinutes = timeToMinutes(newEndTime);
    if (endMinutes > startMinutes) {
      let totalMinutes = endMinutes - startMinutes;
      let hours = Math.floor(totalMinutes / 60);
      let minutes = totalMinutes % 60;
      let formattedDuration =
        hours > 0
          ? `${hours} hr${hours > 1 ? "s" : ""}${
              minutes > 0 ? ` ${minutes} minutes` : ""
            }`
          : `${minutes} minutes`;
      setDuration(formattedDuration);
    } else {
      setDuration("Invalid time selection");
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value >= 1 && value <= 31) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    setSelectedDate(value);
  };

  useEffect(() => {
    if (window.CustomElement) {
      try {
        window.CustomElement.init((element, context) => {
          // Initializes the custom element
          const parsedValue = JSON.parse(element.value);
          setStartDate(parsedValue.date || "");
          setTimeZones(parsedValue.timeZones || []);
          setStartTime(parsedValue.startTime || "");
          setEndTime(parsedValue.endTime || "");
          setDuration(parsedValue.duration || "");
        });
        const height = document.getElementById("inpersonevent").scrollHeight;
        CustomElement.setHeight(height);
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <div
        id="inpersonevent"
        className="rounded-xl p-6 w-[617px] bg-white shadow-lg flex flex-col overflow-hidden h-full"
      >
        <div className="w-full flex justify-center items-center border-b pb-2">
          <h2 className="text-xl font-semibold text-gray-800">Date & Time</h2>
        </div>

        <div className="flex flex-col p-4">
          <div className="bg-white shadow-lg p-6 rounded-xl border border-gray-300">
            <h2 className="text-lg font-semibold text-gray-800">Event Date</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center space-x-4">
                <label className="text-gray-700 font-medium">Date:</label>
                <input
                  type="date"
                  className="border rounded-md p-2 w-[200px]"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="flex justify-between items-center space-x-4">
                <label className="text-gray-700 font-medium">Time Zone:</label>
                <select
                  className="p-2 border rounded-md text-gray-700 w-[200px]"
                  value={timeZones}
                  onChange={(e) => setTimeZones(e.target.value)}
                >
                  {allTimeZones.map((zone) => (
                    <option key={zone} value={zone}>
                      {zone}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="mt-4 bg-white shadow-lg p-6 rounded-xl border border-gray-300">
            <h2 className="text-lg font-semibold text-gray-800">Event Time</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-gray-700 font-medium">Start Time:</label>
                <select
                  className="p-2 border rounded-md text-gray-700 w-[150px]"
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(e.target.value);
                    updateDuration(e.target.value, endTime);
                  }}
                >
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between items-center">
                <label className="text-gray-700 font-medium">End Time:</label>
                <select
                  className="p-2 border rounded-md text-gray-700 w-[150px]"
                  value={endTime}
                  onChange={(e) => {
                    setEndTime(e.target.value);
                    updateDuration(startTime, e.target.value);
                  }}
                >
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <label className="text-gray-700 font-medium">Duration:</label>
                <select
                  className="p-2 border rounded-md text-gray-700 bg-gray-200 w-[150px]"
                  value={duration}
                  disabled
                >
                  <option>{duration}</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          <button
            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
            onClick={handleSave}
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default InpersonEvent;
