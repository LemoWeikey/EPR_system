import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, Package, Zap, Droplet, Car, FileText, DollarSign, Info, CheckCircle, Send, X, Plus, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

const RecyclingCostNavigator = () => {
  const [currentLevel, setCurrentLevel] = useState('main');
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSubsection, setSelectedSubsection] = useState(null);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [animationClass, setAnimationClass] = useState('');
  const [declaredItems, setDeclaredItems] = useState({});
  const [showDeclarationForm, setShowDeclarationForm] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [showDeclaredItems, setShowDeclaredItems] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  // New form state for multiple products
  const [declarationProducts, setDeclarationProducts] = useState([{
    id: Date.now(),
    productName: '',
    unit: 'kg',
    weight: '',
    quantity: '',
    domesticRevenue: ''
  }]);

  const recyclingData = {
    "title": "Định mức chi phí tái chế sản phẩm, bao bì",
    "sections": [
      {
        "id": "A",
        "name": "A-BAO BÌ",
        "icon": Package,
        "color": "from-emerald-500 to-green-600",
        "description": "A-Các loại bao bì giấy, kim loại, nhựa, thủy tinh",
        "subsections": [
          {
            "id": "A.1",
            "name": "A.1-Bao bì giấy",
            "items": [
              {
                "name": "A.1.1-Bao bì giấy, carton",
                "pricing": {
                  "baseCost": 9500,
                  "adjustmentFactor": 0.2,
                  "managementCost": 38.0,
                  "totalCost": 1938.0
                }
              },
              {
                "name": "A.1.2-Bao bì giấy hỗn hợp đa lớp (bao bì có thành phần từ 2 loại vật liệu trở lên trong đó có giấy và có ít nhất 3 lớp vật liệu)",
                "pricing": {
                  "baseCost": 10700,
                  "adjustmentFactor": 0.6,
                  "managementCost": 128.0,
                  "totalCost": 6548.0
                }
              }
            ]
          },
          {
            "id": "A.2",
            "name": "A.2-Bao bì kim loại",
            "items": [
              {
                "name": "A.2.1-Bao bì nhôm",
                "pricing": {
                  "baseCost": 12000,
                  "adjustmentFactor": 0.2,
                  "managementCost": 48.0,
                  "totalCost": 2448.0
                }
              },
              {
                "name": "A.2.2-Bao bì sắt và kim loại khác",
                "pricing": {
                  "baseCost": 9000,
                  "adjustmentFactor": 0.4,
                  "managementCost": 72.0,
                  "totalCost": 3672.0
                }
              }
            ]
          },
          {
            "id": "A.3",
            "name": "A.3-Bao bì nhựa",
            "items": [
              {
                "name": "A.3.1-Bao bì PET cứng",
                "pricing": {
                  "baseCost": 9700,
                  "adjustmentFactor": 0.2,
                  "managementCost": 39.0,
                  "totalCost": 1979.0
                }
              },
              {
                "name": "A.3.2-Bao bì HDPE, LDPE, PP, PS cứng",
                "pricing": {
                  "baseCost": 9700,
                  "adjustmentFactor": 0.4,
                  "managementCost": 78.0,
                  "totalCost": 3958.0
                }
              },
              {
                "name": "A.3.3-Bao bì EPS cứng",
                "pricing": {
                  "baseCost": 9700,
                  "adjustmentFactor": 0.6,
                  "managementCost": 116.0,
                  "totalCost": 5936.0
                }
              },
              {
                "name": "A.3.5-Bao bì PVC cứng",
                "pricing": {
                  "baseCost": 9700,
                  "adjustmentFactor": 0.8,
                  "managementCost": 155.0,
                  "totalCost": 7915.0
                }
              },
              {
                "name": "A.3.4a-Bao bì đơn vật liệu mềm",
                "pricing": {
                  "baseCost": 10400,
                  "adjustmentFactor": 0.8,
                  "managementCost": 166.0,
                  "totalCost": 8486.0
                }
              },
              {
                "name": "A.3.4b-Bao bì đa vật liệu mềm",
                "pricing": {
                  "baseCost": 10700,
                  "adjustmentFactor": 1,
                  "managementCost": 214.0,
                  "totalCost": 10914.0
                }
              }
            ]
          },
          {
            "id": "A.4",
            "name": "A.4-Bao bì thủy tinh",
            "items": [
              {
                "name": "A.4.1-Bao bì thủy tinh",
                "pricing": {
                  "baseCost": 3300,
                  "adjustmentFactor": 0.6,
                  "managementCost": 40.0,
                  "totalCost": 2020.0
                }
              }
            ]
          }
        ]
      },
      {
        "id": "B",
        "name": "B-ẮC QUY VÀ PIN",
        "icon": Zap,
        "color": "from-amber-500 to-orange-500",
        "description": "Ắc quy và pin sạc các loại",
        "subsections": [
          {
            "id": "B.1",
            "name": "B.1-Ắc quy",
            "items": [
              {
                "name": "B.1.1-Ắc quy chì",
                "pricing": {
                  "baseCost": 44800,
                  "adjustmentFactor": 0.4,
                  "managementCost": 358.0,
                  "totalCost": 18278.0
                }
              },
              {
                "name": "B.1.2-Ắc quy các loại khác",
                "pricing": {
                  "baseCost": 49800,
                  "adjustmentFactor": 1,
                  "managementCost": 996.0,
                  "totalCost": 50796.0
                }
              }
            ]
          },
          {
            "id": "B.2",
            "name": "B.2-Pin sạc (nhiều lần)",
            "items": [
              {
                "name": "B.2.1-Pin sạc nhiều lần các loại",
                "pricing": {
                  "baseCost": 53800,
                  "adjustmentFactor": 1,
                  "managementCost": 1076.0,
                  "totalCost": 54876.0
                }
              }
            ]
          }
        ]
      },
      {
        "id": "C",
        "name": "C-DẦU NHỚT",
        "icon": Droplet,
        "color": "from-blue-500 to-cyan-600",
        "description": "Dầu nhớt cho động cơ các loại",
        "subsections": [
          {
            "id": "C.1",
            "name": "C.1-Dầu nhớt cho động cơ",
            "items": [
              {
                "name": "C.1.1-Dầu nhớt cho động cơ",
                "pricing": {
                  "baseCost": 14000,
                  "adjustmentFactor": 0.6,
                  "managementCost": 168.0,
                  "totalCost": 8568.0
                }
              }
            ]
          }
        ]
      },
      {
        "id": "D",
        "name": "D-SĂM, LỐP",
        "icon": Car,
        "color": "from-slate-600 to-gray-700",
        "description": "Săm và lốp xe các loại",
        "subsections": [
          {
            "id": "D.1",
            "name": "D.1-Săm, lốp các loại",
            "items": [
              {
                "name": "D.1.1-Săm, lốp các loại",
                "pricing": {
                  "baseCost": 5700,
                  "adjustmentFactor": 0.6,
                  "managementCost": 68.0,
                  "totalCost": 3488.0
                }
              }
            ]
          }
        ]
      },
      {
        "id": "Đ",
        "name": "Đ-ĐIỆN – ĐIỆN TỬ",
        "icon": Zap,
        "color": "from-teal-500 to-emerald-600",
        "description": "Thiết bị điện và điện tử",
        "subsections": [
          {
            "id": "Đ.1",
            "name": "Đ.1-Thiết bị điện tử dân dụng",
            "items": [
              {
                "name": "Đ.1.1-Tủ lạnh, tủ đông",
                "pricing": {
                  "baseCost": 13500,
                  "adjustmentFactor": 0.6,
                  "managementCost": 162.0,
                  "totalCost": 8262.0
                }
              },
              {
                "name": "Đ.1.2-Điều hoà không khí",
                "pricing": {
                  "baseCost": 14500,
                  "adjustmentFactor": 0.6,
                  "managementCost": 174.0,
                  "totalCost": 8874.0
                }
              },
              {
                "name": "Đ.1.3-Bếp điện, bếp từ, bếp hồng ngoại, lò nướng, lò vi sóng",
                "pricing": {
                  "baseCost": 12200,
                  "adjustmentFactor": 0.6,
                  "managementCost": 146.0,
                  "totalCost": 7466.0
                }
              },
              {
                "name": "Đ.1.4-Máy giặt, máy sấy quần áo",
                "pricing": {
                  "baseCost": 12400,
                  "adjustmentFactor": 0.6,
                  "managementCost": 149.0,
                  "totalCost": 7589.0
                }
              },
              {
                "name": "Đ.1.5-Loa, âm ly",
                "pricing": {
                  "baseCost": 12250,
                  "adjustmentFactor": 0.8,
                  "managementCost": 196.0,
                  "totalCost": 9996.0
                }
              }
            ]
          },
          {
            "id": "Đ.2",
            "name": "Đ.2-Thiết bị màn hình",
            "items": [
              {
                "name": "Đ.2.1-Thiết bị màn hình: ti vi, màn hình máy tính để bàn",
                "pricing": {
                  "baseCost": 12500,
                  "adjustmentFactor": 0.8,
                  "managementCost": 200.0,
                  "totalCost": 10200.0
                }
              }
            ]
          }
        ]
      }
    ]
  };

  const handleNavigation = (level, section = null, subsection = null) => {
    setAnimationClass('slide-out');
    setTimeout(() => {
      setCurrentLevel(level);
      setSelectedSection(section);
      setSelectedSubsection(subsection);
      
      const newBreadcrumb = [];
      if (level !== 'main') {
        newBreadcrumb.push({ name: 'Trang chủ', level: 'main' });
      }
      if (section) {
        newBreadcrumb.push({ name: section.name, level: 'section', section });
      }
      if (subsection) {
        newBreadcrumb.push({ name: subsection.name, level: 'subsection', section, subsection });
      }
      
      setBreadcrumb(newBreadcrumb);
      setAnimationClass('slide-in');
    }, 150);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleDeclaration = (item) => {
    setCurrentItem(item);
    setDeclarationProducts([{
      id: Date.now(),
      productName: item.name,
      unit: 'kg',
      weight: '',
      quantity: '',
      domesticRevenue: ''
    }]);
    setShowDeclarationForm(true);
  };

  const addProduct = () => {
    setDeclarationProducts(prev => [...prev, {
      id: Date.now() + Math.random(),
      productName: currentItem?.name || '',
      unit: 'kg',
      weight: '',
      quantity: '',
      domesticRevenue: ''
    }]);
  };

  const removeProduct = (id) => {
    if (declarationProducts.length > 1) {
      setDeclarationProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const updateProduct = (id, field, value) => {
    setDeclarationProducts(prev => 
      prev.map(p => p.id === id ? { ...p, [field]: value } : p)
    );
  };

  const submitDeclaration = () => {
    const validProducts = declarationProducts.filter(p => 
      p.productName && p.weight && p.quantity && 
      parseFloat(p.weight) > 0 && parseFloat(p.quantity) > 0
    );

    if (validProducts.length > 0 && currentItem) {
      validProducts.forEach((product, index) => {
        const itemKey = `${selectedSection.id}-${selectedSubsection.id}-${currentItem.name}-${Date.now()}-${index}`;
        setDeclaredItems(prev => ({
          ...prev,
          [itemKey]: {
            item: currentItem,
            productData: product,
            section: selectedSection,
            subsection: selectedSubsection,
            totalCost: parseFloat(product.weight) * parseFloat(product.quantity) * currentItem.pricing.totalCost
          }
        }));
      });
      
      setShowDeclarationForm(false);
      setCurrentItem(null);
      setDeclarationProducts([{
        id: Date.now(),
        productName: '',
        unit: 'kg',
        weight: '',
        quantity: '',
        domesticRevenue: ''
      }]);
    }
  };

  const getDeclaredItemsCount = () => {
    return Object.keys(declaredItems).length;
  };

  const getTotalCost = () => {
    return Object.values(declaredItems).reduce((sum, item) => sum + item.totalCost, 0);
  };

  const exportToExcel = () => {
    // Prepare data for Excel
    const excelData = Object.entries(declaredItems).map(([key, data], index) => ({
      'STT': index + 1,
      'Tên sản phẩm': data.productData.productName,
      'Phân loại': `${data.section.name} → ${data.subsection.name}`,
      'Đơn vị tính': data.productData.unit,
      'Khối lượng (kg)': parseFloat(data.productData.weight),
      'Số lượng': parseFloat(data.productData.quantity),
      'Đơn giá (VND)': data.item.pricing.totalCost,
      'Doanh thu trong nước (VND)': data.productData.domesticRevenue ? parseFloat(data.productData.domesticRevenue) : 0,
      'Thành tiền (VND)': data.totalCost
    }));

    // Add summary row
    excelData.push({
      'STT': '',
      'Tên sản phẩm': '',
      'Phân loại': '',
      'Đơn vị tính': '',
      'Khối lượng (kg)': '',
      'Số lượng': '',
      'Đơn giá (VND)': '',
      'Doanh thu trong nước (VND)': 'TỔNG CỘNG:',
      'Thành tiền (VND)': getTotalCost()
    });

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    worksheet['!cols'] = [
      { wch: 5 },  // STT
      { wch: 40 }, // Tên sản phẩm
      { wch: 35 }, // Phân loại
      { wch: 12 }, // Đơn vị tính
      { wch: 15 }, // Khối lượng
      { wch: 12 }, // Số lượng
      { wch: 15 }, // Đơn giá
      { wch: 25 }, // Doanh thu
      { wch: 18 }  // Thành tiền
    ];

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Báo cáo tái chế');

    // Generate filename with current date
    const date = new Date();
    const filename = `Bao_cao_tai_che_${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}.xlsx`;

    // Save file
    XLSX.writeFile(workbook, filename);
  };

  const isItemDeclared = (item) => {
    const matchingItems = Object.values(declaredItems).filter(
      declaredItem => declaredItem.item.name === item.name
    );
    return matchingItems.length > 0 ? matchingItems : null;
  };

  const renderMainView = () => (
    <div className={`space-y-6 ${animationClass}`}>
      <div className="text-center mb-12">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white relative">
          <div className="absolute -top-2 -right-2 text-2xl">🌍</div>
          <FileText className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-emerald-900 mb-4 drop-shadow-sm">{recyclingData.title}</h1>
        <p className="text-emerald-700 max-w-2xl mx-auto text-lg font-medium bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-emerald-100">
          🌱 Khám phá định mức chi phí tái chế cho các loại sản phẩm và bao bì khác nhau - Vì một môi trường xanh sạch đẹp
        </p>
        
        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={() => setShowDeclaredItems(true)}
            className="flex items-center bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Kiểm tra đã khai báo ({getDeclaredItemsCount()})
          </button>
          
          <button
            onClick={() => setShowSummary(true)}
            disabled={getDeclaredItemsCount() === 0}
            className={`flex items-center px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 ${
              getDeclaredItemsCount() > 0 
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5 mr-2" />
            Gửi ({getDeclaredItemsCount()} items)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recyclingData.sections.map((section) => {
          const IconComponent = section.icon;
          return (
            <div
              key={section.id}
              onClick={() => handleNavigation('section', section)}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-emerald-100 hover:border-emerald-200">
                <div className={`h-32 bg-gradient-to-r ${section.color} flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-white/10"></div>
                  <IconComponent className="w-16 h-16 text-white z-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg" />
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full"></div>
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full"></div>
                  <div className="absolute top-2 right-2 text-2xl opacity-30">♻️</div>
                </div>
                <div className="p-6 bg-gradient-to-b from-white/90 to-emerald-50/50">
                  <h3 className="text-xl font-bold text-emerald-900 mb-2 group-hover:text-emerald-700 transition-colors">
                    {section.name}
                  </h3>
                  <p className="text-emerald-700 text-sm mb-4 font-medium">{section.description}</p>
                  <div className="flex items-center text-emerald-600 font-semibold bg-emerald-50 rounded-lg px-3 py-2 group-hover:bg-emerald-100 transition-colors">
                    <span className="text-sm">🌿 Xem chi tiết</span>
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderSectionView = () => (
    <div className={`space-y-6 ${animationClass}`}>
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-emerald-100 mb-6">
        <div className="flex items-center mb-6">
          <div className={`w-16 h-16 bg-gradient-to-r ${selectedSection.color} rounded-xl flex items-center justify-center mr-6 shadow-lg`}>
            <selectedSection.icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-emerald-900">{selectedSection.name}</h1>
            <p className="text-emerald-700 mt-2 font-medium">🌱 {selectedSection.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {selectedSection.subsections.map((subsection) => (
          <div
            key={subsection.id}
            onClick={() => handleNavigation('subsection', selectedSection, subsection)}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-emerald-100 hover:border-emerald-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-emerald-900 group-hover:text-emerald-700 transition-colors">
                  {subsection.name}
                </h3>
                <ChevronRight className="w-5 h-5 text-emerald-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              </div>
              <div className="text-sm text-emerald-700">
                <div className="flex items-center bg-emerald-50 rounded-lg px-3 py-2">
                  <Info className="w-4 h-4 mr-2 text-emerald-600" />
                  <span className="font-medium">♻️ {subsection.items.length} sản phẩm</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSubsectionView = () => (
    <div className={`space-y-6 ${animationClass}`}>
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-emerald-100 mb-6">
        <h1 className="text-3xl font-bold text-emerald-900 mb-2">♻️ {selectedSubsection.name}</h1>
        <p className="text-emerald-700 font-medium">🌿 Chi tiết định mức chi phí tái chế</p>
      </div>

      <div className="space-y-4">
        {selectedSubsection.items.map((item, index) => {
          const declaredItems = isItemDeclared(item);
          return (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-emerald-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-emerald-900 mb-6 flex items-center">
                  <span className="mr-2">🌱</span>
                  {item.name}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-lg p-4 border border-emerald-200">
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-5 h-5 text-emerald-600 mr-2" />
                      <span className="text-sm font-medium text-emerald-700">Chi phí cơ sở</span>
                    </div>
                    <p className="text-2xl font-bold text-emerald-800">
                      {formatCurrency(item.pricing.baseCost)}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-yellow-100 rounded-lg p-4 border border-amber-200">
                    <div className="flex items-center mb-2">
                      <span className="w-5 h-5 bg-amber-600 rounded-full mr-2 flex items-center justify-center text-xs text-white font-bold">%</span>
                      <span className="text-sm font-medium text-amber-700">Hệ số điều chỉnh</span>
                    </div>
                    <p className="text-2xl font-bold text-amber-800">
                      {(item.pricing.adjustmentFactor * 100).toFixed(0)}%
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-cyan-50 to-blue-100 rounded-lg p-4 border border-cyan-200">
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-5 h-5 text-cyan-600 mr-2" />
                      <span className="text-sm font-medium text-cyan-700">Chi phí quản lý</span>
                    </div>
                    <p className="text-2xl font-bold text-cyan-800">
                      {formatCurrency(item.pricing.managementCost)}
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
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => handleDeclaration(item)}
                    className={`flex items-center px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 ${
                      declaredItems
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                        : 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white'
                    }`}
                  >
                    {declaredItems ? (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Đã khai báo ({declaredItems.length} mục)
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5 mr-2" />
                        Khai báo
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderBreadcrumb = () => {
    if (breadcrumb.length === 0) return null;

    return (
      <div className="flex items-center space-x-2 mb-6 text-sm">
        {breadcrumb.map((item, index) => (
          <React.Fragment key={index}>
            <button
              onClick={() => {
                if (item.level === 'main') handleNavigation('main');
                else if (item.level === 'section') handleNavigation('section', item.section);
                else if (item.level === 'subsection') handleNavigation('subsection', item.section, item.subsection);
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

  const renderBackButton = () => {
    if (currentLevel === 'main') return null;

    return (
      <button
        onClick={() => {
          if (currentLevel === 'subsection') {
            handleNavigation('section', selectedSection);
          } else if (currentLevel === 'section') {
            handleNavigation('main');
          }
        }}
        className="flex items-center text-emerald-700 hover:text-emerald-900 transition-colors mb-6 group bg-white/70 backdrop-blur-sm rounded-lg px-4 py-2 border border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 shadow-sm"
      >
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">🌿 Quay lại</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
      {/* Environmental Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 -left-32 w-64 h-64 bg-emerald-300 rounded-full opacity-15"></div>
        <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-teal-200 rounded-full opacity-10"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-lime-200 rounded-full opacity-20"></div>
        
        {/* Leaf patterns */}
        <div className="absolute top-20 left-10 text-green-200 opacity-30 text-6xl">🍃</div>
        <div className="absolute bottom-40 right-20 text-emerald-200 opacity-25 text-4xl">🌿</div>
        <div className="absolute top-1/2 right-10 text-green-300 opacity-20 text-5xl">🌱</div>
        <div className="absolute bottom-20 left-1/4 text-teal-200 opacity-30 text-3xl">♻️</div>
      </div>
      
      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {renderBackButton()}
        {renderBreadcrumb()}
        
        {currentLevel === 'main' && renderMainView()}
        {currentLevel === 'section' && renderSectionView()}
        {currentLevel === 'subsection' && renderSubsectionView()}
      </div>
      
      {/* Enhanced Declaration Form Modal */}
      {showDeclarationForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-emerald-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-emerald-900">🌱 Khai báo chi tiết sản phẩm</h3>
              <button
                onClick={() => setShowDeclarationForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mb-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <p className="text-emerald-800 font-medium">{currentItem?.name}</p>
              <p className="text-sm text-emerald-600 mt-1">
                💰 Chi phí tái chế: {currentItem && formatCurrency(currentItem.pricing.totalCost)}/kg
              </p>
            </div>
            
            <div className="space-y-6">
              {declarationProducts.map((product, index) => (
                <div key={product.id} className="border border-emerald-200 rounded-lg p-6 bg-emerald-50/50">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-emerald-800">Sản phẩm {index + 1}</h4>
                    {declarationProducts.length > 1 && (
                      <button
                        onClick={() => removeProduct(product.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-emerald-700 font-medium mb-2">
                        Tên sản phẩm:
                      </label>
                      <input
                        type="text"
                        value={product.productName}
                        onChange={(e) => updateProduct(product.id, 'productName', e.target.value)}
                        className="w-full p-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                        placeholder="Nhập tên sản phẩm..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-emerald-700 font-medium mb-2">
                        Đơn vị tính:
                      </label>
                      <select
                        value={product.unit}
                        onChange={(e) => updateProduct(product.id, 'unit', e.target.value)}
                        className="w-full p-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                      >
                        <option value="Thùng">Thùng</option>
                        <option value="Chiếc">Chiếc</option>
                        <option value="Chai">Chai</option>
                        <option value="Cái">Cái</option>
                        <option value="Bộ">Bộ</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-emerald-700 font-medium mb-2">
                        <span className="text-red-500">*</span> Khối lượng (kg):
                      </label>
                      <input
                        type="number"
                        value={product.weight}
                        onChange={(e) => updateProduct(product.id, 'weight', e.target.value)}
                        className="w-full p-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                        placeholder="Nhập khối lượng..."
                        min="0"
                        step="0.1"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-emerald-700 font-medium mb-2">
                        Số lượng:
                      </label>
                      <input
                        type="number"
                        value={product.quantity}
                        onChange={(e) => updateProduct(product.id, 'quantity', e.target.value)}
                        className="w-full p-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                        placeholder="Nhập số lượng..."
                        min="0"
                        step="1"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-emerald-700 font-medium mb-2">
                        Doanh thu trong nước (VND):
                      </label>
                      <input
                        type="number"
                        value={product.domesticRevenue}
                        onChange={(e) => updateProduct(product.id, 'domesticRevenue', e.target.value)}
                        className="w-full p-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                        placeholder="Nhập doanh thu..."
                        min="0"
                      />
                    </div>
                    
                    <div className="flex items-end">
                      <div className="w-full">
                        <label className="block text-emerald-700 font-medium mb-2">
                          Thành tiền (VND):
                        </label>
                        <div className="p-3 bg-gray-100 border-2 border-gray-200 rounded-lg text-emerald-800 font-bold">
                          {product.weight && product.quantity && currentItem
                            ? formatCurrency(parseFloat(product.weight) * parseFloat(product.quantity) * currentItem.pricing.totalCost)
                            : '0 ₫'
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-6">
              <button
                onClick={addProduct}
                className="flex items-center bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <Plus className="w-5 h-5 mr-2" />
                Thêm sản phẩm
              </button>
            </div>
            
            <div className="flex space-x-3 mt-8">
              <button
                onClick={() => setShowDeclarationForm(false)}
                className="flex-1 px-4 py-3 border-2 border-emerald-200 text-emerald-700 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={submitDeclaration}
                disabled={!declarationProducts.some(p => p.productName && p.weight && p.quantity && parseFloat(p.weight) > 0 && parseFloat(p.quantity) > 0)}
                className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-colors ${
                  declarationProducts.some(p => p.productName && p.weight && p.quantity && parseFloat(p.weight) > 0 && parseFloat(p.quantity) > 0)
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Xác nhận khai báo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Declared Items Modal */}
      {showDeclaredItems && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-emerald-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-emerald-900">✅ Danh sách đã khai báo</h3>
              <button
                onClick={() => setShowDeclaredItems(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {Object.keys(declaredItems).length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🌱</div>
                <p className="text-emerald-600 text-lg">Chưa có sản phẩm nào được khai báo</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-emerald-50 to-green-50">
                      <th className="text-left p-4 text-emerald-800 font-semibold border border-emerald-200">Tên sản phẩm</th>
                      <th className="text-center p-4 text-emerald-800 font-semibold border border-emerald-200">Đơn vị tính</th>
                      <th className="text-center p-4 text-emerald-800 font-semibold border border-emerald-200">Khối lượng</th>
                      <th className="text-center p-4 text-emerald-800 font-semibold border border-emerald-200">Số lượng</th>
                      <th className="text-right p-4 text-emerald-800 font-semibold border border-emerald-200">Doanh thu</th>
                      <th className="text-right p-4 text-emerald-800 font-semibold border border-emerald-200">Thành tiền</th>
                      <th className="text-center p-4 text-emerald-800 font-semibold border border-emerald-200">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(declaredItems).map(([key, data]) => (
                      <tr key={key} className="hover:bg-emerald-50/50 transition-colors">
                        <td className="p-4 border border-emerald-100">
                          <div>
                            <p className="font-medium text-emerald-900">{data.productData.productName}</p>
                            <p className="text-sm text-emerald-600">{data.section.name} → {data.subsection.name}</p>
                          </div>
                        </td>
                        <td className="text-center p-4 border border-emerald-100 text-emerald-700">
                          {data.productData.unit}
                        </td>
                        <td className="text-center p-4 border border-emerald-100 font-semibold text-emerald-800">
                          {data.productData.weight}
                        </td>
                        <td className="text-center p-4 border border-emerald-100 font-semibold text-emerald-800">
                          {data.productData.quantity}
                        </td>
                        <td className="text-right p-4 border border-emerald-100 text-emerald-700">
                          {data.productData.domesticRevenue ? formatCurrency(data.productData.domesticRevenue) : '-'}
                        </td>
                        <td className="text-right p-4 border border-emerald-100 font-bold text-emerald-900">
                          {formatCurrency(data.totalCost)}
                        </td>
                        <td className="text-center p-4 border border-emerald-100">
                          <button
                            onClick={() => {
                              setDeclaredItems(prev => {
                                const newItems = { ...prev };
                                delete newItems[key];
                                return newItems;
                              });
                            }}
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
            )}
          </div>
        </div>
      )}

      {/* Summary Modal */}
      {showSummary && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-emerald-200">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-bold text-emerald-900">📋 Bảng tổng hợp chi phí tái chế</h3>
              <button
                onClick={() => setShowSummary(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {Object.keys(declaredItems).length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <p className="text-emerald-600 text-lg">Chưa có sản phẩm nào được khai báo</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-lg">
                    <thead>
                      <tr className="bg-gradient-to-r from-emerald-600 to-green-700 text-white">
                        <th className="text-left p-4 font-bold">🌱 Tên sản phẩm</th>
                        <th className="text-center p-4 font-bold">📏 Đơn vị</th>
                        <th className="text-center p-4 font-bold">⚖️ Khối lượng</th>
                        <th className="text-center p-4 font-bold">🔢 Số lượng</th>
                        <th className="text-right p-4 font-bold">💰 Đơn giá</th>
                        <th className="text-right p-4 font-bold">💰 Doanh thu</th>
                        <th className="text-right p-4 font-bold">💳 Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(declaredItems).map(([key, data], index) => (
                        <tr key={key} className={`${index % 2 === 0 ? 'bg-emerald-50/50' : 'bg-white'} hover:bg-emerald-100/50 transition-colors`}>
                          <td className="p-4 border-b border-emerald-100">
                            <div>
                              <p className="font-semibold text-emerald-900">{data.productData.productName}</p>
                              <p className="text-sm text-emerald-600 mt-1">
                                📂 {data.section.name} → {data.subsection.name}
                              </p>
                            </div>
                          </td>
                          <td className="text-center p-4 border-b border-emerald-100">
                            <span className="inline-block bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-sm font-medium">
                              {data.productData.unit}
                            </span>
                          </td>
                          <td className="text-center p-4 border-b border-emerald-100">
                            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                              {data.productData.weight}
                            </span>
                          </td>
                          <td className="text-center p-4 border-b border-emerald-100">
                            <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-semibold">
                              {data.productData.quantity}
                            </span>
                          </td>
                          <td className="text-right p-4 border-b border-emerald-100 text-emerald-700 font-medium">
                            {formatCurrency(data.item.pricing.totalCost)}
                          </td>
                          <td className="text-right p-4 border-b border-emerald-100 text-emerald-700 font-medium">
                            {data.productData.domesticRevenue ? formatCurrency(data.productData.domesticRevenue) : '-'}
                          </td>
                          <td className="text-right p-4 border-b border-emerald-100 font-bold text-emerald-900">
                            {formatCurrency(data.totalCost)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-gradient-to-r from-emerald-600 to-green-700 rounded-xl p-6 text-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-xl font-bold mb-2">🌟 TỔNG CHI PHÍ TÁI CHẾ</h4>
                      <p className="text-emerald-100">Tổng cộng {Object.keys(declaredItems).length} sản phẩm</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold">
                        {formatCurrency(getTotalCost())}
                      </p>
                      <p className="text-emerald-200 text-sm mt-1">VND</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => {
                      exportToExcel();
                      alert('Đã gửi thành công! 🌱 Cảm ơn bạn đã quan tâm đến môi trường.');
                      setShowSummary(false);
                    }}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <Download className="w-6 h-6 mr-3 inline" />
                    🌍 Gửi báo cáo tái chế
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      
      <style jsx>{`
        .slide-in {
          animation: slideIn 0.3s ease-out forwards;
        }
        
        .slide-out {
          animation: slideOut 0.15s ease-in forwards;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default RecyclingCostNavigator;