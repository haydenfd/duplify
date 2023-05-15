<script>
    import { accessToken } from '../utils/store';
    import { browser } from '$app/environment'


    if ($accessToken === null)
    {
        if (browser)
        {
            window.location.href = '/login'
        }
        
    }
    else {
        if (browser) {
            window.location.href = '/home'

        }
    }
    
</script>