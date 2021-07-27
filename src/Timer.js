import React from 'react'

class Timer extends React.Component {
    constructor(props) {
        super();
        this.state = {
            time: {},
            seconds: 5
        };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    secondsToTime(secs) {
        let hours = Math.floor(secs / (60*60));

        let divisor_for_minutes = secs % (60*60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        return {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
    }

    componentDidMount() {
        let timeLeft = this.secondsToTime(this.state.seconds);
        this.setState({time: timeLeft})
    }

    startTimer() {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        if(seconds === 0) {
            clearInterval(this.timer);
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.startTimer}>Start</button>
                <h1>m: {this.state.time.m} s: {this.state.time.s}</h1>
            </div>
        )
    }   
}

export default Timer
