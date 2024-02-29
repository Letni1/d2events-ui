<script>
    /** @type {string} */
	export let team_name;
    /** @type {string} */
    export let logo;
</script>

<div class="card p-4 mb-2 mt-2 border-none">
    <header>
        <img src={logo} alt='Team logo' width="48" height="64"/>
    </header>
    <section>
        <p class="break-all">{team_name}</p>
    </section>
</div>
