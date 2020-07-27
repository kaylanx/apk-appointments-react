import { createMuiTheme, makeStyles, Theme } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const theme = (createMuiTheme as any)({
  overrides: {
    MuiPickersDay: {
      dayDisabled: {
        color: grey.A100
      }
    }
  },
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

export interface StyleProps {
    root: BaseCSSProperties,
}

export type PropsClasses = Record<keyof StyleProps, string>

export const useStyles = makeStyles<Theme, StyleProps>(theme => ({
  root: {
    '& .MuiTextField-root': {
      padding: theme.spacing(1),
      width: '100%'
    }
  },
  formControl: {
    padding: theme.spacing(1),
    width: '100%'
  }
}))
