export default function Help() {

  function contact(){
    window.location.href="http://localhost:5173/contact";
  }
  return (
    <div style={styles.container}>
      <h1>Help & Support</h1>

      <p style={styles.subtitle}>
        Find answers to common questions or contact support if you need help.
      </p>

      
      <div style={styles.box}>
        <h3>❓ How do I register?</h3>
        <p>
          Go to the registration page, fill in your details, complete OTP and face verification, then submit.
        </p>
      </div>

      <div style={styles.box}>
        <h3>❓ How does verification work?</h3>
        <p>
          Your submitted posts are reviewed by selected verifiers. They can approve or reject based on authenticity.
        </p>
      </div>

      <div style={styles.box}>
        <h3>❓ Why is my post pending?</h3>
        <p>
          Your post is waiting for verifier approval or AI reputation scoring. This usually takes a short time.
        </p>
      </div>

      <div style={styles.box}>
        <h3>❓ How to contact support?</h3>
        <p>
          Use the Contact page or email us at <b>pooja@gmail.com</b>
        </p>
      </div>

     
      <div style={styles.support}>
        <h3>Need More Help?</h3>
        <p>
          If your issue is not listed above, contact our support team.
        </p>

        <button style={styles.button}  onClick={contact}>
          Contact Support
        </button>
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

  subtitle: {
    opacity: 0.8,
    marginBottom: "20px"
  },

  box: {
    background: "#1e293b",
    padding: "15px",
    marginBottom: "12px",
    borderRadius: "10px"
  },

  support: {
    marginTop: "30px",
    padding: "20px",
    background: "#334155",
    borderRadius: "10px",
    textAlign: "center"
  },

  button: {
    marginTop: "10px",
    padding: "10px 15px",
    background: "#3b82f6",
    border: "none",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer"
  }
};