<script>
    import { browser } from "$app/environment";
    import { accessToken } from "../utils/store";


    export let handleHomeRedirect = () => {

        if (browser)
        {
            window.location.href = '/home'
        }
    }

    export let handleLogout = () => {
        
        if (browser)
        {
            $accessToken = null;
            window.sessionStorage.setItem('accessToken', null);
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
               <a href="/home">Home</a>
           </li>
           <li>
               <a href="/about">About</a>
           </li>
           <li>
               <a href="/guide">Guide</a>
           </li>
           <li>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
               <a href="#top" on:click={handleLogout}>Logout</a>
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

    li {
        font-size: 21px;
        padding: 15px;
        transition: all 0.3s ease-in-out;
    }

    li:hover {
        background-color: #B037B6;
    }

    a {
        text-decoration: none;
        color: white;
        font-weight: 600;
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