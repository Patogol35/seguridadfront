import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Chip,
  Stack,
  Divider,
  Box,
} from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";

/* ======================
UTILS
====================== */
const isValidUrl = (value) => {
  if (!value) return false;
  try {
    new URL(value.startsWith("http") ? value : `https://${value}`);
    return value.length > 5;
  } catch {
    return false;
  }
};

const riskColor = (level) => {
  if (level === "ALTO") return "error";
  if (level === "MEDIO") return "warning";
  return "success";
};

export default function ScanCard({
  url,
  setUrl,
  scan,
  loading,
  result,
  error,
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card
        sx={{
          width: "100%",
          borderRadius: 4,
          boxShadow: 6,
        }}
      >
        <CardContent>
          {/* HEADER */}
          <Box display="flex" alignItems="center" mb={2}>
            <SecurityIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h5" fontWeight="bold">
              Web Security Analyzer
            </Typography>
          </Box>

          {/* INPUT */}
          <TextField
            fullWidth
            label="URL del sitio"
            value={url}
            onChange={(e) => setUrl(e.target.value.trim())}
            error={url.length > 0 && !isValidUrl(url)}
            helperText={
              url.length > 0 && !isValidUrl(url)
                ? "Ingresa una URL válida (ej: https://example.com)"
                : ""
            }
          />

          {/* BUTTON */}
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            onClick={scan}
            disabled={loading || !isValidUrl(url)}
          >
            {loading ? <CircularProgress size={24} /> : "Escanear"}
          </Button>

          {/* ERROR */}
          {error && (
            <Typography color="error" mt={2}>
              {error}
            </Typography>
          )}

          {/* RESULT */}
          {result && (
            <>
              <Divider sx={{ my: 3 }} />

              {/* RISK */}
              <Chip
                label={`Riesgo: ${result.risk.level} (${result.risk.score})`}
                color={riskColor(result.risk.level)}
                icon={
                  result.risk.level === "ALTO" ? (
                    <WarningIcon />
                  ) : (
                    <CheckCircleIcon />
                  )
                }
              />

              {/* TESTS */}
              <Stack spacing={1} mt={2}>
                <Typography>
                  XSS (heurístico):{" "}
                  <strong>
                    {result.tests.xss ? "Vulnerable" : "Seguro"}
                  </strong>
                </Typography>
                <Typography>
                  SQLi (heurístico):{" "}
                  <strong>
                    {result.tests.sqli ? "Vulnerable" : "Seguro"}
                  </strong>
                </Typography>
              </Stack>

              {/* ISSUES */}
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6">Issues detectadas</Typography>

              <Stack spacing={1} mt={1}>
                {result.issues.length === 0 ? (
                  <Typography>✔ No se detectaron problemas</Typography>
                ) : (
                  result.issues.map((issue, i) => (
                    <Chip
                      key={i}
                      label={issue}
                      color="warning"
                      variant="outlined"
                    />
                  ))
                )}
              </Stack>

              {/* RECOMMENDATIONS */}
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6">Recomendaciones</Typography>

              <Stack spacing={1} mt={1}>
                {result.recommendations.length === 0 ? (
                  <Typography>✔ Sin acciones urgentes</Typography>
                ) : (
                  result.recommendations.map((rec, i) => (
                    <Typography key={i}>• {rec}</Typography>
                  ))
                )}
              </Stack>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
