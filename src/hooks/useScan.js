import { useState } from "react";
import { scanWebsite } from "../api/scanApi";

export const useScan = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const scan = async (finalUrl) => {
    if (!finalUrl) return;

    setLoading(true);
    setError(null);

    try {
      const data = await scanWebsite(finalUrl);
      setResult(data);
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          "Error al escanear el sitio"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    url,
    setUrl,
    loading,
    result,
    error,
    scan,
  };
};
