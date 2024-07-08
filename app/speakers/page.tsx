// app/speaker-dashboard/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Event {
  id: string;
  name: string;
  description: string;
  isLive: boolean;
  createdBy: string;
  code: string;
  speakers: {
    type: string;
    isHost: boolean;
    userId: string;
  }[];
}

interface Speaker {
  type: string;
  isHost: boolean;
  userId: string;
}

const SpeakerDashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events for the speaker
    const fetchEvents = async () => {
      try {
        const response = await axios
          .get
          // "https://event-chat-backend.onrender.com//api/events"
          ();
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-light-blue p-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Speaker Dashboard</h1>
      <div className="grid gap-6">
        {events.map((event) => (
          <div key={event._id} className="bg-white p-4 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-2">{event.name}</h2>
            <p className="text-gray-700 mb-2">{event.description}</p>
            <p className="text-gray-500 mb-2">Code: {event.code}</p>
            <p className="text-gray-500 mb-2">
              Live: {event.isLive ? "Yes" : "No"}
            </p>
            <h3 className="text-xl font-semibold mt-4">Speakers</h3>
            <ul>
              {event.speakers.map((speaker) => (
                <li key={speaker.userId} className="text-gray-600">
                  {speaker.type}: {speaker.isHost ? "Host" : "Guest"} -{" "}
                  {speaker.userId}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpeakerDashboard;
