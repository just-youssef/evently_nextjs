"use client"

import { EventForm } from '@components'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UpdateEvent = ({ params }) => {
  const [event, setEvent] = useState({ organizer: "", title: "", date: "", duration: "", location: "", desc: "" });
  const token = useSelector((state) => state.userToken.value);
  const router = useRouter();

  useEffect(()=>{
    const getEvent = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/event/${params.id}`);
        const data = await res.json();

        setEvent({
          organizer: data.organizer._id,
          title: data.title,
          date: data.date,
          duration: data.duration,
          location: data.location,
          desc: data.desc,
        });
      } catch (error) {
        console.log(error);
      }
    }

    getEvent();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/event/${params.id}`, {
        method: "PUT",
        headers: {
          'x-auth-token': token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
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

  return (
    <EventForm type="Update" handleSubmit={handleSubmit} event={event} setEvent={setEvent} />
  )
}

export default UpdateEvent