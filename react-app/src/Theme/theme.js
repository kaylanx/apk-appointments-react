import { createMuiTheme, makeStyles } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#9b7e97',
      main: '#825e7e',
      dark: '#5b4158',
      contrastText: '#fff'
    },
    secondary: {
      light: '#f9f9f9',
      main: '#f8f8f8',
      dark: '#adadad',
      contrastText: '#000'
    }
  }
})

export const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      padding: theme.spacing(1),
      width: '100%'
    }
  },
  formControl: {
    padding: theme.spacing(1),
    width: '100%',
    '.MuiPickersDay-day': {
      'font-weight': 'bold'
    }
  }
}))
