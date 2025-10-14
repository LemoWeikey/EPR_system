import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, FileText, Info, Plus, DollarSign, CheckCircle, Package, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { recyclingData } from '../data/recyclingData';
import { formatCurrency, calculateSubItemCost } from '../utils/calculations';

const CatalogPage = ({
  selectedSection,
  selectedSubsection,
  breadcrumb,
  animationClass,
  currentMainProductIndex,
  mainProducts,
  subItems,
  onBack,
  onSectionClick,
  onSubsectionClick,
  onOpenSubItemForm,
  onGoHome
}) => {
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  // Helper function to count items added for current main product in a specific subsection
  const getAddedItemsCountForSubsection = (subsectionId) => {
    if (currentMainProductIndex === null || !subItems[currentMainProductIndex]) return 0;

    return subItems[currentMainProductIndex].filter(item =>
      item.subsection && item.subsection.id === subsectionId
    ).length;
  };

  // Helper function to get added items for a specific catalog item
  const getAddedItemsForCatalogItem = (itemName) => {
    if (currentMainProductIndex === null || !subItems[currentMainProductIndex]) return [];

    return subItems[currentMainProductIndex].filter(item =>
      item.catalogItem && item.catalogItem.name === itemName
    );
  };
  const renderBreadcrumb = () => {
    if (breadcrumb.length === 0) return null;

    return (
      <div className="flex items-center space-x-2 mb-6 text-sm">
        {breadcrumb.map((item, index) => (
          <React.Fragment key={index}>
            <button
              onClick={() => {
                if (item.level === 'catalog' && !selectedSection) {
                } else if (item.level === 'catalog') {
                  onBack();
                } else if (item.level === 'section') {
                  onBack();
                }
              }}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              {item.name}
            </button>
            {index < breadcrumb.length - 1 && (
              <ChevronRight className="w-4 h-4 text-emerald-400" />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  // Calculate total items added for current main product
  const getTotalAddedItems = () => {
    if (currentMainProductIndex === null || !subItems[currentMainProductIndex]) return 0;
    return subItems[currentMainProductIndex].length;
  };

  return (
    <div className={`space-y-6 ${animationClass}`}>
      {/* Sticky Summary Bar */}
      {currentMainProductIndex !== null && getTotalAddedItems() > 0 && (
        <div className="sticky top-0 z-40 mb-4">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Package className="w-5 h-5" />
                <span className="font-semibold">
                  Đang khai báo: {mainProducts[currentMainProductIndex].productName}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-bold">{getTotalAddedItems()} bao bì đã thêm</span>
                </div>
                <button
                  onClick={() => setShowDetailPanel(!showDetailPanel)}
                  className="flex items-center gap-2 bg-white/30 hover:bg-white/40 rounded-lg px-4 py-2 font-semibold transition-all transform hover:scale-105"
                >
                  <Eye className="w-4 h-4" />
                  <span>Xem chi tiết</span>
                  {showDetailPanel ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Detail Panel */}
          {showDetailPanel && (
            <div className="mt-2 bg-white rounded-lg shadow-xl border-2 border-green-300 p-6 max-h-[500px] overflow-y-auto">
              <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Chi tiết bao bì đã khai báo
              </h3>

              {subItems[currentMainProductIndex] && subItems[currentMainProductIndex].length > 0 ? (
                <div className="space-y-4">
                  {subItems[currentMainProductIndex].map((item, index) => (
                    <div key={index} className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-emerald-900 text-lg">{item.productName}</h4>
                          <p className="text-sm text-emerald-600 mt-1">{item.catalogItem.name.replace('-', '. ')}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.packagingType === 'direct'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {item.packagingType === 'direct' ? 'Bao bì trực tiếp' : 'Bao bì ngoài'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 text-sm">
                        <div className="bg-white rounded px-3 py-2">
                          <span className="text-emerald-600 font-medium">Quy cách:</span>
                          <p className="font-semibold text-emerald-900">{item.specification || '-'}</p>
                        </div>
                        <div className="bg-white rounded px-3 py-2">
                          <span className="text-emerald-600 font-medium">Khối lượng:</span>
                          <p className="font-semibold text-emerald-900">{item.weight} kg</p>
                        </div>
                        <div className="bg-white rounded px-3 py-2">
                          <span className="text-emerald-600 font-medium">Đơn giá:</span>
                          <p className="font-semibold text-emerald-900">{formatCurrency(item.catalogItem.pricing.totalCost)}</p>
                        </div>
                        <div className="bg-white rounded px-3 py-2">
                          <span className="text-emerald-600 font-medium">Thành tiền:</span>
                          <p className="font-semibold text-green-700">{formatCurrency(calculateSubItemCost(mainProducts[currentMainProductIndex], item))}</p>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-emerald-200 text-xs text-emerald-600">
                        <span className="font-medium">Danh mục:</span> {item.section?.name} → {item.subsection?.name}
                      </div>
                    </div>
                  ))}

                  <div className="mt-4 pt-4 border-t-2 border-green-300">
                    <div className="flex justify-between items-center bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg px-4 py-3">
                      <span className="font-bold text-lg">Tổng cộng:</span>
                      <span className="font-bold text-2xl">
                        {formatCurrency(
                          subItems[currentMainProductIndex].reduce((total, item) =>
                            total + calculateSubItemCost(mainProducts[currentMainProductIndex], item), 0
                          )
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-emerald-600 text-center py-8">Chưa có bao bì nào được khai báo</p>
              )}
            </div>
          )}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-emerald-700 hover:text-emerald-900 transition-colors group bg-white/70 backdrop-blur-sm rounded-lg px-4 py-2 border border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Quay lại</span>
        </button>

        {(selectedSection || selectedSubsection) && (
          <button
            onClick={onGoHome}
            className="flex items-center text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 transition-all px-4 py-2 rounded-lg shadow-lg font-semibold"
          >
            <FileText className="w-5 h-5 mr-2" />
            <span>Về trang chủ</span>
          </button>
        )}
      </div>

      {renderBreadcrumb()}

      {!selectedSection && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-emerald-900 mb-4">Danh mục bao bì</h1>
            {currentMainProductIndex !== null && (
              <p className="text-emerald-700 font-medium">
                Đang khai báo cho: <span className="font-bold">{mainProducts[currentMainProductIndex].productName}</span>
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recyclingData.sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <div
                  key={section.id}
                  onClick={() => onSectionClick(section)}
                  className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-emerald-100 hover:border-emerald-200">
                    <div className={`h-32 bg-gradient-to-r ${section.color} flex items-center justify-center`}>
                      <IconComponent className="w-16 h-16 text-white z-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-emerald-900 mb-2 group-hover:text-emerald-700 transition-colors">
                        {section.name}
                      </h3>
                      <p className="text-emerald-700 text-sm mb-4 font-medium">{section.description}</p>
                      <div className="flex items-center text-emerald-600 font-semibold bg-emerald-50 rounded-lg px-3 py-2 group-hover:bg-emerald-100 transition-colors">
                        <span className="text-sm">Xem chi tiết</span>
                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {selectedSection && !selectedSubsection && (
        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-emerald-100 mb-6">
            <div className="flex items-center mb-6">
              <div className={`w-16 h-16 bg-gradient-to-r ${selectedSection.color} rounded-xl flex items-center justify-center mr-6 shadow-lg`}>
                <selectedSection.icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-emerald-900">{selectedSection.name}</h1>
                <p className="text-emerald-700 mt-2 font-medium">{selectedSection.description}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedSection.subsections.map((subsection) => {
              const addedCount = getAddedItemsCountForSubsection(subsection.id);
              return (
                <div
                  key={subsection.id}
                  onClick={() => onSubsectionClick(subsection)}
                  className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                >
                  <div className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border ${addedCount > 0 ? 'border-green-300 bg-green-50/50' : 'border-emerald-100'} hover:border-emerald-200`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-emerald-900 group-hover:text-emerald-700 transition-colors">
                        {subsection.name}
                      </h3>
                      <ChevronRight className="w-5 h-5 text-emerald-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <div className="flex items-center bg-emerald-50 rounded-lg px-3 py-2 text-sm">
                        <Info className="w-4 h-4 mr-2 text-emerald-600" />
                        <span className="font-medium text-emerald-700">{subsection.items.length} sản phẩm</span>
                      </div>
                      {addedCount > 0 && (
                        <div className="flex items-center bg-green-100 rounded-lg px-3 py-2 text-sm">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                          <span className="font-medium text-green-700">Đã thêm {addedCount} bao bì</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {selectedSubsection && (
        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-emerald-100 mb-6">
            <h1 className="text-3xl font-bold text-emerald-900 mb-2">{selectedSubsection.name}</h1>
            <p className="text-emerald-700 font-medium">Chi tiết định mức chi phí tái chế</p>
          </div>

          <div className="space-y-4">
            {selectedSubsection.items.map((item, index) => {
              const addedItems = getAddedItemsForCatalogItem(item.name);
              return (
                <div key={index} className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border overflow-hidden hover:shadow-2xl transition-all duration-300 ${addedItems.length > 0 ? 'border-green-300 bg-green-50/30' : 'border-emerald-100'}`}>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-emerald-900 flex-1">
                        {item.name.replace('-', '. ')}
                      </h3>
                      {addedItems.length > 0 && (
                        <div className="flex items-center bg-green-100 rounded-lg px-3 py-1 text-sm ml-4">
                          <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                          <span className="font-medium text-green-700">{addedItems.length} đã thêm</span>
                        </div>
                      )}
                    </div>

                    {addedItems.length > 0 && (
                      <div className="mb-4 p-4 bg-white/80 rounded-lg border border-green-200">
                        <h4 className="text-sm font-semibold text-emerald-800 mb-2 flex items-center">
                          <Package className="w-4 h-4 mr-2" />
                          Bao bì đã khai báo:
                        </h4>
                        <div className="space-y-2">
                          {addedItems.map((addedItem, idx) => (
                            <div key={idx} className="text-sm text-emerald-700 bg-emerald-50/50 rounded px-3 py-2 border border-emerald-100">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{addedItem.productName}</span>
                                <span className="text-xs text-emerald-600">
                                  {addedItem.packagingType === 'direct' ? 'Trực tiếp' : 'Bao bì ngoài'}
                                </span>
                              </div>
                              <div className="flex gap-4 mt-1 text-xs text-emerald-600">
                                <span>Quy cách: {addedItem.specification || '-'}</span>
                                <span>Khối lượng: {addedItem.weight} kg</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-gradient-to-br from-amber-50 to-yellow-100 rounded-lg p-4 border border-amber-200">
                        <div className="flex items-center mb-2">
                          <span className="w-5 h-5 bg-amber-600 rounded-full mr-2 flex items-center justify-center text-xs text-white font-bold">%</span>
                          <span className="text-sm font-medium text-amber-700">Hệ số điều chỉnh</span>
                        </div>
                        <p className="text-2xl font-bold text-amber-800">
                          {(item.pricing.adjustmentFactor * 100).toFixed(0)}%
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-teal-50 to-emerald-100 rounded-lg p-4 border-2 border-teal-300 relative overflow-hidden">
                        <div className="absolute top-1 right-1 text-lg opacity-30">🌟</div>
                        <div className="flex items-center mb-2">
                          <DollarSign className="w-5 h-5 text-teal-600 mr-2" />
                          <span className="text-sm font-medium text-teal-700">Tổng chi phí</span>
                        </div>
                        <p className="text-2xl font-bold text-teal-800">
                          {formatCurrency(item.pricing.totalCost)}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => onOpenSubItemForm(item)}
                        className="flex items-center bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Thêm bao bì
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
