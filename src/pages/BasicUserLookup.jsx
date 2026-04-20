import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const UserLookup = () => {
  const [email, setEmail] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
   const nav=useNavigate();
  const fetchUser = async () => {
    if (!email) {
      setError("Please enter email");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `https://decentraidbackend-2.onrender.com/api/posts/userByEmail/${email}`
      );

      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

 

function ClickNow() {
  nav("/userLookup-portal");
}
  const filteredPosts =
    data?.posts?.filter((post) => {
      if (filter === "all") return true;
      if (filter === "pending")
        return !post.status || post.status === "pending";
      if (filter === "approved") return post.status === "approved";
      if (filter === "rejected") return post.status === "rejected";
      return true;
    }) || [];

  const score = data?.user?.reputationScore || 0;

  const getTrustStatus = (score) => {
    if (score >= 200) return "Background Verified - High Confidence";
    if (score >= 150) return "Background Verified";
    if (score >= 120) return "Partially Verified";
    if (score >= 30) return "Verification in Progress";
    return "Not Verified";
  };

  return (

   
    <div style={{ padding: "20px" }}>

         <button onClick={ClickNow}>View Full Verification Status</button>

         <div>
        <p>Score above 200 - Background Verified - High Confidence </p>
         <p>Score above 150 - Background Verified  </p>
          <p>Score above 120 - Partially Verified </p>
           <p>Score above 30 - Verification in Progress </p>
        </div>

        
      <h2>User Lookup</h2>

      <input
        type="email"
        placeholder="Enter user email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "8px", width: "250px" }}
      />

      <button onClick={fetchUser} style={{ marginLeft: "10px" }}>
        Search
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {data?.user && (
        <div style={{ marginTop: "20px" }}>
          <h3>User Details</h3>
          <p>
            <b>Name:</b> {data.user.name}
          </p>
          <p>
            <b>Email:</b> {data.user.email}
          </p>
        </div>
      )}

      {data && (
        <div style={{ marginTop: "20px" }}>
          <div
            style={{
              marginBottom: "15px",
              padding: "10px",
              background: "#111827",
              color: "white",
              borderRadius: "8px",
              display: "inline-block"
            }}
          >
            Trust Score: {score}
          </div>

          <p>{getTrustStatus(score)}</p>

          <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
            <button onClick={() => setFilter("all")}>All</button>
            <button onClick={() => setFilter("pending")}>Pending</button>
            <button onClick={() => setFilter("approved")}>Selected</button>
            <button onClick={() => setFilter("rejected")}>Rejected</button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "15px"
            }}
          >
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div
                  key={post._id}
                  style={{
                    border: "1px solid #ccc",
                    padding: "15px",
                    borderRadius: "8px"
                  }}
                >
                  <h4>{post.title}</h4>

                  <p>
                    <b>Description:</b> {post.description}
                  </p>
                 

                 

                  <p>
                    <b>Status:</b>{" "}
                    <span
                      style={{
                        color:
                          post.status === "approved"
                            ? "green"
                            : post.status === "rejected"
                            ? "red"
                            : "orange"
                      }}
                    >
                      {post.status || "pending"}
                    </span>
                  </p>

                  <p>
                    <b>Approved By:</b>{" "}
                    {post.approvedBy?.length > 0
                      ? post.approvedBy.join(", ")
                      : "None"}
                  </p>

                  <p>
                    <b>Rejected By:</b>{" "}
                    {post.rejectedBy?.length > 0
                      ? post.rejectedBy.join(", ")
                      : "None"}
                  </p>
                </div>
              ))
            ) : (
              <p>No posts found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserLookup;
