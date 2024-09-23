<!-- Original plan: table of lap times per track where each cell 
 is colored red or green based on whether it's slower 
 or faster than the previous time. -->

 <script>
    import { dummyData } from './stores.js';
  
    let entries = [];
    let editMode = false;
    
    dummyData.subscribe(data => {
      entries = data;
    });

    function handleInputChange(event, index, field) {
        entries = entries.map((entry, i) => {
            if (i === index) {
            return { ...entry, [field]: event.target.value };
        }
        return entry;
        });
    }

    function saveChanges() {
        dummyData.set(entries);
        editMode = false;
    }
  </script>
  
  <style>
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      font-size: 1em;
      font-family: 'Arial', sans-serif;
      min-width: 400px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    }
    tbody {
        font-size: 14px;
        color: #b0b0b0; 
    }
    th, td {
      border: 1px solid #525252; 
      padding: 12px 15px;
      text-align: left;
    }
    .edit-button {
        margin-bottom: 10px;
        justify-content: center;
    }
    input[type="text"], input[type="date"] {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    }
  </style>
  
  <main>
    <h2>Past Entries</h2>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Vehicle</th>
          <th>Track</th>
          <th>Tires</th>
          <th>Layout</th>
          <th>Surface</th>
          <th>Lap Time</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {#each entries as entry, index}
          <tr>
            <td>{#if editMode}
                  <input type="date" value={new Date(entry.dateTime).toISOString().split('T')[0]} on:input={(e) => handleInputChange(e, index, 'dateTime')} />
                {:else}
                  {new Date(entry.dateTime).toLocaleDateString()}
                {/if}
            </td>
            <td>{#if editMode}
                  <input type="text" value={entry.car} on:input={(e) => handleInputChange(e, index, 'car')} />
                {:else}
                  {entry.car}
                {/if}
            </td>
            <td>{#if editMode}
                  <input type="text" value={entry.track} on:input={(e) => handleInputChange(e, index, 'track')} />
                {:else}
                  {entry.track}
                {/if}
            </td>
            <td>{#if editMode}
                  <input type="text" value={entry.tires} on:input={(e) => handleInputChange(e, index, 'tires')} />
                {:else}
                  {entry.tires}
                {/if}
            </td>
            <td>{#if editMode}
                  <input type="text" value={entry.layout} on:input={(e) => handleInputChange(e, index, 'layout')} />
                {:else}
                  {entry.layout}
                {/if}
            </td>
            <td>{#if editMode}
                  <input type="text" value={entry.surface.join(', ')} on:input={(e) => handleInputChange(e, index, 'surface')} />
                {:else}
                  {entry.surface.join(', ')}
                {/if}
            </td>
            <td>{#if editMode}
                  <input type="text" value={entry.lapTime} on:input={(e) => handleInputChange(e, index, 'lapTime')} />
                {:else}
                  {entry.lapTime}
                {/if}
            </td>
            <td>{#if editMode}
                <input type="text" value={entry.notes} on:input={(e) => handleInputChange(e, index, 'notes')} />
              {:else}
                {entry.notes}
              {/if}
          </td>
          </tr>
        {/each}
      </tbody>
    </table>
    <button class="edit-button" on:click={() => editMode = !editMode}>
        {editMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
    </button>
    {#if editMode}
        <button class="edit-button" on:click={saveChanges}>Save Changes</button>
    {/if}
  </main>