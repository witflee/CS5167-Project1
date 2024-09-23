<script>
  import ImageSelector from './lib/ImageSelector.svelte';
  import RtClock from './lib/RTClock.svelte';
  import {dummyData} from './lib/stores';
  import TimeData from './lib/TimeData.svelte';
  import TimeTable from './lib/TimeTable.svelte';

  let dateTime = new Date().toLocaleString();
  let car = "Toyota GT86";
  let track = "Tsukuba Fruits Line";
  let tires = "";
  let layout = "";
  let surface = [];
  let lapTime = "";
  let notes = "";
  let goal = "";

  let lapTimes = [];
  let topTime;
  let vsTop = "0:00";

  let saved = false;
  let showSecondaryOptions = true;
  $: selectedOption = null;
  $: layoutArray = trackArray[trackArray.findIndex(track => track.name)].layouts;

  dummyData.subscribe(data => {
    lapTimes = data.map(item => item.lapTime);
    topTime = Math.min(...data.map(item => parseFloat(item.lapTime.replace(":", "."))));
    topTime = topTime.toFixed(2).replace(".", ":");
  });

  let carArray = [
    { type: 'car', name: 'Toyota GT86', imageUrl: '/gt86.jpg' },
    { type: 'car', name: 'Toyota AE86', imageUrl: '/ae86.jpg' },
    { type: 'car', name: 'BMW M3 E30', imageUrl: '/m3e30.jpg' }
  ];
  let trackArray = [
    { type: 'track', name: 'Tsukuba Fruits Line', imageUrl: '/tsukuba.png', layouts: ["Inbound", "Outbound"] },
    { type: 'track', name: 'Gunma Cycle Sports Center', imageUrl: '/gunsai.png', layouts: ["Full", "Qualification"] },
    { type: 'track', name: 'Nurburgring', imageUrl: '/nurburgring.png', layouts: ["Short loop", "Long loop"] }
  ];

  function handleSelect(event) {
    selectedOption = event.detail;
    console.log('Selected option:', selectedOption);
    if (selectedOption.type === 'car') {
      car = selectedOption.name;
    } else if (selectedOption.type === 'track') {
      track = selectedOption.name;
    }
  }

  function resetSecondaryOptions() {
    showSecondaryOptions = !showSecondaryOptions;
    tires = "";
    layout = "";
    surface = [];
  }

  $: updateButton = () => {
    saved = false;
  }

  let saveData = () => {
    dummyData.update((values) => {
      values.push({dateTime, car, track, tires, layout, surface, lapTime, goal, notes});
      console.log('Saved data:', values);
      return values;
    });
    saved = true;

    if (lapTime) {
      lapTimes.push(lapTime);
      topTime = Math.min(...lapTimes.map(time => parseFloat(time.replace(":", "."))));
      vsTop = (parseFloat(lapTime.replace(":", ".")) - topTime).toFixed(2);

      topTime = topTime.toFixed(2).replace(".", ":");
      vsTop = vsTop.replace(".", ":");
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
        <ImageSelector options={carArray} label="Choose a car: " on:select={updateButton} on:select={handleSelect}/>
      </div>
    
      <div class="track-selector" id="track">
        <ImageSelector options={trackArray} label="Choose a track: " on:select={updateButton} on:select={handleSelect}/>
      </div>
    
      <div class='timey-whimey'>
        <div class="time-data">
          <label for="user-time">Enter your lap time: (MM:SS)</label>
          <input type="text" id="user-time" bind:value={lapTime} on:input={updateButton}>
        </div>
        <div class="time-data">
          <TimeData {lapTime} {topTime} {vsTop} />
        </div>
        <div class='skinny-button'>
          <button on:click={resetSecondaryOptions}>
            Show/Hide Additional Fields
          </button>
        </div>
      </div>
    </div>
  
    {#if showSecondaryOptions}
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
        {#each layoutArray as trackLayout} 
          <label>
            <input type="radio" name="trackLayout" value={trackLayout} bind:group={layout} on:change={updateButton}/>
            {trackLayout}
          </label>
        {/each}
      </div>
    
      <div class="track-options" id="track-conditions">
        <label for="track-conditions">Choose track surface conditions (optional):</label>
        {#each ['Wet', 'Cold'] as surfaceConditions}
          <label>
            <input type="checkbox" name="surface" value={surfaceConditions} bind:group={surface} on:change={updateButton}/>
            {surfaceConditions}
          </label>
        {/each}
      </div>
    </div>
    {/if}
  
    <div class="extra-info">
      <label for="user-data">Enter notes about lap (optional):</label>
      <textarea id="user-data" bind:value={notes} on:input={updateButton}/>
    </div>

    <div class="buttons">
      <div class="card" id="save-button">
        <button disabled={!lapTime} on:click={saveData}>
          {lapTime ? "" : "Enter a Lap Time to "}
          {saved ? "Saved!" : "Save"}
        </button>
      </div>
    </div>
  </div>

  <div class='interactive-content'>
    <div class='time-table'>
      <TimeTable/>
    </div>
  </div>

</main>

<style>

</style>
