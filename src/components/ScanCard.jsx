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
import InfoIcon from "@mui/icons-material/Info";
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

  const riskLevel = result?.risk?.level ?? "DESCONOCIDO";
  const riskScore = result?.risk?.score ?? 0;

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
      <Card sx={{ borderRadius: 4, boxShadow: 6 }}>
        <CardContent>

          {/* HEADER */}
          <Box display="flex" alignItems="center" mb={2}>
            <SecurityIcon color="primary" sx={{ mr: 1 }} />
            <Box>
              <Typography variant="h5" fontWeight="bold">
                Web Security Analyzer
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Autor: Jorge Patricio Santamaría Cherrez
              </Typography>
            </Box>
          </Box>

          {/* INPUT */}
          <TextField
            fullWidth
            label="URL del sitio"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
          />

          {/* BUTTON */}
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            onClick={scan}
            disabled={loading || !url}
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

              {/* META */}
              <Stack direction="row" spacing={1} alignItems="center">
                <InfoIcon fontSize="small" />
                <Typography variant="body2">
                  HTTP {result.status_code} · Issues detectadas:{" "}
                  {result.issues_found}
                </Typography>
              </Stack>

              {/* RISK */}
              <Box mt={2}>
                <Chip
                  label={`Riesgo: ${riskLevel} (${riskScore})`}
                  color={riskColor(riskLevel)}
                  icon={
                    riskLevel === "ALTO" ? (
                      <WarningIcon />
                    ) : (
                      <CheckCircleIcon />
                    )
                  }
                />
              </Box>

              {/* TESTS */}
              <Stack spacing={1} mt={2}>
                <Typography>
                  XSS (heurístico):{" "}
                  <strong>
                    {result.tests?.xss ? "Vulnerable" : "Seguro"}
                  </strong>
                </Typography>
                <Typography>
                  SQLi (heurístico):{" "}
                  <strong>
                    {result.tests?.sqli ? "Vulnerable" : "Seguro"}
                  </strong>
                </Typography>
              </Stack>

              {/* ISSUES */}
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6">Issues detectadas</Typography>

              <Stack spacing={1} mt={1}>
                {result.issues?.length === 0 ? (
                  <Typography>✔ No se detectaron problemas</Typography>
                ) : (
                  result.issues?.map((issue, i) => (
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
                {result.recommendations?.length === 0 ? (
                  <Typography>✔ Sin acciones urgentes</Typography>
                ) : (
                  result.recommendations?.map((rec, i) => (
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
