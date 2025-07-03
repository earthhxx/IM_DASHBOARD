"use client";
import React, { useState, useEffect, useRef } from 'react'; // React default + useState for state management
// import Image from 'next/image'; // Import Next.js Image component
import { AiOutlineMenu } from 'react-icons/ai'; // Import Menu Icon from React Icons
import Link from 'next/link'; // for navigation to other pages

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle mobile menu visibility
  const handleMenuToggle = () => setMenuOpen(!menuOpen); // Toggle mobile menu


  // Change the type of refs to HTMLLIElement
  const wrapperRef1 = useRef<HTMLDivElement | null>(null); // Ref for PRODUCTION 1
  const wrapperRef2 = useRef<HTMLDivElement | null>(null); // Ref for PRODUCTION 2
  const wrapperRef3 = useRef<HTMLDivElement | null>(null); // Ref for PRODUCTION 3
  const wrapperRef4 = useRef<HTMLDivElement | null>(null); // Ref for PRODUCTION 4
  const wrapperRef5 = useRef<HTMLDivElement | null>(null); // Ref for PRODUCTION 5
  const wrapperRef6 = useRef<HTMLDivElement | null>(null); // Ref for WAREHOUSE
  const wrapperRef7 = useRef<HTMLDivElement | null>(null); // Ref for MAINTENANCE
  const wrapperRef8 = useRef<HTMLDivElement | null>(null); // Ref for WORK INSTRUCTION

  // Separate state for each card visibility
  const [isCardOpen1, setIsCardOpen1] = useState(false);
  const [isCardOpen2, setIsCardOpen2] = useState(false);
  const [isCardOpen3, setIsCardOpen3] = useState(false);
  const [isCardOpen4, setIsCardOpen4] = useState(false);
  const [isCardOpen5, setIsCardOpen5] = useState(false);
  const [isCardOpen6, setIsCardOpen6] = useState(false);
  const [isCardOpen7, setIsCardOpen7] = useState(false);
  const [isCardOpen8, setIsCardOpen8] = useState(false);

  const handleCardToggle = (card: number) => {
    if (card === 1) setIsCardOpen1(!isCardOpen1);
    if (card === 2) setIsCardOpen2(!isCardOpen2);
    if (card === 3) setIsCardOpen3(!isCardOpen3);
    if (card === 4) setIsCardOpen4(!isCardOpen4);
    if (card === 5) setIsCardOpen5(!isCardOpen5);
    if (card === 6) setIsCardOpen6(!isCardOpen6);
    if (card === 7) setIsCardOpen7(!isCardOpen7);
    if (card === 8) setIsCardOpen8(!isCardOpen8);
  };

  // Close card if clicked outside of the card
  const handleClickOutside = (e: MouseEvent | TouchEvent) => {
    if (wrapperRef1.current && !wrapperRef1.current.contains(e.target as Node)) {
      setIsCardOpen1(false);
    }
    if (wrapperRef2.current && !wrapperRef2.current.contains(e.target as Node)) {
      setIsCardOpen2(false);
    }
    if (wrapperRef3.current && !wrapperRef3.current.contains(e.target as Node)) {
      setIsCardOpen3(false);
    }
    if (wrapperRef4.current && !wrapperRef4.current.contains(e.target as Node)) {
      setIsCardOpen4(false);
    }
    if (wrapperRef5.current && !wrapperRef5.current.contains(e.target as Node)) {
      setIsCardOpen5(false);
    }
    if (wrapperRef6.current && !wrapperRef6.current.contains(e.target as Node)) {
      setIsCardOpen6(false);
    }
    if (wrapperRef7.current && !wrapperRef7.current.contains(e.target as Node)) {
      setIsCardOpen7(false);
    }
    if (wrapperRef8.current && !wrapperRef8.current.contains(e.target as Node)) {
      setIsCardOpen8(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (

    <div className='fixed w-full h-24 z-30 justify-center items-center mt-1 ps-8 pe-8'>
      <div className='flex justify-center items-center'>
        <div className='flex justify-start items-start '>
          {/* Box nav*/}
          <div className='flex-none'>
          </div>
        </div>
        <div className='flex items-center justify-end w-full'>
          {/* Desktop Menu */}
          <div className='flex '>
            <ul className='hidden xl:flex '>
              <div className='flex justify-end rounded-full w-full p-2  ml-10 mt-7 mb-2 bg-gray-50 text-3xl text-blue-900 drop-shadow-xl'>
                <button onMouseEnter={() => {
                  setIsCardOpen1(true);
                  setIsCardOpen2(false);
                  setIsCardOpen3(false);
                  setIsCardOpen4(false);
                  setIsCardOpen5(false);
                  setIsCardOpen6(false);
                  setIsCardOpen7(false);
                }}
                  onClick={() => handleCardToggle(1)} className='uppercase px-4 text-[15px] hover:underline hover:underline-offset-8'>
                  PRODUCTION 1
                </button>
                <button onMouseEnter={() => {
                  setIsCardOpen1(false);
                  setIsCardOpen2(true);
                  setIsCardOpen3(false);
                  setIsCardOpen4(false);
                  setIsCardOpen5(false);
                  setIsCardOpen6(false);
                  setIsCardOpen7(false);
                }} onClick={() => handleCardToggle(2)} className='uppercase px-4 text-[15px] hover:underline hover:underline-offset-8'>
                  PRODUCTION 2
                </button>
                <button onMouseEnter={() => {
                  setIsCardOpen1(false);
                  setIsCardOpen2(false);
                  setIsCardOpen3(true);
                  setIsCardOpen4(false);
                  setIsCardOpen5(false);
                  setIsCardOpen6(false);
                  setIsCardOpen7(false);
                }} onClick={() => handleCardToggle(3)} className='uppercase px-4 text-[15px] hover:underline hover:underline-offset-8'>
                  PRODUCTION 3
                </button>
                <button onMouseEnter={() => {
                  setIsCardOpen1(false);
                  setIsCardOpen2(false);
                  setIsCardOpen3(false);
                  setIsCardOpen4(true);
                  setIsCardOpen5(false);
                  setIsCardOpen6(false);
                  setIsCardOpen7(false);
                }} onClick={() => handleCardToggle(4)} className='uppercase px-4 text-[15px] hover:underline hover:underline-offset-8'>
                  PRODUCTION 4
                </button>
                <button onMouseEnter={() => {
                  setIsCardOpen1(false);
                  setIsCardOpen2(false);
                  setIsCardOpen3(false);
                  setIsCardOpen4(false);
                  setIsCardOpen5(true);
                  setIsCardOpen6(false);
                  setIsCardOpen7(false);
                }} onClick={() => handleCardToggle(5)} className='uppercase px-4 text-[15px] hover:underline hover:underline-offset-8'>
                  PRODUCTION 5
                </button>
                <button onMouseEnter={() => {
                  setIsCardOpen1(false);
                  setIsCardOpen2(false);
                  setIsCardOpen3(false);
                  setIsCardOpen4(false);
                  setIsCardOpen5(false);
                  setIsCardOpen6(true);
                  setIsCardOpen7(false);
                }} onClick={() => handleCardToggle(6)} className='uppercase px-4 text-[15px] hover:underline hover:underline-offset-8'>
                  WAREHOUSE
                </button>
                <button onMouseEnter={() => {
                  setIsCardOpen1(false);
                  setIsCardOpen2(false);
                  setIsCardOpen3(false);
                  setIsCardOpen4(false);
                  setIsCardOpen5(false);
                  setIsCardOpen6(false);
                  setIsCardOpen7(true);
                }} onClick={() => handleCardToggle(7)} className='uppercase px-4 text-[15px] hover:underline hover:underline-offset-8'>
                  MAINTENANCE
                </button>
                {/* <button onClick={() => handleCardToggle(8)} className='uppercase px-4 text-[15px] hover:underline hover:underline-offset-8'>
                    WORK INSTRUCTION
                  </button> */}
                {/* Mobile Menu Button */}

                <div
                  onClick={handleMenuToggle}
                  className='cursor-pointer rounded-full bg-slate-800 flex items-center justify-center'
                  style={{ width: '30px', height: '30px' }}
                >
                  <AiOutlineMenu style={{ width: '10px', height: '10px' }} color="white" />
                </div>

              </div>
            </ul>
          </div>
        </div>
      </div>

      {/* PART CARD AFTER  NAV */}
      <div className='flex '>
        <div className='flex justify-start items-center'>
          <div className='flex w-80'>
          </div>
        </div>
        <div className='items-center justify-end w-full'>
          {isCardOpen1 && (
            <div onMouseLeave={() => setIsCardOpen1(false)} ref={wrapperRef1} className="flex justify-end left-0 ">
              {/* box before card */}
              <div className='flex-none w-138'></div>
              <div className='flex w-full h-40 rounded-xl bg-gray-50 text-blue-900  shadow-xl pe-10 ps-10 z-40'>
                <div className='flex-1'>
                  <div className='flex w-full '>
                    <h4 className=" font-bold text-[25px] pt-5 pb-2"> PRODUCTION 1 </h4>
                  </div>
                  <div className='border-t border-gray-300 '></div>
                  <div className='grid grid-cols-4 gap-4 scale-z-90 mt-4'>
                    <li>
                      <Link onClick={() => { handleCardToggle(1) }} href="/pages/skill-Matrix?Param=PRODUCTION1">
                        SKILL MATRIX
                      </Link>
                    </li>
                    <li>
                      <Link onClick={() => { handleCardToggle(1) }} href="/pages/Organized?Param=PRODUCTION1">
                        ORGANIZED
                      </Link>
                    </li>
                    <li>
                      <Link onClick={() => { handleCardToggle(1) }} href="/pages/temperature?Param=PRODUCTION1">
                        TEMPERATURE
                      </Link>
                    </li>
                    {/* <li>
                      <Link onClick={() => { handleCardToggle(1) }} href="/pages/checksheets">
                        CHECKSHEETS
                      </Link>
                    </li> */}
                  </div>
                </div>
              </div>
            </div>
          )}
          {isCardOpen2 && (
            <div onMouseLeave={() => setIsCardOpen2(false)} ref={wrapperRef2} className="flex justify-end left-0 ">
              {/* box before card */}
              <div className='flex-none w-138'></div>
              <div className='flex w-full h-40 rounded-xl bg-gray-50 text-blue-900  shadow-xl pe-10 ps-10 z-40'>
                <div className='flex-1'>
                  <div className='flex w-full '>
                    <h4 className=" font-bold text-[25px] pt-5 pb-2"> PRODUCTION 2 </h4>
                  </div>
                  <div className='border-t border-gray-300 '></div>
                  <div className='grid grid-cols-4 gap-4 scale-z-90 mt-4'>
                    <li>
                      <Link onClick={() => handleCardToggle(2)} href="/pages/skill-Matrix?Param=PRODUCTION2">
                        SKILL MATRIX
                      </Link>
                    </li>
                    <li>
                      <Link onClick={() => { handleCardToggle(2) }} href="/pages/Organized?Param=PRODUCTION2">
                        ORGANIZED
                      </Link>
                    </li>
                    <li>
                      <Link onClick={() => { handleCardToggle(2) }} href="/pages/temperature?Param=PRODUCTION2">
                        TEMPERATURE
                      </Link>
                    </li>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isCardOpen3 && (
            <div onMouseLeave={() => setIsCardOpen3(false)} ref={wrapperRef3} className="flex justify-end left-0 ">
              {/* box before card */}
              <div className='flex-none w-138'></div>
              <div className='flex w-full h-40 rounded-xl bg-gray-50 text-blue-900  shadow-xl pe-10 ps-10 z-40'>
                <div className='flex-1'>
                  <div className='flex w-full '>
                    <h4 className=" font-bold text-[25px] pt-5 pb-2"> PRODUCTION 3 </h4>
                  </div>
                  <div className='border-t border-gray-300 '></div>
                  <div className='grid grid-cols-4 gap-4 scale-z-90 mt-4'>
                    <li>
                      <Link onClick={() => handleCardToggle(3)} href="/pages/skill-Matrix?Param=PRODUCTION3">
                        SKILL MATRIX
                      </Link>
                    </li>
                    <li>
                      <Link onClick={() => handleCardToggle(3)} href="/pages/Organized?Param=PRODUCTION3">
                        ORGANIZED
                      </Link>
                    </li>
                    <li>
                      <Link onClick={() => handleCardToggle(3)} href="/pages/temperature?Param=PRODUCTION3">
                        TEMPERATURE
                      </Link>
                    </li>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isCardOpen4 && (
            <div onMouseLeave={() => setIsCardOpen4(false)} ref={wrapperRef4} className="flex justify-end left-0 ">
              {/* box before card */}
              <div className='flex-none w-138'></div>
              <div className='flex w-full h-40 rounded-xl bg-gray-50 text-blue-900  shadow-xl pe-10 ps-10 z-40'>
                <div className='flex-1'>
                  <div className='flex w-full '>
                    <h4 className=" font-bold text-[25px] pt-5 pb-2"> PRODUCTION 4 </h4>
                  </div>
                  <div className='border-t border-gray-300 '></div>
                  <div className='grid grid-cols-4 gap-4 scale-z-90 mt-4'>
                    <li>
                      <Link onClick={() => handleCardToggle(4)} href="/pages/skill-Matrix?Param=PRODUCTION4">
                        SKILL MATRIX
                      </Link>
                    </li>
                    <li>
                      <Link onClick={() => handleCardToggle(4)} href="/pages/Organized?Param=PRODUCTION4">
                        ORGANIZED
                      </Link>
                    </li>
                    <li>
                      <Link onClick={() => handleCardToggle(4)} href="/pages/temperature?Param=PRODUCTION4">
                        TEMPERATURE
                      </Link>
                    </li>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isCardOpen5 && (
            <div onMouseLeave={() => setIsCardOpen5(false)} ref={wrapperRef5} className="flex justify-end left-0 ">
              {/* box before card */}
              <div className='flex-none w-138'></div>
              <div className='flex w-full h-40 rounded-xl bg-gray-50 text-blue-900  shadow-xl pe-10 ps-10 z-40'>
                <div className='flex-1'>
                  <div className='flex w-full '>
                    <h4 className=" font-bold text-[25px] pt-5 pb-2"> PRODUCTION 5 </h4>
                  </div>
                  <div className='border-t border-gray-300 '></div>
                  <div className='grid grid-cols-4 gap-4 scale-z-90 mt-4'>
                    <li>
                      <Link onClick={() => handleCardToggle(5)} href="/pages/skill-Matrix?Param=PRODUCTION5">
                        SKILL MATRIX
                      </Link>
                    </li>
                    <li>
                      <Link onClick={() => handleCardToggle(5)} href="/pages/Organized?Param=PRODUCTION5">
                        ORGANIZED
                      </Link>
                    </li>
                    <li>
                      <Link onClick={() => handleCardToggle(5)} href="/pages/temperature?Param=PRODUCTION5">
                        TEMPERATURE
                      </Link>
                    </li>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isCardOpen6 && (
            <div onMouseLeave={() => setIsCardOpen6(false)} ref={wrapperRef6} className="flex justify-end left-0 ">
              {/* box before card */}
              <div className='flex-none w-138'></div>
              <div className='flex w-full h-40 rounded-xl bg-gray-50 text-blue-900  shadow-xl pe-10 ps-10 z-40'>
                <div className='flex-1'>
                  <div className='flex w-full '>
                    <h4 className=" font-bold text-[25px] pt-5 pb-2"> WAREHOUSE </h4>
                  </div>
                  <div className='border-t border-gray-300 '></div>
                  <div className='grid grid-cols-4 gap-4 scale-z-90 mt-4'>
                    <li>
                      <Link onClick={() => handleCardToggle(6)} href="/pages/skill-Matrix?Param=WAREHOUSE">
                        SKILL MATRIX
                      </Link>
                    </li>
                    <li>
                      <Link onClick={() => handleCardToggle(6)} href="/pages/Organized?Param=WAREHOUSE">
                        ORGANIZED
                      </Link>
                    </li>
                    <li>
                      <Link onClick={() => handleCardToggle(6)} href="/pages/temperature?Param=WAREHOUSE">
                        TEMPERATURE
                      </Link>
                    </li>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isCardOpen7 && (
            <div onMouseLeave={() => setIsCardOpen7(false)} ref={wrapperRef7} className="flex justify-end left-0 ">
              {/* box before card */}
              <div className='flex-none w-138'></div>
              <div className='flex w-full h-40 rounded-xl bg-gray-50 text-blue-900  shadow-xl pe-10 ps-10 z-40'>
                <div className='flex-1'>
                  <div className='flex w-full '>
                    <h4 className=" font-bold text-[25px] pt-5 pb-2"> MAINTENANCE </h4>
                  </div>
                  <div className='border-t border-gray-300 '></div>
                  <div className='grid grid-cols-4 gap-4 scale-z-90 mt-4'>
                    <li>
                      <Link onClick={() => handleCardToggle(7)} href="/pages/skill-Matrix?Param=MAINTENANCE">
                        SKILL MATRIX
                      </Link>
                    </li>
                    <li>
                      <Link onClick={() => handleCardToggle(7)} href="/pages/Organized?Param=MAINTENANCE">
                        ORGANIZED
                      </Link>
                    </li>
                    <li>
                      <Link onClick={() => handleCardToggle(7)} href="/pages/FindingTools">
                        Tooling Finder
                      </Link>
                    </li>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
        <div className='flex w-0'>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={menuOpen ? 'fixed left-0 top-0 w-[25%] h-screen bg-gray-400 p-10 ease-in duration-500' : 'fixed left-[-100%] top-0 p-10 ease-in duration-500'}>
        <div className='flex items-start justify-center'>
          <div className='flex-col '>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Navbar;