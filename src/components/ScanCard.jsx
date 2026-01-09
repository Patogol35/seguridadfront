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
          borderRadius: 3,
          boxShadow: 6,
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          {/* HEADER */}
          <Box display="flex" alignItems="center" mb={2}>
            <SecurityIcon color="primary" sx={{ mr: 1 }} />
            <Typography fontWeight="bold" fontSize="1.3rem">
              Web Security Analyzer
            </Typography>
          </Box>

          {/* INPUT */}
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="URL del sitio"
              value={url}
              onChange={(e) => setUrl(e.target.value.trim())}
              error={url.length > 0 && !isValidUrl(url)}
              helperText={
                url.length > 0 && !isValidUrl(url)
                  ? "Ingresa una URL válida (ej: example.com)"
                  : ""
              }
            />

            <Button
              variant="contained"
              onClick={scan}
              disabled={loading || !isValidUrl(url)}
            >
              {loading ? (
                <CircularProgress size={22} />
              ) : (
                "Escanear"
              )}
            </Button>
          </Stack>

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

              {/* GRID RESPONSIVE */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "1fr 1fr",
                  },
                  gap: 3,
                }}
              >
                {/* LEFT */}
                <Box>
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
                </Box>

                {/* RIGHT */}
                <Box>
                  <Typography fontWeight="bold">Issues</Typography>
                  <Stack spacing={1} mt={1}>
                    {result.issues.length === 0 ? (
                      <Typography>✔ Sin problemas</Typography>
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

                  <Typography fontWeight="bold" mt={2}>
                    Recomendaciones
                  </Typography>
                  <Stack spacing={0.5} mt={1}>
                    {result.recommendations.map((rec, i) => (
                      <Typography key={i}>• {rec}</Typography>
                    ))}
                  </Stack>
                </Box>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
                               }
