"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";

import { useAxios } from "@/lib/api";
import { useRouter } from "next/navigation";

// Define Event type
interface Speaker {
  type: string;
  isHost: boolean;
  userId: {
    _id: string;
    displayName: string;
  };
  // } | null; // Allow userId to be null
}

interface Event {
  _id: string;
  name: string;
  description: string;
  isLive: boolean;
  createdBy: string;
  code: string;
  speakers: Speaker[];

  // speakers: {
  //   type: string;
  //   isHost: boolean;
  //   userId: string;
  // }[];
}

const EventManagement = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const apiInstance = useAxios();

  const [newEvent, setNewEvent] = useState<Omit<Event, "_id">>({
    name: "",
    description: "",
    isLive: false,
    createdBy: "",
    code: "",
    speakers: [],
  });

  // const [newSpeaker, setNewSpeaker] = useState<Speaker>({
  //   type: "",
  //   isHost: false,
  //   // userId: "",
  // });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await apiInstance.get("/api/events");
      setEvents(response.data);

      if (Array.isArray(response.data.data)) {
        setEvents(response.data.data);
      } else {
        throw new Error("Data is not an array");
      }
    } catch (err: any) {
      setError(err.message);
    }
    // } catch (error) {
    //   console.error("Error fetching events:", error);
    // }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await apiInstance.delete(`/api/events/${id}`);
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleCreateEvent = () => {
    router.push("/admin/events/create");
  };

  return (
    <div className="min-h-screen bg-blue-100 p-8">
      <h2 className="text-2xl font-bold mb-4">Event Management</h2>
      <button
        type="button"
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleCreateEvent}
      >
        Create Event
      </button>

      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border p-2">Event Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Event Code</th>
            <th className="border p-2">Is Live</th>
            <th className="border p-2">Speakers</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td className="border p-2">{event.name}</td>
              <td className="border p-2">{event.description}</td>
              <td className="border p-2">{event.code}</td>
              <td className="border p-2">{event.isLive ? "Yes" : "No"}</td>
              <td className="border px-4 py-2">
                {event.speakers.map((speaker, index) => (
                  <div key={index}>
                    {speaker.type} ({speaker.isHost ? "Host" : "Speaker"}) -{" "}
                    {speaker.userId ? speaker.userId.displayName : "Unknown"}
                  </div>
                ))}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleDeleteEvent(event._id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventManagement;
