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
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
      <Card sx={{ borderRadius: 4, boxShadow: 6 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <SecurityIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h5" fontWeight="bold">
              Web Security Analyzer
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="URL del sitio"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            onClick={scan}
            disabled={!url || loading}
          >
            {loading ? <CircularProgress size={24} /> : "Escanear"}
          </Button>

          {error && (
            <Typography color="error" mt={2}>
              {error}
            </Typography>
          )}

          {result && (
            <>
              <Divider sx={{ my: 3 }} />

              <Chip
                label={`Riesgo: ${result.risk.level}`}
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
                    {result.results.xss.vulnerable ? "Vulnerable" : "Seguro"}
                  </strong>
                </Typography>
                <Typography>
                  SQLi:{" "}
                  <strong>
                    {result.results.sqli.vulnerable ? "Vulnerable" : "Seguro"}
                  </strong>
                </Typography>
                <Typography>
                  Headers faltantes:{" "}
                  <strong>
                    {result.results.headers.missing_headers.length}
                  </strong>
                </Typography>
              </Stack>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
                            }
