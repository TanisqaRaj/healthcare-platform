
import { TbShoppingBagSearch } from "react-icons/tb";
import { FaHospitalUser } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";

const Header = () => {
  return (
    <header className='w-[100vw] h-16 shadow-md '>
        <div className='h-full container mx-auto flex items-center px-4 py-3 justify-between'>
            <div>
              <img src="/">
              </img>
            </div>

            <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2 '>
              <input type="text" placeholder='Search Product here...' className='w-full h-6 outline-none  rounded-l-full'></input>
              <div className='text-lg min-w-[40px] h-6 bg-emerald-400 flex items-center justify-center rounded-r-full'>
              <TbShoppingBagSearch />
              </div>
            </div>

            <div className='flex justify-between items-center gap-7 '>
              <div className='text-2xl cursor-pointer'>
                <FaHospitalUser />
              </div>
              <div className='text-2xl relative'>
                <span><FaCartPlus /></span>

                <div className='bg-emerald-400 text-white h-5 w-5 p-1 flex items-center justify-center rounded-full absolute -top-2 -right-3 '>
                  <p className='text-xs'>0</p>
                </div>
              </div>

              <div>
                <button className='px-3 py-0.5 pb-1 bg-emerald-400 rounded-full text-white hover:bg-emerald-600'>
                  Login
                </button>
              </div>
              
            </div>
        </div>
    </header>
  )
}

export default Header
