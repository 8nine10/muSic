import React, { useEffect, useState } from 'react'
import { Card, Box, CardContent, Typography, IconButton } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useStyles } from './styles'
import { useDispatch } from 'react-redux'
import { deleteSong, likeSong, playPause, playSong } from '../../actions/songs'
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteObject, ref } from 'firebase/storage'
import { storage } from '../../config/firebase.config'
import { useNavigate } from 'react-router-dom'

const SongCard = ({ song, h = 200, w = 270, del=false }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [user] = useState(JSON.parse(localStorage.getItem('profile')))
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likesC, setLikesC] = useState(isNaN(song?.likes?.length) ? 0 : song?.likes.length)
  
  useEffect(() => {
    if (song && Array.isArray(song.likes) && user && user.user) {
      setIsLiked(song.likes.includes(user.user._id));
    }
  }, [song, user]);

  const handleLike = (e) => {
    e.stopPropagation()
    if (isLiked) {
      setIsLiked(false)
      setLikesC(likesC - 1)
    } else {
      setIsLiked(true)
      setLikesC(likesC + 1)
    }
    dispatch(likeSong(song._id, navigate));
  };

  const handleDelete = async(e) => {
    e.stopPropagation()
    setIsDeleting(true)
    try {
      let url = song.imageURL
      let deleteRef = ref(storage, url)
      await deleteObject(deleteRef)
      url = song.songURL
      deleteRef = ref(storage, url)
      await deleteObject(deleteRef)
    } catch (error) {
      console.log('Error in deleting image', error)
    }
    dispatch(deleteSong(song._id, navigate))
  }
  
  const handlePlay = () => {
    dispatch(playSong(song))
    dispatch(playPause(true))
  }

  return (
    <Card sx={{
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between', 
      width: w, 
      height: h, 
      backgroundImage: `url(${song.imageURL})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      color: '#fff', 
      position: 'relative'
    }} onClick={handlePlay}>
      <Box sx={classes.box}>
        <CardContent sx={{ flex: '1 0 auto', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <Typography component="div" variant="h5">
            {song.songName}
          </Typography>
          <Typography variant="subtitle1" color="secondary.light" component="div">
            {song.artist}
          </Typography>
          <Typography variant="subtitle2" color="secondary.light" component="div">
            {song.album}
          </Typography>
          {del && (
            <IconButton aria-label="delete" disabled={isDeleting} onClick={handleDelete} sx={{ position: 'absolute', top: 8, right: 8, color: 'secondary.main', backgroundColor: 'rgba(0, 0, 0, 0.6)', '&:hover': {backgroundColor: 'rgba(0, 0, 0, 0.8)'}}}>
              <DeleteIcon />
            </IconButton>
          )}
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38, color: 'secondary.light' }} />
          </IconButton>
          <IconButton aria-label="like" onClick={handleLike}>
            {isLiked ? (<>
              <FavoriteIcon sx={{ height: 38, width: 38, color: 'primary.light' }} ></FavoriteIcon>
              <Typography sx={{color: 'white'}}>{likesC}</Typography>
            </>) : (<>
              <FavoriteIcon sx={{ height: 38, width: 38, color: 'secondary.light' }} ></FavoriteIcon>
              <Typography sx={{color: 'white'}}>{likesC}</Typography>
            </>)}
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default SongCard;
