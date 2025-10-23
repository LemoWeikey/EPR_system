import React from 'react';
import { Plus, CheckCircle, Send, X, FileText, Edit } from 'lucide-react';
import { recyclingData } from '../data/recyclingData';
import { formatCurrency, getTotalSubItemsCount } from '../utils/calculations';

const HomePage = ({
  mainProducts,
  subItems,
  animationClass,
  onOpenMainProductForm,
  onShowDeclaredItems,
  onShowSummary,
  onDeleteMainProduct,
  onOpenCatalog,
  onEditMainProduct
}) => {
  return (
    <div className={`space-y-6 ${animationClass}`}>
      <div className="text-center mb-12">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
          <FileText className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-emerald-900 mb-4">{recyclingData.title}</h1>
        <p className="text-emerald-700 max-w-2xl mx-auto text-lg font-medium bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-emerald-100">
          Khám phá định mức chi phí tái chế cho các loại sản phẩm và bao bì khác nhau
        </p>

        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={onOpenMainProductForm}
            className="flex items-center bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="w-5 h-5 mr-2" />
            Khai báo
          </button>

          <button
            onClick={onShowDeclaredItems}
            className="flex items-center bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Kiểm tra đã khai báo ({getTotalSubItemsCount(subItems)})
          </button>

          <button
            onClick={onShowSummary}
            disabled={getTotalSubItemsCount(subItems) === 0}
            className={`flex items-center px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 ${getTotalSubItemsCount(subItems) > 0
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            <Send className="w-5 h-5 mr-2" />
            Gửi ({getTotalSubItemsCount(subItems)} items)
          </button>
        </div>
      </div>

      {mainProducts.length > 0 && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-emerald-100">
          <h2 className="text-2xl font-bold text-emerald-900 mb-4">Danh sách sản phẩm đã khai báo</h2>
          <div className="space-y-4">
            {mainProducts.map((product, index) => (
              <div key={index} className="bg-emerald-50/50 rounded-lg p-4 border border-emerald-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-emerald-900">{product.productName}</h3>
                    <div className="grid grid-cols-3 gap-4 mt-2 text-sm text-emerald-700">
                      <div><span className="font-medium">Đơn vị:</span> {product.unit}</div>
                      <div><span className="font-medium">Số lượng:</span> {product.quantity}</div>
                      <div><span className="font-medium">Doanh thu:</span> {product.domesticRevenue ? formatCurrency(product.domesticRevenue) : '-'}</div>
                    </div>
                    {subItems[index] && subItems[index].length > 0 && (
                      <div className="mt-3 text-sm text-emerald-600">
                        <span className="font-medium">{subItems[index].length} bao bì đã khai báo</span>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onOpenCatalog(index)}
                      className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-semibold transition-all"
                    >
                      Danh mục bao bì
                    </button>
                    <button
                      onClick={() => onEditMainProduct(index)}
                      className="text-blue-500 hover:text-blue-700 transition-colors p-2"
                      title="Chỉnh sửa"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDeleteMainProduct(index)}
                      className="text-red-500 hover:text-red-700 transition-colors p-2"
                      title="Xóa"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
