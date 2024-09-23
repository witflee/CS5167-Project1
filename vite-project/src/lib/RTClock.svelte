<script>
    // script for a real-time clock for use on the main page of the project
    import {onMount} from 'svelte';
    import { dummyData } from './stores.js';
    import { derived } from 'svelte/store';

    let time = new Date();

    $: hours = time.getHours()%12==0 ? 12 : time.getHours()%12;
    $: minutes = time.getMinutes()<10 ? '0'+time.getMinutes() : time.getMinutes();
    $: seconds = time.getSeconds()<10 ? '0'+time.getSeconds() : time.getSeconds();
    $: amOrPm = time.getHours()<12 ? 'AM' : 'PM';
    $: date = time.toDateString();

    onMount(() => {
	    const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

  const daysSinceFirstEntry = derived(dummyData, $dummyData => {
        if ($dummyData.length === 0) return 0;
        const firstEntryDate = new Date($dummyData[0].dateTime);
        const currentDate = new Date();
        const diffTime = currentDate.getTime() - firstEntryDate.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    });

    const uniqueDays = derived(dummyData, $dummyData => {
        const dates = $dummyData.map(entry => entry.dateTime.split('T')[0]);
        return new Set(dates).size;
    });
</script>

<p>{date}, {hours}:{minutes}:{seconds} {amOrPm}</p>
<p>Days since beginning: {$daysSinceFirstEntry}</p>
<p>Days active: {$uniqueDays}</p>