import { useEffect, useState } from "react";

export default function About() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 200);
  }, []);

  return (
    <div style={styles.container}>
      
      <div style={{ ...styles.hero, opacity: show ? 1 : 0, transform: show ? "translateY(0px)" : "translateY(20px)" }}>
        <h1>AI-Based Identity & Reputation System</h1>
        <p>Secure • Verified • Trusted Digital Platform</p>
      </div>

      <Section title="Overview">
        A secure digital identity platform integrating AI scoring, biometric face verification,
        OTP authentication, and multi-verifier validation to ensure authenticity and trust.
      </Section>

      <Section title="User Module">
        Users register using face verification and OTP authentication. They can securely log in,
        create posts, and submit achievements for verification by trusted reviewers.
      </Section>

      <Section title="Verifier Module">
        Verified users act as trusted evaluators. They review submitted posts and either approve
        or reject them based on authenticity, ensuring data credibility.
      </Section>

      <Section title="Admin Module">
        Admin controls verifier approvals, monitors system activities, and ensures only trusted
        verifiers participate in the ecosystem.
      </Section>

      <Section title="Authentication System">
        The system uses OTP verification via email, face recognition for biometric identity,
        and JWT-based secure login for safe access control.
      </Section>

      <Section title="Results">
        Verification time is reduced from days to seconds using instant AI scoring and multi-verifier
        validation. This improves efficiency and trust significantly.
      </Section>

      <Section title="Conclusion">
        The system combines AI, biometric security, and blockchain-inspired verification concepts
        to build a modern, secure, and scalable identity verification platform.
      </Section>

      <div style={styles.footer}>
        Built for Next-Generation Digital Trust System
      </div>
    </div>
  );
}


function Section({ title, children }) {
  return (
    <div style={styles.section}>
      <h2 style={styles.h2}>{title}</h2>
      <p style={styles.p}>{children}</p>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial",
    background: "#0f172a",
    color: "#e5e7eb",
    minHeight: "100vh",
    padding: "20px"
  },

  hero: {
    textAlign: "center",
    padding: "40px 20px",
    transition: "0.6s ease"
  },

  section: {
    marginTop: "20px",
    padding: "18px",
    background: "#1e293b",
    borderRadius: "12px",
    transition: "0.3s ease",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)"
  },

  h2: {
    color: "#60a5fa",
    marginBottom: "10px"
  },

  p: {
    lineHeight: "1.6",
    fontSize: "15px"
  },

  footer: {
    marginTop: "30px",
    textAlign: "center",
    padding: "15px",
    background: "#111827",
    borderRadius: "10px",
    color: "#9ca3af"
  }
};