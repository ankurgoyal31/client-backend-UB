const Contact = require('../../models/Contact');
/* =========================
   CREATE CONTACT MESSAGE
========================= */
exports.create = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const newContact = await Contact.create({
      name,
      email,
      message
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newContact
    });

  } catch (err) {
    console.error("Contact API Error:", err);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};