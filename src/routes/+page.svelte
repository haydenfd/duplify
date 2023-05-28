<script>
    import Navbar from "../Components/navbar.svelte";
    import { browser } from "$app/environment";

    if (browser)
    {
        if (window.sessionStorage.getItem("accessToken") === null)
        {
            window.location.href = '/login'
        }

        else {
            window.location.href = '/home'
        }
    }

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