import React from 'react';
import { useSelector } from 'react-redux';

const ChatMessage = ({ item = {} }) => {
  // Extract necessary state from Redux store
  const { auth } = useSelector((store) => store);

  // Check if `auth.user` and `item.user` are defined before comparing
  const isReqUserMessage = auth?.user?.id === item?.user?.id;

  return (
    <div className={`flex ${isReqUserMessage ? "justify-start" : "justify-end"} text-white`}>
      <div className={`p-1 ${item?.image ? "rounded-md" : "px-5 rounded-full"} bg-[#191229]`}>
        {item?.image && (
          <img
            className='w-[12rem] h-[17rem] object-cover rounded-md'
            alt='User content'
            src={item.image}
          />
        )}
        <p className={`${true ? "py-2" : "py-1"}`}>
          {item?.content || 'No content available'}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
