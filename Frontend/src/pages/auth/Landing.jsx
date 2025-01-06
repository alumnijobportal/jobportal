import { toast } from "react-hot-toast";

export default function Landing() {
  return (
    <div className="flex flex-col items-center mt-16">
      <div className="text-6xl ">
        Find your Dream Job with
        <div className="font-bold text-center p-4" >SGSITS Job Portal</div>
      </div>
      <div className="text-3xl mt-4">
        <p className="text-center">*exclusive for SGSITS students</p>
      </div>
      <div className="bg-white mt-4 flex justify-center">
       <div>

       </div>
       <div>Search for company</div>
       <button className="w-24 bg-[#D2940D] text-white rounded-2xl px-4 py-1 hover:bg-[#b3790b] transition-all">
            Search
          </button>
      </div>
    </div>
  );
}
