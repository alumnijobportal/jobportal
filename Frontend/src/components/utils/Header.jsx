export default function Header() {
    return (
      <header className="bg-white shadow-xl w-full flex justify-between items-center py-2 px-6">
       
        <div>
          <img src="/logo.png" alt="Logo" className="h-10" />
        </div>
  
        <nav className="flex gap-4 ">
          <button className="w-24 border border-[#D2940D] rounded-2xl px-4 py-1 text-[#D2940D] hover:bg-[#D2940D] hover:text-white transition-all">
            Login
          </button>
          <button className="w-24 bg-[#D2940D] text-white rounded-2xl px-4 py-1 hover:bg-[#b3790b] transition-all">
            Register
          </button>
        </nav>
      </header>
    );
  }
  