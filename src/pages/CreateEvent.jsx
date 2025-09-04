import { useEvent } from "../context";
import { useState } from "react"; // removed unused useActionState
import { toast } from "react-toastify";
import { Navigate } from "react-router";

import { createEvent } from "../data";

const CreateEvent = () => {
  const [events, setEvents] = useState(""); // keep context state updates
  const [loading, setLoading] = useState(false); // prevent double submit

  // local form state
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    latitude: "",
    longitude: "",
  });

  // handle inputs
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      // basic required validations
      if (!form.title.trim()) throw new Error("Title is required");
      if (!form.description.trim()) throw new Error("Description is required");
      if (!form.date.trim()) throw new Error("Date is required");
      if (!form.location.trim()) throw new Error("Location is required");
      if (+!form.latitude.trim()) throw new Error("Latitude is required");
      if (+!form.longitude.trim()) throw new Error("Longitude is required");

      // convert number fields
      const lat = Number(form.latitude);
      const lng = Number(form.longitude);
      if (Number.isNaN(lat) || Number.isNaN(lng)) {
        throw new Error("Latitude and Longitude must be valid numbers");
      }

      // convert date (input type="date" gives yyyy-mm-dd)
      const isoDate = new Date(form.date).toISOString();

      // payload expected by the API
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        date: isoDate,
        location: form.location.trim(),
        latitude: lat,
        longitude: lng,
      };

      const { title } = form;

      setLoading(true);

      // POST /api/events with token is handled in createEvent()
      const newEvent = await createEvent(payload);

      // optimistic UI update
      setEvents((prev) => [...prev, newEvent]);

      // reset form
      setForm({
        title: "",
        description: "",
        date: "",
        location: "",
        latitude: "",
        longitude: "",
      });

      toast.success("Event created successfully!");
    } catch (error) {
      // show server/validation error
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (events) return <Navigate to="/" />;

  return (
    <div className="bg-white text-black px-4 py-6">
      {/* centered container with max width for better readability */}
      <div className="mx-auto max-w-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title */}
          <label className="flex items-center gap-3">
            <span className="w-28 shrink-0 text-sm font-medium">Title</span>
            <input
              onChange={handleChange}
              type="text"
              name="title"
              value={form.title}
              placeholder="Add a title"
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </label>

          {/* Description */}
          <label className="flex items-center gap-3">
            <span className="w-28 shrink-0 text-sm font-medium">
              Description
            </span>
            <input
              onChange={handleChange}
              type="text" // fixed from `type="description"`
              name="description"
              value={form.description}
              placeholder="Add a description"
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </label>

          {/* Date */}
          <label className="flex items-center gap-3">
            <span className="w-28 shrink-0 text-sm font-medium">Date</span>
            <input
              onChange={handleChange}
              type="date"
              name="date"
              value={form.date}
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </label>

          {/* Location */}
          <label className="flex items-center gap-3">
            <span className="w-28 shrink-0 text-sm font-medium">Location</span>
            <input
              onChange={handleChange}
              type="text"
              name="location"
              value={form.location}
              placeholder="Add a location"
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </label>

          {/* Latitude */}
          <label className="flex items-center gap-3">
            <span className="w-28 shrink-0 text-sm font-medium">Latitude</span>
            <input
              onChange={handleChange}
              type="number" // numeric input with decimals
              step="any"
              name="latitude"
              value={form.latitude}
              placeholder="e.g. 48.1351"
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </label>

          {/* Longitude */}
          <label className="flex items-center gap-3">
            <span className="w-28 shrink-0 text-sm font-medium">Longitude</span>
            <input
              onChange={handleChange}
              type="number" // numeric input with decimals
              step="any"
              name="longitude"
              value={form.longitude}
              placeholder="e.g. 11.5820"
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </label>

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow-sm hover:-translate-y-0.5 hover:shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Adding..." : "Add Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
