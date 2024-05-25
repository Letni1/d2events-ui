<script>
	import * as constants from '$lib/constants';
    /** @type {any} */
	export let event;
	$: textColor = event.player.team_number === 1 ? 'text-red-600' : 'text-green-500';
	$: hoverColor = event.player.team_number === 1 ? 'hover:bg-red-300' : 'hover:bg-green-300';
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
        <p class="text-white mb-4">Will <span class={`font-semibold ${textColor} ${hoverColor}`}>{event.player.name}</span> get <span class={`font-semibold ${textColor} ${hoverColor}`}>{event.field}</span> {event.choice}  <span class={`font-semibold ${textColor} ${hoverColor}`}>{event.field_value}</span> this game playing as <img src={event.hero.icon} alt="{event.hero.name}" class="inline w-6 h-6 rounded-full"></p>		  
    </div>
    <!-- Timer -->
    <div class="text-center text-gray-400 mb-2">
        <span id="timerLabel">Time remaining: </span><span id="timer">00:00</span>
    </div>
    <div class="flex justify-between mt-4 space-x-2">
        <button class="bg-blue-700 text-white px-2 py-2 rounded hover:bg-blue-600 flex-1" onclick="voteYes()">Vote Yes</button>
        <button class="bg-pink-700 text-white px-2 py-2 rounded hover:bg-pink-600 flex-1" onclick="voteNo()">Vote No</button>
    </div>
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
