import React, { useState, useEffect } from "react";
import Scene from "../Scene";
import { apiGetAllAppointment } from "../../services/Appointment";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container, CircularProgress } from "@mui/material";

function ManageSchedule() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await apiGetAllAppointment();
                setAppointments(res?.data?.result);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            } finally {
                setLoading(false);
            }
        })()
    }, []);

    if (loading) {
        return (
            <Scene>
                <Container>
                    <CircularProgress />
                </Container>
            </Scene>
        );
    }

    const getDayOfWeek = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'long' };
        return new Intl.DateTimeFormat('vi-VN', options).format(date);
    };

    const getFormattedDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('vi-VN', options).format(date);
    };

    console.log(appointments);


    return (
        <Scene>
            <Container>
                <Typography variant="h4" component="h2" gutterBottom>
                    Manage Schedule
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Họ tên Người Đặt Lịch</TableCell>
                                <TableCell>Email Người Đặt Lịch</TableCell>
                                <TableCell>Số điện thoại Người Đặt Lịch</TableCell>
                                <TableCell>Giới tính Người Đặt Lịch</TableCell>
                                <TableCell>Địa chỉ Người Đặt Lịch</TableCell>
                                <TableCell>Thứ</TableCell>
                                <TableCell>Thời Gian</TableCell>
                                <TableCell>Thời gian chọn</TableCell>
                                <TableCell>Email người dùng</TableCell>
                                <TableCell>Tên đăng nhập</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {appointments && appointments.map((appointment, index) => (
                                <TableRow key={index}>
                                    <TableCell>{appointment?.fullName}</TableCell>
                                    <TableCell>{appointment?.email}</TableCell>
                                    <TableCell>{appointment?.phoneNumber}</TableCell>
                                    <TableCell>{appointment?.gender}</TableCell>
                                    <TableCell>{appointment?.address}</TableCell>
                                    <TableCell>{getDayOfWeek(appointment?.selectedDay)}</TableCell>
                                    <TableCell>{getFormattedDate(appointment?.selectDay)}</TableCell>
                                    <TableCell>{appointment?.selectedTime}</TableCell>
                                    <TableCell>{appointment?.user?.email}</TableCell>
                                    <TableCell>{appointment?.user?.username}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Scene>
    );
}

export default ManageSchedule;
