"use client";

import React, { useState } from "react";

type ToolingData = {
    sheftname: string;
    slot: string;
    toolingname: string;
    side: string;
    status: string;
};

type Props = {
    data: ToolingData[];
    onClose: () => void;
    onRowClick: (item: ToolingData) => void; // เพิ่ม prop
};


const ITEMS_PER_PAGE = 18;

const FloatingTable: React.FC<Props> = ({ data, onClose, onRowClick }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    // const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
    // const currentData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const filteredData = data.filter(item => item.status != null);
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const currentData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);


    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-white w-full max-w-6xl max-h-[95vh] rounded-xl shadow-2xl overflow-hidden border border-gray-300 relative">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-lg font-bold p-4 sticky top-0 z-10 flex justify-between items-center">
                    <span>รายการ Tooling</span>
                    <button onClick={onClose} className="text-white hover:text-red-300 text-2xl font-light">
                        ✕
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-auto max-h-[calc(95vh-120px)]">
                    <table className="w-full text-sm text-left text-gray-800">
                        <thead className="bg-gray-100 sticky top-0 z-10 border-b text-gray-700">
                            <tr>
                                <th className="px-4 py-2 font-semibold">Shelf</th>
                                <th className="px-4 py-2 font-semibold">Slot</th>
                                <th className="px-4 py-2 font-semibold">Tooling</th>
                                <th className="px-4 py-2 font-semibold">Side</th>
                                <th className="px-4 py-2 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((item, idx) => (
                                <tr
                                    key={idx}
                                    onClick={() => onRowClick(item)}
                                    className="border-b hover:bg-blue-100 cursor-pointer transition"
                                >
                                    <td className="px-4 py-2">{item.sheftname || "ไม่ระบุ"}</td>
                                    <td className="px-4 py-2">{item.slot || "ไม่ระบุ"}</td>
                                    <td className="px-4 py-2">{item.toolingname || "ไม่ระบุ"}</td>
                                    <td className="px-4 py-2">{item.side || "ไม่ระบุ"}</td>
                                    <td className="px-4 py-2">{item.status || "ไม่ระบุ"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center px-4 py-2 bg-gray-50 border-t text-black">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 text-sm border rounded disabled:opacity-50"
                    >
                        ◀ ย้อนกลับ
                    </button>
                    <span className="text-sm">
                        หน้า {currentPage} จาก {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 text-sm border rounded disabled:opacity-50"
                    >
                        ถัดไป ▶
                    </button>
                </div>
            </div>
        </div>

    );
};

export default FloatingTable;
