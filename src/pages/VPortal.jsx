import { useNavigate } from "react-router-dom";

function UserPortal() {
  const navigate = useNavigate();

  function login() {
    navigate("/VerifyUserLogin");
  }

  function register() {
    navigate("/UserLookupFaceAuth");
  }

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
    background: "#2a5298",
  },

  card: {
    padding: "40px",
    borderRadius: "12px",
    textAlign: "center",
    background: "white",
  },

  title: {
    marginBottom: "20px",
    color: "#333",
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