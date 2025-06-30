const shelfClass =
    "w-10 sm:w-[50px] lg:w-[60px] h-70 bg-gradient-to-t from-gray-300 via-gray-200 to-gray-100 border-2 border-gray-400 rounded-md relative shadow-md text-[10px] sm:text-xl lg:text-2xl font-semibold text-gray-700 font-sans tracking-wide hover:scale-125 hover:z-50 transition-transform duration-200";

// คลาสสำหรับเสา 1 ต้น
const cornerPostStyle = "w-2 h-2 bg-gradient-to-t from-gray-300 via-gray-200 to-gray-100 border-gray-400 border-2 rounded-full";

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

const Desktop = () => {
    return (
        <>
            <div className="flex justify-center  ms-20">
                <div className="relative w-[180px] h-[40px] bg-gray-200 border-2 border-gray-800 rounded-md shadow-inner">

                    {/* หน้าจอ */}
                    <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[90px] h-[24px] bg-gray-800 rounded-md shadow-md text-white text-[10px] flex items-center justify-center">
                        Monitor
                    </div>

                    {/* เมาส์ */}
                    <div className="absolute top-[25%] left-[145px] w-[16px] h-[24px] bg-gray-500 rounded-full shadow text-white text-[8px] flex items-center justify-center">
                        🖱
                    </div>

                    {/* เสาโต๊ะ (ขาโต๊ะ) */}
                    <div className="absolute bottom-1 left-1 w-2 h-2 bg-gray-700 rounded-full" />
                    <div className="absolute bottom-1 right-1 w-2 h-2 bg-gray-700 rounded-full" />
                    <div className="absolute top-1 left-1 w-2 h-2 bg-gray-700 rounded-full" />
                    <div className="absolute top-1 right-1 w-2 h-2 bg-gray-700 rounded-full" />

                </div>
                 <div className="relative w-[180px] h-[40px] bg-gray-200 border-2 border-gray-800 rounded-md shadow-inner">

                    {/* หน้าจอ */}
                    <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[90px] h-[24px] bg-gray-800 rounded-md shadow-md text-white text-[10px] flex items-center justify-center">
                        Monitor
                    </div>

                    {/* เมาส์ */}
                    <div className="absolute top-[25%] left-[145px] w-[16px] h-[24px] bg-gray-500 rounded-full shadow text-white text-[8px] flex items-center justify-center">
                        🖱
                    </div>

                    {/* เสาโต๊ะ (ขาโต๊ะ) */}
                    <div className="absolute bottom-1 left-1 w-2 h-2 bg-gray-700 rounded-full" />
                    <div className="absolute bottom-1 right-1 w-2 h-2 bg-gray-700 rounded-full" />
                    <div className="absolute top-1 left-1 w-2 h-2 bg-gray-700 rounded-full" />
                    <div className="absolute top-1 right-1 w-2 h-2 bg-gray-700 rounded-full" />

                </div>
            </div>

        </>
    )
}


const StorageRoomLayout = () => {
    return (
        <div className="min-h-screen p-4 sm:p-6 bg-gray-100 flex items-center justify-center">
            <div className="flex flex-col bg-white shadow-md rounded-lg p-4 sm:p-8 h-fit items-center justify-center w-full max-w-screen-xl">
                <h2 className="text-xl text-black font-semibold text-center mb-4">
                    Tooling Finder Function (MAINTENANCE ROOM)
                </h2>

                <div className="relative flex flex-col w-full border border-dashed border-gray-400 rounded-md pt-4 mt-4 bg-gray-50">
                    {/* ประตู */}
                    <div className="absolute -top-4 right-14 lg:right-27">
                        <div className="w-24 h-10 bg-gray-500 text-white flex items-center justify-center rounded-md shadow-inner text-sm">
                            ประตูเข้า
                        </div>
                    </div>

                    <div className="flex justify-center ms-40 p-2">
                       <Desktop /> 
                    </div>



                    {/* ชั้นวาง */}
                    <div className="flex w-full justify-between mt-6 flex-wrap">
                        {/* A */}
                        <div className={shelfClass}>
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
                            <div className="text-gray-700 text-4xl text-center">
                                ↓
                            </div>

                            {/* ทางเดิน */}
                            <div className="w-20 sm:w-[60px] h-40 flex items-center justify-center text-gray-700 font-medium italic border-gray-400 rounded-md">
                                ทางเดิน
                            </div>
                            {/* ลูกศร Unicode */}
                            <div className="text-gray-700 text-4xl text-center">
                                ↓
                            </div>

                        </div>



                        {/* H+I */}
                        <div className={shelfClass}>
                            <div className="absolute top-20 w-full text-center font-semibold text-gray-700">I</div>
                            <CornerPosts />

                            <div className="absolute top-2/4 w-full h-[3px] bg-gray-400" />
                            <div className="absolute bottom-6 w-full text-center font-semibold text-gray-700">H</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center text-center">

                        {/* ลูกศรใหญ่ขึ้น */}
                        <div className="text-gray-700 text-4xl text-center">
                            ←
                        </div>


                        {/* ทางเดินล่าง */}
                        <div className=" w-[50%] h-12 sm:h-16 flex items-center justify-center text-gray-700 font-medium italic border-gray-400 rounded-md">
                            ทางเดิน
                        </div>

                        <div className="text-gray-700 text-4xl text-center">
                            ←
                        </div>

                    </div>

                    {/* เครื่องจักร */}
                    <div className="mt-2 w-full h-[40px] bg-gray-700 text-white border border-gray-900 flex items-center justify-center text-xs font-semibold uppercase tracking-wide">
                        MACHINE
                    </div>
                </div>
            </div>
        </div >
    );
};

export default StorageRoomLayout;
