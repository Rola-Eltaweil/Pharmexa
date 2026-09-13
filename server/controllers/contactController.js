import contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { name, email, subject, message, companyName } = req.body;
    if (!name || !email || !subject || !message || !companyName) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (name.length < 3) {
      return res.status(400).json({ message: "Enter valid name please !" });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format. Please enter a valid email address.",
      });
    }

    const createOne = new contact({
      name,
      email,
      subject,
      message,
      companyName,
    });

    await createOne.save();

    if (createOne) {
      return res.status(201).json({
        success: true,
        message:
          "Your message has been sent successfully. We will get back to you soon",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
