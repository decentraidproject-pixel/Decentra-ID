import { useState, useEffect } from "react";
import axios from "axios";
import "../VerifierDashboard.css";

function VerifierDashboard() {
  const [verifierName, setVerifierName] = useState("");
  const [posts, setPosts] = useState([]);
  const [score,setScore]=useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setVerifierName(payload.verifierName);
      fetchPosts();
    } catch (err) {
      console.error("Invalid token", err);
    }
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://decentraidbackend-2.onrender.com/api/posts/verifier",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

       
      const safePosts = res.data.map((post) => ({
        ...post,
        approvedBy: post.approvedBy || [],
        rejectedBy: post.rejectedBy || [],
        verifiers: post.verifiers || [],
      }));

      setPosts(safePosts);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDecision = async (postId, decision) => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `https://decentraidbackend-2.onrender.com/api/posts/verify/${postId}`,
        { decision },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedPost = res.data.post;

      setPosts((prev) =>
        prev.map((p) => (p._id === postId ? updatedPost : p))
      );
    } catch (err) {
      console.error(err);
      alert("Error updating post");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Verifier Dashboard</h1>
      <h2>Welcome, {verifierName}</h2>

      
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "15px",
          marginTop: "20px"
        }}
      >
        {posts.length === 0 && <p>No posts assigned yet.</p>}

        {posts.map((post) => {
          const isApproved = post.approvedBy?.length > 0;
          const isRejected = post.rejectedBy?.length > 0;

          let bgColor = "#ffffff";
          if (isApproved) bgColor = "#dcfce7";
          if (isRejected) bgColor = "#fee2e2";

          return (
            <div
              key={post._id}
              style={{
                background: bgColor,
                borderRadius: "12px",
                padding: "15px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
                gap: "6px"
              }}
            >
              
              <h3 style={{backgroundColor:"#eefaff",padding:"5px",borderRadius:"20px", color:"#00000060",fontWeight:"bold"}}><b>{post.title}</b></h3>
              <p style={{ color: "#555" }}>{post.description}</p>

              <hr />

             
              <p ><b>User:</b> {post.userName || "N/A"}</p>
              <p><b>Email:</b> {post.userEmail || "N/A"}</p>

            

             
              <p><b>Category:</b> {post.category || "N/A"}</p>
              <p><b>Tags:</b> {post.tags || "N/A"}</p>
              <p><b>Location:</b> {post.location || "N/A"}</p>
              <p><b>City:</b> {post.city || "N/A"}</p>

             <p>
  <b>Duration:</b>{" "}
  {post.fromDate && post.toDate
    ? `${post.fromDate.split("T")[0]} → ${post.toDate.split("T")[0]}`
    : "N/A"}
</p>

              <p><b>Status:</b> {post.status || "pending"}</p>
            
              

             
              <p><b>Verifiers:</b> {post.verifiers?.join(", ") || "None"}</p>
              <p><b>Approved:</b> {post.approvedBy?.join(", ") || "None"}</p>
              <p><b>Rejected:</b> {post.rejectedBy?.join(", ") || "None"}</p>

             
              <p>
                <b>Proof:</b>{" "}
                {post.proofLink ? (
                  <a href={post.proofLink} target="_blank" rel="noreferrer">
                    Open
                  </a>
                ) : (
                  "N/A"
                )}
              </p>

              <p>
                <b>File:</b>{" "}
                {post.file ? (
                  <a href={post.file} target="_blank" rel="noreferrer">
                    View
                  </a>
                ) : (
                  "N/A"
                )}
              </p>

        


  

              
              {post.approvedBy?.length === 0 &&
                post.rejectedBy?.length === 0 && (
                  <div
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      gap: "10px"
                    }}
                  >
                    <button
                      onClick={() => handleDecision(post._id, "approved")}
                      style={{
                        background: "#22c55e",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        flex: 1
                      }}
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleDecision(post._id, "rejected")}
                      style={{
                        background: "#ef4444",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        flex: 1
                      }}
                    >
                      Reject
                    </button>
                  </div>
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VerifierDashboard;
