const API_BASE_URL = 'https://core-backend.reybex.com/api';

export interface Material {
  material_hid: number;
  materialTranslation_name: string;
  material_name: string;
  material_sku: string;
  material_salesPrice: number;
  material_salesPriceGross: number;
  material_stock: number;
  material_avail: number;
  material_picture: string | null;
  brand_name: string | null;
  vendor_name: string | null;
  matGroup_name: string;
  material_gtin: string | null;
  material_asin: string | null;
  material_costPrice: number;
  material_purPrice: number;
  material_rrp: number;
  currency_code: string | null;
  warehouseUnit_name: string;
  material_status: {
    errors: string[];
    warnings: string[];
  };
}

export interface MaterialsResponse {
  total: number;
  data: Material[];
  meta: {
    tokenFields: any[];
    total: number;
    tableSettings: any[];
    pivotSettings: any[];
    filters: any[];
  };
}

export const getMaterials = async (token: string): Promise<MaterialsResponse> => {
  const response = await fetch(`${API_BASE_URL}/material/list?page=1&take=25&skip=0&pageSize=25&isFromMaterialList=true&showNotDeletedMaterials=1`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'accept-language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
      'authorization': `Basic ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      page: 1,
      take: 25,
      skip: 0,
      pageSize: 25,
      isFromMaterialList: true,
      showNotDeletedMaterials: 1,
    }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

