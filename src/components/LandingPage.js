import React from 'react';
import { ChevronRight, FileText, CheckCircle, DollarSign, Download } from 'lucide-react';

const LandingPage = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-4xl mx-auto">
        <div className="mb-8 transform hover:scale-105 transition-transform duration-500">
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white animate-pulse">
            <FileText className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-6xl font-bold text-emerald-900 mb-6 leading-tight">
            Hệ thống Quản lý<br />Chi phí Tái chế
          </h1>
          <p className="text-2xl text-emerald-700 mb-4 font-medium">
            Định mức chi phí tái chế sản phẩm, bao bì
          </p>
          <p className="text-lg text-emerald-600 max-w-2xl mx-auto mb-12 bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-100">
            Giải pháp toàn diện để khai báo, quản lý và tính toán chi phí tái chế cho doanh nghiệp của bạn
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-emerald-100 transform hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-emerald-900 mb-2">Dễ dàng khai báo</h3>
            <p className="text-emerald-700">Giao diện thân thiện, quy trình đơn giản</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-emerald-100 transform hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-emerald-900 mb-2">Tính toán chính xác</h3>
            <p className="text-emerald-700">Áp dụng đúng định mức chi phí theo quy định</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-emerald-100 transform hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full flex items-center justify-center">
              <Download className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-emerald-900 mb-2">Xuất báo cáo nhanh</h3>
            <p className="text-emerald-700">Tạo file Excel chi tiết chỉ trong một cú click</p>
          </div>
        </div>

        <button
          onClick={onStart}
          className="group bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-emerald-500/50"
        >
          <span className="flex items-center justify-center">
            Bắt đầu ngay
            <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform" />
          </span>
        </button>

        <div className="mt-12 text-emerald-600 text-sm">
          <p>Hỗ trợ đầy đủ các loại bao bì: Giấy, Kim loại, Nhựa, Thủy tinh</p>
          <p className="mt-2">Áp dụng theo Thông tư 02/2022/TT-BTNMT</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
