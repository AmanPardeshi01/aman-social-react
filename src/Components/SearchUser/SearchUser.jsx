import { Avatar, Card, CardHeader } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../../Redux/Auth/auth.action';
import { createChat } from '../../Redux/Message/message.action';

const SearchUser = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);

  const handleSearchUser = (e) => {
    const newValue = e.target.value;
    setUsername(newValue);
    console.log("Search User", auth.searchUser);
    dispatch(searchUser(newValue));
  };

  const handleClick = (id) => {
    dispatch(createChat({userId:id}))
  };

  return (
    <div>
      <div className='py-5 relative'>
        <input
          className='bg-transparent border border-[#3b4054] outline-none w-full px-5 py-3 rounded-full'
          placeholder='search user...'
          onChange={handleSearchUser}
          type="text"
        />
        {
          username && (
            auth.searchUser?.map((item) => (
              <Card key={item.id} className='absolute w-full z-10 top-[4.5rem] cursor-pointer'>
                <CardHeader
                  onClick={() => {
                    handleClick(item.id); // Make sure to pass item.id
                    setUsername(""); // Clear the search input
                  }}
                  avatar={
                    <Avatar src='https://cdn.pixabay.com/photo/2024/05/08/09/02/spoonbill-8747794_640.jpg' />
                  }
                  title={`${item.username || ''} ${item.lastname || ''}`}
                  subheader={`${(item.username || '').toLowerCase()}_${(item.lastname || '').toLowerCase()}`}
                />
              </Card>
            ))
          )
        }
      </div>
    </div>
  );
};

export default SearchUser;
