import { Grid, Button } from '@material-ui/core'
import { RotateLeftOutlined } from '@material-ui/icons'

export default function RestartMenu(props) {
    return (
        <>
            <Grid item xs={1}>{props.Loser} LOST</Grid>
            <Grid item xs={10}>
                <Button
                    startIcon={<RotateLeftOutlined />}
                    onClick={props.Actions.Enter}
                    variant="outlined"
                    fullWidth
                >
                    RESTART
                </Button>
            </Grid>
            <Grid item xs={1}></Grid>
        </>
    )
}
