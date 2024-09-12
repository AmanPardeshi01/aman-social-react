import { Avatar, Card, CardHeader, IconButton } from '@mui/material';
import React from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useSelector } from 'react-redux';
import Chat from '@mui/icons-material/Chat';

const UserChatCard = ({ chat }) => {
    // Destructure from the Redux store
    const { auth } = useSelector(store => store);

    // Add null checks for chat and users
    if (!chat || !chat.users || chat.users.length < 2) {
        return <div>Invalid chat data</div>;
    }

    // Add null checks for auth.user
    if (!auth.user) {
        return <div>User not authenticated</div>;
    }

    const user1 = chat.users[0];
    const user2 = chat.users[1];
    const isCurrentUser = auth.user.id === user1.id;

    return (
        <Card>
            <CardHeader 
                avatar={
                    <Avatar 
                        sx={{ width: "3.5rem", height: "3.5rem", fontSize: "1.5rem", backgroundColor: "#191c29", color: "rgb(88,199,250)" }} 
                        src='https://cdn.pixabay.com/photo/2024/05/08/09/02/spoonbill-8747794_640.jpg' 
                    />
                } 
                action={
                    <IconButton>
                        <MoreHorizIcon />
                    </IconButton>
                }
                title={isCurrentUser ? `${user2.username} ${user2.lastname}` : `${user1.username} ${user1.lastname}`}
                subheader={"new message"}
            />
        </Card>
    );
}

export default UserChatCard;
