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
    <Box px={{ xs: 1, sm: 2 }} py={2}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 6,
            maxWidth: "100%",
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            {/* HEADER */}
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              mb={2}
            >
              <SecurityIcon color="primary" />
              <Typography variant="h6" fontWeight="bold">
                Web Security Analyzer
              </Typography>
            </Box>

            {/* INPUT + BUTTON */}
            <Grid container spacing={1.5}>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  size="small"
                  label="URL del sitio"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Button
                  fullWidth
                  variant="contained"
                  size="medium"
                  onClick={scan}
                  disabled={loading || !url}
                  startIcon={!loading && <BugReportIcon />}
                >
                  {loading ? <CircularProgress size={20} /> : "Escanear"}
                </Button>
              </Grid>
            </Grid>

            {error && (
              <Typography color="error" mt={1}>
                {error}
              </Typography>
            )}

            {result && (
              <>
                <Divider sx={{ my: 2 }} />

                {/* TOP STATUS */}
                <Grid container spacing={1.5} alignItems="center">
                  <Grid item xs={12} md={4}>
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
                      sx={{ fontWeight: "bold", width: "100%" }}
                    />
                  </Grid>

                  <Grid item xs={6} md={4}>
                    <Chip
                      label={`XSS: ${
                        result.tests.xss ? "Vulnerable" : "Seguro"
                      }`}
                      color={result.tests.xss ? "error" : "success"}
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </Grid>

                  <Grid item xs={6} md={4}>
                    <Chip
                      label={`SQLi: ${
                        result.tests.sqli ? "Vulnerable" : "Seguro"
                      }`}
                      color={result.tests.sqli ? "error" : "success"}
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                </Grid>

                {/* ISSUES + RECOMMENDATIONS */}
                <Grid container spacing={2} mt={1}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Issues detectadas
                    </Typography>
                    <Stack spacing={0.5} mt={1}>
                      {result.issues.length === 0 ? (
                        <Typography variant="body2">
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
                  </Grid>

                  <Grid item xs={12} md={6}>
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
                  </Grid>
                </Grid>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
}
