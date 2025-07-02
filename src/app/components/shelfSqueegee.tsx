"use client";

import React from "react";

const ShelfWithJigs: React.FC = () => {
    return (
        <>
            <div className=" bg-gradient-to-r from-gray-200 to-white border border-gray-400 p-4 rounded-lg shadow-2xl">

                <div className="flex flex-col gap-2 w-100">


                    <div
                        className="w-full h-35  bg-white border border-gray-400 rounded-md shadow-inner flex items-center justify-center text-gray-800 font-semibold gap-2"
                    >
                        <div className="relative w-[120px] h-[70px] border-gray-600 rounded-sm">

                         
                        </div>
                    
                    </div>


                    <div

                        className="w-full h-35 bg-white border border-gray-400 rounded-md shadow-inner flex items-center justify-center text-gray-800 font-semibold gap-2"
                    >
                      

                    </div>
                    <div

                        className="w-full h-35 bg-white border border-gray-400 rounded-md shadow-inner flex items-center justify-center text-gray-800 font-semibold gap-2"
                    >
                     
                    </div>

                </div>

            </div>
            {/* ขา/ล้อชั้นวาง */}
            < div className="flex justify-between w-full px-8 mb-5" >
                <div className="w-4 h-4 bg-gray-700 rounded-full shadow-md" />
                <div className="w-4 h-4 bg-gray-700 rounded-full shadow-md" />
            </div >

        </>

    );
};

export default ShelfWithJigs;
