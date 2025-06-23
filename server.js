const express = require("express");
const path = require("path");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");

const app = express();
const PORT = process.env.PORT || 3000;

const mailersend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  })
);

// Compression middleware
app.use(compression());

// CORS middleware
app.use(cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/vendor/aos/aos.js",
  express.static(path.join(__dirname, "node_modules/aos/dist/aos.js"))
);

// Rate limiter for the contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API routes for contact form
app.post("/api/contact", contactLimiter, async (req, res) => {
  const { name, email, message, website } = req.body;

  // Honeypot check for spam
  if (website) {
    console.log("Honeypot field filled. Possible spam detected.");
    return res.json({
      success: true, // Lie to the bot
      message: "Thank you for your message! We'll get back to you soon.",
    });
  }

  // Here you would typically send an email or save to database
  console.log("Contact form submission:", { name, email, message });
  console.log(process.env.YOUR_EMAIL);

  try {
    const recipients = [new Recipient(process.env.YOUR_EMAIL, "Recipient")];
    const sentFrom = new Sender(
      "info@test-2p0347zq5w9lzdrn.mlsender.net",
      "Łukasz Holc"
    );
    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject(`New Contact Form Submission from ${name}`)
      .setHtml(
        `<p>You have a new contact form submission from:</p>
             <ul>
               <li><strong>Name:</strong> ${name}</li>
               <li><strong>Email:</strong> ${email}</li>
             </ul>
             <p><strong>Message:</strong></p>
             <p>${message}</p>`
      );

    await mailersend.email.send(emailParams);

    console.log("Message sent");
    return res.json({
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Contact form endpoint: http://localhost:${PORT}/api/contact`);
});
