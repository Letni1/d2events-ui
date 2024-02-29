<script>
	import Match from './Match.svelte';
    import * as constants from '$lib/constants';
	/** @type {import('./$types').PageData} */
	export let data;
    console.log(data.data)
</script>

<div class="container h-full mx-auto relative">
    <h2 class="h2 mt-10 mb-4 text-center">MATCHES</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {#each data.data as match}
            {#if match.radiant_team && match.dire_team}
                <a class="block card card-hover p-4" href="matches/{match.match_id}">
                    <section>
                        <Match
                        logo={match.dire_team.extra && match.dire_team.extra.logo ? match.dire_team.extra.logo : constants.radiant_logo}
                        team_name={match.radiant_team.team_name}
                        />
                        <hr class="!border-t-2 " />
                        <Match
                        logo={match.dire_team.extra && match.dire_team.extra.logo ? match.dire_team.extra.logo : constants.dire_logo}
                        team_name={match.dire_team.team_name}
                        />
                    </section>
                </a>
            {/if}
        {/each}
    </div>
</div>


