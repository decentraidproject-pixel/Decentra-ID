import { useNavigate } from "react-router-dom";

function UserPortal() {
  const navigate = useNavigate();

  const login = () => {
    window.location.href="https://decentraidfp.vercel.app/verifier-Login";
  };

  const register = () => {
     window.location.href="https://decentraidfp.vercel.app/FaceAuth"; 
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Verifier Portal</h2>

        <div style={styles.btnGroup}>
          <button style={styles.button} onClick={login}>
            Login
          </button>

          <button style={styles.button} onClick={register}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserPortal;

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(45deg, #2a5298, #ff512f)",
  },

  card: {
    padding: "40px",
    borderRadius: "12px",
    background: "white",
    textAlign: "center",
  },

  title: {
    marginBottom: "20px",
  },

  btnGroup: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
  },

  button: {
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    background: "#2a5298",
    color: "white",
    borderRadius: "6px",
  },
};



