import { useState } from "react";
import { scanWebsite } from "../api/scanApi";

const isValidUrl = (string) => {
  if (!string || typeof string !== "string") return false;
  try {
    const urlStr = string.trim();
    const url = new URL(urlStr.startsWith("http") ? urlStr : `https://${urlStr}`);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
};

export const useScan = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const scan = async () => {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      setError("Por favor ingresa una URL.");
      return;
    }

    if (!isValidUrl(trimmedUrl)) {
      setError("URL inválida. Ejemplo: https://ejemplo.com");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await scanWebsite(trimmedUrl);
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
