import React from 'react';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    fullName: yup.string().required('Họ tên là bắt buộc'),
    email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
    phoneNumber: yup.string().required('Số điện thoại là bắt buộc').matches(/^[0-9]+$/, 'Số điện thoại chỉ chứa chữ số'),
    gender: yup.string().required('Giới tính là bắt buộc'),
    address: yup.string().required('Địa chỉ là bắt buộc'),
});


const ConfirmationModal = ({ open, onClose, onConfirm, selectedDay, selectedTime }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        onConfirm(data);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Xác nhận thông tin</DialogTitle>
            <DialogContent>
                <Box>
                    <Typography>Ngày: {['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'][selectedDay]}</Typography>
                    <Typography>Thời gian: {selectedTime}</Typography>
                </Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="fullName"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                autoFocus
                                margin="dense"
                                label="Họ tên"
                                type="text"
                                fullWidth
                                error={!!errors.fullName}
                                helperText={errors.fullName ? errors.fullName.message : ''}
                            />
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="dense"
                                label="Email"
                                type="email"
                                fullWidth
                                error={!!errors.email}
                                helperText={errors.email ? errors.email.message : ''}
                            />
                        )}
                    />
                    <Controller
                        name="phoneNumber"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="dense"
                                label="Số điện thoại"
                                type="text"
                                fullWidth
                                error={!!errors.phoneNumber}
                                helperText={errors.phoneNumber ? errors.phoneNumber.message : ''}
                            />
                        )}
                    />
                    <Controller
                        name="gender"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <FormControl fullWidth margin="dense" error={!!errors.gender}>
                                <InputLabel>Giới tính</InputLabel>
                                <Select {...field}>
                                    <MenuItem value="Nam">Nam</MenuItem>
                                    <MenuItem value="Nữ">Nữ</MenuItem>
                                    <MenuItem value="Khác">Khác</MenuItem>
                                </Select>
                                {errors.gender && <Typography color="error">{errors.gender.message}</Typography>}
                            </FormControl>
                        )}
                    />
                    <Controller
                        name="address"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="dense"
                                label="Địa chỉ"
                                type="text"
                                fullWidth
                                error={!!errors.address}
                                helperText={errors.address ? errors.address.message : ''}
                            />
                        )}
                    />
                    <DialogActions>
                        <Button onClick={onClose}>Hủy</Button>
                        <Button type="submit">Xác nhận</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmationModal;
