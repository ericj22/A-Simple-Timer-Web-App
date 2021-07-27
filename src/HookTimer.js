import React, { useState, useEffect } from 'react'
import { Button, Drawer, List, ListItem, ListItemText, Divider, FormControl, Input, InputLabel } from '@material-ui/core';
// From https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks

/*
TODO:
 - Make it so time is set in the set option only after the button is pressed
 - Make the cancel function work -- the only solution I can think of is another variable for default time LOL I'm bad
 - Use Date() time to measure time to make the timer more accurate
   - Use difference between current date and start date to find elapsed time, then subtract that difference from initial time set
 - IDK use like redux or something? Reduce the amount of state here lmao
 - Figure out how to make the thing play your own audio files
*/

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
        <div
          className="list fullList"
          role="presentation"
          // onClick={toggleDrawer(anchor, false)}
          // onKeyDown={toggleDrawer(anchor, false)}
        >
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Encode+Sans+SC:wght@300&display=swap" rel="stylesheet"/>
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
        var audio = new Audio('https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3');
        //var audio = new Audio('../alarm_sound.wav')
        // const play = require('audio-play');
        // const load = required('audio-loader');
        // load('/Users/')
        // var audio = new Audio('C:/Users/eric8/OneDrive/Desktop/Hackermans/Timer App/eji_react_timer_app/alarm sound.WAV');
        audio.play();
    }

    useEffect(() => {
        let interval = null;
        if(isActive && sec > 0) {
            interval = setInterval(() => {
                //setSec(sec => sec - 1);
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
                    {/* onClose={toggleDrawer(anchor, false)} --> closes the drawer on click anywhere */}
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    )
}

export default HookTimer
