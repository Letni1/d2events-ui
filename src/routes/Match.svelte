<script>
    /** @type {string} */
	export let team_name;
    /** @type {string} */
    export let logo;
</script>

<div class="flex-1 flex flex-col items-center">
    <div class="relative">
        <img src={logo} alt="Image 1" class="w-full object-cover rounded-lg">
        <div class="absolute bottom-0 left-0 w-full bg-gray-900 bg-opacity-0 text-center py-2 rounded-b-lg">
            <p class="text-gray-300 text-sm">{team_name}</p>
        </div>
    </div>
</div>
