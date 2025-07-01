"use client";

import React, { useState } from 'react';
import Toast from '../../components/Toast'; // เปลี่ยน path ตามจริง



const shelfClass =
    "w-10 sm:w-[50px] lg:w-[60px] h-70 bg-gradient-to-t from-gray-300 via-gray-200 to-gray-100 border-2 border-gray-400 rounded-md relative shadow-md text-[10px] sm:text-xl lg:text-2xl font-semibold text-gray-700 font-sans tracking-wide hover:scale-125 hover:z-50 transition-transform duration-200";


const shelfClass2 =
    "w-10 sm:w-[50px] lg:w-[60px] h-35 bg-gradient-to-t from-gray-300 via-gray-200 to-gray-100 border-2 border-gray-400 rounded-md relative shadow-md text-[10px] sm:text-xl lg:text-2xl font-semibold text-gray-700 font-sans tracking-wide hover:scale-125 hover:z-50 transition-transform duration-200";

// คลาสสำหรับเสา 1 ต้น
const cornerPostStyle = "w-2 h-2 bg-gradient-to-t z-0 from-gray-300 via-gray-200 to-gray-100 border-gray-400 border-2 rounded-full";

// เสามุม 4 ด้านของ shelf
const CornerPosts = () => {
    return (
        <>
            <div className={`absolute -top-1 -left-1 ${cornerPostStyle}`} />
            <div className={`absolute -top-1 -right-1 ${cornerPostStyle}`} />
            <div className={`absolute -bottom-1 -left-1 ${cornerPostStyle}`} />
            <div className={`absolute -bottom-1 -right-1 ${cornerPostStyle}`} />
        </>
    );
};

const Cornerwashing = () => {
    return (
        <>
            <div className="relative h-[45px] border-2 bg-emerald-100 rounded-md shadow-inner">
                {/* หน้าจอ */}
                {/* หน้าจอ */}
                <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[90px] h-[24px]  rounded-md text-black flex flex-col items-center justify-center">

                    <span>Handwashing</span>
                    <span>station</span>
                </div>

            </div>
        </>
    )
}

const VisualCheckStencil = () => {
    return (
        <>
            <div className="relative  h-[45px] bg-emerald-100 border-2 rounded-md shadow-inner">
                {/* หน้าจอ */}
                <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[90px] h-[24px]  rounded-md text-black flex flex-col items-center justify-center">

                    <span>Visual Check</span>
                    <span>Stencil</span>
                </div>



            </div>
        </>
    )
}



const StenCleaning = () => {
    return (
        <>
            <div className="relative  h-[45px] bg-emerald-100 border-2  rounded-md shadow-inner">
                {/* หน้าจอ */}
                <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[90px] h-[24px]  rounded-md text-black text-[12px] flex flex-col items-center justify-center">

                    <span>Stencil Cleaning</span>
                    <span>station 1</span>
                </div>



            </div>
        </>
    )
}
const StenCleaning2 = () => {
    return (
        <>
            <div className="relative 80px] h-[45px] bg-emerald-100 border-2 rounded-md shadow-inner">
                {/* หน้าจอ */}
                <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[90px] h-[24px]  rounded-md text-black text-[12px] flex flex-col items-center justify-center">

                    <span>Stencil Cleaning</span>
                    <span>station 2</span>
                </div>



            </div>
        </>
    )
}

const SAWAClean1 = () => {
    return (
        <>
            <div className="relative  h-[45px] bg-emerald-100 border-2 rounded-md shadow-inner">
                {/* หน้าจอ */}
                <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[90px] h-[24px] rounded-md text-black flex flex-col items-center justify-center text-center leading-tight">
                    <span>SAWA</span>
                    <span>Clean 1</span>
                </div>


            </div>
        </>
    )
}

const SAWAClean2 = () => {
    return (
        <>
            <div className="relative  h-[45px] bg-emerald-100 border-2 rounded-md shadow-inner">
                <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[90px] h-[24px] rounded-md text-black flex flex-col items-center justify-center text-center leading-tight">
                    <span>SAWA</span>
                    <span>Clean 2</span>
                </div>



            </div>
        </>
    )
}


const Desktop = () => {
    return (
        <>

            <div className="relative w-[180px] h-[40px] bg-cyan-100 border-2 border-blue-900 rounded-md shadow-inner">
                {/* หน้าจอ */}
                <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[90px] h-[24px] bg-sky-700 rounded-md shadow-md text-white text-[10px] flex items-center justify-center">
                    Monitor
                </div>

                {/* เมาส์ */}
                <div className="absolute top-[25%] left-[145px] w-[16px] h-[24px] bg-blue-900 rounded-full shadow text-white text-[8px] flex items-center justify-center">
                    🖱
                </div>


            </div>

            <div className="relative w-[180px] h-[40px] bg-cyan-100 border-2 border-blue-900 rounded-md shadow-inner">
                {/* หน้าจอ */}
                <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[90px] h-[24px] bg-sky-700 rounded-md shadow-md text-white text-[10px] flex items-center justify-center">
                    Monitor
                </div>

                {/* เมาส์ */}
                <div className="absolute top-[25%] left-[145px] w-[16px] h-[24px] bg-blue-900 rounded-full shadow text-white text-[8px] flex items-center justify-center">
                    🖱
                </div>


            </div>



        </>
    )
}

const Desklab = () => {
    return (
        <>

            <div className="relative  h-[45px] bg-emerald-100 border-2 rounded-md shadow-inner">
                {/* หน้าจอ */}
                <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[90px] h-[24px] rounded-md text-black flex flex-col items-center justify-center text-center leading-tight">
                    <span>Nozzle Cleaning</span>
                </div>


            </div>

        </>
    )
}





