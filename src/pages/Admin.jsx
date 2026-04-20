import { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
  const [mode, setMode] = useState("");
  const [type, setType] = useState("");
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(null);

  const token = localStorage.getItem("adminToken");
console.log("ADMIN TOKEN:", localStorage.getItem("adminToken"));
  const [modes, setModes] = useState("");
  const [types, setTypes] = useState("");
  const [lists, setLists] = useState([]);
  const [selected1, setSelected1] = useState(null);

  
  useEffect(() => {
    if (!type || !mode) return;

    const fetchData = async () => {
      try {
        const url =
          mode === "basic"
            ? `http://localhost:5000/api/institution/admin/type/${type}`
            : `http://localhost:5000/api/institution/admin/fulltype/${type}`;

        const res = await axios.get(url, {
          headers: { Authorization: "Bearer " + token },
        });

        setList(res.data || []);
        setSelected(null);
      } catch (err) {
        console.error(err);
        alert("API error");
      }
    };

    fetchData();
  }, [type, mode]);


  useEffect(() => {
    if (!types || !modes) return;

    const fetchData = async () => {
      try {
        const url1 =
          modes === "basic"
            ? `http://localhost:5000/api/institution/admin/verifytype/${types}`
            : `http://localhost:5000/api/institution/admin/verifierfulltype/${types}`;

        const res2 = await axios.get(url1, {
          headers: { Authorization: "Bearer " + token },
        });

        setLists(res2.data || []);
        setSelected1(null);
      } catch (err) {
        console.error(err);
        alert("API error");
      }
    };

    fetchData();
  }, [types, modes]);

 
  const loadDetails = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/institution/admin/details/${id}`,
        { headers: { Authorization: "Bearer " + token } }
      );

      setSelected(res.data);
    } catch {
      alert("Failed to load details");
    }
  };

  
  const vloadDetails = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/institution/admin/vdetails/${id}`,
        { headers: { Authorization: "Bearer " + token } }
      );

      setSelected1(res.data);
    } catch {
      alert("Failed to load details");
    }
  };

  const show = (val) => val || "N/A";


  const vapprove = async () => {
  await axios.post(
    `http://localhost:5000/api/institution/admin/vapprove/${selected1._id}`,
    {},
    { headers: { Authorization: "Bearer " + token } }
  );
  alert("Approved");
};

const vreject = async () => {
  await axios.post(
    `http://localhost:5000/api/institution/admin/vreject/${selected1._id}`,
    {},
    { headers: { Authorization: "Bearer " + token } }
  );
  alert("Rejected");
};

const approve = async () => {
  await axios.post(
    `http://localhost:5000/api/institution/admin/approve/${selected._id}`,
    {},
    { headers: { Authorization: "Bearer " + token } }
  );
  alert("Approved");
};

