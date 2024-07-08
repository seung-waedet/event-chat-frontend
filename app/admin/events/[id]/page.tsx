import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import axios from "axios";

// Define Speaker and Event interfaces
interface Speaker {
  type: string;
  isHost: boolean;
  userId: {
    _id: string;
    name: string;
  };
}

interface Event {
  _id: string;
  name: string;
  description: string;
  isLive: boolean;
  createdBy: string;
  code: string;
  speakers: Speaker[];
}

const EventDetails: React.FC = () => {
  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetchEventDetails(id);
    }
  }, [id]);

  const fetchEventDetails = async (eventId: string) => {
    try {
      const response = await axios.get(`/api/events/${eventId}`);
      setEvent(response.data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-blue-100 p-8">
      <h2 className="text-2xl font-bold mb-4">{event.name}</h2>
      <p className="mb-4">{event.description}</p>
      <p className="mb-4">Event Code: {event.code}</p>
      <p className="mb-4">Is Live: {event.isLive ? "Yes" : "No"}</p>

      <h3 className="text-xl font-bold mb-2">Speakers</h3>
      <ul className="list-disc list-inside">
        {event.speakers.map((speaker, index) => (
          <li key={index}>
            {speaker.userId.name} ({speaker.type} -{" "}
            {speaker.isHost ? "Host" : "Speaker"})
          </li>
        ))}
      </ul>

      <button
        onClick={() => router.push("/events")}
        className="mt-6 bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
      >
        Back to Events
      </button>
    </div>
  );
};

export default EventDetails;
