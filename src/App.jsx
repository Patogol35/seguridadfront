import { Box, useTheme, useMediaQuery } from "@mui/material";
import ScanCard from "./components/ScanCard";
import { useScan } from "./hooks/useScan";

function App() {
  const scanState = useScan();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: isMobile ? "100vw" : 500,
        px: isMobile ? 2 : 3,
        mt: 4,
        mb: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ScanCard {...scanState} />
    </Box>
  );
}

export default App;
