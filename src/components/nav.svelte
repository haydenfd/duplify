<script>
    import { browser } from "$app/environment";
    import { accessToken } from "../utils/store";

    export const handleLogout = () => {
        $accessToken = null;
        if (browser)
        {
            window.sessionStorage.setItem('accessToken', null);
            window.location.href='/login'
        }
        
    }

    export const handleAboutRedirect = () => 
    {
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

    export const handleGuideRedirect = () => {

        if (browser)
        {
            window.location.href = '/home/guide'
        }
    }
</script>


<nav>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <h1 on:click|preventDefault={handleHomeRedirect}>Duplify</h1>
        <ul>
            <li>
                <a href="/" data-sveltekit-preload-data="tap">
                    Home
                </a>
            </li>
            <li>
                <a href="/home/guide" data-sveltekit-preload-data="tap">
                    Guide
                </a>
            </li>
            <li>
                <a href="/home/about" data-sveltekit-preload-data="tap">
                    About
                </a>
            </li>
            <li>
                <a href="#top" on:click={handleLogout}>
                    Logout 
                </a>
            </li>
        </ul>
</nav>

<style>

    nav {
        display: flex;
        background-color: #1DB954;
        color: white;
    }

    ul {
        display: flex;
        list-style: none;
        align-items: center;
        justify-content: flex-end;
        margin: 0;
        margin-left: auto;
        margin-right: 30px;
        margin-top: 10px;
        width: 60%;
    }

    li {
        margin-right: 20px;
        font-size: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 15px;
        height: 30px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;

    }  

    h1 {
        font-size: 36px;
        margin: 0;
        margin-left: 16px;
        padding: 15px;
        margin-top: 10px;
        height: 100%;
        cursor: pointer;
    }

    h1:hover {
        transition: all 0.28s ease-in-out;
        color: #B037B6;
    }
    a {
        text-decoration: none;
        color: white;
        font-weight: 600;
    }

    li:hover {
        background-color: #B037B6;
    }

</style>