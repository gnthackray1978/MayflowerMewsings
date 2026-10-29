import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Rnd} from 'react-rnd';
import {Box, Button, IconButton, MenuItem, Select, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SpeedIcon from '@mui/icons-material/Speed';
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

    const status = simulation.finished ? 'Complete' : simulation.paused ? 'Paused' : 'Running';
    const width = Math.min(220, window.innerWidth - 24);

    return <Rnd default={{x: Math.min(150, Math.max(12, window.innerWidth - width - 12)), y: 12, width, height: 'auto'}}
        size={{width, height: 'auto'}}
        dragHandleClassName="simulation-dialog-handle"
        enableResizing={false}
        style={{visibility: visible ? 'visible' : 'hidden', zIndex: 1000,
            background: 'white', border: '1px solid #d6dfe6', borderRadius: 10,
            overflow: 'hidden', boxShadow: '0 8px 28px rgba(26, 48, 70, 0.14)'}}
        role="dialog" aria-labelledby="simulation-dialog-title">
        <Box style={{zoom: '50%'}}>
        <Box className="simulation-dialog-handle" sx={{display: 'flex', alignItems: 'center',
            gap: 1.5, background: 'linear-gradient(120deg, #e7f3ff, #dfefff)',
            px: 2.5, py: 1.75, cursor: 'move'}}>
            <SettingsIcon sx={{color: '#3e5263', fontSize: 30}} />
            <Typography id="simulation-dialog-title" sx={{flex: 1, fontSize: 24,
                fontWeight: 700, color: '#081225', letterSpacing: '-0.5px'}}>Simulation time</Typography>
            <IconButton aria-label="Close simulation time controls"
                sx={{color: '#52616e', mr: -1}}
                onMouseDown={e => e.stopPropagation()}
                onClick={() => dispatch(hideSimulationControls())}><CloseIcon /></IconButton>
        </Box>
        <Box sx={{p: 2.5}}>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 3, p: 2,
                borderRadius: 2, background: 'linear-gradient(110deg, #f4f8fb, #f0f6fa)'}}>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 76, height: 76, flexShrink: 0, borderRadius: '50%', bgcolor: '#dfefff'}}>
                    <AccessTimeIcon sx={{fontSize: 50, color: '#1777cb'}} />
                </Box>
                <Box aria-live="polite" aria-atomic="true">
                    <Typography sx={{fontSize: 19, fontWeight: 500, color: '#617489'}}>Year</Typography>
                    <Typography sx={{fontSize: 48, lineHeight: 1.1, fontWeight: 800,
                        letterSpacing: '-1px', color: '#061126', fontVariantNumeric: 'tabular-nums'}}>{simulation.year}</Typography>
                    <Typography sx={{fontSize: 21, fontWeight: 600,
                        color: simulation.paused && !simulation.finished ? '#986418' : '#237c3b'}}>{status}</Typography>
                </Box>
            </Box>
            <Box sx={{display: 'flex', gap: 1.5, mt: 1.75, pt: 2,
                borderTop: '1px solid #e0e6ec', '& .MuiButton-root': {
                    flex: 1, py: 1.1, fontSize: 18, fontWeight: 600, textTransform: 'none', borderRadius: 1.5}}}>
                <Button variant="contained" disableElevation disabled={simulation.finished}
                    startIcon={simulation.paused ? <PlayArrowIcon /> : <PauseIcon />}
                    sx={{background: 'linear-gradient(135deg, #2998ee, #0866bf)',
                        '&:hover': {background: 'linear-gradient(135deg, #2089da, #0758a6)'}}}
                    onClick={() => drawing.simulation.togglePause()}>{simulation.paused ? 'Resume' : 'Pause'}</Button>
                <Button variant="outlined" startIcon={<RestartAltIcon />}
                    sx={{color: '#303d49', borderColor: '#c7ced5', bgcolor: '#fafbfc'}}
                    onClick={() => drawing.RestartSimulation()}>Restart</Button>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mt: 2.25}}>
                <SpeedIcon sx={{fontSize: 30, color: '#697b8d'}} />
                <Typography component="label" htmlFor="simulation-speed"
                    sx={{fontSize: 18, fontWeight: 600, mr: 2}}>Speed:</Typography>
                <Select native size="small" id="simulation-speed" value={simulation.speed}
                    sx={{flex: 1, borderRadius: 1.5, fontSize: 17, color: '#374553'}}
                    onChange={e => drawing.simulation.setSpeed(e.target.value)}>
                    <option value={0.5}>0.5x (Slow)</option>
                    <option value={1}>1x (Normal)</option>
                    <option value={2}>2x (Fast)</option>
                    <option value={4}>4x (Very fast)</option>
                </Select>
            </Box>
        </Box>
        </Box>
    </Rnd>;
}
