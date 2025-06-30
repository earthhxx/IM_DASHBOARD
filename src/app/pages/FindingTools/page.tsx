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


const StorageRoomLayout = () => {
    return (
        <div className="min-h-screen p-4 sm:p-6 bg-gray-100 flex items-center justify-center">
            <div className="flex flex-col bg-white shadow-md rounded-lg p-4 sm:p-8 h-fit items-center justify-center w-full max-w-screen-xl">
                <h2 className="text-xl text-black font-semibold text-center mb-4">
                    Tooling Finder Function
                </h2>

                <div className="relative flex flex-col w-full border border-dashed border-gray-400 rounded-md pt-4 mt-4 bg-gray-50">
                    {/* ประตู */}
                    <div className="absolute -top-4 right-14 lg:right-27">
                        <div className="w-24 h-10 bg-gray-500 text-white flex items-center justify-center rounded-md shadow-inner text-sm">
                            ประตูเข้า
                        </div>
                    </div>

                    {/* ชั้นวาง */}
                    <div className="flex w-full justify-between mt-6 flex-wrap">
                        {/* A */}
                        <div className={shelfClass}>
                            {/* เส้นตรงกลาง */}
                            <div className="absolute top-2/4 w-full h-[3px] bg-gray-400" />
                            {/* ตัวอักษร */}
                            <div className="absolute bottom-4 w-full text-center font-semibold text-gray-700">A</div>

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

                        {/* ทางเดิน */}
                        <div className="w-20 sm:w-[60px] h-70 flex items-center justify-center text-gray-700 font-medium italic border-gray-400 rounded-md">
                            ทางเดิน
                        </div>

                        {/* H+I */}
                        <div className={shelfClass}>
                            <div className="absolute top-20 w-full text-center font-semibold text-gray-700">I</div>
                            <CornerPosts />
                            <div className="absolute top-2/4 w-full h-[3px] bg-gray-400" />
                            <div className="absolute bottom-6 w-full text-center font-semibold text-gray-700">H</div>
                        </div>
                    </div>

                    {/* ทางเดินล่าง */}
                    <div className="mt-6 w-full h-12 sm:h-16 flex items-center justify-center text-gray-700 font-medium italic border-gray-400 rounded-md">
                        ทางเดิน
                    </div>

                    {/* เครื่องจักร */}
                    <div className="mt-2 w-full h-[40px] bg-gray-700 text-white border border-gray-900 flex items-center justify-center text-xs font-semibold uppercase tracking-wide">
                        MACHINE
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StorageRoomLayout;
