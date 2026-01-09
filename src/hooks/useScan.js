import { useState } from "react";
import { scanWebsite } from "../api/scanApi";

export const useScan = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const scan = async () => {
    if (!url) return;

    // ✅ VALIDACIÓN DE URL (evita pantalla negra)
    try {
      new URL(url);
    } catch {
      setError("Por favor ingresa una URL válida (ej: https://example.com)");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await scanWebsite(url);
      setResult(data);
    } catch (err) {
      setError(
        err.response?.data?.detail || "Error al escanear el sitio"
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
