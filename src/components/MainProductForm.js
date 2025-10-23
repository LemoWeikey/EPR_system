import React from 'react';
import { X } from 'lucide-react';

const MainProductForm = ({
  currentMainProduct,
  isEditing = false,
  onProductChange,
  onSave,
  onClose
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full border border-emerald-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-emerald-900">
            {isEditing ? 'Chỉnh sửa sản phẩm' : 'Khai báo sản phẩm'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-emerald-700 font-medium mb-2">
              <span className="text-red-500">*</span> Tên sản phẩm:
            </label>
            <input
              type="text"
              value={currentMainProduct.productName}
              onChange={(e) => onProductChange({ ...currentMainProduct, productName: e.target.value })}
              className="w-full p-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
              placeholder="Nhập tên sản phẩm..."
            />
          </div>

          <div>
            <label className="block text-emerald-700 font-medium mb-2">
              Đơn vị tính:
            </label>
            <select
              value={currentMainProduct.unit}
              onChange={(e) => onProductChange({ ...currentMainProduct, unit: e.target.value })}
              className="w-full p-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
            >
              <option value="Thùng">Thùng</option>
              <option value="Hộp">Hộp</option>
              <option value="Chiếc">Chiếc</option>
              <option value="Chai">Chai</option>
              <option value="Cái">Cái</option>
              <option value="Bộ">Bộ</option>
            </select>
          </div>

          <div>
            <label className="block text-emerald-700 font-medium mb-2">
              Doanh thu trong nước (VND):
            </label>
            <input
              type="number"
              value={currentMainProduct.domesticRevenue}
              onChange={(e) => onProductChange({ ...currentMainProduct, domesticRevenue: e.target.value })}
              className="w-full p-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
              placeholder="Nhập doanh thu..."
              min="0"
            />
          </div>

          <div>
            <label className="block text-emerald-700 font-medium mb-2">
              <span className="text-red-500">*</span> Số lượng:
            </label>
            <input
              type="number"
              value={currentMainProduct.quantity}
              onChange={(e) => onProductChange({ ...currentMainProduct, quantity: e.target.value })}
              className="w-full p-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
              placeholder="Nhập số lượng..."
              min="0"
            />
          </div>
        </div>

        <div className="flex space-x-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border-2 border-emerald-200 text-emerald-700 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={onSave}
            disabled={!currentMainProduct.productName || !currentMainProduct.quantity || parseFloat(currentMainProduct.quantity) <= 0}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-colors ${currentMainProduct.productName && currentMainProduct.quantity && parseFloat(currentMainProduct.quantity) > 0
              ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            {isEditing ? 'Cập nhật sản phẩm' : 'Lưu sản phẩm'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainProductForm;
