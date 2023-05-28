<script>
    import { browser } from "$app/environment";
    import { accessToken } from "../utils/store";


    export let handleHomeRedirect = () => {

        if (browser)
        {
            window.location.href = '/home'
        }
    }

    export let handleAboutRedirect = () => {
        if (browser)
        {
            window.location.href = '/about'
        }
    }

    export let handleGuideRedirect = () => {
        if (browser)
        {
            window.location.href = '/guide'
        }
    }

    export let handleLogout = () => {
        
        if (browser)
        {
            $accessToken = null;
            window.sessionStorage.clear();
            window.location.href='/login'
        }
    }
</script>


<nav class="navbar">
    
    <div class="logo-container">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <h1 on:click|preventDefault={handleHomeRedirect} class="duplify-logo-title">Duplify</h1>
   </div>
   <div class="menu-container">
       <ul>
           <li>
               <button on:click={handleHomeRedirect}>Home</button>
           </li>
           <li>
               <button on:click={handleAboutRedirect}>About</button>
           </li>
           <li>
               <button on:click={handleGuideRedirect}>Guide</button>
           </li>
           <li>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
               <button on:click={handleLogout}>Logout</button>
           </li>
       </ul>
   </div>
</nav>


<style>

    nav {
        display: flex;
        color: white;
        background-color: #1DB954;
        align-items: baseline;
    }

    .menu-container {
        flex: 2;

    }

    .logo-container {
        flex: 1;
        margin-left: 7vw;
    }

    ul {
        display: flex;
        list-style: none;
        align-items: center;
        justify-content: space-evenly;
    }

    button {
        font-size: 21px;
        padding: 15px;
        transition: all 0.3s ease-in-out;
        font-family: 'Montserrat';
        border:3px solid transparent;
        border-radius: 4px;
        background-color: transparent;
        color:white;
        font-weight: 600;
        cursor: pointer;
    }

    button:hover {
        background-color: #B037B6;
    }

    .duplify-logo-title {
        font-size: 36px;
        cursor: pointer;
    }

    .duplify-logo-title:hover {
        transition: all 0.3s ease-in-out;
        color: #B037B6;
    }
</style>