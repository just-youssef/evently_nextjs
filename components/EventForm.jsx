"use client"

import { Button, Stack, TextField, Typography } from "@mui/material"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

const EventForm = ({ type, event, setEvent, handleSubmit }) => {
  const router = useRouter();

  return (
    <Stack
      component="form" onSubmit={handleSubmit}
      direction="column" alignItems="center"
      px={4} py={6} my={4} gap={1}
      border={1} borderRadius={1} borderColor="grey.600"
      width={{ sm: 2 / 3, md: 1 / 2 }} mx={{ xs: 2, sm: "auto" }}
      bgcolor="background.paper" boxShadow={8}
    >
      <Typography fontSize={24} color="text.secondary">{type} Event</Typography>

      <TextField
        label="Title" fullWidth required 
        sx={{ mb: 1 }} placeholder="Name your event"
        onChange={e => setEvent({ ...event, title: e.target.value })}
        value={event.title}
      />
      <TextField
        label="Description" fullWidth required multiline minRows={3}
        sx={{ mb: 1 }} placeholder="Desribe your event briefly.."
        onChange={e => setEvent({ ...event, desc: e.target.value })}
        value={event.desc}
      />

      <DatePicker
        format="DD/MM/YYYY"
        value={event.date? dayjs(event.date, "DD/MM/YYYY") : null}
        onChange={(value) => setEvent({ ...event, date: value? value.format("DD/MM/YYYY") : "" })}
        slotProps={{ textField: { required: true, fullWidth: true, label: "Start Date" } }}
        sx={{mb: 1}}
      />
      <TextField
        label="Duration (in days)" fullWidth required type="number"
        sx={{ mb: 1 }} placeholder="Set your event duration in days"
        onChange={e => setEvent({ ...event, duration: e.target.value })}
        value={event.duration}
      />
      <TextField
        label="Location" fullWidth required
        sx={{ mb: 1 }} placeholder="Set your event location"
        onChange={e => setEvent({ ...event, location: e.target.value })}
        value={event.location}
      />
      <Button type="submit" variant="contained" size="large" fullWidth>{type}</Button>
      <Button variant="outlined" size="large" fullWidth onClick={()=>router.push("/")}>Cancel</Button>
    </Stack>
  )
}

export default EventForm