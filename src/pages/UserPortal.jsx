import { Outlet, useNavigate } from "react-router-dom";

function UserPortal() {
  const navigate = useNavigate();

  function login() {
    window.location.href="http://localhost:5173/user-Login";
  }

  function register() {
    navigate("/UserfaceAuth");
  }

  return (
    <div style={styles.container}>
  
      <div style={styles.background}></div>

      <div style={styles.card}>
        <h2 style={styles.title}>User Portal</h2>

        <div style={styles.btnGroup}>
          <button style={styles.button} onClick={login}>
            Login
          </button>

          <button style={styles.button} onClick={register}>
            Register
          </button>
        </div>

        <div style={{ marginTop: "20px" }}>
          <Outlet />
        </div>
      </div>

      
      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes floatCard {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
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
    overflow: "hidden",
    position: "relative",
  },

  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(-45deg, #ffffff, #2a5298, #ff512f, #000000)",
    backgroundSize: "400% 400%",
    animation: "gradientMove 10s ease infinite",
    zIndex: -1,
  },

  card: {
    padding: "40px",
    borderRadius: "20px",
    textAlign: "center",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    animation: "floatCard 4s ease-in-out infinite",
  },

  title: {
    color: "white",
    marginBottom: "20px",
  },

  btnGroup: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
  },

  button: {
    padding: "12px 25px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    color: "white",
    background: "linear-gradient(45deg, #ff512f, #dd2476)",
    transition: "0.3s",
  },
};


document.addEventListener("mouseover", (e) => {
  if (e.target.tagName === "BUTTON") {
    e.target.style.transform = "scale(1.1)";
    e.target.style.boxShadow = "0 5px 15px rgba(0,0,0,0.4)";
  }
});

document.addEventListener("mouseout", (e) => {
  if (e.target.tagName === "BUTTON") {
    e.target.style.transform = "scale(1)";
    e.target.style.boxShadow = "none";
  }
});