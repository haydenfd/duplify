<script>
  import { queryParam } from "sveltekit-search-params";
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { accessToken } from '../../utils/store';
  
  const auth_code = queryParam('code');


  onMount(async () => {
        const code = $auth_code;

		const response = await fetch(`/api/redirect?${code}`, {
            method: 'POST'
        }).then(data => data.json())

        $accessToken = response.access_token;

        if (accessToken) {
            goto('/home')
        }
	});


</script>
