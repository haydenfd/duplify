<script>
    import Navbar from "../Components/navbar.svelte";
    import { browser } from "$app/environment";
    import { onMount } from 'svelte';
    import {accessToken} from '../utils'

    $: {
        if (!$accessToken)
        {
            if (browser)
            {
                window.location.href = '/login'
            }
        }
    }
    
</script>

<Navbar />