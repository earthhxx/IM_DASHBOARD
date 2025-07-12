"use client";
import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Link from 'next/link';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const buttonRefdestop = useRef<HTMLButtonElement | null>(null);
  const wrapperRefMenu = useRef<HTMLDivElement | null>(null);

  // card refs...
  const wrapperRef1 = useRef<HTMLDivElement | null>(null);
  const wrapperRef2 = useRef<HTMLDivElement | null>(null);
  const wrapperRef3 = useRef<HTMLDivElement | null>(null);
  const wrapperRef4 = useRef<HTMLDivElement | null>(null);
  const wrapperRef5 = useRef<HTMLDivElement | null>(null);
  const wrapperRef6 = useRef<HTMLDivElement | null>(null);
  const wrapperRef7 = useRef<HTMLDivElement | null>(null);
  const wrapperRef8 = useRef<HTMLDivElement | null>(null);

  // state
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

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    const menu = wrapperRefMenu.current;
    const button = buttonRef.current;
    const buttondestop = buttonRefdestop.current;

    if (wrapperRef1.current && !wrapperRef1.current.contains(event.target as Node)) {
      setIsCardOpen1(false);
    }
    if (wrapperRef2.current && !wrapperRef2.current.contains(event.target as Node)) {
      setIsCardOpen2(false);
    }
    if (wrapperRef3.current && !wrapperRef3.current.contains(event.target as Node)) {
      setIsCardOpen3(false);
    }
    if (wrapperRef4.current && !wrapperRef4.current.contains(event.target as Node)) {
      setIsCardOpen4(false);
    }
    if (wrapperRef5.current && !wrapperRef5.current.contains(event.target as Node)) {
      setIsCardOpen5(false);
    }
    if (wrapperRef6.current && !wrapperRef6.current.contains(event.target as Node)) {
      setIsCardOpen6(false);
    }
    if (wrapperRef7.current && !wrapperRef7.current.contains(event.target as Node)) {
      setIsCardOpen7(false);
    }
    if (wrapperRef8.current && !wrapperRef8.current.contains(event.target as Node)) {
      setIsCardOpen8(false);
    }

    if (
      menuOpen &&
      menu &&
      !menu.contains(event.target as Node) &&
      button &&
      !button.contains(event.target as Node) &&
      buttondestop &&
      !buttondestop.contains(event.target as Node)
    ) {
      setMenuOpen(false);
    }
  };

  // ✅ useEffect ต้องอยู่ **ภายใน** ฟังก์ชัน component
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [menuOpen]);



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

                <button
                  ref={
                    buttonRefdestop
                  }
                  onClick={handleMenuToggle}
                  className='cursor-pointer rounded-full bg-slate-800 flex items-center justify-center'
                  style={{ width: '30px', height: '30px' }}
                >
                  <AiOutlineMenu style={{ width: '10px', height: '10px' }} color="white" />
                </button>

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

      <div>
        {/* Fixed Hamburger Button for Mobile */}
        <button
          ref={buttonRef}
          onClick={handleMenuToggle}
          className="fixed top-5 right-5 z-50 xl:hidden bg-blue-900 p-3 rounded-md text-white shadow-lg hover:bg-blue-700 transition-colors duration-300"
          aria-label="Open Mobile Menu"
        >
          <AiOutlineMenu size={24} />
        </button>

        {/* Mobile Menu */}
        <div
          ref={wrapperRefMenu}
          className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 p-6 ease-in duration-500 overflow-y-auto shadow-lg
    ${menuOpen ? "translate-x-0" : "-translate-x-full"} w-full md:w-[30%] transform transition-transform`}
        >

          <div className="flex flex-col space-y-8 text-blue-900 font-sans">

            {/* Navigation Buttons */}
            <nav className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-4 mt-4 border-b border-blue-300 pb-6">
              {[
                { name: "PRODUCTION 1", href: "/pages/skill-Matrix?Param=PRODUCTION1" },
                { name: "PRODUCTION 2", href: "/pages/skill-Matrix?Param=PRODUCTION2" },
                { name: "PRODUCTION 3", href: "/pages/skill-Matrix?Param=PRODUCTION3" },
                { name: "PRODUCTION 4", href: "/pages/skill-Matrix?Param=PRODUCTION4" },
                { name: "PRODUCTION 5", href: "/pages/skill-Matrix?Param=PRODUCTION5" },
                { name: "WAREHOUSE", href: "/pages/skill-Matrix?Param=WAREHOUSE" },
                { name: "MAINTENANCE", href: "/pages/skill-Matrix?Param=MAINTENANCE" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleMenuToggle}
                  className="uppercase font-semibold text-lg hover:underline hover:text-blue-700 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Images */}
            <div className="flex flex-col xl:flex-row space-y-4 xl:space-y-0 xl:space-x-4 justify-center ">
              <img
                src="/images/tai_img1.jpg"
                alt="Sample 1"
                className="w-full xl:w-1/2 rounded-lg shadow-md object-cover max-h-48"
              />
              <img
                src="/images/tai_img2.jpg"
                alt="Sample 2"
                className="w-full xl:w-1/2 rounded-lg shadow-md object-cover max-h-48"
              />
            </div>

            {/* Location & Contact Info */}
            <div className="bg-white rounded-xl p-5 shadow-md text-sm leading-relaxed">
              <h3 className="text-xl font-bold mb-3 border-b border-blue-300 pb-2">Location</h3>
              <p className="mb-4">
                879 Moo 2 Bangpoo North Industrial Estate<br />
                T.Praksa Mai, MuangSamutprakarn<br />
                Samutprakarn Thailand 10280
              </p>

              <h3 className="text-xl font-bold mb-3 border-b border-blue-300 pb-2">Established</h3>
              <p className="mb-4">March 2011</p>

              <h3 className="text-xl font-bold mb-3 border-b border-blue-300 pb-2">Phone</h3>
              <p className="">(66) 02-1307921</p>
              <p className="mb-4">(66) 02-1307922</p>
            </div>
          </div>
        </div>
      </div>



    </div>

  );
};

export default Navbar;

