const StorageRoomLayout = () => {
    return (
        <div className="min-h-screen p-4 sm:p-6 bg-gray-100 flex items-center justify-center">
            <div className="flex flex-col bg-white shadow-md rounded-lg p-4 sm:p-8 h-fit items-center justify-center w-full max-w-screen-xl">
                <h2 className="text-xl text-black font-semibold text-center mb-4">
                    Tooling Finder Function
                </h2>

                {/* กรอบรอบทั้งหมด */}
                <div className="relative flex flex-col w-full border border-dashed border-gray-400 rounded-md pt-4 mt-4">

                    {/* ปุ่มประตูทางเข้า - ซ้อนมุมขวาบน */}
                    <div className="absolute -top-4 right-4 sm:right-42">
                        <div className="w-24 h-10 bg-gray-500 text-white flex items-center justify-center rounded-md shadow-inner text-sm">
                            ประตูเข้า
                        </div>
                    </div>

                    {/* ชั้นวางแนวนอนเรียงกัน */}
                    <div className="flex w-full justify-evenly mt-6">

                        {/* ชั้น A */}
                        <div className="w-20 sm:w-[60px] h-70 bg-gray-400 border-2 border-gray-600 rounded-md relative">
                            <div className="absolute top-2/4 w-full h-[3px] bg-gray-600" />
                            <div className="absolute bottom-4 w-full text-center text-sm font-bold text-white">A</div>
                        </div>
                        <div className="w-20"></div>
                        {/* ชั้น B */}
                        <div className="w-20 sm:w-[60px] h-70 bg-gray-400 border-2 border-gray-600 rounded-md relative">
                            <div className="absolute top-2/4 w-full h-[3px] bg-gray-600" />
                            <div className="absolute bottom-4 w-full text-center text-sm font-bold text-white">B</div>
                        </div>
                        <div className="w-20"></div>
                        {/* ชั้น C */}
                        <div className="w-20 sm:w-[60px] h-70 bg-gray-400 border-2 border-gray-600 rounded-md relative">
                            <div className="absolute top-2/4 w-full h-[3px] bg-gray-600" />
                            <div className="absolute bottom-4 w-full text-center text-sm font-bold text-white">C</div>
                        </div>
                        <div className="w-20"></div>
                        <div className="flex">
                            {/* ชั้น D */}
                            <div className="w-20 sm:w-[60px] h-70 bg-gray-400 border-2 border-gray-600 rounded-md relative">
                                <div className="absolute top-1/3 w-full h-[3px] bg-gray-600" />
                                <div className="absolute top-2/3 w-full h-[3px] bg-gray-600" />
                                <div className="absolute bottom-4 w-full text-center text-sm font-bold text-white">D</div>
                            </div>

                            {/* ชั้น E */}
                            <div className="w-20 sm:w-[60px] h-70 bg-gray-400 border-2 border-gray-600 rounded-md relative">
                                <div className="absolute top-1/3 w-full h-[3px] bg-gray-600" />
                                <div className="absolute top-2/3 w-full h-[3px] bg-gray-600" />
                                <div className="absolute bottom-4 w-full text-center text-sm font-bold text-white">E</div>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-20"></div>
                            {/* ชั้น F */}
                            <div className="w-20 sm:w-[60px] h-70 bg-gray-400 border-2 border-gray-600 rounded-md relative">
                                <div className="absolute top-1/3 w-full h-[3px] bg-gray-600" />
                                <div className="absolute top-2/3 w-full h-[3px] bg-gray-600" />
                                <div className="absolute bottom-4 w-full text-center text-sm font-bold text-white">F</div>
                            </div>

                            {/* ชั้น G */}
                            <div className="w-20 sm:w-[60px] h-70 bg-gray-400 border-2 border-gray-600 rounded-md relative">
                                <div className="absolute bottom-4 w-full text-center text-sm font-bold text-white">G</div>
                            </div>
                        </div>
                        <div className="w-20"></div>
                        {/* พื้นที่ทางเดิน */}
                        <div className="w-20 sm:w-[60px] h-70 flex items-center justify-center text-gray-600 italic border-2 border-dashed border-gray-400 rounded-md">
                            ทางเดิน
                        </div>
                        <div className="w-20"></div>

                        {/* ชั้น H */}
                        <div className="w-20 sm:w-[60px] h-70 bg-gray-400 border-2 border-gray-600 rounded-md relative">
                            <div className="absolute top-6 w-full text-center text-sm font-bold text-white">I</div>
                            <div className="absolute top-2/4 w-full h-[3px] bg-gray-600" />
                            <div className="absolute bottom-6 w-full text-center text-sm font-bold text-white">H</div>
                        </div>
                    </div>

                    {/* ทางเดินด้านล่าง */}
                    <div className="mt-6 w-full h-12 sm:h-15 flex items-center justify-center text-gray-600 italic border-2 border-dashed border-gray-400 rounded-md">
                        ทางเดิน
                    </div>

                    {/* เครื่องจักร */}
                    <div className="mt-2 w-full h-[40px] bg-gray-400 border border-gray-700 flex items-center justify-center text-xs font-semibold text-gray-900 uppercase">
                        MACHINE
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StorageRoomLayout;
