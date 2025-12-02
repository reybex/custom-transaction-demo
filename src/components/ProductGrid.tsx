import { Material } from '../services/api';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  materials: Material[];
  isLoading?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ materials, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Ürünler yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (materials.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Ürün bulunamadı</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {materials.map((material) => (
        <ProductCard key={material.material_hid} material={material} />
      ))}
    </div>
  );
};

