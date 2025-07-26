<script>
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// Web3
	import { defaultConfig, connected, web3Modal } from 'svelte-wagmi';
	import { onMount } from 'svelte';
	import * as constants from '$lib/constants';
	import { injected } from '@wagmi/connectors';
	import { polygonAmoy } from '@wagmi/core/chains';
	
	onMount(async() => {
		const erckit = defaultConfig({
			appName: 'Bountyrune',
			chains: [polygonAmoy],
			walletConnectProjectId: constants.PUBLIC_WALLETCONNECT_KEY,
			alchemyId: constants.PUBLIC_ALCHEMY_ID,
			connectors: [injected()]
		});
		await erckit.init();
	})

</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<AppBar slotTrail="place-content-end" class="app-bar-row-main grid items-center">
			<svelte:fragment slot="lead">
				<a href="/">
				<div class="flex items-center">
					<img src={constants.rune_icon} alt="site_icon" class="inline w-8 h-8 rounded-full">
					<!-- <strong class="ml-2 hidden lg:block text-xl uppercase"> -->
						<span class="ml-2 text-lg sm:text-xl hidden sm:block uppercase font-bold">Bountyrune</span>
					<!-- </strong> -->
				  </div>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if $web3Modal}
					{#if $connected}
						<button type="button" class="btn btn-sm variant-filled-warning uppercase font-bold" on:click={() => $web3Modal.open()}>Wallet</button>
					{:else}
						<button type="button" class="btn btn-sm variant-filled-warning uppercase font-bold" on:click={() => $web3Modal.open()}>Connect wallet</button>
					{/if}
				{:else}
				<p>Cannot connect wallet at the moment</p>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
</AppShell>
