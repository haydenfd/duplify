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





<!-- 
<nav>
    <button on:click|preventDefault={handleHomeRedirect}>Duplify</button>
    <button on:click|preventDefault={handleGuideRedirect}>How do I use this?</button>
    <button on:click|preventDefault={handleAboutRedirect}>What's this about?</button>
    <button on:click|preventDefault={handleLogout}>Logout</button>
</nav> -->


<nav>
        <h1>Duplify</h1>
        <ul>
            <li>
                <a href="/">
                    Home
                </a>
            </li>
            <li>
                <a href="/home/guide">
                    Guide
                </a>
            </li>
            <li>
                <a href="/home/about">
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
    }
    a {
        text-decoration: none;
        color: white;
        font-weight: 600;
    }

    li:hover {
        background-color: #B037B6;
    }

    /* nav {
        display: flex;
        align-items: baseline;
        justify-content: space-around;
        background-color: #1DB954;
        padding: 14px;
    }

    button {
        background-color: transparent;
        border: 2px solid transparent;
        font-size: 26px;
        color: white;
        font-weight: 600;
        font-family: 'Montserrat';
        padding:10px;
        cursor: pointer;
        transition: all 0.28s ease-in-out;
    }

    button:hover {
        background-color: rgb(176,55,182);
        border: 2px solid rgb(176,55,182);
    } */
</style>