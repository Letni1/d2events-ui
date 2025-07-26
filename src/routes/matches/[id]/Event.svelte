<script>
	import * as constants from '$lib/constants';
    import { writable } from 'svelte/store';
    /** @type {any} */
	export let event;
    import { defaultConfig, connected, web3Modal } from 'svelte-wagmi';
	import { setContext } from 'svelte';
	$: textColor = event.player.team_number === 1 ? 'text-red-600' : 'text-green-500';
	$: hoverColor = event.player.team_number === 1 ? 'hover:bg-red-300' : 'hover:bg-green-300';
    
    function vote() {
    console.log('Voting...');
    // Simulate a voting process
    setTimeout(() => {
      console.log('Voted');
    }, 1000);
    }
    let showYesForm = false;
    let showNoForm = false;

    let voteValue = 0;

    function toggleVoteForm(option) {
        if (option === 'yes') {
            showYesForm = !showYesForm;
            showNoForm = false;
        } else {
            showNoForm = !showNoForm;
            showYesForm = false;
        }
    }

    function hideVoteForm() {
        showYesForm = false;
        showNoForm = false;
        voteValue = 0;
    }
    
    function addValue(value) {
        // Parse the current value to a float
        let currentValue = parseFloat(voteValue) | 0;
        // Add the value to the current value
        voteValue = (currentValue + value).toFixed(2); // Ensure the result has 2 decimal places
    }

    function confirmVote() {
        // Add logic to confirm vote
    }
  
</script>

<div class="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col justify-between cursor-default">
    <div class="mb-4 flex items-center justify-between">
        {#if event.player.photo}
            <img src={event.player.photo} alt="Image 1" class="w-1/2 h-auto rounded-l-lg mr-2">
        {:else}
            <img src="{event.hero.img}" alt="Default Image" class="w-1/2 h-1/2 rounded-l-lg mr-2">
        {/if}
        {#if event.team.logo_url}
            <img src={event.team.logo_url} alt="Image 2" class="w-1/2 h-auto rounded-r-lg ml-2">
        {:else}
            {#if event.player.team_number == 1}
                <img src="{constants.dire_logo}" alt="Default Image" class="w-1/2 h-auto rounded-l-lg mr-2">
            {/if}
            {#if event.player.team_number == 0}
                <img src="{constants.radiant_logo}" alt="Default Image" class="w-1/2 h-auto rounded-l-lg mr-2">
            {/if}
        {/if}
    </div>
    <div>
        <!-- <h2 class="text-xl font-semibold mb-2 text-white">Will Arteezy get more than playing snapfire</h2> -->
        <p class="text-white mb-4 font-bold">Will <span class={`font-semibold ${textColor} ${hoverColor}`}>{event.player.name}</span> get <span class={`font-semibold ${textColor} ${hoverColor}`}>{event.field}</span> {event.choice}  <span class={`font-semibold ${textColor} ${hoverColor}`}>{event.field_value}</span> this game playing as <img src={event.hero.icon} alt="{event.hero.name}" class="inline w-6 h-6 rounded-full"></p>          
    </div>
    <!-- Timer -->
    <div class="text-center text-gray-400 mb-2">
        <span id="timerLabel">Time remaining: </span><span id="timer">00:00</span>
    </div>

    <!-- Conditional rendering based on showYesForm -->
    {#if showYesForm || showNoForm}
        <!-- Vote Yes Form -->
        <div class="flex justify-between mt-0 rounded-lg p-5 relative">
            <!-- Cross button -->
            <button class={`text-white absolute top-0 right-0 hover:${textColor}`} on:click={hideVoteForm}>&times;</button>
            <div class="absolute inset-y-1 left-2 flex items-center pl-4 text-gray-400">
                    <svg class="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 2.5c-4.136 0-7.5 3.364-7.5 7.5s3.364 7.5 7.5 7.5 7.5-3.364 7.5-7.5-3.364-7.5-7.5-7.5zm0-2.5C5.373 0 2.5 2.873 2.5 6.5S5.373 13 9 13s6.5-2.873 6.5-6.5S12.627 0 9 0zM5.998 10.015l4.657-2.138a.5.5 0 0 1 .307 0l4.657 2.138a.5.5 0 0 1 .187.68l-2.003 4.319a.5.5 0 0 1-.461.308h-4.375a.5.5 0 0 1-.462-.308l-2.003-4.319a.5.5 0 0 1 .187-.68z" clip-rule="evenodd"/>
                    </svg>
                </div>
            <!-- Input field -->
            <div class="flex-1 pr-2">
                <input inputmode="decimal" pattern="[0-9]*" class="bg-gray-800 text-white py-1 px-8 rounded-lg w-full placeholder-gray-500" bind:value={voteValue}>
            </div>
            <div class="absolute inset-y-0 right-28 flex items-center pr-2 text-gray-400">
                <button class="px-2 py-0.5 text-xs bg-gray-500 opacity-50 text-white rounded hover:bg-gray-600" on:click={() => addValue(1)}>+1</button>
                <div class="w-2"></div>
                <button class="px-1 py-0.5 text-xs bg-gray-500 opacity-50 text-white rounded hover:bg-gray-600" on:click={() => addValue(10)}>+10</button>
            </div>
            <!-- Confirm button -->
            {#if showYesForm}
                <button class="px-4 py-0.5 text-xs bg-blue-700 text-white rounded hover:bg-blue-600" on:click={confirmVote}>Vote yes</button>
            {:else}
                <button class="px-4 py-0.5 text-xs bg-pink-700 text-white rounded hover:bg-pink-600" on:click={confirmVote}>Vote no</button>
            {/if}
        </div>
        
    {:else}
    <div class="flex justify-between mt-4 space-x-2">
        <button class="bg-blue-700 text-white px-2 py-2 rounded hover:bg-blue-600 flex-1" on:click={() => $connected ? toggleVoteForm('yes') : $web3Modal.open()}>Vote Yes</button>
        <button class="bg-pink-700 text-white px-2 py-2 rounded hover:bg-pink-600 flex-1" on:click={() => $connected ? toggleVoteForm('no') : $web3Modal.open()}>Vote No</button>
    </div>
    {/if}
    <!-- Current Votes Section -->
    <div class="mt-4 flex justify-between items-center">
        <div class="text-sm text-gray-300">Yes: <span class="font-semibold text-blue-300" id="yesCounter">0</span></div>
        <div class="text-sm text-gray-300">No: <span class="font-semibold text-pink-300" id="noCounter">0</span></div>
    </div>

    <!-- Graph -->
    <div class="relative mt-4 h-4 bg-gray-600 rounded-lg overflow-hidden">
        <div class="absolute inset-0 flex justify-center items-center">
            <span class="text-white text-xs font-semibold" id="percentageLabel">0%</span>
        </div>
        <div class="h-full bg-blue-500" style="width: 0;" id="yesBar"></div>
    </div>
    <!-- Result Section -->
    <div class="mt-4 p-4 bg-gray-700 rounded-lg">
        <h3 class="text-lg font-semibold text-white mb-2">Result:</h3>
        <p class="text-gray-300" id="resultText">No votes yet.</p>
    </div>
</div>
