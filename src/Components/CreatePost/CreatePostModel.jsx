import ImageIcon from '@mui/icons-material/Image';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { Avatar, Backdrop, Box, Button, CircularProgress, IconButton, Modal } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { uploadToCloudniry } from '../../utils/uploadToCloudniry';
import { useDispatch } from 'react-redux';
import { createCommentAction, createPostAction } from '../../Redux/Post/post.action';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: "0.6rem",
  outline: "none",
};

const CreatePostModel = ({ handleClose, open }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSelectImage = async (event) => {
    setIsLoading(true);
    try {
      const imageUrl = await uploadToCloudniry(event.target.files[0], "image");
      setSelectedImage(imageUrl);
      formik.setFieldValue("image", imageUrl);
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectVideo = async (event) => {
    setIsLoading(true);
    try {
      const videoUrl = await uploadToCloudniry(event.target.files[0], "video"); // Corrected to "video"
      setSelectedVideo(videoUrl);
      formik.setFieldValue("video", videoUrl); // Changed to "video"
    } catch (error) {
      console.error("Video upload failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      caption: "",
      image: "",
      video: ""
    },
    onSubmit: (values) => {
      console.log("Formik values:", values);
      dispatch(createPostAction(values));
      handleClose(); // Close modal after submission
    }
  });



  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="create-post-modal-title"
      aria-describedby="create-post-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <div className='flex space-x-4 items-center'>
              <Avatar />
              <div>
                <p className='font-bold text-lg'>Code With Aman</p>
                <p className='text-sm'>@amanpardeshi</p>
              </div>
            </div>
            <textarea
              className='outline-none w-full mt-5 p-2 bg-transparent border border-[#3b4054] rounded-sm'
              placeholder='Write caption...'
              name="caption"
              onChange={formik.handleChange}
              value={formik.values.caption}
              rows="4"
            />

            <div className='flex space-x-5 items-center mt-5'>
              <div>
                <input
                  type="file"
                  accept='image/*'
                  onChange={handleSelectImage}
                  style={{ display: "none" }}
                  id='image-input'
                />
                <label htmlFor="image-input">
                  <IconButton color='primary' component="span">
                    <ImageIcon />
                  </IconButton>
                </label>
                <span>Image</span>
              </div>

              <div>
                <input
                  type="file"
                  accept='video/*'
                  onChange={handleSelectVideo}
                  style={{ display: "none" }}
                  id='video-input'
                />
                <label htmlFor="video-input">
                  <IconButton color='primary'>
                    <VideoCallIcon />
                  </IconButton>
                </label>
                <span>Video</span>
              </div>
            </div>

            {selectedImage && (
              <div>
                <img className='h-[10rem] mt-4' src={selectedImage} alt="Selected" />
              </div>
            )}

            {selectedVideo && (
              <div className='mt-4'>
                <video className='h-[10rem]' controls>
                  <source src={selectedVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            <div className='flex w-full justify-end mt-4'>
              <Button variant="contained" type='submit' sx={{ borderRadius: "1.5rem" }}>
                Post
              </Button>
            </div>
          </div>
        </form>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Modal>
  );
};

export default CreatePostModel;