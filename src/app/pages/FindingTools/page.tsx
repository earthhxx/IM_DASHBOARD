const StorageRoomLayout = () => {
    return (
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
            <div className="flex flex-col bg-white shadow-md rounded-lg p-8 h-fit items-center justify-center ">
                <h2 className="text-xl text-black font-semibold text-center mb-4">Tooling Finder Function</h2>

                {/* ชั้นวางแนวนอนเรียงกัน */}
                <div className="flex w-full h-fit items-end flex-wrap justify-center">
                    {/* ชั้น A */}
                    <div className="m-2 w-15 h-40 bg-gray-400 border-2 border-gray-600 rounded-md relative">
                        <div className="absolute top-2/4 w-full h-[3px] bg-gray-600" />
                        <div className="absolute bottom-1 text-center w-full text-sm font-bold text-white">
                            ชั้น A
                        </div>
                    </div>

                    {/* ชั้น B */}
                    <div className="m-2 w-15 h-40 bg-gray-400 border-2 border-gray-600 rounded-md relative">
                        <div className="absolute top-2/4 w-full h-[3px] bg-gray-600" />
                        <div className="absolute bottom-1 text-center w-full text-sm font-bold text-white">
                            ชั้น B
                        </div>
                    </div>

                    {/* ชั้น C */}
                    <div className="m-2 w-15 h-40 bg-gray-400 border-2 border-gray-600 rounded-md relative">
                        <div className="absolute top-2/4 w-full h-[3px] bg-gray-600" />
                        <div className="absolute bottom-1 text-center w-full text-sm font-bold text-white">
                            ชั้น C
                        </div>
                    </div>

                    {/* ชั้น D */}
                    <div className="ms-2 mt-2 mb-2 w-15 h-40 bg-gray-400 border-2 border-gray-600 rounded-md relative">
                        <div className="absolute top-1/3 w-full h-[3px] bg-gray-600" />
                        <div className="absolute top-2/3 w-full h-[3px] bg-gray-600" />
                        <div className="absolute bottom-1 text-center w-full text-sm font-bold text-white">
                            ชั้น D
                        </div>
                    </div>

                    {/* ชั้น E */}
                    <div className="me-2 mt-2 mb-2 w-15 h-40 bg-gray-400 border-2 border-gray-600 rounded-md relative">
                        <div className="absolute top-1/3 w-full h-[3px] bg-gray-600" />
                        <div className="absolute top-2/3 w-full h-[3px] bg-gray-600" />
                        <div className="absolute bottom-1 text-center w-full text-sm font-bold text-white">
                            ชั้น E
                        </div>
                    </div>

                    {/* ชั้น F */}
                    <div className="ms-2 mt-2 mb-2 w-15 h-40 bg-gray-400 border-2 border-gray-600 rounded-md relative">
                        <div className="absolute top-1/3 w-full h-[3px] bg-gray-600" />
                        <div className="absolute top-2/3 w-full h-[3px] bg-gray-600" />
                        <div className="absolute bottom-1 text-center w-full text-sm font-bold text-white">
                            ชั้น F
                        </div>
                    </div>

                    {/* ชั้น G */}
                    <div className="me-2 mt-2 mb-2 w-15 h-40 bg-gray-400 border-2 border-gray-600 rounded-md relative">
                        <div className="absolute bottom-1 text-center w-full text-sm font-bold text-white">
                            ชั้น G
                        </div>
                    </div>

                    {/* พื้นที่ทางเดิน (คั่นระหว่าง G และ H) */}
                    <div className="m-2 w-15 h-40 flex items-center justify-center text-gray-600 italic border-2 border-dashed border-gray-400 rounded-md">
                        ทางเดิน
                    </div>

                    {/* ชั้น H */}
                    <div className="m-2 w-15 h-40 bg-gray-400 border-2 border-gray-600 rounded-md relative">
                        <div className="absolute top-6 text-center w-full text-sm font-bold text-white">
                            ชั้น I
                        </div>
                        <div className="absolute top-2/4 w-full h-[3px] bg-gray-600" />
                        <div className="absolute bottom-6 text-center w-full text-sm font-bold text-white">
                            ชั้น H
                        </div>
                    </div>
                </div>

                {/* ทางเดินด้านล่าง (คงไว้เหมือนเดิม) */}
                <div className="mt-6 w-full h-15 flex items-center justify-center text-gray-600 italic border-2 border-dashed border-gray-400 rounded-md">
                    ทางเดิน
                </div>
            </div>
        </div>
    );
};

export default StorageRoomLayout;
