import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    batch: "",
    work_status: "",
  });
  const [resume, setResume] = useState(null);
  const [graduationYear, setGraduationYear] = useState(null);
  const [years, setYears] = useState([]);
  const [workStatus, setWorkStatus] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleWorkStatusChange = (status) => {
    setWorkStatus(status);
    setFormData((prev) => ({ ...prev, work_status: status }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!formData.fullname || !formData.email || !formData.password || !formData.phone || !graduationYear || !resume || !batch) {
      toast.error("Please fill all required fields and upload a valid resume!");
      return;
    }
    console.log(formData);
    
    // Append form data for backend
    const data = new FormData();
    data.append("fullname", formData.fullname);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("phone", formData.phone);
    data.append("batch", formData.batch);
    data.append("work_status", formData.work_status);
    data.append("resume", resume);

    try {
      toast.loading("Submitting...");
      const response = await axios.post("http://localhost:5000/api/auth/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.dismiss();
      toast.success("User registered successfully!");
      console.log(response.data);
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/rtf"];
    const maxSize = 2 * 1024 * 1024; // 2 MB

    if (file && allowedTypes.includes(file.type) && file.size <= maxSize) {
      setResume(file);
      toast.success("Resume uploaded successfully!");
    } else {
      setResume(null);
      toast.error("Invalid file type or size. Upload a DOC, DOCx, PDF, or RTF under 2 MB.");
    }
  };

  // Get the current year and create the year range
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearRange = [];
    for (let year = 1956; year <= currentYear + 4; year++) {
      yearRange.push(year);
    }
    setYears(yearRange);
    setGraduationYear(currentYear + 4); // Set default value
  }, []);

  return (
    <div className="mt-16">
      <div className="flex gap-4 px-6">
        {/* Left Section */}
        <div className="w-1/3 ">
        <div className="bg-white rounded-lg shadow-md p-4" >
          <div className="flex flex-col gap-4 items-center">
            <div className="w-32 h-32 rounded-full bg-slate-200"></div>
            <h2 className="text-lg font-medium text-gray-900 text-center">
              Register on our platform to unlock opportunities:
            </h2>
            <div className="text-sm space-y-3">
              <div className="text-gray-600 flex items-center">
                <img src="/tick.svg" alt="tick" className="w-5 h-5 mr-2" />
                Build your profile and get noticed by top recruiters.
              </div>
              <div className="text-gray-600 flex items-center">
                <img src="/tick.svg" alt="tick" className="w-5 h-5 mr-2" />
                Receive job postings tailored to your skills.
              </div>
              <div className="text-gray-600 flex items-center">
                <img src="/tick.svg" alt="tick" className="w-5 h-5 mr-2" />
                Hire the best talent from SGSITS degree holders.
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full bg-white rounded-lg shadow-md p-6 h-screen overflow-y-auto scrollbar-hidden">
          <h2 className="text-4xl font-medium text-gray-800 mb-4">
            Create your Profile
          </h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                className="text-sm w-3/4 p-2 border-2 border-gray-200 rounded-lg bg-white text-slate-800 focus:border-gray-400 focus:outline-none"
                id="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Enter your Name"
              />
            </div>

            <div>
              <label className="block text-gray-700">Email ID</label>
              <input
                type="text"
                className="text-sm w-3/4 p-2 border-2 border-gray-200 rounded-lg bg-white text-slate-800 focus:border-gray-400 focus:outline-none"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your Email"
              />
              <p className="text-gray-400 text-xs p-1">
                We'll send relevant job updates to this email.
              </p>
            </div>

            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="text-sm w-3/4 p-2 border-2 border-gray-200 rounded-lg bg-white text-slate-800 focus:border-gray-400 focus:outline-none"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your Password"
              />
            </div>

            <div>
              <label className="block text-gray-700">Mobile Number</label>
              <input
                type="text"
                className="text-sm w-3/4 p-2 border-2 border-gray-200 rounded-lg bg-white text-slate-800 focus:border-gray-400 focus:outline-none"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your Mobile Number"
              />
              <p className="text-gray-400 text-xs p-1">
                Enter the mobile number used during college admission.
              </p>
            </div>

            <div>
              <label className="block text-gray-700">Graduation Year</label>
              <select
                className="text-sm w-3/4 p-2 border-2 border-gray-200 rounded-lg bg-white text-slate-800 focus:border-gray-400 focus:outline-none"
                id="batch"
                onChange={handleChange}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Work Status Section */}
            <h2 className="text-xl font-medium text-gray-800">Work Status</h2>
            <div className="flex gap-4 mb-6">
              <div
                onClick={() => handleWorkStatusChange("EXPERIENCED")}
                className={`flex-1 border-2 rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer ${
                  workStatus === "EXPERIENCED" ? "border-yellow-500 bg-yellow-50" : "border-gray-200"
                }`}
              >
                <img src="/briefcase-icon.svg" alt="Experienced" className="w-8 h-8" />
                <span className="font-medium">I'm experienced</span>
                <span className="text-gray-500 text-sm text-center">
                  I have work experience (excluding internships)
                </span>
              </div>
              <div
                onClick={() => handleWorkStatusChange("FRESHER")}
                className={`flex-1 border-2 rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer ${
                  workStatus === "FRESHER" ? "border-yellow-500 bg-yellow-50" : "border-gray-200"
                }`}
              >
                <img src="/student-icon.svg" alt="Fresher" className="w-8 h-8" />
                <span className="font-medium">I'm a fresher</span>
                <span className="text-gray-500 text-sm text-center">
                  I am a student / Haven't worked after graduation
                </span>
              </div>
            </div>

            {/* Resume Upload Section */}
            <h2 className="text-xl font-medium text-gray-800">Resume</h2>
            <div className="flex items-center gap-4">
              <label
                htmlFor="resume-upload"
                className="bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-600"
              >
                Upload Resume
              </label>
              <input
                type="file"
                id="resume-upload"
                className="hidden"
                onChange={handleFileUpload}
              />
              <div className="text-gray-500 text-sm">DOC, DOCx, PDF, RTF | Max: 2 MB</div>
            </div>
            {resume && <p className="text-green-500 mt-2">File Uploaded: {resume.name}</p>}

            <button
              type="submit"
              className="bg-yellow-600 text-white rounded-lg p-2 hover:opacity-90 mt-4"
            >
              Register Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
