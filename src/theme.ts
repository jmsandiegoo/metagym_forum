import { createTheme } from "@mui/material";

const primaryColor: string = '#FF3739';
const accentColor: string = '#989898';
const backgroundColor: string = '#121212';

const theme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: backgroundColor,
        paper: backgroundColor,
      },
			primary: {
				main: primaryColor
			},
    },
		typography: {
			h1: {
				fontSize: '3rem',
				fontWeight: 600
			},
			h2: {
				fontSize: '1.5rem',
				fontWeight: 600
			}
		},
		components: {
			MuiAppBar: {
				styleOverrides: {
					root: {
						background: backgroundColor,
						boxShadow: 'none',
					}
				}
			},
			MuiButton: {
				styleOverrides: {
					// root: {
					// 	paddingLeft: '2.5rem',
					// 	paddingRight: '2.5rem',
					// },
					sizeSmall: {
						paddingLeft: '1rem',
						paddingRight: '1rem',
					},
					sizeMedium: {
						paddingLeft: '2.5rem',
						paddingRight: '2.5rem',
					}
				}
			},
			MuiInput: {
				styleOverrides: {
					root: {
						'& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
							{
								display: 'none',
							},
						'& input[type=number]': {
							MozAppearance: 'textfield',
						},
					},
				},
			},
			MuiTextField: {
				defaultProps: {
					variant: 'standard',
					fullWidth: true,
					size: 'medium',
					InputLabelProps: {
						shrink: true
					}
				}
			},
			MuiInputLabel: {
				defaultProps: {
					shrink: true
				}
			}
		}
  });

export default theme;