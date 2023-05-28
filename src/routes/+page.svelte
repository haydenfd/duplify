<script>
    import Navbar from "../Components/navbar.svelte";
    import { browser } from "$app/environment";
    import { onMount } from 'svelte';

    onMount(() => {
        if (browser)
    {
        console.log('Hello')
        if (window.sessionStorage.getItem("accessToken") === null)
        {
            window.location.href = '/login'
        }

        else {
            window.location.href = '/home'
        }
    }
    })


    const checkForToken = () => {
        if (browser)
        {
            if (window.sessionStorage.getItem("accessToken") === null)
            {
                return false
            }

            else {
                return true;
            }
        }
    }
    
</script>

<Navbar />