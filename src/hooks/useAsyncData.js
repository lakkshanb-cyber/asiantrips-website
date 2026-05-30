import { useCallback, useEffect, useState } from 'react';

export const useAsyncData = (loader, initialValue) => {
  const [data, setData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      setData(await loader());
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [loader]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, setData, isLoading, error, refresh };
};
