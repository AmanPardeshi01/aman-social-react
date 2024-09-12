
import { Avatar, Box, Button, Card, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import PostCard from '../../Components/Post/PostCard';
import UserReelCard from '../../Components/Reels/UserReelCard';
import { useSelector } from 'react-redux';
import ProfileModel from './ProfileModel';

const tabs = [
  { value: 'post', name: "Post" },
  { value: 'reels', name: "Reels" },
  { value: 'saved', name: "Saved" },
  { value: 'repost', name: "Repost" }
]

const posts = [1, 1, 1, 1, 1];
const reels = [1, 1, 1, 1];
const savepost = [1, 1, 1, 1];
const Profile = () => {

  const [open, setOpen] = useState(false);
  const handleOpenProfileModel = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { auth } = useSelector(store => store);
  const { id } = useParams();
  const [value, setValue] = React.useState('post');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const useruserName = auth.user?.username || '';
  const userLastName = auth.user?.lastname || '';
  const userHandle = `${useruserName.toLowerCase()}_${userLastName.toLowerCase()}`;

  return (
    <Card className='mty-10 w-[70%]'>
      <div className='rounded-md'>
        <div className='h-[15rem]'>
          <img className='w-full h-full rounded-t-md' src="https://cdn.pixabay.com/photo/2014/01/13/20/01/pebbles-243910_640.jpg" alt="" />

        </div>

        <div className='px-5 flex justify-between items-start mt-5 h-[5rem]'>
          <Avatar className='transform -translate-y-24' sx={{ width: "10rem", height: "10rem" }} src='' />
          {true ? <Button onClick={handleOpenProfileModel} sx={{ borderRadius: "20px" }} variant='outlined'>Edit Profile</Button> : <Button variant='outlined'>follow</Button>}
        </div>

        <div className='p-5'>
          <div>
            <h1 className='py-1 font-bold text-xl'>{useruserName} {userLastName}</h1>
            <p>@{userHandle}</p>
          </div>

          <div className='flex gap-5 item-center py-3'>
            <span>41 Post</span>
            <span>10 Followers</span>
            <span>20 Floowings</span>
          </div>

          <div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>

        <section>
          <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange} aria-label='wrapped label tabs example' >
              {tabs.map((item) => <Tab value={item.value} label={item.name} />)}

            </Tabs>
          </Box>
          <div className='flex justify-center'>
            {value === "post" ? (
              <div className='space-y-5 w-[70%] my-10'>
                {posts.map((item) => (
                  <div className='border border-slate-100 rounded-md'>
                    <PostCard />
                  </div>

                ))}
              </div>
            ) : value === "reels" ?

              <div className='flex justify-center flex-wrap gap-2 my-10'>
                {reels.map((item) => <UserReelCard />)}
              </div> : value === "saved" ? (
                <div className='space-y-5 w-[70%] my-10'>
                  {savepost.map((item) => (
                    <div className='border border-slate-100 rounded-md'>
                      <PostCard />
                    </div>
                  ))}
                </div>
              ) : (
                <div>Repost</div>
              )}
          </div>
        </section>

        <section>
          <ProfileModel open={open} handleClose={handleClose} />
        </section>
      </div>
    </Card>
  )
}

export default Profile