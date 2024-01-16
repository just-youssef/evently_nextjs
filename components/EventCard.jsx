"use client"

import { Box, Button, IconButton, Modal, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import { useSelector } from "react-redux";
import jwt from "jsonwebtoken";
import PlaceIcon from '@mui/icons-material/Place';
import EventIcon from '@mui/icons-material/Event';
import TimelapseIcon from '@mui/icons-material/Timelapse';

const EventCard = ({ event }) => {
  const token = useSelector((state) => state.userToken.value);
  const router = useRouter();
  const [currentUserID, setCurrentUserID] = useState("");
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [confirmBookOpen, setConfirmBookOpen] = useState(false);

  useEffect(()=>{
    if(token){
      const { userID } = jwt.decode(token);
      setCurrentUserID(userID);
    }
  }, [])

  const handleDelete = async() => {
    setConfirmDeleteOpen(false);

    try {
      const res = await fetch(`http://localhost:8000/api/event/${event._id}`, {
        method: "DELETE",
        headers: {
          'x-auth-token': token,
        },
      });
      const data = await res.json();
      
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs: 2/3, md: 1/2, lg: 1/3},
    bgcolor: 'background.paper',
    border: 1,
    borderRadius: 1,
    boxShadow: 24,
    p: 4,
  };


  return (
    <Stack
    direction="column"
    justifyContent="center"
    bgcolor="background.paper" boxShadow={4}
    border={1} borderRadius={1} borderColor="grey.600"
    px={3} pb={5} pt={3}
    >
      {
        (token && currentUserID == event.organizer._id) ? (
          <Stack direction="row" justifyContent="end" alignItems="center">
            <IconButton onClick={() => router.push(`/updateEvent/${event._id}`)}><EditIcon /></IconButton>
            <IconButton onClick={() => setConfirmDeleteOpen(true)}><DeleteIcon /></IconButton>

            <Modal
              open={confirmDeleteOpen}
              onClose={() => setConfirmDeleteOpen(false)}
            >
              <Stack
              direction="column" alignContent="center" alignItems="center" gap={4}
              sx={modalStyle}
              >
                <Typography fontSize={20}>
                  Are your sure you want to delete "{event.title}" event?
                </Typography>
                <Button fullWidth onClick={handleDelete} color='error' variant='contained'>Confirm Delete</Button>
              </Stack>
            </Modal>
          </Stack>
        ) : <Box pt={2}/>
      }
      <Typography
        fontSize={30}
        color="primary"
        fontWeight={600}
      >
        {event.title}
      </Typography>

      <Typography
        fontSize={20}
        color="text.secondary"
        sx={{mb: 4}}
      >
        {event.desc}
      </Typography>

      <Typography
        fontSize={18}
        sx={{ display: "flex", alignItems: "center", gap: 0.6, mb: 1 }}
      >
        <PlaceIcon />
        {event.location}
      </Typography>

      <Typography
        fontSize={18}
        sx={{ display: "flex", alignItems: "center", gap: 0.6, mb: 1 }}
      >
        <EventIcon />
        {event.date}
      </Typography>

      <Typography
        fontSize={18}
        sx={{ display: "flex", alignItems: "center", gap: 0.6, mb: 5 }}
      >
        <TimelapseIcon />
        {event.duration} day
      </Typography>

      <Button color='primary' variant='contained' fullWidth>Book Event</Button>
    </Stack>
  )
}

export default EventCard