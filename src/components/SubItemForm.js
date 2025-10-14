import React from 'react';
import { X, Plus } from 'lucide-react';
import { formatCurrency } from '../utils/calculations';

const SubItemForm = ({
  currentSubItem,
  tempSubItems,
  mainProducts,
  currentMainProductIndex,
  onUpdateTempSubItem,
  onAddTempSubItem,
  onRemoveTempSubItem,
  onSave,
  onClose
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-emerald-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-emerald-900">Khai báo bao bì</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
          <p className="text-emerald-800 font-medium">{currentSubItem?.name.replace('-', '. ')}</p>
          <p className="text-sm text-emerald-600 mt-1">
            Chi phí tái chế: {currentSubItem && formatCurrency(currentSubItem.pricing.totalCost)}/kg
          </p>
        </div>

        <div className="space-y-6">
          {tempSubItems.map((subItem, index) => (
            <div key={subItem.id} className="border border-emerald-200 rounded-lg p-6 bg-emerald-50/50">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-emerald-800">Bao bì {index + 1}</h4>
                {tempSubItems.length > 1 && (
                  <button
                    onClick={() => onRemoveTempSubItem(subItem.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-emerald-700 font-medium mb-2">
                    Tên bao bì:
                  </label>
                  <input
                    type="text"
                    value={subItem.productName}
                    onChange={(e) => onUpdateTempSubItem(subItem.id, 'productName', e.target.value)}
                    className="w-full p-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                    placeholder="Nhập tên bao bì..."
                  />
                </div>

                <div>
                  <label className="block text-emerald-700 font-medium mb-2">
                    Bao bì:
                  </label>
                  <select
                    value={subItem.packagingType}
                    onChange={(e) => onUpdateTempSubItem(subItem.id, 'packagingType', e.target.value)}
                    className="w-full p-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                  >
                    <option value="direct">Bao bì trực tiếp</option>
                    <option value="outer">Bao bì ngoài</option>
                  </select>
                </div>

                <div>
                  <label className="block text-emerald-700 font-medium mb-2">
                    Quy Cách:
                  </label>
                  <input
                    type="number"
                    value={subItem.specification}
                    onChange={(e) => onUpdateTempSubItem(subItem.id, 'specification', e.target.value)}
                    className="w-full p-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                    placeholder="Nhập quy cách..."
                    min="0"
                    step="1"
                  />
                </div>

                <div>
                  <label className="block text-emerald-700 font-medium mb-2">
                    <span className="text-red-500">*</span> Khối lượng (kg):
                  </label>
                  <input
                    type="number"
                    value={subItem.weight}
                    onChange={(e) => onUpdateTempSubItem(subItem.id, 'weight', e.target.value)}
                    className="w-full p-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                    placeholder="Nhập khối lượng..."
                    min="0"
                    step="0.1"
                  />
                </div>

                {currentMainProductIndex !== null && (
                  <div className="md:col-span-2">
                    <label className="block text-emerald-700 font-medium mb-2">
                      Thành tiền (VND):
                    </label>
                    <div className="p-3 bg-gray-100 border-2 border-gray-200 rounded-lg text-emerald-800 font-bold">
                      {subItem.weight && subItem.specification && currentSubItem
                        ? formatCurrency(
                          parseFloat(mainProducts[currentMainProductIndex].quantity) *
                          parseFloat(subItem.specification) *
                          parseFloat(subItem.weight) *
                          currentSubItem.pricing.totalCost *
                          currentSubItem.pricing.adjustmentFactor
                        )
                        : '0 ₫'
                      }
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={onAddTempSubItem}
            className="flex items-center bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="w-5 h-5 mr-2" />
            Thêm bao bì
          </button>
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
            disabled={!tempSubItems.some(item => item.productName && item.weight && parseFloat(item.weight) > 0)}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-colors ${tempSubItems.some(item => item.productName && item.weight && parseFloat(item.weight) > 0)
              ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            Lưu bao bì
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubItemForm;
