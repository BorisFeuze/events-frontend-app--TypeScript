import { useEvent } from "../context";
import { useActionState, useState } from "react";
import { toast } from "react-toastify";
import { createEvent } from "../data";

const CreateEvent = () => {
  const { events, setEvents } = useEvent();
  const submitAction = async (prevState, formData) => {
    const title = formData.get("title");
    const description = formData.get("description");
    const date = formData.get("date");
    const location = formData.get("location");
    const latitude = formData.get("latitude");
    const longitude = formData.get("longitude");

    const newEventData = {
      title,
      description,
      date,
      location,
      latitude,
      longitude,
    };

    try {
      if (!formData.title.trim()) throw new Error("Title is required");
      if (!formData.description.trim())
        throw new Error("Description is required");
      if (!formData.date.trim()) throw new Error("Date is required");
      if (!formData.location.trim()) throw new Error("Location is required");
      if (!formData.latitude.trim()) throw new Error("Latitude is required");
      if (!formData.longitude.trim()) throw new Error("Longitude is required");

      console.log(newEventData);
      const newEvent = await createEvent(newEventData);
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
      return { error: null, success: true };
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      return { error: null, success: false };
    }
  };
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    latitude: "",
    longitude: "",
  });
  const [state, formAction, isPending] = useActionState(submitAction, {
    error: null,
    success: false,
  });
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="bg-white flex justify-center mr-[5rem] py-6 text-black">
      <form
        action={formAction}
        className="items-start flex flex-col gap-y-3 w-2/3"
      >
        <label className="flex flex-row items-center justify-center w-full">
          <span className="text-ms  text-center w-[5rem]">Title</span>
          <div className="w-full">
            <input
              onChange={handleChange}
              type="text"
              name="title"
              value={form.title}
              placeholder="Add a title"
              className="flex-1 border rounded px-2 py-2 text-sm w-full"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>
        </label>
        <label className="flex flex-row items-center justify-center w-full">
          <span className="text-ms text-center w-[5rem]">Description</span>
          <div className="w-full">
            <input
              onChange={handleChange}
              type="description"
              name="description"
              value={form.description}
              placeholder="Add a description"
              className="flex-1 border rounded px-2 py-2 text-sm w-full"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>
        </label>
        <label className="flex flex-row  items-center justify-center w-full">
          <span className="text-ms text-center w-[5rem]">Date</span>
          <div className="w-full">
            <input
              onChange={handleChange}
              type="date"
              name="date"
              value={form.date}
              className="flex-1 border rounded px-2 py-2 text-sm w-full"
            />
            {errors.imgUrl && (
              <p className="text-red-500 text-sm">{errors.date}</p>
            )}
          </div>
        </label>
        <label className="flex flex-row items-center justify-center w-full">
          <span className="text-ms text-center w-[5rem]">Location</span>
          <div className="w-full">
            <input
              onChange={handleChange}
              type="text"
              name="location"
              value={form.location}
              placeholder="Add a image"
              className="flex-1 border rounded px-2 py-2 text-sm w-full"
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.location}</p>
            )}
          </div>
        </label>
        <label className="flex flex-row items-center justify-center w-full">
          <span className="text-ms text-center w-[5rem]">Latitude</span>
          <div className="w-full">
            <input
              onChange={handleChange}
              type="text"
              name="latitude"
              value={formDiary.imgUrl}
              placeholder="Add a image"
              className="flex-1 border rounded px-2 py-2 text-sm w-full"
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.latitude}</p>
            )}
          </div>
        </label>
        <label className="flex flex-row items-center justify-center w-full">
          <span className="text-ms text-center w-[5rem]">Longitude</span>
          <div className="w-full">
            <input
              onChange={handleChange}
              type="text"
              name="longitude"
              value={form.longitude}
              placeholder="Add a image"
              className="flex-1 border rounded px-2 py-2 text-sm w-full"
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.longitude}</p>
            )}
          </div>
        </label>
        <div className="flex flex-row justify-center gap-x-10 ml-[3em] w-full">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
            disabled={isPending}
          >
            Add Diary
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
