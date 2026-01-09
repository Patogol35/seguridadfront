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

const isValidUrl = (value) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

export default function ScanCard({
  url,
  setUrl,
  scan,
  loading,
  result,
  error,
}) {
  const riskColor = (level) => {
    if (level === "ALTO") return "error";
    if (level === "MEDIO") return "warning";
    return "success";
  };

  const canScan = isValidUrl(url);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ width: "100%" }}
    >
      <Card
        sx={{
          borderRadius: 4,
          boxShadow: 8,
          width: "100%",
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          {/* HEADER */}
          <Box display="flex" alignItems="center" mb={2}>
            <SecurityIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Web Security Analyzer
            </Typography>
          </Box>

          {/* INPUT */}
          <TextField
            fullWidth
            label="URL del sitio"
            placeholder="https://ejemplo.com"
            value={url}
            onChange={(e) => setUrl(e.target.value.trim())}
            error={url.length > 0 && !canScan}
            helperText={
              url.length > 0 && !canScan
                ? "Ingresa una URL válida"
                : " "
            }
          />

          {/* BUTTON */}
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, height: 48 }}
            onClick={scan}
            disabled={loading || !canScan}
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

              <Stack spacing={1} mt={2}>
                <Typography>
                  XSS:{" "}
                  <strong>
                    {result.tests.xss ? "Vulnerable" : "Seguro"}
                  </strong>
                </Typography>
                <Typography>
                  SQLi:{" "}
                  <strong>
                    {result.tests.sqli ? "Vulnerable" : "Seguro"}
                  </strong>
                </Typography>
              </Stack>

              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" fontWeight="bold">
                Issues detectadas
              </Typography>

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

              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" fontWeight="bold">
                Recomendaciones
              </Typography>

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
