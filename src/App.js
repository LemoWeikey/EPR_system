import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, Package, Zap, Droplet, Car, FileText, DollarSign, Info, CheckCircle, Send, X, Plus, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

const RecyclingCostNavigator = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSubsection, setSelectedSubsection] = useState(null);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [animationClass, setAnimationClass] = useState('');
  
  const [mainProducts, setMainProducts] = useState([]);
  const [currentMainProduct, setCurrentMainProduct] = useState({
    productName: '',
    unit: 'Thùng',
    domesticRevenue: '',
    quantity: ''
  });
  const [editingMainProductIndex, setEditingMainProductIndex] = useState(null);
  const [showMainProductForm, setShowMainProductForm] = useState(false);
  
  const [subItems, setSubItems] = useState({});
  const [showSubItemForm, setShowSubItemForm] = useState(false);
  const [currentSubItem, setCurrentSubItem] = useState(null);
  const [currentMainProductIndex, setCurrentMainProductIndex] = useState(null);
  
  const [tempSubItems, setTempSubItems] = useState([{
    id: Date.now(),
    productName: '',
    packagingType: 'direct',
    specification: '',
    weight: ''
  }]);
  
  const [showDeclaredItems, setShowDeclaredItems] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const openMainProductForm = () => {
    setCurrentMainProduct({
      productName: '',
      unit: 'Thùng',
      domesticRevenue: '',
      quantity: ''
    });
    setEditingMainProductIndex(null);
    setShowMainProductForm(true);
  };

  const saveMainProduct = () => {
    if (currentMainProduct.productName && currentMainProduct.quantity && parseFloat(currentMainProduct.quantity) > 0) {
      if (editingMainProductIndex !== null) {
        const updated = [...mainProducts];
        updated[editingMainProductIndex] = { ...currentMainProduct };
        setMainProducts(updated);
      } else {
        setMainProducts([...mainProducts, { ...currentMainProduct }]);
      }
      setShowMainProductForm(false);
    }
  };

  const deleteMainProduct = (index) => {
    setMainProducts(mainProducts.filter((_, i) => i !== index));
    const newSubItems = { ...subItems };
    delete newSubItems[index];
    setSubItems(newSubItems);
  };

  const openCatalog = (mainProductIndex) => {
    setCurrentMainProductIndex(mainProductIndex);
    setCurrentPage('catalog');
  };

  const handleSectionClick = (section) => {
    setAnimationClass('slide-out');
    setTimeout(() => {
      setSelectedSection(section);
      setSelectedSubsection(null);
      setBreadcrumb([{ name: 'Danh mục bao bì', level: 'catalog' }]);
      setAnimationClass('slide-in');
    }, 150);
  };

  const handleSubsectionClick = (subsection) => {
    setAnimationClass('slide-out');
    setTimeout(() => {
      setSelectedSubsection(subsection);
      setBreadcrumb([
        { name: 'Danh mục bao bì', level: 'catalog' },
        { name: selectedSection.name, level: 'section' }
      ]);
      setAnimationClass('slide-in');
    }, 150);
  };

  const handleBackFromCatalog = () => {
    if (selectedSubsection) {
      setAnimationClass('slide-out');
      setTimeout(() => {
        setSelectedSubsection(null);
        setBreadcrumb([{ name: 'Danh mục bao bì', level: 'catalog' }]);
        setAnimationClass('slide-in');
      }, 150);
    } else if (selectedSection) {
      setAnimationClass('slide-out');
      setTimeout(() => {
        setSelectedSection(null);
        setBreadcrumb([]);
        setAnimationClass('slide-in');
      }, 150);
    } else {
      setCurrentPage('home');
      setSelectedSection(null);
      setSelectedSubsection(null);
      setBreadcrumb([]);
    }
  };

  const openSubItemForm = (item) => {
    setCurrentSubItem(item);
    setTempSubItems([{
      id: Date.now(),
      productName: item.name,
      packagingType: 'direct',
      specification: '',
      weight: ''
    }]);
    setShowSubItemForm(true);
  };

  const addTempSubItem = () => {
    setTempSubItems([...tempSubItems, {
      id: Date.now() + Math.random(),
      productName: currentSubItem?.name || '',
      packagingType: 'direct',
      specification: '',
      weight: ''
    }]);
  };

  const removeTempSubItem = (id) => {
    if (tempSubItems.length > 1) {
      setTempSubItems(tempSubItems.filter(item => item.id !== id));
    }
  };

  const updateTempSubItem = (id, field, value) => {
    setTempSubItems(tempSubItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const saveSubItems = () => {
    const validItems = tempSubItems.filter(item => 
      item.productName && item.weight && parseFloat(item.weight) > 0
    );

    if (validItems.length > 0 && currentMainProductIndex !== null && currentSubItem) {
      const newSubItems = { ...subItems };
      if (!newSubItems[currentMainProductIndex]) {
        newSubItems[currentMainProductIndex] = [];
      }
      
      validItems.forEach(item => {
        newSubItems[currentMainProductIndex].push({
          ...item,
          catalogItem: currentSubItem,
          section: selectedSection,
          subsection: selectedSubsection
        });
      });
      
      setSubItems(newSubItems);
      setShowSubItemForm(false);
      setCurrentSubItem(null);
    }
  };

  const deleteSubItem = (mainProductIndex, subItemIndex) => {
    const newSubItems = { ...subItems };
    newSubItems[mainProductIndex].splice(subItemIndex, 1);
    if (newSubItems[mainProductIndex].length === 0) {
      delete newSubItems[mainProductIndex];
    }
    setSubItems(newSubItems);
  };

  const calculateSubItemCost = (mainProduct, subItem) => {
    const quantity = parseFloat(mainProduct.quantity) || 0;
    const specification = parseFloat(subItem.specification) || 0;
    const weight = parseFloat(subItem.weight) || 0;
    const totalCost = subItem.catalogItem.pricing.totalCost;
    const adjustmentFactor = subItem.catalogItem.pricing.adjustmentFactor;
    
    return quantity * specification * weight * totalCost * adjustmentFactor;
  };

  const getTotalSubItemsCount = () => {
    return Object.values(subItems).reduce((sum, items) => sum + items.length, 0);
  };

  const getTotalCost = () => {
    let total = 0;
    mainProducts.forEach((mainProduct, index) => {
      if (subItems[index]) {
        subItems[index].forEach(subItem => {
          total += calculateSubItemCost(mainProduct, subItem);
        });
      }
    });
    return total;
  };

  const exportToExcel = () => {
    const excelData = [];
    
    mainProducts.forEach((mainProduct, mainIndex) => {
      if (subItems[mainIndex] && subItems[mainIndex].length > 0) {
        subItems[mainIndex].forEach((subItem, subIndex) => {
          excelData.push({
            'STT': excelData.length + 1,
            'Tên sản phẩm': mainProduct.productName,
            'Đơn vị tính': mainProduct.unit,
            'Doanh thu trong nước (VND)': mainProduct.domesticRevenue ? parseFloat(mainProduct.domesticRevenue) : 0,
            'Số lượng': parseFloat(mainProduct.quantity),
            'Tên bao bì': subItem.productName,
            'Mã định mức': subItem.catalogItem.name.replace('-', '. '),
            'Bao bì': subItem.packagingType === 'direct' ? 'Bao bì trực tiếp' : 'Bao bì ngoài',
            'Quy Cách': parseFloat(subItem.specification) || 0,
            'Khối lượng (kg)': parseFloat(subItem.weight),
            'Đơn giá (VND)': subItem.catalogItem.pricing.totalCost,
            'Thành tiền (VND)': calculateSubItemCost(mainProduct, subItem)
          });
        });
      }
    });

    excelData.push({
      'STT': '',
      'Tên sản phẩm': '',
      'Đơn vị tính': '',
      'Doanh thu trong nước (VND)': '',
      'Số lượng': '',
      'Tên bao bì': '',
      'Mã định mức': '',
      'Bao bì': '',
      'Quy Cách': '',
      'Khối lượng (kg)': '',
      'Đơn giá (VND)': 'TỔNG CỘNG:',
      'Thành tiền (VND)': getTotalCost()
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    worksheet['!cols'] = [
      { wch: 5 },
      { wch: 30 },
      { wch: 12 },
      { wch: 25 },
      { wch: 12 },
      { wch: 40 },
      { wch: 30 },
      { wch: 20 },
      { wch: 12 },
      { wch: 15 },
      { wch: 15 },
      { wch: 18 }
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Báo cáo tái chế');

    const date = new Date();
    const filename = `Bao_cao_tai_che_${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}.xlsx`;
    XLSX.writeFile(workbook, filename);
  };

  const exportEPRFormat = () => {
    const transformedData = [];
    let counter = 1;
  
    mainProducts.forEach((mainProduct, mainIndex) => {
      if (subItems[mainIndex] && subItems[mainIndex].length > 0) {
        transformedData.push({
          'TT': String(counter),
          'Danh mục sản phẩm, hàng hóa': mainProduct.productName.trim(),
          'Đơn vị tính': mainProduct.unit.toLowerCase(),
          'Bao bì': '',
          'Quy cách đóng gói': '',
          'Khối lượng / 1 đơn vị SP (Kg)': '',
          'Số lượng': parseFloat(mainProduct.quantity),
          'Doanh thu trong nước': mainProduct.domesticRevenue ? parseFloat(mainProduct.domesticRevenue) : 0
        });
  
        subItems[mainIndex].forEach((subItem, subIndex) => {
          transformedData.push({
            'TT': `${counter}.${subIndex + 1}`,
            'Danh mục sản phẩm, hàng hóa': subItem.catalogItem.name.replace('-', '. '),
            'Đơn vị tính': 'kg',
            'Bao bì': subItem.packagingType === 'direct' ? 'Bao bì trực tiếp' : 'Bao bì ngoài',
            'Quy cách đóng gói': parseFloat(subItem.specification) || '',
            'Khối lượng / 1 đơn vị SP (Kg)': parseFloat(subItem.weight),
            'Số lượng': parseFloat(mainProduct.quantity),
            'Doanh thu trong nước': ''
          });
        });
  
        counter++;
      }
    });
  
    const worksheet = XLSX.utils.json_to_sheet(transformedData);
    worksheet['!cols'] = [
      { wch: 8 },
      { wch: 50 },
      { wch: 12 },
      { wch: 20 },
      { wch: 20 },
      { wch: 25 },
      { wch: 12 },
      { wch: 25 }
    ];
  
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, '1.1. Bao bì');
  
    const date = new Date();
    const filename = `Bao_cao_ke_khai_EPR_${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}.xlsx`;
    XLSX.writeFile(workbook, filename);
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
                  handleBackFromCatalog();
                } else if (item.level === 'section') {
                  handleBackFromCatalog();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 -left-32 w-64 h-64 bg-emerald-300 rounded-full opacity-15"></div>
        <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-teal-200 rounded-full opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {currentPage === 'landing' && (
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
                onClick={() => setCurrentPage('home')}
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
        )}

        {currentPage === 'home' && (
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
                  onClick={openMainProductForm}
                  className="flex items-center bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Khai báo
                </button>
                
                <button
                  onClick={() => setShowDeclaredItems(true)}
                  className="flex items-center bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Kiểm tra đã khai báo ({getTotalSubItemsCount()})
                </button>
                
                <button
                  onClick={() => setShowSummary(true)}
                  disabled={getTotalSubItemsCount() === 0}
                  className={`flex items-center px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 ${
                    getTotalSubItemsCount() > 0 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-5 h-5 mr-2" />
                  Gửi ({getTotalSubItemsCount()} items)
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
                            onClick={() => openCatalog(index)}
                            className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-semibold transition-all"
                          >
                            Danh mục bao bì
                          </button>
                          <button
                            onClick={() => deleteMainProduct(index)}
                            className="text-red-500 hover:text-red-700 transition-colors"
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
        )}

        {currentPage === 'catalog' && (
          <div className={`space-y-6 ${animationClass}`}>
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={handleBackFromCatalog}
                className="flex items-center text-emerald-700 hover:text-emerald-900 transition-colors group bg-white/70 backdrop-blur-sm rounded-lg px-4 py-2 border border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 shadow-sm"
              >
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Quay lại</span>
              </button>
              
              {(selectedSection || selectedSubsection) && (
                <button
                  onClick={() => setCurrentPage('home')}
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
                        onClick={() => handleSectionClick(section)}
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
                  {selectedSection.subsections.map((subsection) => (
                    <div
                      key={subsection.id}
                      onClick={() => handleSubsectionClick(subsection)}
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
                            <span className="font-medium">{subsection.items.length} sản phẩm</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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
                  {selectedSubsection.items.map((item, index) => (
                    <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-emerald-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-emerald-900 mb-6">
                          {item.name.replace('-', '. ')}
                        </h3>
                        
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
                            onClick={() => openSubItemForm(item)}
                            className="flex items-center bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                          >
                            <Plus className="w-5 h-5 mr-2" />
                            Thêm bao bì
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {showMainProductForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full border border-emerald-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-emerald-900">Khai báo sản phẩm</h3>
              <button
                onClick={() => setShowMainProductForm(false)}
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
                  onChange={(e) => setCurrentMainProduct({...currentMainProduct, productName: e.target.value})}
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
                  onChange={(e) => setCurrentMainProduct({...currentMainProduct, unit: e.target.value})}
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
                  Doanh thu trong nước (VND):
                </label>
                <input
                  type="number"
                  value={currentMainProduct.domesticRevenue}
                  onChange={(e) => setCurrentMainProduct({...currentMainProduct, domesticRevenue: e.target.value})}
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
                  onChange={(e) => setCurrentMainProduct({...currentMainProduct, quantity: e.target.value})}
                  className="w-full p-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="Nhập số lượng..."
                  min="0"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-8">
              <button
                onClick={() => setShowMainProductForm(false)}
                className="flex-1 px-4 py-3 border-2 border-emerald-200 text-emerald-700 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={saveMainProduct}
                disabled={!currentMainProduct.productName || !currentMainProduct.quantity || parseFloat(currentMainProduct.quantity) <= 0}
                className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-colors ${
                  currentMainProduct.productName && currentMainProduct.quantity && parseFloat(currentMainProduct.quantity) > 0
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Lưu sản phẩm
              </button>
            </div>
          </div>
        </div>
      )}

      {showSubItemForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-emerald-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-emerald-900">Khai báo bao bì</h3>
              <button
                onClick={() => setShowSubItemForm(false)}
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
                        onClick={() => removeTempSubItem(subItem.id)}
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
                        onChange={(e) => updateTempSubItem(subItem.id, 'productName', e.target.value)}
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
                        onChange={(e) => updateTempSubItem(subItem.id, 'packagingType', e.target.value)}
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
                        onChange={(e) => updateTempSubItem(subItem.id, 'specification', e.target.value)}
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
                        onChange={(e) => updateTempSubItem(subItem.id, 'weight', e.target.value)}
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
                onClick={addTempSubItem}
                className="flex items-center bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <Plus className="w-5 h-5 mr-2" />
                Thêm bao bì
              </button>
            </div>
            
            <div className="flex space-x-3 mt-8">
              <button
                onClick={() => setShowSubItemForm(false)}
                className="flex-1 px-4 py-3 border-2 border-emerald-200 text-emerald-700 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={saveSubItems}
                disabled={!tempSubItems.some(item => item.productName && item.weight && parseFloat(item.weight) > 0)}
                className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-colors ${
                  tempSubItems.some(item => item.productName && item.weight && parseFloat(item.weight) > 0)
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Lưu bao bì
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeclaredItems && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-emerald-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-emerald-900">Danh sách đã khai báo</h3>
              <button
                onClick={() => setShowDeclaredItems(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {getTotalSubItemsCount() === 0 ? (
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
                                    onClick={() => deleteSubItem(mainIndex, subIndex)}
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
      )}

      {showSummary && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-emerald-200">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-bold text-emerald-900">Bảng tổng hợp chi phí tái chế</h3>
              <button
                onClick={() => setShowSummary(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {getTotalSubItemsCount() === 0 ? (
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
                      <p className="text-emerald-100">Tổng cộng {getTotalSubItemsCount()} bao bì</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold">
                        {formatCurrency(getTotalCost())}
                      </p>
                      <p className="text-emerald-200 text-sm mt-1">VND</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center gap-4 mt-8">
                  <button
                    onClick={() => {
                      exportToExcel();
                      alert('Đã gửi thành công! Cảm ơn bạn đã quan tâm đến môi trường.');
                      setShowSummary(false);
                    }}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center"
                  >
                    <Download className="w-6 h-6 mr-3" />
                    Gửi báo cáo tái chế
                  </button>
                  
                  <button
                    onClick={() => {
                      exportEPRFormat();
                      alert('Đã xuất báo cáo kê khai EPR thành công!');
                      setShowSummary(false);
                    }}
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