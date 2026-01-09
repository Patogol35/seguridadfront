import { useState } from "react";
import { scanWebsite } from "../api/scanApi";
export const useScan = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const scan = async () => {
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const data = await scanWebsite(url);
      setResult(data);
    } catch {
      setError("Error al escanear el sitio");
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