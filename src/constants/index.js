import circleYellow20 from '../static/circle-yellow-20.png';
import circleYellow30 from '../static/circle-yellow-30.png';
import circleYellow40 from '../static/circle-yellow-40.png';
import circleYellow50 from '../static/circle-yellow-50.png';
import circleYellow60 from '../static/circle-yellow-60.png';
import circleYellow70 from '../static/circle-yellow-70.png';
import circleRed20 from '../static/circle-red-20.png';
import circleRed30 from '../static/circle-red-30.png';
import circleRed40 from '../static/circle-red-40.png';
import circleRed50 from '../static/circle-red-50.png';
import circleRed60 from '../static/circle-red-60.png';
import circleRed70 from '../static/circle-red-70.png';

export const initialFilter = {
    types: [],
    company: null,
    delay: null,
    mode: null,
    region: null,
    port: null,
    terminal: null,
    carrier: null,
};

export const colorRed = "#c04630";
export const colorRedActive = "#e8543a";
export const colorYellow = "#ebc132";
export const colorYellowActive = "#fcce37";
export const colorBlue = "#3367D6";
export const colorGreen = "#A4CB3E";

export const defaultCenter = {lat: 30.891752, lng: -98.4375};
export const defaultZoom = 5;
export const itemClickZoom = 15;

export const maxClusterCount = 500;
export const clusterDivider = 2;
export const clusterStyles = [
    // Yellow 6 levels
    {
        url: circleYellow70,
        textColor: 'white',
        width: 74,
        height: 74,
        anchor: [35, 35],
        textSize: 14
    },
    {
        url: circleYellow60,
        textColor: 'white',
        width: 64,
        height: 64,
        anchor: [30, 30],
        textSize: 14
    },
    {
        url: circleYellow50,
        textColor: 'white',
        width: 54,
        height: 54,
        anchor: [25, 25],
        textSize: 14
    },
    {
        url: circleYellow40,
        textColor: 'white',
        width: 44,
        height: 44,
        anchor: [20, 20],
        textSize: 14
    },
    {
        url: circleYellow30,
        textColor: 'white',
        width: 34,
        height: 34,
        anchor: [15, 15],
        textSize: 14
    },
    {
        url: circleYellow20,
        textColor: 'white',
        width: 24,
        height: 24,
        anchor: [10, 10],
        textSize: 14
    },
    // Red 6 levels
    {
        url: circleRed70,
        textColor: 'white',
        width: 74,
        height: 74,
        anchor: [35, 35],
        textSize: 14
    },
    {
        url: circleRed60,
        textColor: 'white',
        width: 64,
        height: 64,
        anchor: [30, 30],
        textSize: 14
    },
    {
        url: circleRed50,
        textColor: 'white',
        width: 54,
        height: 54,
        anchor: [25, 25],
        textSize: 14
    },
    {
        url: circleRed40,
        textColor: 'white',
        width: 44,
        height: 44,
        anchor: [20, 20],
        textSize: 14
    },
    {
        url: circleRed30,
        textColor: 'white',
        width: 34,
        height: 34,
        anchor: [15, 15],
        textSize: 14
    },
    {
        url: circleRed20,
        textColor: 'white',
        width: 24,
        height: 24,
        anchor: [10, 10],
        textSize: 14
    },
];
