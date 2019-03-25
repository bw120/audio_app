import React, { Component } from "react";

class Clock extends React.Component {
    constructor() {
        super();

        this.state = {
            time: "00:00:00"
        }
        this.animationFrame;
    }

    zeroPad(num, string) {
        const zeros = Array(num).join('0');
        const paddedString = zeros + string;
        return paddedString.slice(-num);
    }

    updateTime() {
        const date = new Date();
        let h = this.zeroPad(2, date.getHours());
        const m = this.zeroPad(2, date.getMinutes());
        let pm = false;

        if (h > 12) {
            h = h - 12;
            pm = true;
        }

        const time = `${h}:${m} ${(pm) ? 'pm' : 'am'}`;
        this.setState({
            time: time
        })
        this.animationFrame = requestAnimationFrame(this.updateTime.bind(this));
    }

    componentDidMount() {
        this.animationFrame = requestAnimationFrame(() => {
            this.updateTime();
        });
    }

    componentWillUnmount() {
        requestAnimationFrame(this.animationFrame);
    }

    render() {
        return (
            <div>{ this.state.time }</div>
        );
    }
}

export default Clock;