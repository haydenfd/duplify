<script>
    import { browser } from "$app/environment";
    import {accessToken} from '../utils'

    $: {
        if (browser) {
            if ((window.sessionStorage.getItem("accessToken").length < 230) || ($accessToken.length < 230))
            {
                console.log('Re-routed')
                window.location.href='/login'            
            }
        }
    }
    
</script>


