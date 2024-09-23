<script>
    import { createEventDispatcher } from 'svelte';

    export let options = [];
    export let label = "";
    let selectedOption = options[0];

    const dispatch = createEventDispatcher();
    $: dispatch('select', selectedOption);
</script>
  
<main>
    <div id='image-label' class="image-container">
        {#if selectedOption}
            <img src={selectedOption.imageUrl} alt={selectedOption.name} />
        {/if}
    </div>
    
    <label for="image-label">{label}</label>
    <select id='option-select' bind:value={selectedOption}>
        {#each options as option}
            <option value={option}>{option.name}</option>
        {/each}
    </select>
</main>
  