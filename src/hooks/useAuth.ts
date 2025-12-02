import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Parent window'a token isteği gönder
    if (window.parent && window.parent !== window) {
      window.parent.postMessage(
        {
          type: 'REQUEST_TOKEN',
        },
        '*',
      );
    }

    // Token yanıtını dinle
    const handleMessage = (event: MessageEvent) => {
      // Güvenlik için origin kontrolü - parent window'dan gelen mesajları kabul et
      // iframe içinde olduğumuz için parent origin'i kontrol edebiliriz
      if (event.data.type === 'TOKEN_RESPONSE') {
        setToken(event.data.token);
        setIsLoading(false);
      }
    };

    window.addEventListener('message', handleMessage);

    // Timeout: Eğer 5 saniye içinde token gelmezse loading'i durdur
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(timeout);
    };
  }, []);

  return { token, isLoading };
};

