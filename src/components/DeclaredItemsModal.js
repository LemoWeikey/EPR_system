import React from 'react';
import { X } from 'lucide-react';
import { formatCurrency, calculateSubItemCost, getTotalSubItemsCount } from '../utils/calculations';

const DeclaredItemsModal = ({
  mainProducts,
  subItems,
  onClose,
  onDeleteSubItem
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-emerald-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-emerald-900">Danh sách đã khai báo</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {getTotalSubItemsCount(subItems) === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌱</div>
            <p className="text-emerald-600 text-lg">Chưa có bao bì nào được khai báo</p>
          </div>
        ) : (
          <div className="space-y-6">
            {mainProducts.map((mainProduct, mainIndex) => (
              subItems[mainIndex] && subItems[mainIndex].length > 0 && (
                <div key={mainIndex} className="border border-emerald-200 rounded-lg p-4 bg-emerald-50/30">
                  <h4 className="text-xl font-bold text-emerald-900 mb-4">{mainProduct.productName}</h4>
                  <div className="bg-white rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-emerald-50 to-green-50">
                          <th className="text-left p-3 text-emerald-800 font-semibold border border-emerald-200">Tên bao bì</th>
                          <th className="text-center p-3 text-emerald-800 font-semibold border border-emerald-200">Loại</th>
                          <th className="text-center p-3 text-emerald-800 font-semibold border border-emerald-200">Quy cách</th>
                          <th className="text-center p-3 text-emerald-800 font-semibold border border-emerald-200">Khối lượng (kg)</th>
                          <th className="text-right p-3 text-emerald-800 font-semibold border border-emerald-200">Thành tiền</th>
                          <th className="text-center p-3 text-emerald-800 font-semibold border border-emerald-200">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subItems[mainIndex].map((subItem, subIndex) => (
                          <tr key={subIndex} className="hover:bg-emerald-50/50 transition-colors">
                            <td className="p-3 border border-emerald-100">
                              <div>
                                <p className="font-medium text-emerald-900">{subItem.productName}</p>
                                <p className="text-sm text-emerald-600">{subItem.catalogItem.name.replace('-', '. ')}</p>
                              </div>
                            </td>
                            <td className="text-center p-3 border border-emerald-100 text-emerald-700 text-sm">
                              {subItem.packagingType === 'direct' ? 'Bao bì trực tiếp' : 'Bao bì ngoài'}
                            </td>
                            <td className="text-center p-3 border border-emerald-100 font-semibold text-emerald-800">
                              {subItem.specification || '-'}
                            </td>
                            <td className="text-center p-3 border border-emerald-100 font-semibold text-emerald-800">
                              {subItem.weight} kg
                            </td>
                            <td className="text-right p-3 border border-emerald-100 font-bold text-emerald-900">
                              {formatCurrency(calculateSubItemCost(mainProduct, subItem))}
                            </td>
                            <td className="text-center p-3 border border-emerald-100">
                              <button
                                onClick={() => onDeleteSubItem(mainIndex, subIndex)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeclaredItemsModal;
