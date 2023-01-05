import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#121212',
        paper: '#121212',
      },
			primary: {
				main: '#FF3739'
			}
    },
		typography: {
			h1: {
				fontSize: '3rem',
				fontWeight: 600
			}
		},
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						paddingLeft: '2.5rem',
						paddingRight: '2.5rem',
					}
				}
			}
		}
  });

export default theme;