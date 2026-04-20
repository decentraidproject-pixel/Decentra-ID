import { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

function UserDashboard() {
  const name = localStorage.getItem("userName");
  const email = localStorage.getItem("userEmail");
  const userId = localStorage.getItem("userId");

  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all");
  const [institutions, setInstitutions] = useState([]);
  const [file, setFile] = useState(null);
  const [score,setScore]=useState(0);

  

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    fromDate: "",
    toDate: "",
    feedback: "",
    location: "",
    city: "",
    proofLink: "",
    verifiers: []
  });

  useEffect(() => {
    fetchPosts();
    fetchInstitutions();
  }, []);

  const fetchInstitutions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/institutions/approved"
      );
      setInstitutions(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/posts/user/${userId}`
      );
      setPosts(res.data.posts || []);
      setScore(res.data.user.reputationScore || 0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelect = (e) => {
    const values = [...e.target.selectedOptions].map(o => o.value);
    setForm({ ...form, verifiers: values });
  };

  const calculateDuration = () => {
    if (!form.fromDate || !form.toDate) return "N/A";
    const diff =
      (new Date(form.toDate) - new Date(form.fromDate)) /
      (1000 * 60 * 60 * 24);

    return diff >= 0 ? diff + " days" : "Invalid";
  };

  const getTrustStatus=(score)=>{
        if(score>=200) return "Background Verified - High Confident";
        if( score>=150) return "Background Verified";
        if(score>=120) return "Partially Verified";
        if(score>=30) return "Verification in Progress";
        return "Not Verified";
      }
    

  const submitPost = async () => {
    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      formData.append("userId", userId);
      formData.append("userName", name);
      formData.append("userEmail", email);
      formData.append("duration", calculateDuration());

      if (file) formData.append("file", file);

      await axios.post(
        "http://localhost:5000/api/posts/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Post submitted!");

      setShowForm(false);
      setFile(null);
      setForm({
        title: "",
        description: "",
        category: "",
        tags: "",
        fromDate: "",
        toDate: "",
        feedback: "",
        location: "",
        city: "",
        proofLink: "",
        verifiers: []
      });

      fetchPosts();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const filteredPosts =
    filter === "all"
      ? posts
      : posts.filter((p) => p.status === filter);


      
  return (

   
  
    <div style={{ padding: "20px" }}>

      
       
      <h2>User Dashboard</h2>

      <p><b>Name:</b> {name}</p>
      <p><b>Email:</b> {email}</p>
      

 <div
    style={{
      display: "flex",
      justifyContent: "center",
      marginTop: "20px"
    }}
  >

<div
style={{
  alignItems:"center",
  background:"#004517",
  border:"2px solid #e2e8f0 ",
  color:"white",
  padding:"20px",
  borderRadius:"12px",
   width: "220px",
    textAlign: "center",
    marginTop: "10px"
}}>
  <h3>Reputation</h3>
  <h1 style={{ fontSize: "38px", color: "#6366f1" }}>{score}</h1>
  <p>{getTrustStatus(score)}</p>

</div>

</div>
  <div>
        <p>Score above 200 - Background Verified - High Confidence </p>
         <p>Score above 150 - Background Verified  </p>
          <p>Score above 120 - Partially Verified </p>
           <p>Score above 30 - Verification in Progress </p>
        </div>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "+ Add Content"}
      </button>
     
      {showForm && (
        <div className="form-card">
          <h3>Add Content</h3>

          <div className="form-grid">
            <input name="title" placeholder="Title" onChange={handleChange} />
            <input name="category" placeholder="Category" onChange={handleChange} />

            <textarea
              name="description"
              placeholder="Description"
              onChange={handleChange}
              className="full-width"
            />

            <input name="tags" placeholder="Tags" onChange={handleChange} />

            <div className="date-row">
              <input type="date" name="fromDate" onChange={handleChange} />
              <input type="date" name="toDate" onChange={handleChange} />
            </div>

            <p className="full-width">
              <b>Duration:</b> {calculateDuration()}
            </p>

            <textarea
              name="feedback"
              placeholder="Feedback"
              onChange={handleChange}
              className="full-width"
            />

            <input name="location" placeholder="Location" onChange={handleChange} />
            <input name="city" placeholder="City" onChange={handleChange} />

            <input
              name="proofLink"
              placeholder="Proof Link"
              onChange={handleChange}
              className="full-width"
            />

            <div className="full-width">
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            </div>

            <div className="full-width">
              <select multiple onChange={handleSelect}>
                {institutions.map((inst) => (
                  <option key={inst._id} value={inst.officialName}>
                    {inst.officialName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="submit-btn" onClick={submitPost}>
            Submit
          </button>
        </div>
        
      )}

     
      <div style={{ marginTop: "30px" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("approved")}>Approved</button>
        <button onClick={() => setFilter("rejected")}>Rejected</button>
      </div>

     
      {filteredPosts.map((post) => {

      
        const allApproved =
          post.approvedBy?.length === post.verifiers?.length &&
          post.verifiers?.length > 0;

        const hasAnyApproved = post.approvedBy?.length > 0;
        const hasRejected = post.rejectedBy?.length > 0;

        let bgColor = "#ffffff";

        if (allApproved) {
          bgColor = "#dcfce7"; 
        } else if (hasRejected) {
          bgColor = "#fee2e2"; // red bg
        } else if (hasAnyApproved) {
          bgColor = "#ede9fe"; // purple bg
        }

        return (
<>


          
          <div key={post._id} className="post-card"  style={{background:bgColor, marginTop:"30px"}}>

            <h3>{post.title}</h3>
            <p>{post.description}</p>

            <p><b>Category:</b> {post.category || "N/A"}</p>
            <p><b>Tags:</b> {post.tags || "N/A"}</p>

            <p><b>Location:</b> {post.location || "N/A"}</p>
            <p><b>City:</b> {post.city || "N/A"}</p>


<p>
  <b>Duration:</b>{" "}
  {post.fromDate && post.toDate
    ? `${new Date(post.fromDate).toISOString().split("T")[0]} → ${new Date(post.toDate).toISOString().split("T")[0]}`
    : "N/A"}
</p>

            <p><b>Feedback:</b> {post.feedback || "N/A"}</p>

            <p>
              <b>Proof Link:</b>{" "}
              {post.proofLink ? (
                <a href={post.proofLink} target="_blank" rel="noreferrer">
                  Open Link
                </a>
              ) : (
                "N/A"
              )}
            </p>

            {post.file && (
              <p>
                <b>File:</b>{" "}
                <a href={post.file} target="_blank" rel="noreferrer">
                  View File
                </a>
              </p>
            )}

            <hr />

            <p><b>Status:</b> {post.status || "pending"}</p>
            <p style={{backgroundColor:"purple", color:"white",width:"160px"}}>ReputationScore :  {score}</p>

    
            <div
              style={{
                background: bgColor,
                padding: "12px",
                borderRadius: "10px",
                marginTop: "10px"
              }}
            >
              <p><b>Verifiers:</b></p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {post.verifiers?.length > 0 ? (
                  post.verifiers.map((v, i) => {
                    const isApproved = post.approvedBy?.includes(v);
                    const isRejected = post.rejectedBy?.includes(v);

                    let bg = "#e5e7eb";
                    let color = "#000";

                    if (allApproved) {
                      bg = "#22c55e";
                      color = "white";
                     

                    } else if (isApproved) {
                      bg = "#a855f7";
                      color = "white";
                      
                    } else if (isRejected) {
                      bg = "#ef4444";
                      color = "white";
                      
                    }

                    return (
                      <span
                        key={i}
                        style={{
                          padding: "4px 10px",
                          borderRadius: "999px",
                          fontSize: "12px",
                          background: bg,
                          color
                        }}
                      >
                        {v}
                      </span>
                    );
                  })
                ) : (
                  <span style={{ color: "#999" }}>None</span>
                )}
              </div>
            </div>

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

          </>
        );
      })}
    </div>
  );
}

export default UserDashboard;