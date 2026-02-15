import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const fetchEvent = async () => {
    try {
      const response = await api.get(`/events/${id}`);
      setEvent(response.data);
    } catch (error) {
      console.log("Error fetching event");
    }
  };

  const checkRegistration = async () => {
    if (!token) return;

    try {
      const response = await api.get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const registeredEvents = [
        ...response.data.upcoming,
        ...response.data.past,
      ];

      const found = registeredEvents.find(
        (ev) => ev._id === id
      );

      setIsRegistered(!!found);
    } catch (error) {
      console.log("Error checking registration");
    }
  };

  useEffect(() => {
    fetchEvent();
    checkRegistration();
  }, [id]);

  const handleRegister = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await api.post(
        `/events/${id}/register`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Registration successful!");
      setIsRegistered(true);
      fetchEvent();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  const handleCancel = async () => {
    try {
      await api.delete(`/events/${id}/register`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Registration cancelled.");
      setIsRegistered(false);
      fetchEvent();
    } catch (error) {
      setMessage("Cancellation failed");
    }
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md p-8 rounded">
      <h2 className="text-4xl font-bold mb-4">{event.name}</h2>

      <p className="mb-2">
        📍 <strong>Location:</strong> {event.location}
      </p>

      <p className="mb-2">
        🗓 <strong>Date:</strong>{" "}
        {new Date(event.date).toLocaleString()}
      </p>

      <p className="mb-2">
        🎟 <strong>Available Seats:</strong>{" "}
        {event.availableSeats}
      </p>

      <p className="mb-4">{event.description}</p>

      {message && (
        <p className="mb-4 text-green-600 font-semibold">
          {message}
        </p>
      )}

      {!isRegistered ? (
        event.availableSeats > 0 && (
          <button
            onClick={handleRegister}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Register Now
          </button>
        )
      ) : (
        <button
          onClick={handleCancel}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
        >
          Cancel Registration
        </button>
      )}
    </div>
  );
}

export default EventDetails;
