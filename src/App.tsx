import { useEffect, useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { getMaterials, Material } from './services/api';
import { ProductGrid } from './components/ProductGrid';

function App() {
  const { token, isLoading: authLoading } = useAuth();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token && !authLoading) {
      setIsLoading(true);
      setError(null);

      getMaterials(token)
        .then((response) => {
          setMaterials(response.data);
        })
        .catch((err) => {
          setError(err.message || 'Ürünler yüklenirken bir hata oluştu');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [token, authLoading]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Kimlik doğrulama yapılıyor...</p>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
          <div className="text-red-500 text-5xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Erişim Reddedildi</h1>
          <p className="text-gray-600 mb-4">
            Bu uygulamaya erişmek için yetkilendirme gerekli. Lütfen ana uygulamadan açın.
          </p>
          <p className="text-sm text-gray-500">
            Token alınamadı. Bu sayfa iframe içinde açılmalıdır.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Hata Oluştu</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Ürün Listesi</h1>
          <p className="text-sm text-gray-600 mt-1">
            {materials.length} ürün gösteriliyor
          </p>
        </div>
      </header>

      <main>
        <ProductGrid materials={materials} isLoading={isLoading} />
      </main>
    </div>
  );
}

export default App;

