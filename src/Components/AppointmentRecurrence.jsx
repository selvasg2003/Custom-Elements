import React, { useState, useEffect } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const AppointmentRecurrence = ({}) => {
  const [isWeekly, setIsWeekly] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [timeZones, setTimeZones] = useState([]);
  const [isRecurrence, setIsRecurrence] = useState(false);
  const [recurrenceRange, setRecurrenceRange] = useState("");
  const [startTime, setStartTime] = useState("12:00 PM");
  const [endTime, setEndTime] = useState("12:30 PM");
  const [duration, setDuration] = useState("30 minutes");
  const durationOptions = ["15 minutes", "30 minutes", "45 minutes", "1 hour"];
  const [selectedDay, setSelectedDay] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [eventData, setEventData] = useState({});

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleSave = () => {
    const data = {
      date: startDate,
      timeZones,
      startTime,
      endTime,
      duration,
      isRecurrence,
      selectedDay: isRecurrence ? selectedDay : null,
      recurrenceStart: isRecurrence ? startDate : null,
      recurrenceEnd: isRecurrence ? endDate : null,
    };
    setEventData(data);
    console.log("Saved Event Data:", data);
    handleClose();
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
  const usTimeZones = [
    "Pacific Time (PT)",
    "Mountain Time (MT)",
    "Central Time (CT)",
    "Eastern Time (ET)",
    "Alaska Time (AKT)",
    "Hawaii-Aleutian Time (HAT)",
  ];

  const toggleDaySelection = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const hours = Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";
    const period = hours < 12 ? "AM" : "PM";
    const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHour}:${minutes} ${period}`;
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

  useEffect(() => {
    if (window.CustomElement) {
      try {
        window.CustomElement.init((element) => {
          if (element.value) {
            setDuration(element.value);
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 w-full">
      <div className="rounded-xl p-6 w-[617px] bg-white shadow-lg flex flex-col overflow-hidden max-h-[90vh]">
        <div className="w-full flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-semibold text-gray-800">Recurrence</h2>

          <CloseOutlinedIcon
            className="cursor-pointer text-gray-500 hover:text-red-500 text-2xl"
            onClick={handleClose}
          />
        </div>

        <div className="flex flex-col max-h-[80vh] overflow-y-auto p-4">
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
                  {usTimeZones.map((zone) => (
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

          <div className="mt-4 bg-white shadow-lg p-6 rounded-xl border border-gray-300">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isRecurrence"
                checked={isRecurrence}
                onChange={(e) => setIsRecurrence(e.target.checked)}
                className="w-4 h-4"
              />
              <label
                htmlFor="isRecurrence"
                className="text-gray-700 font-medium"
              >
                Is Recurrence
              </label>
            </div>
            {isRecurrence && (
              <div className="flex items-center space-x-8">
                <h2 className="text-lg font-semibold text-gray-800">Weekly</h2>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {daysOfWeek.map((day) => (
                    <label key={day} className="flex items-center">
                      <input
                        type="radio"
                        name="weeklySelection"
                        className="mr-2"
                        checked={selectedDay === day}
                        onChange={() => setSelectedDay(day)}
                      />
                      {day}
                    </label>
                  ))}
                </div>
              </div>
            )}
            {isRecurrence && (
              <div className=" mt-4 flex items-center space-x-8">
                <div className="flex items-center space-x-8">
                  <div className="flex items-center space-x-4">
                    <label className="text-gray-700 font-medium">Start:</label>
                    <input
                      type="date"
                      className="border rounded-md p-2"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="text-gray-700 font-medium">End:</label>
                    <input
                      type="date"
                      className="border rounded-md p-2"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
            onClick={handleSave}
          >
            OK
          </button>
          <button
            className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentRecurrence;
