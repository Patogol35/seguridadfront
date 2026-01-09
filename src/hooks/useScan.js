import { useState } from "react";
import { scanWebsite } from "../api/scanApi";

export const useScan = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const scan = async () => {
    if (!url) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formattedUrl = url.startsWith("http")
        ? url
        : `https://${url}`;

      const data = await scanWebsite(formattedUrl);
      setResult(data);
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          "No se pudo analizar el sitio. Verifica la URL."
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
