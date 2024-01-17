"use client";

import { EventCard } from "@components";
import { Grid } from "@mui/material"
import { useState, useEffect } from "react";

const Home = () => {
  const [allEvents, setAllEvents] = useState([])

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/event/`);
        const data = await res.json();
        
        setAllEvents(data);
      } catch (error) {
        console.log(error);
      }
    }

    getAllEvents();
  }, [allEvents])

  return (
    <Grid container spacing={4} px={{xs:3, sm:4}} py={4}>
      {
        allEvents.map((event)=>(
          <Grid item xs={12} md={6} lg={4} xl={3} key={event._id}>
            <EventCard event={event} />
          </Grid>
        ))
      }

    </Grid>
  )
}

export default Home