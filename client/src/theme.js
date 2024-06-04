import { createTheme } from "@mui/material";
import { blue, grey } from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary: {
            main: blue[600],
            light: blue[300],
            dark: blue[900],
        },
        secondary: {
            main: grey[600],
            light: grey[300],
            dark: grey[900],
        },
    }
})