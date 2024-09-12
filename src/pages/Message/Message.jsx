import { Avatar, Backdrop, CircularProgress, Grid, IconButton } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import WestIcon from '@mui/icons-material/West';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SearchUser from '../../Components/SearchUser/SearchUser';
import UserChatCard from './UserChatCard';
import ChatMessage from './ChatMessage';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, getAllChats } from '../../Redux/Message/message.action';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { uploadToCloudniry } from '../../../src/utils/uploadToCloudniry';
import SockJS from "sockjs-client";
import Stom from 'stompjs'; // Ensure the correct path and named import

export const Message = () => {
  const dispatch = useDispatch();
  const { message, auth } = useSelector((store) => store);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [loading, setLoading] = useState(false);
  const chatContainerRef=useRef(null);

  useEffect(() => {
    dispatch(getAllChats());
  }, [dispatch]);

  console.log("Chats----", message.chats);

  const handleSelectImage = async (e) => {
    setLoading(true);
    const file = e.target.files[0]; // Use e.target.files[0] to get the file
    if (file) {
      console.log("Image Handled Successfully");
      try {
        const imgUrl = await uploadToCloudniry(file, "image");
        setSelectedImage(imgUrl); // Correct state setter
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
    setLoading(false);
  };

  const handleCreateMessage = (value) => {
    if (!currentChat) return; // Ensure currentChat exists
    const message = {
      chatId: currentChat.id,
      content: value,
      image: selectedImage
    };
    dispatch(createMessage({message,sendMessageToServer}));
  };

  useEffect(() => {
    setMessages([...messages, message.message])
  }, [message.message])

  const [stompClient, setStomclient]=useState(null);

  useEffect(()=>{
    const sock = new SockJS('http://localhost:8080/ws');
    const stomp=Stom.over(sock);
    setStomclient(stomp);
    stomp.connect({},onConnect,onError)
  },[])

  const onConnect=()=>{
    console.log("Websocket Connected");
  }

  const onError=(error)=>{
    console.log("Error",error);
  }

  useEffect(()=>{
    if(stompClient && auth.user && currentChat ) {
      const subscription=stompClient.subscribe(`/user/${currentChat.id}/private`,
      onMessageReice)
    }
  })

  const sendMessageToServer=(newMessage)=>{
    if(stompClient && newMessage){
      stompClient.send(`/app/chat/${currentChat?.id.toString()}`,{},
      JSON.stringif(newMessage))
    }
  }

  const onMessageReice=(payload)=>{    
    const recivedMessage=JSON.parse(payload.body)
    console.log("Message received from websocket",recivedMessage)
    setMessages([...messages,recivedMessage])
  }

  useEffect(()=>{
    if(chatContainerRef.current){
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  },[messages])

  return (
    <div>
      <Grid container className='h-screen overflow-y-hidden'>
        <Grid className='px-5' item xs={3}>
          <div className='flex h-full justify-between space-x-2'>
            <div className='w-full'>
              <div className='flex space-x-4 items-center py-5'>
                <WestIcon />
                <h1 className='text-xl font-bold'>Home</h1>
              </div>
              <div className='h-[83vh]'>
                <div>
                  <SearchUser />
                </div>
                <div className='h-full space-y-4 mt-5 overflow-y-scroll hideScrollbar'>
                  {message.chats && message.chats.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setCurrentChat(item);
                        setMessages(item.messages);
                      }}
                    >
                      <UserChatCard chat={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className='h-full' item xs={9}>
          {currentChat ? (
            <div>
              <div className='flex justify-between items-center border-l p-5'>
                <div className='flex items-center space-x-3'>
                  <Avatar
                    src='https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.webp?b=1&s=612x612&w=0&k=20&c=hEPh7-WEAqHTHdQtPrfEN9-yYCiPGKvD32VZ5lcL6SU='
                  />
                  <p>
                    {auth.user.id === currentChat.users[0].id
                      ? `${currentChat.users[1].username} ${currentChat.users[1].lastname}`
                      : `${currentChat.users[0].username} ${currentChat.users[0].lastname}`}
                  </p>
                </div>
                <div className='flex space-x-3'>
                  <IconButton>
                    <AddIcCallIcon />
                  </IconButton>
                  <IconButton>
                    <VideoCallIcon />
                  </IconButton>
                </div>
              </div>

              <div ref={chatContainerRef} className='hideScrollbar overflow-y-scroll h-[82vh] px-2 space-y-5'>
                {messages.map((item) => <ChatMessage item={item} />)}
              </div>

              <div className='sticky bottom-0 border-l'>
              {selectedImage && <img className='w-[5rem] h-[5rem] object-cover px-2' src={selectedImage} alt="" />}
                <div className='py-5 flex items-center justify-center space-x-5'>
                  
                  <input
                    className='bg-transparent border border-[#3b40544] rounded-full w-[90%] py-3'
                    placeholder='Type Message...'
                    type='text'
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.target.value) {
                        handleCreateMessage(e.target.value);
                        e.target.value = ''; // Clear input field after sending
                        setSelectedImage("")
                      }
                    }}
                  />
                  <div>
                    <input
                      onChange={handleSelectImage}
                      accept='image/*'
                      className='hidden'
                      id='image-input'
                      type='file'
                    />
                    <label htmlFor='image-input'>
                      <AddPhotoAlternateIcon />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='h-full space-y-5 flex flex-col justify-center items-center'>
              <ChatBubbleOutlineIcon sx={{ fontSize: '15rem' }} />
              <p className='text-xl font-semibold'>No Chat Selected</p>
            </div>
          )}
        </Grid>
      </Grid>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Message;
