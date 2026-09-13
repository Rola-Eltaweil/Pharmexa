import React, { useState } from "react";
import form from "../assets/slide2.jpg";
import { postData } from "../utils/apiSummary";
import { Endpoint } from "../utils/routes";
import { toast } from "react-toastify";
const Contact = () => {
  const [data, setdata] = useState({
    name: "",
    email: "",
    companyName: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const contact = await postData(Endpoint.createContact.url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(contact);
      if (contact.data.success) {
        toast.success(contact.data.message);
        setdata({
          name: "",
          email: "",
          companyName: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <h2 className="text-xl sm:text-3xl md:text-5xl text-primary font-semibold pb-5 flex justify-center items-center my-10">
        {" "}
        Contact Us
      </h2>
      <div className="container flex md:flex-row flex-col gap-4 justify-center items-stretch h-full">
        <div className="w-full h-full">
          <img src={form} className="rounded-xl w-full h-full object-cover" />
          <p className="text-[16px] text-gray-500 my-2 pt-3">
            Have a Question? We're Here to Help Whether you have a product
            inquiry, partnership opportunity, or need more information about our
            pharmaceutical solutions, our team is ready to assist you 💙.
          </p>
        </div>
        <form className="flex flex-col gap-5 container" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              onChange={handleChange}
              value={data.name}
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-primary"
            />

            <input
              onChange={handleChange}
              value={data.email}
              name="email"
              type="email"
              placeholder="Email Address"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          <input
            onChange={handleChange}
            value={data.companyName}
            type="text"
            name="companyName"
            placeholder="Company Name"
            className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-primary"
          />
          <input
            onChange={handleChange}
            value={data.subject}
            type="text"
            name="subject"
            placeholder="Subject"
            className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-primary"
          />
          <textarea
            onChange={handleChange}
            value={data.message}
            name="message"
            rows="5"
            placeholder="Tell us about your needs..."
            className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-primary resize-none"
          ></textarea>

          <button
            type="submit"
            className="rounded-lg cursor-pointer bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary/90"
          >
            Send Inquiry
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;
