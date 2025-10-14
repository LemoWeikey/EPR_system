import * as XLSX from 'xlsx';
import { calculateSubItemCost, getTotalCost } from './calculations';

export const exportToExcel = (mainProducts, subItems) => {
  const excelData = [];

  mainProducts.forEach((mainProduct, mainIndex) => {
    if (subItems[mainIndex] && subItems[mainIndex].length > 0) {
      subItems[mainIndex].forEach((subItem) => {
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
    'Thành tiền (VND)': getTotalCost(mainProducts, subItems)
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

export const exportEPRFormat = (mainProducts, subItems) => {
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
