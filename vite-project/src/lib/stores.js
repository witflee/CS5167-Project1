import { writable } from 'svelte/store';

export const theme = writable('dark');

export let dummyData = writable([
    {dateTime: '9/12/2024, 8:02:34 PM', car: 'Toyota GT86', track: 'Tsukuba Fruits Line', tires: 'Semislicks', layout: 'Outbound', surface: ['Cold'], lapTime: '4:58', goal: '5:00', notes: 'Semislicks helped to make up for grip loss due to cold temperatures.'},
    {dateTime: '9/13/2024, 5:56:25 PM', car: 'Toyota AE86', track: 'Tsukuba Fruits Line', tires: 'Street', layout: 'Inbound', surface: [], lapTime: '5:43', goal: '5:30', notes: 'Car felt sluggish on the uphill sections.'},
    {dateTime: '9/14/2024, 3:41:48 PM', car: 'BMW M3 E30', track: 'Gunma Cycle Sports Center', tires: 'Slicks', layout: 'Full', surface: ['Wet'], lapTime: '3:12', goal: '3:00', notes: 'Slippery track surface made cornering difficult.'},
]);