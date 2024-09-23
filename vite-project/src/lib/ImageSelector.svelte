<script>
    export let options = [];
    export let label = "";
    let selectedOption = options[0];
</script>
  
<main>
    <div class="image-container">
        {#if selectedOption}
            <img src={selectedOption.imageUrl} alt={selectedOption.name} />
        {/if}
    </div>
    
    <label for="image-container">{label}</label>
    <select id="option-select" bind:value={selectedOption}>
        {#each options as option}
            <option value={option}>{option.name}</option>
        {/each}
    </select>
</main>
  