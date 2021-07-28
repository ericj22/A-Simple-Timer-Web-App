import React, { useState, useEffect } from 'react'
import { Button, Drawer, List, ListItem, ListItemText, Divider, FormControl, Input, InputLabel, ClickAwayListener } from '@material-ui/core';
import soundfile from './media/AlarmSound.wav';
import './HookTimer.css'

function HookTimer() {
    const [sec, setSec] = useState(300);
    const [top, setTop] = useState(false);
    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(0);
    const [elapsed, setElapsed] = useState(0);
    const [defTime, setDefTime] = useState(300);
    const [isActive, setIsActive] = useState(false);
    const [startTime, setStartTime] = useState(0);

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setTop({ ...top, [anchor]: open });
    };

    console.log(Date.now());

    const list = (anchor) => (
        <ClickAwayListener onClickAway={toggleDrawer('top', false)}>
        <div
          className="list fullList"
          role="presentation"
        >
            <List>
                <FormControl className="hookTimer__formControl">
                    <InputLabel>Minutes</InputLabel>
                    <Input className="hookTimer__input" value={minutes} onChange={event => setMinutes(parseInt(event.target.value))} type="number" inputProps={{min: 0}}/>
                </FormControl>
                <FormControl>
                    <InputLabel>Seconds</InputLabel>
                    <Input className="hookTimer__input" value={seconds} onChange={event => setSeconds(parseInt(event.target.value))} type="number" inputProps={{min: 0}}/>
                </FormControl>
            </List>
            <Divider />
            <List>
                <ListItem button key={'Set'} onClick={setTime('top', false)}>
                    <ListItemText primary={'Set'}/>
                </ListItem>
                <ListItem button key={'Cancel'} onClick={toggleDrawer('top', false)}>
                    <ListItemText primary={'Cancel'}/>
                </ListItem>
            </List>
        </div>
        </ClickAwayListener>
    );

    const setTime = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        
        setTop({ ...top, [anchor]: open });
        if(isNaN(minutes)) {
            setDefTime(0 + seconds);
            setSec(seconds);
            setMinutes(0);
        }
        else if(isNaN(seconds)) {
            setSec(minutes*60);
            setDefTime(minutes*60);
            setSeconds(0);
        }
        else {
            setDefTime(minutes*60 + seconds);
            setSec(minutes*60 + seconds);
        }
        setIsActive(false);
    }

    const toggle = () => {
        if(!isActive) {
            setStartTime(Date.now());
        }
        else {
            setElapsed(elapsed => elapsed + (Date.now() - startTime));
        }
        setIsActive(!isActive);
    }

    const reset = () => {
        setSec(defTime);
        setIsActive(false);
        setElapsed(0);
    }

    const play = () => {
        var audio = new Audio(soundfile);
        audio.play();
    }

    useEffect(() => {
        let interval = null;
        if(isActive && sec > 0) {
            interval = setInterval(() => {
                let diff = Date.now() - startTime;
                setSec(Math.floor((defTime*1000 - elapsed - diff)/1000));
            }, 10);
        }
        else if (!isActive || sec <= 0) {
            clearInterval(interval);
            setIsActive(false);
            if(sec === 0) play();
        }
        return () => clearInterval(interval);
    }, [isActive, sec, elapsed, defTime, startTime]);

    return (
        <div>
            <h1>{Math.floor(sec/60)}:{sec%60 < 10 ? `0${sec%60}` : sec%60}</h1>

            <Button variant="contained" color="primary" onClick={toggle} disabled={sec<=0}>
                {isActive ? 'Pause' : 'Start'}
            </Button>
            <Button variant="contained" onClick={reset}>
                Reset
            </Button>

            <br />
            <br />

            {['top'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>Set Time</Button>
                    <Drawer anchor={anchor} open={top[anchor]} >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    )
}

export default HookTimer
