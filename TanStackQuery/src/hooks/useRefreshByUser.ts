import { useState, useCallback } from 'react';

export function useRefreshByUser(refetch: () => Promise<unknown>) {
  const [isRefetchingByUser, setIsRefetchingByUser] = useState(false)

  const refetchByUser = useCallback(async () => {
    if (isRefetchingByUser) return;

    setIsRefetchingByUser(true)

    try {
      await refetch()
    } finally {
      setIsRefetchingByUser(false)
    }
  }, [refetch, isRefetchingByUser]);

  return {
    isRefetchingByUser,
    refetchByUser,
  }
}
