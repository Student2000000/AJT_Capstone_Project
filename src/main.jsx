import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider, createTheme } from '@mantine/core'
import '@mantine/core/styles.css'
import './index.css'
import App from './App.jsx'

/*
 * Mantine theme colors - duplicated from index.css
 * Mantine components can't read CSS variables, so colors are defined in both places.
 * Update index.css when changing these values.
 */
const colors = {
    light: '#DEE9B1',      // --color-primary-light
    primary: '#6b7d48',    // --color-primary
    dark: '#5A5F43',       // --color-primary-dark
    darkest: '#1C1C1C',    // --color-dark
}

// Custom "forest" color palette
// Mantine requires exactly 10 shades (0-9) for any color
const theme = createTheme({
    primaryColor: 'forest',
    colors: {
        forest: [
            '#f7f9f0',      // 0 - lightest, subtle backgrounds
            '#e8edce',      // 1 - light variant hover states
            colors.light,   // 2 - light green (user-defined)
            '#c2d292',      // 3 - light-medium
            '#a5ba73',      // 4 - medium
            '#8aa35a',      // 5 - medium-dark
            colors.primary, // 6 - PRIMARY: olive-green, filled buttons
            colors.dark,    // 7 - dark green, hover for primary
            '#3d4030',      // 8 - darker, pressed states
            colors.darkest, // 9 - dark grey, darkest
        ],
    },
})

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <MantineProvider theme={theme}>
            <App />
        </MantineProvider>
    </StrictMode>,
)