const reject = async () => {
  await axios.post(
    `http://localhost:5000/api/institution/admin/reject/${selected._id}`,
    {},
    { headers: { Authorization: "Bearer " + token } }
  );
  alert("Rejected");
};
  return (
    <>
     
      <div style={{ padding: "20px", fontFamily: "Arial", backgroundColor: "white" }}>
        <h1>Admin Panel</h1>

        <button onClick={() => setMode("basic")}>Basic</button>
        <button onClick={() => setMode("full")}>Full</button>

        <br /><br />

        <select onChange={(e) => setType(e.target.value)}>
          <option value="">Select Type</option>
          <option value="School">School</option>
          <option value="College">College</option>
          <option value="University">University</option>
          <option value="Company">Company</option>
          <option value="NGO">NGO</option>
        </select>

        <h3>Total: {list.length}</h3>

        <div style={{ display: "flex", marginTop: "20px" }}>

          <div style={{ width: "40%", borderRight: "2px solid black" }}>
            {list.map((i) => (
              <div
                key={i._id}
                onClick={() => loadDetails(i._id)}
                style={{
                  border: "1px solid black",
                  margin: "10px",
                  padding: "10px",
                  cursor: "pointer"
                }}
              >
                {mode === "basic" && <p>{i.officialName}</p>}

                {mode === "full" && (
                  <>
                    <b>{i.officialName}</b>
                    <p>{i.organizationType}</p>
                    <p>{i.email || "N/A"}</p>
                  </>
                )}
              </div>
            ))}
          </div>

          <div style={{ width: "60%", padding: "10px" }}>
            {selected ? (
             <div>
  <h2>{show(selected.officialName)}</h2>

  <p><b>Type:</b> {show(selected.organizationType)}</p>
  <p><b>Year of Establishment:</b> {show(selected.yearOfEstablishment)}</p>
  <p><b>Registration Number:</b> {show(selected.registrationNumber)}</p>
  <p><b>Affiliated Body:</b> {show(selected.affiliatedBody)}</p>

  <hr />

  <p><b>Email:</b> {show(selected.email)}</p>
  <p><b>Contact Number:</b> {show(selected.contactNumber)}</p>
  <p><b>Website:</b> {show(selected.website)}</p>
  <p><b>Address:</b> {show(selected.address)}</p>
  <p><b>City:</b> {show(selected.city)}</p>
  <p><b>State:</b> {show(selected.state)}</p>
  <p><b>Country:</b> {show(selected.country)}</p>
  <p><b>Postal Code:</b> {show(selected.postalCode)}</p>

  <hr />

  <p><b>Authorized Person:</b> {show(selected.authorizedPersonName)}</p>
  <p><b>Designation:</b> {show(selected.designation)}</p>
  <p><b>Authorized Email:</b> {show(selected.authorizedEmail)}</p>
  <p><b>Authorized Contact:</b> {show(selected.authorizedContact)}</p>

  <hr />

  <p><b>Services:</b> {show(selected.services)}</p>
  <p><b>Total Staff:</b> {show(selected.totalStaff)}</p>
  <p><b>Total Members:</b> {show(selected.totalMembers)}</p>
  <p><b>Specialization:</b> {show(selected.specialization)}</p>
  <p><b>Working Hours:</b> {show(selected.workingHours)}</p>

  <hr />

  <p><b>Gov Certificate Number:</b> {show(selected.govCertificateNumber)}</p>
  <p><b>GST Number:</b> {show(selected.gstNumber)}</p>
  <p><b>PAN Number:</b> {show(selected.panNumber)}</p>
  <p><b>Accreditation:</b> {show(selected.accreditation)}</p>

  <hr />

  <p><b>Status:</b> {show(selected.status)}</p>

  <br />

  <button onClick={approve}>Approve</button>
<button onClick={reject}>Reject</button>
</div>
            ) : (
              <p>Select an institution</p>
            )}
          </div>
        </div>
      </div>

    
      <div style={{ padding: "20px", fontFamily: "Arial", backgroundColor: "white" }}>
        <h1>UserLookupVerifier</h1>

        <button onClick={() => setModes("basic")}>Basic</button>
        <button onClick={() => setModes("full")}>Full</button>

        <br /><br />

        <select onChange={(e) => setTypes(e.target.value)}>
          <option value="">Select Type</option>
          <option value="School">School</option>
          <option value="College">College</option>
          <option value="University">University</option>
          <option value="Company">Company</option>
          <option value="NGO">NGO</option>
          <option value="Startup">StartUp</option>
        </select>

        <h3>Total: {lists.length}</h3>

        <div style={{ display: "flex", marginTop: "20px" }}>

          <div style={{ width: "40%", borderRight: "2px solid black" }}>
            {lists.map((i) => (
              <div
                key={i._id}
                onClick={() => vloadDetails(i._id)}
                style={{
                  border: "1px solid black",
                  margin: "10px",
                  padding: "10px",
                  cursor: "pointer"
                }}
              >
                {modes === "basic" && <p>{i.officialName}</p>}

                {modes === "full" && (
                  <>
                    <b>{i.officialName}</b>
                    <p>{i.organizationType}</p>
                    <p>{i.email || "N/A"}</p>
                  </>
                )}
              </div>
            ))}
          </div>

          <div style={{ width: "60%", padding: "10px" }}>
            {selected1 ? (
              <div>
                <h2>{show(selected1.officialName)}</h2>
                <div>
  <h2>{show(selected1.officialName)}</h2>

  <p><b>Type:</b> {show(selected1.organizationType)}</p>
  <p><b>Year of Establishment:</b> {show(selected1.yearOfEstablishment)}</p>
  <p><b>Registration Number:</b> {show(selected1.registrationNumber)}</p>
  <p><b>Affiliated Body:</b> {show(selected1.affiliatedBody)}</p>

  <hr />

  <p><b>Email:</b> {show(selected1.email)}</p>
  <p><b>Contact Number:</b> {show(selected1.contactNumber)}</p>
  <p><b>Website:</b> {show(selected1.website)}</p>
  <p><b>Address:</b> {show(selected1.address)}</p>
  <p><b>City:</b> {show(selected1.city)}</p>
  <p><b>State:</b> {show(selected1.state)}</p>
  <p><b>Country:</b> {show(selected1.country)}</p>
  <p><b>Postal Code:</b> {show(selected1.postalCode)}</p>

  <hr />

  <p><b>Authorized Person:</b> {show(selected1.authorizedPersonName)}</p>
  <p><b>Designation:</b> {show(selected1.designation)}</p>
  <p><b>Authorized Email:</b> {show(selected1.authorizedEmail)}</p>
  <p><b>Authorized Contact:</b> {show(selected1.authorizedContact)}</p>

  <hr />

  <p><b>Services:</b> {show(selected1.services)}</p>
  <p><b>Total Staff:</b> {show(selected1.totalStaff)}</p>
  <p><b>Total Members:</b> {show(selected1.totalMembers)}</p>
  <p><b>Specialization:</b> {show(selected1.specialization)}</p>
  <p><b>Working Hours:</b> {show(selected1.workingHours)}</p>

  <hr />

  <p><b>Gov Certificate Number:</b> {show(selected1.govCertificateNumber)}</p>
  <p><b>GST Number:</b> {show(selected1.gstNumber)}</p>
  <p><b>PAN Number:</b> {show(selected1.panNumber)}</p>
  <p><b>Accreditation:</b> {show(selected1.accreditation)}</p>

  <hr />

  <p><b>Status:</b> {show(selected1.status)}</p>

  <br />

  <button onClick={vapprove}>Approve</button>
<button onClick={vreject}>Reject</button>
</div>
            
              </div>
            ) : (
              <p>Select an institution</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;