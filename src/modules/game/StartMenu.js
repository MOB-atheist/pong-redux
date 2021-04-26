import { Grid, Button } from '@material-ui/core'
import { PlayArrowOutlined } from '@material-ui/icons'

export default function StartMenu(props) {
    return (
        <>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
                <Button
                    startIcon={<PlayArrowOutlined />}
                    onClick={props.Actions.Enter}
                    variant="outlined"
                    fullWidth
                >
                    START
                </Button>
            </Grid>
            <Grid item xs={1}></Grid>
        </>
    )
}
