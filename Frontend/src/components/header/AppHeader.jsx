import { useEffect, useRef } from 'react';
import UserImg from '../../assets/images/avatar-icon.png';
import logo from '../../assets/images/Star.png';
import { NavLink, Link } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';

const navLinks = [{
  path: '/home',
  display: 'Home'
},
{
  path: '/doctors',
  display: 'Find a Doctor',
},
{
  path: '/services',
  display: 'Services',
},
{
  path: '/pharmacy',
  display: 'Home'
},
{
  path: '/home',
  display: 'Home'
},
]
const AppHeader = () => {
  const headerRef = useRef(null)
  const menuRef = useRef(null)

const handleStickyHeader = () =>{
  if(document.body.scrollTop > 80|| document.documentElement.scrollTop >80){
    headerRef.current.classList.add('sticky_header')
  }
  else{
    headerRef.current.classList.remove('sticky_header')
  }
}

useEffect(() => {
  handleStickyHeader()

  return() => window,removeEventListener('scroll', handleStickyHeader)

})

const toggleMenu =()=> menuRef.current.classList.toggle('show_menu')


  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex justify-between items-center">

          {/*==========Logo=========== */}
          <div>
            <img src={logo} alt="logo" />
          </div>

          {/*========Menu=========== */}
          <div className="navi" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {
                navLinks.map((link, index) => (
                  <li key={index}>
                    <NavLink to={link.path} className={navClass => navClass.isActive ? 'text-primaryColor text-[16px] leading-7 font-[600]' : ' text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor'}>{link.display}</NavLink>
                  </li>))
              }
            </ul>
          </div>
          {/*========Nav Right=========== */}
          <div className="flex items-center gap-4" >
            <div className='hidden'>
              <Link to='/'>
                <figure className='w-[35px] h-[35px] rounded-full cursor-pointer'>
                  <img src={UserImg} className="w-full rounded-full" alt="logo" />
                </figure>
              </Link>
            </div>

            <Link to='/login'>
              <button className="bg-primaryColor py-2 text-while font-[600] h-[44px]
              flex items-center justtify-center rounded-[50px]">Login
              </button>
            </Link>

              <span className="md:hidden" onClick={toggleMenu}>
               < BiMenu className='w-6 h-6 cursor-pointer'  />
              </span>

          </div>
        </div>
      </div>
    </header>
  )
}

export default AppHeader