import { Package, Zap, Droplet, Car } from 'lucide-react';

export const recyclingData = {
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
                "adjustmentFactor": 0.15,
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
                "adjustmentFactor": 0.22,
                "managementCost": 48.0,
                "totalCost": 2448.0
              }
            },
            {
              "name": "A.2.2-Bao bì sắt và kim loại khác",
              "pricing": {
                "baseCost": 9000,
                "adjustmentFactor": 0.2,
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
                "adjustmentFactor": 0.22,
                "managementCost": 39.0,
                "totalCost": 1979.0
              }
            },
            {
              "name": "A.3.2-Bao bì HDPE, LDPE, PP, PS cứng",
              "pricing": {
                "baseCost": 9700,
                "adjustmentFactor": 0.15,
                "managementCost": 78.0,
                "totalCost": 3958.0
              }
            },
            {
              "name": "A.3.3.1-Bao bì EPS,PVC cứng và bao bì nhựa cứng khác - Bao bì EPS cứng",
              "pricing": {
                "baseCost": 9700,
                "adjustmentFactor": 0.1,
                "managementCost": 116.0,
                "totalCost": 5936.0
              }
            },
            {
              "name": "A.3.3.2-Bao bì EPS,PVC cứng và bao bì nhựa cứng khác - Bao bì PVC cứng",
              "pricing": {
                "baseCost": 9700,
                "adjustmentFactor": 0.1,
                "managementCost": 116.0,
                "totalCost": 7915.0
              }
            },
            {
              "name": "A.3.3.3-Bao bì EPS,PVC cứng và bao bì nhựa cứng khác - Bao bì nhụa cứng khác",
              "pricing": {
                "baseCost": 9700,
                "adjustmentFactor": 0.1,
                "managementCost": 116.0,
                "totalCost": 5936.0
              }
            },
            {
              "name": "A.3.4.1-Bao bì nhựa mềm - Bao bì đơn vật liệu mềm",
              "pricing": {
                "baseCost": 10400,
                "adjustmentFactor": 0.1,
                "managementCost": 166.0,
                "totalCost": 8486.0
              }
            },
            {
              "name": "A.3.4.2-Bao bì nhựa mềm - Bao bì đa vật liệu mềm",
              "pricing": {
                "baseCost": 10700,
                "adjustmentFactor": 0.1,
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
                "adjustmentFactor": 0.15,
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
                "adjustmentFactor": 0.12,
                "managementCost": 358.0,
                "totalCost": 18278.0
              }
            },
            {
              "name": "B.1.2-Ắc quy các loại khác",
              "pricing": {
                "baseCost": 49800,
                "adjustmentFactor": 0.08,
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
                "adjustmentFactor": 0.08,
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
                "adjustmentFactor": 0.15,
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
                "adjustmentFactor": 0.05,
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
                "adjustmentFactor": 0.05,
                "managementCost": 162.0,
                "totalCost": 8262.0
              }
            },
            {
              "name": "Đ.1.2-Điều hoà không khí",
              "pricing": {
                "baseCost": 14500,
                "adjustmentFactor": 0.05,
                "managementCost": 174.0,
                "totalCost": 8874.0
              }
            },
            {
              "name": "Đ.1.3-Bếp điện, bếp từ, bếp hồng ngoại, lò nướng, lò vi sóng",
              "pricing": {
                "baseCost": 12200,
                "adjustmentFactor": 0.05,
                "managementCost": 146.0,
                "totalCost": 7466.0
              }
            },
            {
              "name": "Đ.1.4-Máy giặt, máy sấy quần áo",
              "pricing": {
                "baseCost": 12400,
                "adjustmentFactor": 0.09,
                "managementCost": 149.0,
                "totalCost": 7589.0
              }
            },
            {
              "name": "Đ.1.5-Loa, âm ly",
              "pricing": {
                "baseCost": 12250,
                "adjustmentFactor": 0.09,
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
                "adjustmentFactor": 0.07,
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
