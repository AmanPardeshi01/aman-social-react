import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Typography, Divider } from '@mui/material';
import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentAction, likePostAction } from '../../Redux/Post/post.action';
import { isLikedByReqUser } from '../../utils/isLikedByReqUser';

const PostCard = ({ item = {} }) => {
  const [showComments, setShowComments] = useState(false);
  const handleShowComment = () => setShowComments(!showComments);
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);

  const handleCreateComment = (content) => {
    const reqData = {
      postId: item.id,
      data: {
        content
      }
    };
    dispatch(createCommentAction(reqData));
  };

  const handleLikePost = () => {
    dispatch(likePostAction(item.id));
  };

  const { id = '', user = {}, caption = '', image = '', comments = [] } = item;
  const { username = '', lastname = '' } = user;

  return (
    <Card className=''>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={(username || 'User') + " " + (lastname || 'LastName')}
        subheader={"@" + (username ? username.toLowerCase() : 'username') + "_" + (lastname ? lastname.toLowerCase() : 'lastname')}
      />

      <img className='w-full max-h-[30rem] object-cover object-top' src={image || 'default_image_url'} alt="" />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {caption || 'No caption provided'}
        </Typography>
      </CardContent>

      <CardActions className='flex justify-between' disableSpacing>
        <div>
          <IconButton onClick={handleLikePost}>
            {isLikedByReqUser(auth.user.id, item) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>

          <IconButton>
            <ShareIcon />
          </IconButton>

          <IconButton onClick={handleShowComment}>
            <ChatBubbleIcon />
          </IconButton>
        </div>

        <div>
          <IconButton>
            <BookmarkIcon />
          </IconButton>
        </div>
      </CardActions>

      {showComments && (
        <section>
          <div className='flex items-center space-x-5 mx-3 my-5'>
            <Avatar sx={{}} />
            <input
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleCreateComment(e.target.value);
                  e.target.value = ''; // Clear input after submitting
                }
              }}
              className='w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2 '
              placeholder="write your comment.."
              type="text"
            />
          </div>

          <Divider />
          <div className='mx-3 space-y-2 my-2 text-xs'>
            {comments.map((comment, index) => (
              <div className='flex items-center space-x-5' key={index}>
                <Avatar sx={{ height: "2rem", width: "2rem", fontSize: "0.8rem" }}>
                  {comment.user.username[0]}
                </Avatar>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </Card>
  );
};

export default PostCard;
