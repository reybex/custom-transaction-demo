import { Material } from '../services/api';

interface ProductCardProps {
  material: Material;
}

export const ProductCard: React.FC<ProductCardProps> = ({ material }) => {
  const imageUrl = material.material_picture
    ? material.material_picture.match(/src='([^']+)'/)?.[1] || null
    : null;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
      <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={material.materialTranslation_name || material.material_name}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="text-gray-400 text-4xl">
            <svg
              className="w-24 h-24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 min-h-[3rem]">
          {material.materialTranslation_name || material.material_name}
        </h3>

        <div className="space-y-2 text-sm text-gray-600">
          {material.material_sku && (
            <div className="flex items-center gap-2">
              <span className="font-medium">SKU:</span>
              <span>{material.material_sku}</span>
            </div>
          )}

          {material.brand_name && (
            <div className="flex items-center gap-2">
              <span className="font-medium">Marka:</span>
              <span>{material.brand_name}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="font-medium">Kategori:</span>
            <span>{material.matGroup_name}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">Satış Fiyatı</span>
            <span className="text-xl font-bold text-green-600">
              {material.material_salesPriceGross?.toFixed(2) || '0.00'} ₺
            </span>
          </div>

          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">Stok</span>
            <span className={`font-semibold ${material.material_stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {material.material_stock || 0} {material.warehouseUnit_name}
            </span>
          </div>

          {material.material_costPrice > 0 && (
            <div className="flex justify-between items-center text-xs text-gray-400">
              <span>Maliyet:</span>
              <span>{material.material_costPrice.toFixed(2)} ₺</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

