import React from 'react';
import { X, Download } from 'lucide-react';
import { formatCurrency, calculateSubItemCost, getTotalSubItemsCount, getTotalCost } from '../utils/calculations';
import { exportToExcel, exportEPRFormat } from '../utils/excelExport';

const SummaryModal = ({
  mainProducts,
  subItems,
  onClose
}) => {
  const handleExportRecycling = () => {
    exportToExcel(mainProducts, subItems);
    alert('Đã gửi thành công! Cảm ơn bạn đã quan tâm đến môi trường.');
    onClose();
  };

  const handleExportEPR = () => {
    exportEPRFormat(mainProducts, subItems);
    alert('Đã xuất báo cáo kê khai EPR thành công!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-emerald-200">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-3xl font-bold text-emerald-900">Bảng tổng hợp chi phí tái chế</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {getTotalSubItemsCount(subItems) === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-emerald-600 text-lg">Chưa có bao bì nào được khai báo</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-600 to-green-700 text-white">
                    <th className="text-left p-4 font-bold">Tên sản phẩm</th>
                    <th className="text-center p-4 font-bold">Đơn vị</th>
                    <th className="text-right p-4 font-bold">Doanh thu</th>
                    <th className="text-center p-4 font-bold">Số lượng</th>
                    <th className="text-left p-4 font-bold">Tên bao bì</th>
                    <th className="text-center p-4 font-bold">Loại bao bì</th>
                    <th className="text-center p-4 font-bold">Quy cách</th>
                    <th className="text-center p-4 font-bold">Khối lượng (kg)</th>
                    <th className="text-right p-4 font-bold">Đơn giá</th>
                    <th className="text-right p-4 font-bold">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {mainProducts.map((mainProduct, mainIndex) => (
                    subItems[mainIndex] && subItems[mainIndex].map((subItem, subIndex) => (
                      <tr key={`${mainIndex}-${subIndex}`} className={`${subIndex % 2 === 0 ? 'bg-emerald-50/50' : 'bg-white'} hover:bg-emerald-100/50 transition-colors`}>
                        <td className="p-4 border-b border-emerald-100 font-semibold text-emerald-900">{mainProduct.productName}</td>
                        <td className="text-center p-4 border-b border-emerald-100">
                          <span className="inline-block bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-sm font-medium">
                            {mainProduct.unit}
                          </span>
                        </td>
                        <td className="text-right p-4 border-b border-emerald-100 text-emerald-700 font-medium">
                          {mainProduct.domesticRevenue ? formatCurrency(mainProduct.domesticRevenue) : '-'}
                        </td>
                        <td className="text-center p-4 border-b border-emerald-100">
                          <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-semibold">
                            {mainProduct.quantity}
                          </span>
                        </td>
                        <td className="p-4 border-b border-emerald-100">
                          <div>
                            <p className="font-semibold text-emerald-900">{subItem.productName}</p>
                            <p className="text-sm text-emerald-600 mt-1">{subItem.catalogItem.name.replace('-', '. ')}</p>
                          </div>
                        </td>
                        <td className="text-center p-4 border-b border-emerald-100">
                          <span className="inline-block bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-sm font-medium">
                            {subItem.packagingType === 'direct' ? 'Bao bì trực tiếp' : 'Bao bì ngoài'}
                          </span>
                        </td>
                        <td className="text-center p-4 border-b border-emerald-100">
                          <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-semibold">
                            {subItem.specification || '-'}
                          </span>
                        </td>
                        <td className="text-center p-4 border-b border-emerald-100">
                          <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                            {subItem.weight} kg
                          </span>
                        </td>
                        <td className="text-right p-4 border-b border-emerald-100 text-emerald-700 font-medium">
                          {formatCurrency(subItem.catalogItem.pricing.totalCost)}
                        </td>
                        <td className="text-right p-4 border-b border-emerald-100 font-bold text-emerald-900">
                          {formatCurrency(calculateSubItemCost(mainProduct, subItem))}
                        </td>
                      </tr>
                    ))
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gradient-to-r from-emerald-600 to-green-700 rounded-xl p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xl font-bold mb-2">TỔNG CHI PHÍ TÁI CHẾ</h4>
                  <p className="text-emerald-100">Tổng cộng {getTotalSubItemsCount(subItems)} bao bì</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">
                    {formatCurrency(getTotalCost(mainProducts, subItems))}
                  </p>
                  <p className="text-emerald-200 text-sm mt-1">VND</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={handleExportRecycling}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center"
              >
                <Download className="w-6 h-6 mr-3" />
                Gửi báo cáo tái chế
              </button>

              <button
                onClick={handleExportEPR}
                className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center"
              >
                <Download className="w-6 h-6 mr-3" />
                Gửi báo cáo kê khai EPR
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SummaryModal;
