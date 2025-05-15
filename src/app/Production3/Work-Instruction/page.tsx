'use client';

import React from 'react';

const BasicPage = () => {
    return (
        <div>
            {/* justify-center: จัดให้ทุกไอเท็มอยู่ตรงกลางแนวนอน */}
            <div className="flex justify-center items-center mb-4">
                <div className="w-14 bg-blue-950 p-2">01</div>
                <div className="w-64 bg-green-950 p-2">02</div>
                <div className="w-64 bg-red-950 p-2">03</div>
            </div>

            {/* justify-between: กระจายไอเท็มให้ห่างกัน */}
            <div className="flex justify-between items-center mb-4">
                <div className="w-14 bg-blue-950 p-2">01</div>
                <div className="w-64 bg-green-950 p-2">02</div>
                <div className="w-64 bg-red-950 p-2">03</div>
            </div>

            {/* justify-start: จัดไอเท็มให้เริ่มต้นที่ซ้าย */}
            <div className="flex justify-start items-center mb-4">
                <div className="w-14 bg-blue-950 p-2">01</div>
                <div className="w-64 bg-green-950 p-2">02</div>
                <div className="w-64 bg-red-950 p-2">03</div>
            </div>

            {/* justify-end: จัดไอเท็มให้เริ่มต้นที่ขวา */}
            <div className="flex justify-end items-center mb-4">
                <div className="w-14 bg-blue-950 p-2">01</div>
                <div className="w-64 bg-green-950 p-2">02</div>
                <div className="w-64 bg-red-950 p-2">03</div>
            </div>

            {/* items-center: จัดตำแหน่งแนวตั้งให้ตรงกลาง */}
            <div className="flex justify-center items-center h-32 mb-4">
                <div className="w-14 bg-blue-950 p-2">01</div>
                <div className="w-64 bg-green-950 p-2">02</div>
                <div className="w-64 bg-red-950 p-2">03</div>
            </div>

            {/* items-start: จัดตำแหน่งแนวตั้งให้เริ่มต้นที่บน */}
            <div className="flex justify-center items-start h-32 mb-4">
                <div className="w-14 bg-blue-950 p-2">01</div>
                <div className="w-64 bg-green-950 p-2">02</div>
                <div className="w-64 bg-red-950 p-2">03</div>
            </div>

            {/* items-end: จัดตำแหน่งแนวตั้งให้เริ่มต้นที่ล่าง */}
            <div className="flex justify-center items-end h-32">
                <div className="w-14 bg-blue-950 p-2">01</div>
                <div className="w-64 bg-green-950 p-2">02</div>
                <div className="w-64 bg-red-950 p-2">03</div>
            </div>
        </div>

    );
};

export default BasicPage;
