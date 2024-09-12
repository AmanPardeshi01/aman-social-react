import { Avatar, Box, Button, IconButton, Modal, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { updateProfileAction } from "../../Redux/Auth/auth.action";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    outline: "none",
    overFlow: "scroll-y",
    borderRadius: 3,
};

export default function ProfileModel({ open, handleClose }) {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            username: "",
            lastname: ""
        },
        onSubmit: (values) => {
            console.log("values ", values);
            dispatch(updateProfileAction(values));
        },
    });

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form onSubmit={formik.handleSubmit}>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-3'>
                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                            <p>Edit Profile</p>
                        </div>
                        <Button type="submit" variant="contained">Save</Button>
                    </div>

                    <div>
                        <div className='h-[15rem]'>
                            <img
                                className='w-full h-full rounded-t-md'
                                src='https://cdn.pixabay.com/photo/2014/01/13/20/01/pebbles-243910_640.jpg'
                                alt='Cover'
                            />
                        </div>
                        <div className='pl-5'>
                            <Avatar
                                className='transform -translate-y-24'
                                sx={{ width: "10rem", height: "10rem" }}
                                src='https://res.cloudinary.com/ddkso1wxi/image/upload/v1675919455/Logo/Copy_of_Zosh_Academy_nblljp.png'
                            />
                        </div>
                    </div>

                    <div className='space-y-3'>
                        <TextField
                            fullWidth
                            id="username"
                            name="username"
                            label="First Name"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            fullWidth
                            id="lastname"
                            name="lastname"
                            label="Last Name"
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                        />
                    </div>
                </form>
            </Box>
        </Modal>
    );
}
