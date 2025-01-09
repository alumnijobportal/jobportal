import { useNavigate } from "react-router-dom";

export default function Header() {

  const navigate= useNavigate();

    return (
      <header className="bg-white shadow-xl w-full flex justify-between items-center py-2 px-6 fixed top-0 z-20">
       
        <div onClick={()=>navigate("/landing")} className="cursor-pointer" >
          <img src="/logo.png" alt="Logo" className="h-10" />
        </div>
        <nav className="flex gap-4 ">
          <button onClick={()=>navigate("/login")} className="w-24 border border-[#D2940D] rounded-2xl px-4 py-1 text-[#D2940D] hover:bg-[#D2940D] hover:text-white transition-all">
            Login
          </button>
          <button  onClick={()=>navigate("/register")} className="w-24 bg-[#D2940D] text-white rounded-2xl px-4 py-1 hover:bg-[#b3790b] transition-all">
            Register
          </button>
        </nav>
      </header>
    );
  }
  