<script>
  import ImageSelector from './lib/ImageSelector.svelte';
  import RtClock from './lib/RTClock.svelte';
  import {data} from './lib/stores';
  import TimeData from './lib/TimeData.svelte';

  let dateTime = "";
  let car = "";
  let track = "";
  let tires = "";
  let layout = "";
  let surface = [];
  let lapTime = "";

  let topTime;
  let vsTop = "0:00";

  let layoutArray = [
    ["Inbound", "Outbound"],
    ["Normal", "Reversed"],
    ["Short loop", "Long loop"]
  ];

  let carArray = [
    { name: 'Toyota GT86', imageUrl: '/images/gt86.jpg' },
    { name: 'Toyota AE86', imageUrl: '/images/ae86.jpg' },
    { name: 'BMW M3 E30', imageUrl: '/images/m3e30.jpg' }
  ];
  let trackArray = [
    { name: 'Tsukuba Fruits Line', imageUrl: '/images/tsukuba.png', layouts: ["Inbound", "Outbound"] },
    { name: 'Gunma Cycle Sports Center', imageUrl: '/images/gunsai.png', layouts: ["Normal", "Reversed"] },
    { name: 'Nurburgring', imageUrl: '/images/nurburgring.png', layouts: ["Short loop", "Long loop"] }
  ];
  
  let lapTimes = [];
  let saved = false;

  $: updateButton = () => {
    saved = false;
  }

  let saveData = () => {
    data.update((values) => values = [dateTime, car, track, tires, layout, surface, lapTime]);
    saved = true;

    if (lapTime) {
      lapTimes.push(lapTime);
      topTime = Math.min(...lapTimes.map(time => parseFloat(time.replace(":", "."))));
      vsTop = (parseFloat(lapTime.replace(":", ".")) - topTime).toFixed(2);
      topTime = topTime.toFixed(2).replace(".", ":"); // Convert back to MM:SS format
    }
  }

</script>

<main>
  <h1>Lap Time Tracker</h1>
  <h2>Welcome back, John Doe!</h2>
  <RtClock/>

  <div class='interactive-content'>
    <div class='selectors'>
      <div class="car-selector" id="cars">
        <ImageSelector options={carArray} label="Choose a car: "/>
      </div>
    
      <div class="track-selector" id="track">
        <ImageSelector options={trackArray} label="Choose a track: "/>
      </div>
    
      <div class='timey-whimey'>
        <div class="time-data">
          <label for="user-time">Enter your lap time: (MM:SS)</label>
          <input type="text" id="user-time" bind:value={lapTime} on:input={updateButton}>
        </div>
        <div class="time-data">
          <TimeData {lapTime} {topTime} {vsTop} />
        </div>
      </div>
    </div>
  
  
    <div class='secondary-options'>
      <div class="car-options" id="car-tires">
        <label for="car-tires">Choose tires:</label>
        {#each ['Street', 'Semislicks', 'Slicks'] as tireType}
          <label>
            <input type="radio" name="tires" value={tireType} bind:group={tires} on:change={updateButton}/>
            {tireType}
          </label>
        {/each}
      </div>
    
      <div class="track-options" id="track-layout">
        <label for="track-layout">Choose track layout:</label>
        <!-- original plan: conditionally add layouts based on track selected -->
        {#each layoutArray[1] as trackLayout} 
          <label>
            <input type="radio" name="trackLayout" value={trackLayout} bind:group={layout} on:change={updateButton}/>
            {trackLayout}
          </label>
        {/each}
      </div>
    
      <div class="track-options" id="track-conditions">
        <label for="track-conditions">Choose track surface conditions:</label>
        {#each ['Wet', 'Cold'] as surfaceConditions}
          <label>
            <input type="checkbox" name="surface" value={surfaceConditions} bind:group={surface} on:change={updateButton}/>
            {surfaceConditions}
          </label>
        {/each}
      </div>
    </div>
  
    <div class="extra-info">
      <label for="user-data">Enter notes about lap:</label>
      <input type="text" id="user-data" on:input={updateButton}>
    </div>
  </div>

  <div class="buttons">
    <div class="card" id="prev-button">
      <button>
        Prev. Entry
      </button>
    </div>
    <div class="card" id="save-button">
      <button on:click={saveData}>
        {saved ? "Saved!" : "Save"}
      </button>
    </div>
    <div class="card" id="next-button">
      <button>
        Next Entry
      </button>
    </div>
  </div>

</main>

<style>

</style>
