<script>
    import { queryParam } from "sveltekit-search-params";
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { accessToken, user } from '../../utils';
    
    const auth_code = queryParam('code');
  
    const fetchUser = async () => 
    {
        let token = $accessToken;

        $user = await fetch(`api/me?token=${token}`)
        .then((response) => response.json())
        
        if (user)
        {
            goto('/home')
        }
    }

    onMount(async () => {
        
          const code = $auth_code;
          console.log(`Auth code is ${$auth_code}`)
          const response = await fetch(`/api/redirect?${code}`, {
              method: 'POST'
          }).then(data => data.json())
  
          $accessToken = response.access_token;
  
          if (accessToken) 
          {
              fetchUser()
          }
      });
  
  </script>