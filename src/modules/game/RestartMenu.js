import { Grid, Button } from '@material-ui/core'
import { RotateLeftOutlined } from '@material-ui/icons'

export default function RestartMenu(props) {
    return (
        <>
            <Grid item xs={1}></Grid>
            <Grid container item xs={10}>
                <Grid item xs={12} style={{"text-align": "center"}}>
                    {props.Loser.toUpperCase()} LOST
                </Grid>
                <Grid item xs={12}>
                    <Button
                        startIcon={<RotateLeftOutlined />}
                        onClick={props.Actions.Enter}
                        variant="outlined"
                        fullWidth
                    >
                        RESTART
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={1}></Grid>
        </>
    )
}
