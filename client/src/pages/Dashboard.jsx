import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Dashboard() {
  const { token } = useContext(AuthContext);

  const [summary, setSummary] = useState(null);
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSummary(response.data.summary);
      setUpcoming(response.data.upcoming);
      setPast(response.data.past);
    } catch (error) {
      console.log("Error fetching dashboard");
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div>
      <h2 className="text-4xl font-bold mb-6">My Dashboard</h2>

      {summary && (
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 shadow rounded text-center">
            <h3 className="text-xl font-semibold">Total Registered</h3>
            <p className="text-3xl font-bold mt-2">
              {summary.totalRegistered}
            </p>
          </div>

          <div className="bg-white p-6 shadow rounded text-center">
            <h3 className="text-xl font-semibold">Upcoming</h3>
            <p className="text-3xl font-bold mt-2">
              {summary.upcomingCount}
            </p>
          </div>

          <div className="bg-white p-6 shadow rounded text-center">
            <h3 className="text-xl font-semibold">Past</h3>
            <p className="text-3xl font-bold mt-2">
              {summary.pastCount}
            </p>
          </div>
        </div>
      )}

      {/* Upcoming Events */}
      <h3 className="text-2xl font-bold mb-4">Upcoming Events</h3>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {upcoming.length === 0 ? (
          <p>No upcoming events.</p>
        ) : (
          upcoming.map((event) => (
            <div
              key={event._id}
              className="bg-white p-4 shadow rounded"
            >
              <h4 className="font-bold">{event.name}</h4>
              <p>
                {new Date(event.date).toLocaleDateString()}
              </p>
              <Link
                to={`/events/${event._id}`}
                className="text-blue-600 hover:underline"
              >
                View Details
              </Link>
            </div>
          ))
        )}
      </div>

      {/* Past Events */}
      <h3 className="text-2xl font-bold mb-4">Past Events</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {past.length === 0 ? (
          <p>No past events.</p>
        ) : (
          past.map((event) => (
            <div
              key={event._id}
              className="bg-white p-4 shadow rounded"
            >
              <h4 className="font-bold">{event.name}</h4>
              <p>
                {new Date(event.date).toLocaleDateString()}
              </p>
              <Link
                to={`/events/${event._id}`}
                className="text-blue-600 hover:underline"
              >
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
