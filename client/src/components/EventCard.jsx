import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div className="bg-white shadow-md rounded p-4 hover:shadow-lg transition">
      <h3 className="text-xl font-bold mb-2">{event.name}</h3>

      <p className="text-gray-600 mb-1">
        📍 {event.location}
      </p>

      <p className="text-gray-600 mb-1">
        🗓 {new Date(event.date).toLocaleDateString()}
      </p>

      <p className="text-gray-600 mb-2">
        🎟 Seats Left: {event.availableSeats}
      </p>

      <Link
        to={`/events/${event._id}`}
        className="inline-block mt-2 text-blue-600 hover:underline"
      >
        View Details
      </Link>
    </div>
  );
}

export default EventCard;
