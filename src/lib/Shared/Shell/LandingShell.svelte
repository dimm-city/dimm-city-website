<script>
	import { config } from '$lib/Shared/config';
	import { loggedIn } from '../Stores/UserStore';
	export let imageUrl = '/assets/imgs/landing-bg.png';
	export let videoUrl = 'https://files.dimm.city/assets/locations/burning-drab-square.mp4';
</script>

<svelte:head>
	<link rel="stylesheet" href="/assets/styles/landing-styles.css" />
</svelte:head>
<div class="video-container">
	<!-- svelte-ignore a11y-media-has-caption -->
	<video muted playsinline autoplay loop poster={imageUrl}>
		<source type="video/mp4" src={videoUrl} />
		Your browser does not support the video tag.
	</video>
</div>

<header>
	<nav>
		<input type="checkbox" id="nav-toggle" />
		<a href="/">Dimm City RPG</a>
		<div class="nav-toggle-container">
			<label for="nav-toggle" class="nav-toggle-label">
				<span />
				<span />
				<span />
			</label>
		</div>
		<div class="nav-items-container">
			<div class="nav-items-header">
				<span>&nbsp;</span>
				<label for="nav-toggle" class="nav-close-label"> X </label>
			</div>
			<hr class="nav-separator" />
			<ul>
				{#if $loggedIn}
					<li><a href="/console">Console</a></li>
				{/if}
				<li><a href="/about">About</a></li>
			</ul>
		</div>
	</nav>
</header>
<main>
	<slot />
</main>
<footer>
	<div>
		<small>&copy; 2023 Dimm City</small>
		<small> v{config.version ?? '0.9.0'}</small>
	</div>
</footer>

<style>
	.video-container {
		position: absolute;
		z-index: -1;
		width: 100%; /* or any specific size */
		height: 100%; /* or any specific size */
		overflow: hidden;
		opacity: 0.3;
	}

	video {
		position: relative;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover; /* this will help the video to cover the entire container */
	}
	@media (max-width: 750px) {
		/* video {
			display: none;
		}
		.video-container {
			background: url('fallback.jpg') no-repeat;
			background-size: cover;
		} */
	}
</style>
