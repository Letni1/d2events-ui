<script>
	import Event from './Event.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="flex flex-col items-center p-4 space-y-4">
    <div class="w-full max-w-4xl">
      <iframe
        src={`https://player.twitch.tv/?channel=esl_dota2&parent=${location.hostname}`}
        class="w-full h-64 md:h-96 lg:h-120 rounded-lg shadow-lg"
        allowfullscreen
        title="Twitch Player">
      </iframe>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {#each data.data as event}
        <Event {event} />
      {/each}
    </div>
  </div>