const StorageRoomLayout = () => {
    const [toastVisible, setToastVisible] = useState(false);

    const showToast = () => {
        setToastVisible(true);
    };


    return (
        <div className="min-h-screen p-4 sm:p-6 bg-gray-100 flex items-center justify-center">
            <div className="flex flex-col bg-white shadow-md rounded-lg p-4 sm:p-8 h-fit items-center justify-center w-full max-w-screen-xl">
                <h2 className="text-xl text-blue-900 font-semibold text-center mb-4">
                    Tooling Finder Function (MAINTENANCE ROOM)
                </h2>

                <div className="relative flex flex-col w-full border border-dashed border-blue-800 rounded-md pt-4 mt-4 bg-gray-50">
                    {/* ประตู */}
                    <div className="absolute -top-4 right-14 lg:right-27">
                        <div className="w-24 h-10 bg-blue-900 text-white flex items-center justify-center rounded-md shadow-inner text-sm">
                            ประตูเข้า
                        </div>

                    </div>

                    <div className="flex justify-center ms-40 p-2">
                        <Desktop />
                    </div>



                    {/* ชั้นวาง */}
                    <div className="flex w-full justify-between mt-6 flex-wrap">
                        {/* A */}
                        <div className={shelfClass} onClick={showToast}>
                            {/* เส้นตรงกลาง */}
                            <div className="absolute top-2/4 w-full h-[3px] bg-gray-400" />

                            {/* ตัวอักษรชื่อชั้น */}
                            <div className="absolute bottom-4 w-full text-center font-semibold text-gray-700">A</div>

                            {/* เสา */}
                            <CornerPosts />


                        </div>

                        <div className="w-5" />

                        {/* B */}
                        <div className={shelfClass}>
                            <div className="absolute top-2/4 w-full h-[3px] bg-gray-400" />
                            <div className="absolute bottom-4 w-full text-center font-semibold text-gray-700">B</div>
                            <CornerPosts />

                        </div>
                        <div className="w-5" />

                        {/* C */}
                        <div className={shelfClass}>
                            <div className="absolute top-2/4 w-full h-[3px] bg-gray-400" />
                            <div className="absolute bottom-4 w-full text-center font-semibold text-gray-700">C</div>
                            <CornerPosts />

                        </div>
                        <div className="w-5" />

                        {/* D + E */}
                        <div className="flex">
                            <div className={shelfClass}>
                                <div className="absolute top-1/3 w-full h-[3px] bg-gray-400" />
                                <div className="absolute top-2/3 w-full h-[3px] bg-gray-400" />
                                <div className="absolute bottom-4 w-full text-center font-semibold text-gray-700">D</div>
                                <CornerPosts />

                            </div>
                            <div className={shelfClass}>
                                <div className="absolute top-1/3 w-full h-[3px] bg-gray-400" />
                                <div className="absolute top-2/3 w-full h-[3px] bg-gray-400" />
                                <div className="absolute bottom-4 w-full text-center font-semibold text-gray-700">E</div>
                                <CornerPosts />

                            </div>
                        </div>

                        {/* F + G */}
                        <div className="flex">
                            <div className={shelfClass}>
                                <div className="absolute top-1/3 w-full h-[3px] bg-gray-400" />
                                <div className="absolute top-2/3 w-full h-[3px] bg-gray-400" />
                                <div className="absolute bottom-4 w-full text-center font-semibold text-gray-700">F</div>
                                <CornerPosts />

                            </div>
                            <div className={shelfClass}>
                                <div className="absolute bottom-4 w-full text-center font-semibold text-gray-700">G</div>
                                <CornerPosts />

                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            {/* ลูกศร Unicode */}
                            <div className="text-sky-700 text-4xl text-center">
                                ↓
                            </div>

                            {/* ทางเดิน */}
                            <div className="w-20 sm:w-[60px] h-40 flex items-center justify-center text-gray-700 font-medium italic border-gray-400 rounded-md">
                                ทางเดิน
                            </div>
                            {/* ลูกศร Unicode */}
                            <div className="text-sky-700 text-4xl text-center">
                                ↓
                            </div>

                        </div>




                        {/* H+I */}
                        <div className="flex flex-col items-center justify-center gap-1">
                            {/* I */}
                            <div className={`${shelfClass2} flex items-center justify-center relative`}>
                                I
                                <CornerPosts />
                            </div>

                            {/* H */}
                            <div className={`${shelfClass2} flex items-center justify-center relative`}>
                                H
                                <CornerPosts />
                            </div>
                        </div>


                    </div>
                    <div className="flex items-center justify-center text-center">

                        {/* ลูกศรใหญ่ขึ้น */}
                        <div className="text-sky-700 text-4xl text-center">
                            ←
                        </div>


                        {/* ทางเดินล่าง */}
                        <div className=" w-[50%] h-12 sm:h-16 flex items-center justify-center text-gray-700 font-medium italic border-gray-400 rounded-md">
                            ทางเดิน
                        </div>

                        <div className="text-sky-700 text-4xl text-center">
                            ←
                        </div>

                    </div>
                    <div className="grid grid-cols-7 gap-4 text-[13px] font-kanit ">

                        <Desklab />
                        <VisualCheckStencil />
                        <SAWAClean2 />
                        <StenCleaning2 />
                        <SAWAClean1 />
                        <StenCleaning />
                        <Cornerwashing />

                    </div>


                    {toastVisible && (
                        <Toast
                            message="บันทึกข้อมูลสำเร็จ!"
                            onClose={() => setToastVisible(false)}
                        />
                    )}

                </div>
            </div>
        </div >
    );
};

export default StorageRoomLayout;
