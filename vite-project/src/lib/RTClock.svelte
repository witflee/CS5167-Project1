<script>
    // script for a real-time clock for use on the main page of the project
    import {onMount} from 'svelte';
    let time = new Date();

    $: hours = time.getHours()%12==0 ? 12 : time.getHours()%12;
    $: minutes = time.getMinutes()<10 ? '0'+time.getMinutes() : time.getMinutes();
    $: seconds = time.getSeconds()<10 ? '0'+time.getSeconds() : time.getSeconds();
    $: amOrPm = time.getHours()<12 ? 'AM' : 'PM';

    onMount(() => {
	    const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<p>{hours}:{minutes}:{seconds} {amOrPm}</p>