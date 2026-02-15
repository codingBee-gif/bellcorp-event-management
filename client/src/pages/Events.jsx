import { useState, useEffect } from "react";
import api from "../services/api";
import EventCard from "../components/EventCard";


function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
const [location, setLocation] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchEvents = async () => {
    try {
     const response = await api.get("/events", {
  params: {
    search,
    category,
    location,
    page,
    limit: 6,
  },
      });

      setEvents(response.data.events);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log("Error fetching events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [search, category, location, page]);

  return (
    <div>
      <h2 className="text-4xl font-bold mb-6">Events</h2>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search events..."
          className="border px-4 py-2 rounded w-full max-w-md"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* Filters Section */}
<div className="flex flex-wrap gap-4 mb-6">
  <input
    type="text"
    placeholder="Search events..."
    className="border px-4 py-2 rounded"
    value={search}
    onChange={(e) => {
      setSearch(e.target.value);
      setPage(1);
    }}
  />

  <select
    value={category}
    onChange={(e) => {
      setCategory(e.target.value);
      setPage(1);
    }}
    className="border px-4 py-2 rounded"
  >
    <option value="">All Categories</option>
    <option value="Conference">Conference</option>
    <option value="Workshop">Workshop</option>
    <option value="Networking">Networking</option>
    <option value="Seminar">Seminar</option>
    <option value="Expo">Expo</option>
  </select>

  <select
    value={location}
    onChange={(e) => {
      setLocation(e.target.value);
      setPage(1);
    }}
    className="border px-4 py-2 rounded"
  >
    <option value="">All Locations</option>
    <option value="Hyderabad">Hyderabad</option>
    <option value="Bangalore">Bangalore</option>
    <option value="Chennai">Chennai</option>
    <option value="Mumbai">Mumbai</option>
    <option value="Delhi">Delhi</option>
  </select>
</div>



      {/* Event Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="px-4 py-2">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Events;
