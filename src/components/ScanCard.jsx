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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 4,
          overflow: "hidden",
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          {/* HEADER */}
          <Box display="flex" alignItems="center" mb={2}>
            <SecurityIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold" component="h1">
              Web Security Analyzer
            </Typography>
          </Box>

          {/* INPUT */}
          <TextField
            fullWidth
            label="URL del sitio"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            variant="outlined"
            sx={{ mt: 1 }}
          />

          {/* BUTTON */}
          <Button
            fullWidth
            variant="contained"
            onClick={scan}
            disabled={loading || !url.trim()}
            sx={{
              mt: 2,
              py: 1.2,
              fontWeight: "bold",
              borderRadius: 2,
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Escanear"
            )}
          </Button>

          {/* ERROR */}
          {error && (
            <Typography color="error" mt={2} variant="body2">
              {error}
            </Typography>
          )}

          {/* RESULT */}
          {result && (
            <>
              <Divider sx={{ my: 2.5 }} />

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
                sx={{ fontWeight: "bold" }}
              />

              {/* TESTS */}
              <Stack spacing={1.5} mt={2}>
                <Typography variant="body1">
                  XSS (heurístico):{" "}
                  <strong>{result.tests.xss ? "Vulnerable" : "Seguro"}</strong>
                </Typography>
                <Typography variant="body1">
                  SQLi (heurístico):{" "}
                  <strong>{result.tests.sqli ? "Vulnerable" : "Seguro"}</strong>
                </Typography>
              </Stack>

              {/* ISSUES */}
              <Divider sx={{ my: 2.5 }} />
              <Typography variant="subtitle1" fontWeight="bold">
                Issues detectadas
              </Typography>

              <Stack spacing={1} mt={1}>
                {result.issues.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    ✔ No se detectaron problemas
                  </Typography>
                ) : (
                  result.issues.map((issue, i) => (
                    <Chip
                      key={i}
                      label={issue}
                      color="warning"
                      variant="outlined"
                      size="small"
                    />
                  ))
                )}
              </Stack>

              {/* RECOMMENDATIONS */}
              <Divider sx={{ my: 2.5 }} />
              <Typography variant="subtitle1" fontWeight="bold">
                Recomendaciones
              </Typography>

              <Stack spacing={1} mt={1}>
                {result.recommendations.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
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
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
                  }
