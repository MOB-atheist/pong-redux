import { Link, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    footer: {
        padding: theme.spacing(6),
    },
}))

export default function Footer() {
    const classes = useStyles()
    return (
        <footer className={classes.footer}>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://coderahead.me/">
                    Coder Ahead
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </footer>
    )
}