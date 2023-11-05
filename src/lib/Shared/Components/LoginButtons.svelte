<script>
	import { getItchIoLoginUrl } from '../Stores/UserStore';
	import { config } from '../config';

	const itchioUrl = getItchIoLoginUrl();
</script>

<a class="button" href={itchioUrl}><i class="bi bi-house" />Sign with itch.io</a>
<a class="button" href={config.apiBaseUrl + '/connect/google'}
	><i class="bi bi-google" />Sign in with Google</a
>
<a class="button" href={config.apiBaseUrl + '/connect/reddit'}
	><i class="bi bi-reddit" />Sign in with Reddit</a
>
