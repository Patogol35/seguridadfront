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
import { motion, AnimatePresence } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 520,
          borderRadius: 4,
          boxShadow: 8,
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          {/* HEADER */}
          <Box display="flex" alignItems="center" mb={2}>
            <SecurityIcon color="primary" sx={{ mr: 1 }} />
            <Typography
              fontWeight="bold"
              sx={{ fontSize: { xs: "1.2rem", sm: "1.4rem" } }}
            >
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
            sx={{ mt: 2 }}
            onClick={scan}
            disabled={loading || !isValidUrl(url)}
          >
            {loading ? <CircularProgress size={24} /> : "Escanear"}
          </Button>

          {/* ERROR */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Typography color="error" mt={2}>
                  {error}
                </Typography>
              </motion.div>
            )}
          </AnimatePresence>

          {/* RESULT */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Divider sx={{ my: 3 }} />

                {/* RISK */}
                <Chip
                  size="small"
                  sx={{ mb: 1 }}
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
                <Stack spacing={0.5} mt={1}>
                  <Typography variant="body2">
                    XSS (heurístico):{" "}
                    <strong>
                      {result.tests.xss ? "Vulnerable" : "Seguro"}
                    </strong>
                  </Typography>
                  <Typography variant="body2">
                    SQLi (heurístico):{" "}
                    <strong>
                      {result.tests.sqli ? "Vulnerable" : "Seguro"}
                    </strong>
                  </Typography>
                </Stack>

                {/* ISSUES */}
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" fontWeight="bold">
                  Issues detectadas
                </Typography>

                <Stack spacing={1} mt={1}>
                  {result.issues.length === 0 ? (
                    <Typography variant="body2">
                      ✔ No se detectaron problemas
                    </Typography>
                  ) : (
                    result.issues.map((issue, i) => (
                      <Chip
                        key={i}
                        label={issue}
                        size="small"
                        color="warning"
                        variant="outlined"
                      />
                    ))
                  )}
                </Stack>

                {/* RECOMMENDATIONS */}
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" fontWeight="bold">
                  Recomendaciones
                </Typography>

                <Stack spacing={0.5} mt={1}>
                  {result.recommendations.length === 0 ? (
                    <Typography variant="body2">
                      ✔ Sin acciones urgentes
                    </Typography>
                  ) : (
                    result.recommendations.map((rec, i) => (
                      <Typography key={i} variant="body2">
                        • {rec}
                      </Typography>
                    ))
                  )}
                </Stack>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
          }
