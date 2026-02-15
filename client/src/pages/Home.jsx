import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-[90vh] flex flex-col">

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-20">
        <h1 className="text-5xl font-extrabold mb-6 animate-fadeSlideUp">
          Discover & Manage Events Effortlessly
        </h1>

        <p className="text-xl max-w-2xl mb-8 text-blue-100 animate-fadeSlideUp">
          Browse conferences, workshops, networking meetups,
          and seminars. Register instantly and track all your
          events from your personal dashboard.
        </p>

        <Link
          to="/events"
          className="bg-white text-blue-700 px-8 py-3 rounded-full text-lg font-semibold hover:scale-105 transition transform duration-300 animate-fadeSlideUp"
        >
          Explore Events
        </Link>
      </div>

      {/* Features Section */}
      <div className="bg-gray-100 py-16 px-8">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose Bellcorp Events?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          <div className="bg-white p-8 rounded shadow hover:shadow-lg transition text-center">
            <h3 className="text-2xl font-bold mb-4">🔍 Smart Discovery</h3>
            <p className="text-gray-600">
              Search and filter through a growing collection of events with ease.
            </p>
          </div>

          <div className="bg-white p-8 rounded shadow hover:shadow-lg transition text-center">
            <h3 className="text-2xl font-bold mb-4">🎟 Easy Registration</h3>
            <p className="text-gray-600">
              Register for events instantly and manage your bookings securely.
            </p>
          </div>

          <div className="bg-white p-8 rounded shadow hover:shadow-lg transition text-center">
            <h3 className="text-2xl font-bold mb-4">📊 Personal Dashboard</h3>
            <p className="text-gray-600">
              Track upcoming and past events all from one centralized place.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Home;
