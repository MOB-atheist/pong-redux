import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core"
import { Gamepad } from "@material-ui/icons"

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    appbar: {
        marginBottom: '2rem',
    },
}))

export default function Header() {
    const classes = useStyles()
    return (
        <>
            <AppBar position="relative" className={classes.appbar}>
                <Toolbar>
                    <Gamepad className={classes.icon} />
                    <Typography variant="h6" noWrap>
                        Pong redux
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    )
}
