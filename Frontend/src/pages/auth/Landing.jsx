import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import AlumniNetwork from "../../components/general/AlumniNetwork";

function Box({
  logo,
  companyName,
  alumniName,
  studentsHired,
  mostHiredVerticals,
}) {
  return (
    <motion.div
      className="bg-gradient-to-r from-[#ac8124] to-[#D2940D] p-4 rounded-xl shadow-lg flex flex-col items-start text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex gap-4 justify-center items-center">
        <img src={logo} alt="Company Logo" className="w-16 h-16 rounded-full" />
        <div className="flex flex-col">
          <h3 className="font-bold text-lg">{companyName}</h3>
          <p className="text-sm">Alumnus: {alumniName}</p>
        </div>
      </div>
      <p className="text-sm mt-2 flex items-center gap-2">
        Students Hired:{" "}
        <span className="bg-gray-300 text-black px-2 rounded-2xl text-sm">
          {studentsHired}
        </span>
      </p>
      <p className="text-sm mt-2">Most Hired Verticals:</p>
      <div className="flex flex-wrap gap-2 mt-2 text-xs">
        {mostHiredVerticals.map((vertical, index) => (
          <span
            key={index}
            className="bg-gray-300 text-slate-800 font-medium px-3 py-1 rounded-full text-sm"
          >
            {vertical}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Landing() {
  const initialBoxes = [
    {
      logo: "https://via.placeholder.com/64",
      companyName: "Hvantage Technologies",
      alumniName: "Neelesh Jain",
      studentsHired: 10,
      mostHiredVerticals: ["Backend Developer", "Marketing Associate"],
    },
    // Add 5 more objects for initial boxes
    {
      logo: "https://via.placeholder.com/64",
      companyName: "TechWave Inc.",
      alumniName: "Rajesh Sharma",
      studentsHired: 12,
      mostHiredVerticals: ["Frontend Developer", "Product Manager"],
    },
    {
      logo: "https://via.placeholder.com/64",
      companyName: "Innovatech Ltd.",
      alumniName: "Priya Singh",
      studentsHired: 8,
      mostHiredVerticals: ["Data Analyst", "UX Designer"],
    },
    {
      logo: "https://via.placeholder.com/64",
      companyName: "Visionary Labs",
      alumniName: "Amit Kumar",
      studentsHired: 15,
      mostHiredVerticals: ["Backend Developer", "DevOps Engineer"],
    },
    {
      logo: "https://via.placeholder.com/64",
      companyName: "Future Minds",
      alumniName: "Sneha Patel",
      studentsHired: 5,
      mostHiredVerticals: ["AI Engineer", "ML Researcher"],
    },
    {
      logo: "https://via.placeholder.com/64",
      companyName: "Synergy Solutions",
      alumniName: "Manoj Gupta",
      studentsHired: 7,
      mostHiredVerticals: ["Cybersecurity Analyst", "Software Tester"],
    },
  ];

  const moreBoxes = [
    // Add 6 more objects for "See More" functionality
    {
      logo: "https://via.placeholder.com/64",
      companyName: "NextGen Tech",
      alumniName: "Kavya Verma",
      studentsHired: 9,
      mostHiredVerticals: ["Mobile Developer", "Cloud Architect"],
    },
    {
      logo: "https://via.placeholder.com/64",
      companyName: "Alpha Coders",
      alumniName: "Vikash Sharma",
      studentsHired: 11,
      mostHiredVerticals: ["Blockchain Developer", "Data Scientist"],
    },
    {
      logo: "https://via.placeholder.com/64",
      companyName: "Alpha Coders",
      alumniName: "Vikash Sharma",
      studentsHired: 11,
      mostHiredVerticals: ["Blockchain Developer", "Data Scientist"],
    },
  ];

  const [displayedBoxes, setDisplayedBoxes] = useState(initialBoxes);

  const handleSeeMore = () => {
    setDisplayedBoxes((prev) => [...prev, ...moreBoxes]);
  };

  return (
    <div className="my-28 px-10">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="text-6xl font-medium text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="opacity-80">Find your Dream Job with</span>
          <motion.div
            className="font-bold text-center p-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            SGSITS Job Portal
          </motion.div>
        </motion.div>

        <motion.div
          className="text-lg mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <p className="text-center italic text-gray-600">
            *exclusive for SGSITS students
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="bg-white mt-8 py-3 px-4 rounded-full flex items-center shadow-md w-3/4 sm:w-1/2"
        >
          <FaSearch className="text-gray-500 mr-3" />
          <input
            type="text"
            placeholder="Search for company"
            className="flex-grow bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
          />
          <motion.button
            className="ml-3 w-24 bg-[#D2940D] text-white rounded-full px-4 py-1 hover:bg-[#b3790b] transition-all"
            whileTap={{ scale: 0.9 }}
          >
            Search
          </motion.button>
        </motion.div>

        <div className="mt-16 px-4">
          <div className="text-center text-5xl mb-12">
            Our Alumni placed companies
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedBoxes.map((box, index) => (
              <Box key={index} {...box} />
            ))}
          </div>

          {/* See More Button */}
          <div
            className="flex justify-center items-center mt-8 cursor-pointer text-xl font-medium text-slate-800 hover:text-slate-700"
            onClick={handleSeeMore}
          >
            <div>See More</div>
            <div>
              <motion.i
                className="fas fa-chevron-circle-down ml-2"
                animate={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      </motion.div>

     
        <AlumniNetwork/>
    </div>
  );
}
