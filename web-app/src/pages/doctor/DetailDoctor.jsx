import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography, Container, Card, CardContent, CardMedia, CircularProgress, Snackbar } from "@mui/material";
import { apiGetProfileById } from "../../services/doctorService";
import TimePicker from '../../components/TimePicker';
import ConfirmationModal from '../../components/ConfirmationModal';
import Scene from "../Scene";
import { apiCreateAppointment } from "../../services/Appointment";

function DetailDoctor() {

    let { userId } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const value = queryParams.get('value');

    const [doctorData, setDoctorData] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedDay, setSelectedDay] = useState(new Date().getDay());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        try {
            (async () => {
                const res = await apiGetProfileById(userId);
                if (res?.data?.code === 1000) {
                    setDoctorData(res?.data?.result);
                }
            })();
        } catch (error) {
            console.log(error);
        }
    }, [userId]);

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
        setIsModalOpen(true); // Open the modal when time is selected
    };

    const handleDaySelect = (day) => {
        setSelectedDay(day);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSuccessMessage('');
        setErrorMessage('');
    };

    const handleConfirm = async (userInfo) => {
        setIsLoading(true); // Start loading animation

        const updatedUserInfo = {
            ...userInfo,
            selectedDay: selectedDay,
            selectedTime: selectedTime,
        };

        try {
            const res = await apiCreateAppointment(value, updatedUserInfo);
            if (res?.data?.code === 1000) {
                setSuccessMessage('Appointment successfully created.'); // Display success message
            } else {
                setErrorMessage('Failed to create appointment.'); // Display error message
            }
        } catch (error) {
            console.log(error);
            setErrorMessage('Failed to create appointment.'); // Display error message
        }

        setIsLoading(false); // Stop loading animation

        // Close the modal after handling response
        setIsModalOpen(false);
    };

    return (
        <Scene>
            <TimePicker onTimeSelect={handleTimeSelect} onDaySelect={handleDaySelect} />
            <Container>
                {doctorData ? (
                    <Card sx={{ display: 'flex', marginTop: '20px' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 256, height: 256 }}
                            image={doctorData.imageLink}
                            alt={doctorData.userNameDetail}
                        />
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {doctorData.userNameDetail}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph>
                                {doctorData.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Specialization:</strong> {doctorData.specialization}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Hospital Address:</strong> {doctorData.hospitalAddress}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Examination Address:</strong> {doctorData.examinationAddress}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Examination Price:</strong> {doctorData.examinationPrice} VND
                            </Typography>
                            <Box mt={2}>
                                <Typography variant="body1" component="div">
                                    <strong>Details:</strong>
                                </Typography>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    {doctorData.markdownContent}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ) : (
                    <Typography variant="h6" component="div" sx={{ marginTop: '20px' }}>
                        Loading...
                    </Typography>
                )}
            </Container>
            <ConfirmationModal
                open={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirm}
                selectedDay={selectedDay}
                selectedTime={selectedTime}
            />
            {isLoading && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        zIndex: 9999,
                    }}
                >
                    <CircularProgress />
                </Box>
            )}
            <Snackbar
                open={!!successMessage || !!errorMessage}
                autoHideDuration={6000}
                onClose={() => {
                    setSuccessMessage('');
                    setErrorMessage('');
                }}
                message={successMessage || errorMessage}
            />
        </Scene>
    );
}

export default DetailDoctor;
