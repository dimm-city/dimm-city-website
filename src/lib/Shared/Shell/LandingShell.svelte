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
				<!-- <span />
				<span />
				<span /> -->
				&lt;&lt;
			</label>
		</div>
		<div class="nav-items-container">
			<div class="nav-items-header">
				<span>&nbsp;</span>
				<label for="nav-toggle" class="nav-close-label"> &gt;&gt; </label>
			</div>
			<hr class="nav-separator" />
			<ul>
				<li><a href="/about/overview">Overview</a></li>
				<li><a href="/about/faq">FAQ</a></li>
				<li><a href="/about/glossary">Glossary</a></li>				
				<li><a href="/about">About</a></li>
				{#if $loggedIn}
					<li><a href="/profile">Profile</a></li>
					<li><a href="/console">Console</a></li>
				{/if}
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
		<small>
			<!-- <a href="https://kickstarter.com">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-cart2"
					viewBox="0 0 16 16"
				>
					<path
						d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
					/>
				</svg>
			</a> -->
			<a href="https://www.reddit.com/r/DimmCityRPG/" target="_blank"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-reddit"
					viewBox="0 0 16 16"
				>
					<path
						d="M6.167 8a.831.831 0 0 0-.83.83c0 .459.372.84.83.831a.831.831 0 0 0 0-1.661zm1.843 3.647c.315 0 1.403-.038 1.976-.611a.232.232 0 0 0 0-.306.213.213 0 0 0-.306 0c-.353.363-1.126.487-1.67.487-.545 0-1.308-.124-1.671-.487a.213.213 0 0 0-.306 0 .213.213 0 0 0 0 .306c.564.563 1.652.61 1.977.61zm.992-2.807c0 .458.373.83.831.83.458 0 .83-.381.83-.83a.831.831 0 0 0-1.66 0z"
					/>
					<path
						d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.828-1.165c-.315 0-.602.124-.812.325-.801-.573-1.9-.945-3.121-.993l.534-2.501 1.738.372a.83.83 0 1 0 .83-.869.83.83 0 0 0-.744.468l-1.938-.41a.203.203 0 0 0-.153.028.186.186 0 0 0-.086.134l-.592 2.788c-1.24.038-2.358.41-3.17.992-.21-.2-.496-.324-.81-.324a1.163 1.163 0 0 0-.478 2.224c-.02.115-.029.23-.029.353 0 1.795 2.091 3.256 4.669 3.256 2.577 0 4.668-1.451 4.668-3.256 0-.114-.01-.238-.029-.353.401-.181.688-.592.688-1.069 0-.65-.525-1.165-1.165-1.165z"
					/>
				</svg></a
			>
		</small>
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
