import { useEffect, useState } from "react";

export function useMockLoading(key = "default", delay = 450) {
  const [activeKey, setActiveKey] = useState(key);
  const [ready, setReady] = useState(false);

  if (key !== activeKey) {
    setActiveKey(key);
    setReady(false);
  }

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setReady(true);
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [key, delay]);

  return !ready;
}
