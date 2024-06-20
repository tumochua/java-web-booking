import React, { useState } from 'react';
import { Box, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const generateTimeSlots = (day, start, end, interval) => {
    const startTime = new Date(`1970-01-01T${start}:00`);
    const endTime = new Date(`1970-01-01T${end}:00`);
    const timeSlots = [];
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
    const selectedDay = day;

    while (startTime < endTime) {
        const startHours = startTime.getHours().toString().padStart(2, '0');
        const startMinutes = startTime.getMinutes().toString().padStart(2, '0');

        const endTimeSlot = new Date(startTime);
        endTimeSlot.setMinutes(endTimeSlot.getMinutes() + interval);
        const endHours = endTimeSlot.getHours().toString().padStart(2, '0');
        const endMinutes = endTimeSlot.getMinutes().toString().padStart(2, '0');

        const timeSlotString = `${startHours}:${startMinutes} - ${endHours}:${endMinutes}`;

        // Check if the selected day and time is in the past
        const timeSlotDate = new Date();
        timeSlotDate.setHours(startHours, startMinutes);
        const isPast = currentDay === selectedDay && timeSlotDate < currentDate;

        if (!isPast) {
            timeSlots.push(timeSlotString);
        }

        startTime.setMinutes(startTime.getMinutes() + interval);
    }

    return timeSlots;
};

const TimePicker = ({ onTimeSelect, onDaySelect }) => {
    const [selectedDay, setSelectedDay] = useState(new Date().getDay()); // Set to current day by default
    const timeSlots = generateTimeSlots(selectedDay, '09:00', '17:00', 30);

    const handleTimeClick = (time) => {
        onTimeSelect(time);
    };

    const handleDayChange = (event) => {
        setSelectedDay(event.target.value);
        onDaySelect(event.target.value);
    };

    return (
        <Box>
            <h2>Chọn ngày và thời gian đặt lịch khám</h2>
            <FormControl fullWidth>
                <InputLabel>Chọn ngày</InputLabel>
                <Select value={selectedDay} onChange={handleDayChange}>
                    <MenuItem value={0}>Chủ Nhật</MenuItem>
                    <MenuItem value={1}>Thứ Hai</MenuItem>
                    <MenuItem value={2}>Thứ Ba</MenuItem>
                    <MenuItem value={3}>Thứ Tư</MenuItem>
                    <MenuItem value={4}>Thứ Năm</MenuItem>
                    <MenuItem value={5}>Thứ Sáu</MenuItem>
                    <MenuItem value={6}>Thứ Bảy</MenuItem>
                </Select>
            </FormControl>
            <Box className="time-picker-container">
                {timeSlots.map((time, index) => (
                    <Button key={index} variant="contained" onClick={() => handleTimeClick(time)} sx={{
                        ml: '10px',
                        mt: '10px',
                    }}>
                        {time}
                    </Button>
                ))}
            </Box>
        </Box>
    );
};

export default TimePicker;
