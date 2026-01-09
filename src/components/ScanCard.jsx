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
  Grid,
} from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BugReportIcon from "@mui/icons-material/BugReport";
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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      px={2}
      py={4}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: "100%", maxWidth: 720 }}
      >
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
          }}
        >
          <CardContent>
            {/* HEADER */}
            <Box display="flex" alignItems="center" gap={1} mb={3}>
              <SecurityIcon color="primary" fontSize="large" />
              <Typography variant="h5" fontWeight="bold">
                Web Security Analyzer
              </Typography>
            </Box>

            {/* INPUT */}
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="URL del sitio"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />

              <Button
                variant="contained"
                size="large"
                onClick={scan}
                disabled={loading || !url}
                startIcon={!loading && <BugReportIcon />}
              >
                {loading ? <CircularProgress size={24} /> : "Escanear sitio"}
              </Button>
            </Stack>

            {/* ERROR */}
            {error && (
              <Typography color="error" mt={2}>
                {error}
              </Typography>
            )}

            {/* RESULTADOS */}
            {result && (
              <>
                <Divider sx={{ my: 4 }} />

                {/* RIESGO */}
                <Box mb={3}>
                  <Chip
                    label={`Riesgo ${result.risk.level} (${result.risk.score})`}
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
                </Box>

                {/* TESTS */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Chip
                      label={`XSS (heurístico): ${
                        result.tests.xss ? "Vulnerable" : "Seguro"
                      }`}
                      color={result.tests.xss ? "error" : "success"}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Chip
                      label={`SQLi (heurístico): ${
                        result.tests.sqli ? "Vulnerable" : "Seguro"
                      }`}
                      color={result.tests.sqli ? "error" : "success"}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>

                {/* ISSUES */}
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" gutterBottom>
                  Issues detectadas
                </Typography>

                <Stack spacing={1}>
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

                {/* RECOMENDACIONES */}
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" gutterBottom>
                  Recomendaciones
                </Typography>

                <Stack spacing={1}>
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
    </Box>
  );
}
