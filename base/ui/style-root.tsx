'use client'

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { colorSchemes, typography, shadows, shape } from './themePrimitive';
import { inputsCustomizations } from "./customize/inputs.custom";
import { dataDisplayCustomizations } from "./customize/dataDisplay.custom";
import { feedbackCustomizations } from "./customize/feedback.custom";
import { navigationCustomizations } from "./customize/navigation.custom";
import { surfacesCustomizations } from "./customize/surface.custom";

const theme = createTheme({
    cssVariables: {
            colorSchemeSelector: 'data-mui-color-scheme',
            cssVarPrefix: 'template',
          },
          colorSchemes, 
          typography,
          shadows,
          shape,
          components: {
            ...inputsCustomizations,
            ...dataDisplayCustomizations,
            ...feedbackCustomizations,
            ...navigationCustomizations,
            ...surfacesCustomizations,
          },
});

const StyleRoot = ({ children }: Readonly<{ children: React.ReactNode }>) => (
    <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    </AppRouterCacheProvider>
)

export default StyleRoot;