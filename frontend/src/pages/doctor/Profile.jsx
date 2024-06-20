import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from "@mui/material";
import Scene from "../Scene";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { apiCheckProfile, apiCreateProfile } from '../../services/doctorService';
import { useNavigate, useParams } from 'react-router-dom';

// Define validation schema
const schema = yup.object().shape({
    userNameDetail: yup.string().required("User Name Detail is required"),
    title: yup.string().required("Title is required"),
    imageLink: yup.string().url("Must be a valid URL").required("Image Link is required"),
    hospitalAddress: yup.string().required("Hospital Address is required"),
    examinationAddress: yup.string().required("Examination Address is required"),
    examinationPrice: yup.number().typeError("Examination Price must be a number").required("Examination Price is required"),
    specialization: yup.string().required("Specialization is required"),
});


function Profile() {
    const navigate = useNavigate();
    let { userId } = useParams();
    const [markdownContent, setMarkdownContent] = useState("");
    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await apiCheckProfile(userId);
                if (res) {
                    const profileData = res.data?.result;
                    console.log(profileData);
                    setValue("userNameDetail", profileData.userNameDetail);
                    setValue("title", profileData.title);
                    setValue("imageLink", profileData.imageLink);
                    setValue("hospitalAddress", profileData.hospitalAddress);
                    setValue("examinationAddress", profileData.examinationAddress);
                    setValue("examinationPrice", profileData.examinationPrice);
                    setValue("specialization", profileData.specialization);
                    setMarkdownContent(profileData.markdownContent);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchProfile();
    }, [userId, setValue]);

    const onSubmit = async (data) => {
        data.markdownContent = markdownContent;
        try {
            const res = await apiCreateProfile(userId, data);
            if (res?.data?.code === 1000) {
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const mdParser = new MarkdownIt(/* Markdown-it options */);

    function handleEditorChange({ html, text }) {
        setMarkdownContent(text);
    }

    return (
        <Scene>
            <Typography variant="h5" component="h1" gutterBottom>
                Create Profile Doctor
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Button type="submit" variant="contained" sx={{ mb: "10px" }}>
                    Save
                </Button>
                <Box sx={{ display: 'flex', gap: '20px', mb: '10px' }}>
                    <Controller
                        name="userNameDetail"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="User Name Detail"
                                variant="outlined"
                                error={!!errors.userNameDetail}
                                helperText={errors.userNameDetail?.message}
                                sx={{ width: "50%" }}
                            />
                        )}
                    />
                    <Controller
                        name="title"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Title"
                                variant="outlined"
                                error={!!errors.title}
                                helperText={errors.title?.message}
                                sx={{ width: "50%" }}
                            />
                        )}
                    />
                </Box>
                <Box sx={{ display: 'flex', gap: '20px', mb: '10px' }}>
                    <Controller
                        name="imageLink"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Image Link"
                                variant="outlined"
                                error={!!errors.imageLink}
                                helperText={errors.imageLink?.message}
                                sx={{ width: "50%" }}
                            />
                        )}
                    />
                    <Controller
                        name="hospitalAddress"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Hospital Address"
                                variant="outlined"
                                error={!!errors.hospitalAddress}
                                helperText={errors.hospitalAddress?.message}
                                sx={{ width: "50%" }}
                            />
                        )}
                    />
                </Box>
                <Box sx={{ display: 'flex', gap: '20px', mb: '20px' }}>
                    <Controller
                        name="examinationAddress"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Examination Address"
                                variant="outlined"
                                error={!!errors.examinationAddress}
                                helperText={errors.examinationAddress?.message}
                                sx={{ width: "50%" }}
                            />
                        )}
                    />
                    <Controller
                        name="examinationPrice"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Examination Price"
                                placeholder="VND"
                                variant="outlined"
                                error={!!errors.examinationPrice}
                                helperText={errors.examinationPrice?.message}
                                sx={{ width: "50%" }}
                            />
                        )}
                    />
                </Box>
                <Box sx={{ display: 'flex', gap: '20px', mb: '20px' }}>
                    <Controller
                        name="specialization"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Specialization"
                                variant="outlined"
                                error={!!errors.specialization}
                                helperText={errors.specialization?.message}
                                sx={{ width: "50%" }}
                            />
                        )}
                    />
                </Box>
            </Box>
            <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} value={markdownContent} />
        </Scene>
    );
}

export default Profile;
