import { useState } from "react";
import emailjs from "@emailjs/browser";
import "./index.css"

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const templateParams = {
      name: form.name,
      email: form.email,
      message: form.message,
      time: new Date().toLocaleString()
    };

    emailjs.send(
      "service_gyvvbdl",     
      "template_e8n9dmi",     
      templateParams,
      "XGm76uDlo3fiY7csU"      
    )
    .then(() => {
      alert("Message sent successfully to decentraid.project@gmail.com");
      setForm({ name: "", email: "", message: "" });
    })
    .catch((err) => {
      console.log("EmailJS Error:", err);
      alert("Failed to send message");
    });
  };

  return (
    <div style={styles.container}  className="move"   >
      <h1>Contact Us</h1>

      <form onSubmit={sendEmail} style={styles.form}>
        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          style={styles.textarea}
          required
        />

        <button type="submit" style={styles.button}>
          Send Message
        </button>
      </form>


      <div style={styles.infoBox}>

  

  <p>📧 Email: decentraid.project@gmail.com</p>
  <p>📞 Phone: +91 98765 43210</p>
  <p>📍 Location: Chennai, Tamil Nadu</p>

  <hr style={{ margin: "10px 0", opacity: 0.3 }} />

  <p style={{ fontSize: "14px", opacity: 0.8 }}>
    We usually respond within 24 hours. Feel free to reach out for any queries or support.
  </p>

</div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial",
    padding: "20px",
    background: "#0f172a",
    color: "white",
    minHeight: "100vh"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "400px",
    gap: "12px"
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "none"
  },

  textarea: {
    padding: "10px",
    height: "120px",
    borderRadius: "8px",
    border: "none"
  },

  button: {
    padding: "10px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }

  
};





