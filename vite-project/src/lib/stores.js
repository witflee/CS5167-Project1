import { writable } from 'svelte/store';
//export const state = writable({});

export let data = writable([]);

export let dummyData = [
    {dateTime: '9/12/24 8:02:34 PM', car: 'Toyota GT86', track: 'Tsukuba Fruits Line', tires: 'Street', layout: 'Outbound', surface: [], lapTime: '4:58'},
    {dateTime: '9/13/24 5:56:25 PM', car: 'Toyota AE86', track: 'Tsukuba Fruits Line', tires: 'Street', layout: 'Inbound', surface: [], lapTime: '5:43'},
    {dateTime: '9/14/24 3:41:48 PM', car: 'BMW M3 E30', track: 'Gunma Cycle Sports Center', tires: 'Slicks', layout: 'Normal', surface: ['wet'], lapTime: '3:12'}
]