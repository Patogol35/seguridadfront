import { Container, Box, useMediaQuery } from "@mui/material";
import ScanCard from "./components/ScanCard";
import { useScan } from "./hooks/useScan";

function App() {
  const scanState = useScan();
  const isLandscape = useMediaQuery("(orientation: landscape)");

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: "100vh",
        px: { xs: 1, sm: 2 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: isLandscape ? "flex-start" : "center",
          minHeight: "100vh",
          pt: isLandscape ? 1 : 0,
        }}
      >
        <ScanCard {...scanState} isLandscape={isLandscape} />
      </Box>
    </Container>
  );
}

export default App;
