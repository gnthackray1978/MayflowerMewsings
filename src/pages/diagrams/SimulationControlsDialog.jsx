import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Rnd} from 'react-rnd';
import {Box, Button, IconButton, MenuItem, Select, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {hideSimulationControls} from '../../features/uxActions.jsx';

export default function SimulationControlsDialog({drawing}) {
    const visible = useSelector(state => state.ux.showSimulationControls);
    const dispatch = useDispatch();
    const [simulation, setSimulation] = useState(() => drawing.simulation.snapshot());
    useEffect(() => {
        const update = () => setSimulation(drawing.simulation.snapshot());
        update();
        drawing.channel.on('simulation', update);
        return () => drawing.channel.off('simulation', update);
    }, [drawing]);

    return <Rnd default={{x: 150, y: 0, width: 260, height: 230}}
        minWidth={240} minHeight={230} dragHandleClassName="simulation-dialog-handle"
        enableResizing={false}
        style={{visibility: visible ? 'visible' : 'hidden', zIndex: 1000,
            background: 'white', border: '1px solid #ddd', borderRadius: 4}}
        role="dialog" aria-labelledby="simulation-dialog-title">
        <Box className="simulation-dialog-handle" sx={{display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', bgcolor: 'aliceblue', pl: 2, cursor: 'move'}}>
            <Typography id="simulation-dialog-title">Simulation time</Typography>
            <IconButton aria-label="Close simulation time controls"
                onMouseDown={e => e.stopPropagation()}
                onClick={() => dispatch(hideSimulationControls())}><CloseIcon /></IconButton>
        </Box>
        <Box sx={{p: 2}}>
            <Typography variant="h5" aria-live="polite">Year: {simulation.year}</Typography>
            <Typography variant="body2">{simulation.finished ? 'Complete' : simulation.paused ? 'Paused' : 'Running'}</Typography>
            <Box sx={{display: 'flex', gap: 1, my: 1}}>
                <Button size="small" variant="outlined" disabled={simulation.finished}
                    onClick={() => drawing.simulation.togglePause()}>{simulation.paused ? 'Resume' : 'Pause'}</Button>
                <Button size="small" onClick={() => drawing.RestartSimulation()}>Restart</Button>
            </Box>
            <label htmlFor="simulation-speed">Speed: </label>
            <Select native size="small" id="simulation-speed" value={simulation.speed}
                onChange={e => drawing.simulation.setSpeed(e.target.value)}>
                {[0.5, 1, 2, 4].map(speed => <option key={speed} value={speed}>{speed}x</option>)}
            </Select>
        </Box>
    </Rnd>;
}
