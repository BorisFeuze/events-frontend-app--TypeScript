import { useEvent } from "../context";
import { useActionState, useState } from "react";
import { toast } from "react-toastify";
import { createEvent } from "../data";

const CreateEvent = () => {
  const { events, setEvents } = useEvent();
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    latitude: "",
    longitude: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!form.title.trim()) throw new Error("Title is required");
      if (!form.description.trim()) throw new Error("Description is required");
      if (!form.date.trim()) throw new Error("Date is required");
      if (!form.location.trim()) throw new Error("Location is required");
      if (!form.latitude.trim()) throw new Error("Latitude is required");
      if (!form.longitude.trim()) throw new Error("Longitude is required");

      console.log(form);
      const newEvent = await createEvent(form);
      setEvents((prev) => [...prev, newEvent]);
      setForm({
        title: "",
        description: "",
        date: "",
        location: "",
        latitude: "",
        longitude: "",
      });
      toast.success("There's a new Event added!");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };
  return (
    <div className="bg-white flex justify-center mx-[5rem] mt-[3rem] py-[2rem] text-black">
      <form
        onSubmit={handleSubmit}
        className="items-start flex flex-col gap-y-3 w-2/3"
      >
        <label className="flex flex-row items-center justify-center w-full">
          <span className="text-ms  text-center w-[8rem]">Title</span>
          <div className="w-full">
            <input
              onChange={handleChange}
              type="text"
              name="title"
              value={form.title}
              placeholder="Add a title"
              className="flex-1 border rounded px-2 py-2 text-sm w-full"
            />
            {/* {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )} */}
          </div>
        </label>
        <label className="flex flex-row items-center justify-center w-full">
          <span className="text-ms text-center w-[8rem]">Description</span>
          <div className="w-full">
            <input
              onChange={handleChange}
              type="description"
              name="description"
              value={form.description}
              placeholder="Add a description"
              className="flex-1 border rounded px-2 py-2 text-sm w-full"
            />
            {/* {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )} */}
          </div>
        </label>
        <label className="flex flex-row  items-center justify-center w-full">
          <span className="text-ms text-center w-[8rem]">Date</span>
          <div className="w-full">
            <input
              onChange={handleChange}
              type="date"
              name="date"
              value={form.date}
              className="flex-1 border rounded px-2 py-2 text-sm w-full"
            />
            {/* {errors.imgUrl && (
              <p className="text-red-500 text-sm">{errors.date}</p>
            )} */}
          </div>
        </label>
        <label className="flex flex-row items-center justify-center w-full">
          <span className="text-ms text-center w-[8rem]">Location</span>
          <div className="w-full">
            <input
              onChange={handleChange}
              type="text"
              name="location"
              value={form.location}
              placeholder="Add a location"
              className="flex-1 border rounded px-2 py-2 text-sm w-full"
            />
            {/* {errors.message && (
              <p className="text-red-500 text-sm">{errors.location}</p>
            )} */}
          </div>
        </label>
        <label className="flex flex-row items-center justify-center w-full">
          <span className="text-ms text-center w-[8rem]">Latitude</span>
          <div className="w-full">
            <input
              onChange={handleChange}
              type="text"
              name="latitude"
              value={form.latitude}
              placeholder="Add a latitude"
              className="flex-1 border rounded px-2 py-2 text-sm w-full"
            />
            {/* {errors.message && (
              <p className="text-red-500 text-sm">{errors.latitude}</p>
            )} */}
          </div>
        </label>
        <label className="flex flex-row items-center justify-center w-full">
          <span className="text-ms text-center w-[8rem]">Longitude</span>
          <div className="w-full">
            <input
              onChange={handleChange}
              type="text"
              name="longitude"
              value={form.longitude}
              placeholder="Add a longitude"
              className="flex-1 border rounded px-2 py-2 text-sm w-full"
            />
            {/* {errors.message && (
              <p className="text-red-500 text-sm">{errors.longitude}</p>
            )} */}
          </div>
        </label>
        <div className="flex flex-row justify-center gap-x-10 ml-[3em] w-full">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
