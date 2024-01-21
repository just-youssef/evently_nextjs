"use client"

import EventForm from '@components/EventForm'
import jwt from "jsonwebtoken";
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AddEvent = () => {
  const [event, setEvent] = useState({ organizer: "", title: "", date: "", duration: "", location: "", desc: "" });
  const token = useSelector((state) => state.userToken.value);
  const router = useRouter();

  useEffect(()=>{
    if(token){
      const { userID } = jwt.decode(token);
      setEvent({...event, organizer: userID})
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/event/new`, {
        method: "POST",
        headers: {
          'x-auth-token': token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          organizer: event.organizer,
          title: event.title,
          date: event.date,
          duration: event.duration,
          location: event.location,
          desc: event.desc,
        })
      });
      const data = await res.json();

      if (data.eventID) {
        router.push("/")
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!token) redirect("/login");

  return (
    <EventForm type="Add New" handleSubmit={handleSubmit} event={event} setEvent={setEvent} />
  )
}

export default AddEvent