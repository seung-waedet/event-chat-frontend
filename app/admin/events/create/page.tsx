"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";

import { useAxios } from "@/lib/api";

// Define Event type
interface Speaker {
  type: string;
  isHost: boolean;
  userId: string;
}

interface Event {
  _id: string;
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

const EventManagement = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);

  const apiInstance = useAxios();

  const [newEvent, setNewEvent] = useState<Omit<Event, "_id">>({
    name: "",
    description: "",
    isLive: false,
    createdBy: "",
    code: "",
    speakers: [],
  });
  const [newSpeaker, setNewSpeaker] = useState<Speaker>({
    type: "",
    isHost: false,
    userId: "",
  });

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

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNewEvent({ ...newEvent, [name]: checked });
  };

  const handleSpeakerInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSpeaker({ ...newSpeaker, [name]: value });
  };

  const handleSpeakerCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNewSpeaker({ ...newSpeaker, [name]: checked });
  };

  const addSpeaker = () => {
    setNewEvent({ ...newEvent, speakers: [...newEvent.speakers, newSpeaker] });
    setNewSpeaker({ type: "", isHost: false, userId: "" });
  };

  const removeSpeaker = (index: number) => {
    const updatedSpeakers = newEvent.speakers.filter((_, i) => i !== index);
    setNewEvent({ ...newEvent, speakers: updatedSpeakers });
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await apiInstance.post("/api/events", newEvent);
      fetchEvents();
      setNewEvent({
        name: "",
        description: "",
        isLive: false,
        createdBy: "",
        code: "",
        speakers: [],
      });
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await apiInstance.delete(`/api/events/${id}`);
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 p-8">
      <h2 className="text-2xl font-bold mb-4">Event Management</h2>

      <form
        onSubmit={handleFormSubmit}
        className="bg-white p-6 rounded shadow-md mb-8"
      >
        <div className="mb-4">
          <label className="block mb-2">Event Name</label>
          <input
            type="text"
            name="name"
            value={newEvent.name}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={newEvent.description}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Event Code</label>
          <input
            type="text"
            name="code"
            value={newEvent.code}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        {/* <div className="mb-4">
          <label className="block mb-2">Is Live</label>
          <input
            type="checkbox"
            name="isLive"
            checked={newEvent.isLive}
            onChange={handleCheckboxChange}
            className="border p-2"
          />
        </div> */}

        <div className="mb-4">
          <h3 className="block mb-2">Speakers</h3>
          {newEvent.speakers.map((speaker, index) => (
            <div key={index} className="flex items-center mb-2">
              <span>{speaker.userId}</span>
              <button
                type="button"
                onClick={() => removeSpeaker(index)}
                className="ml-4 bg-red-500 text-white p-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex items-center mb-4">
            <input
              type="text"
              name="name"
              //   value={newSpeaker.name}
              onChange={handleSpeakerInputChange}
              placeholder="Speaker name"
              className="border p-2 mr-2"
              required
            />
            {/* <input
              type="checkbox"
              name="isHost"
              checked={newSpeaker.isHost}
              onChange={handleSpeakerCheckboxChange}
              className="border p-2 mr-2"
            /> */}
            {/* <input
              type="text"
              name="userId"
              value={newSpeaker.userId}
              onChange={handleSpeakerInputChange}
              placeholder="User ID"
              className="border p-2"
              required
            /> */}
            <button
              type="button"
              onClick={addSpeaker}
              className="ml-4 bg-green-500 text-white p-2 rounded"
            >
              Add Speaker
            </button>
          </div>
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default EventManagement;
