<script>
    import { browser } from "$app/environment";
    import { accessToken } from "../utils/store";

    export const handleLogout = () => {
        $accessToken = null;
        if (browser)
        {
            window.localStorage.setItem('accessToken', null);
            window.location.href='/login'
        }
        
    }

    export const handleAboutRedirect = () => {
        if (browser)
        {
            window.location.href = '/home/about'
        }
    }

    export const handleHomeRedirect = () => {

        if (browser)
        {
            window.location.href = '/home'
        }
    }
</script>


<nav>
    <button on:click|preventDefault={handleHomeRedirect}>Duplify</button>
    <button on:click|preventDefault={handleAboutRedirect}>What's this about?</button>
    <button on:click|preventDefault={handleLogout}>Logout</button>
</nav>


<style>
    nav {
        display: flex;
        align-items: baseline;
        justify-content: space-around;
        background-color: #1DB954;
        padding: 20px;
    }

    button {
        background-color: transparent;
        border: 2px solid transparent;
        font-size: 28px;
        color: white;
        font-weight: 700;
        font-family: 'Montserrat';
        padding:16px;
        cursor: pointer;
        border-radius: 12px;
        transition: all 0.28s ease-in-out;
    }

    button:hover {
        background-color: rgb(176,55,182);
    }
</style>