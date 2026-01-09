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
  isLandscape,
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card
        sx={{
          width: "100%",
          maxWidth: isLandscape ? 900 : 520,
          borderRadius: 3,
          boxShadow: 6,
          mt: isLandscape ? 1 : 0,
        }}
      >
        <CardContent
          sx={{
            p: isLandscape ? 1.5 : 3,
            maxHeight: isLandscape ? "85vh" : "none",
            overflowY: isLandscape ? "auto" : "visible",
          }}
        >
          {/* HEADER */}
          <Box display="flex" alignItems="center" mb={1}>
            <SecurityIcon color="primary" sx={{ mr: 1 }} />
            <Typography fontWeight="bold" fontSize="1.2rem">
              Web Security Analyzer
            </Typography>
          </Box>

          {/* INPUT */}
          <TextField
            fullWidth
            size="small"
            label="URL del sitio"
            value={url}
            onChange={(e) => setUrl(e.target.value.trim())}
            error={url.length > 0 && !isValidUrl(url)}
            helperText={
              url.length > 0 && !isValidUrl(url)
                ? "URL inválida (ej: example.com)"
                : ""
            }
          />

          {/* BUTTON */}
          <Button
            fullWidth
            size="small"
            variant="contained"
            sx={{ mt: 1.5 }}
            onClick={scan}
            disabled={loading || !isValidUrl(url)}
          >
            {loading ? <CircularProgress size={20} /> : "Escanear"}
          </Button>

          {/* ERROR */}
          {error && (
            <Typography color="error" mt={1} variant="body2">
              {error}
            </Typography>
          )}

          {/* RESULT */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Divider sx={{ my: 1.5 }} />

                <Chip
                  size="small"
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

                <Stack spacing={0.3} mt={1}>
                  <Typography variant="body2">
                    XSS:{" "}
                    <strong>
                      {result.tests.xss ? "Vulnerable" : "Seguro"}
                    </strong>
                  </Typography>
                  <Typography variant="body2">
                    SQLi:{" "}
                    <strong>
                      {result.tests.sqli ? "Vulnerable" : "Seguro"}
                    </strong>
                  </Typography>
                </Stack>

                <Divider sx={{ my: 1 }} />

                <Typography fontWeight="bold" variant="body2">
                  Issues
                </Typography>

                <Stack spacing={0.5} mt={0.5}>
                  {result.issues.length === 0 ? (
                    <Typography variant="body2">
                      ✔ Sin problemas
                    </Typography>
                  ) : (
                    result.issues.map((issue, i) => (
                      <Chip
                        key={i}
                        label={issue}
                        size="small"
                        variant="outlined"
                        color="warning"
                      />
                    ))
                  )}
                </Stack>

                <Divider sx={{ my: 1 }} />

                <Typography fontWeight="bold" variant="body2">
                  Recomendaciones
                </Typography>

                <Stack spacing={0.3} mt={0.5}>
                  {result.recommendations.map((rec, i) => (
                    <Typography key={i} variant="body2">
                      • {rec}
                    </Typography>
                  ))}
                </Stack>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
