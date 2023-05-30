<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import {fly} from 'svelte/transition';
    let pageTitle = "Duplify";
    let pageSubtitle = "Clone the contents of other Spotify playlists to a personal playlist!";
    let visible = false;
    // import Footer from '../../components/footer.svelte';
    function handleLogin() 
    {
      goto('api/auth')
    }
 
    onMount(() => {
     visible = true;
   });
 
  </script>
  
 
  {#if visible}
  <div>
    <h1 class="text-title">{pageTitle}</h1>
    <h2 class="text-subtitle">{pageSubtitle}</h2>
    <button on:click={handleLogin} class="button-login">Login</button>
      <!-- <Footer /> -->
  </div>
  {/if}
 
  <style>
  
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 80vh;
      overflow: auto;
    }
  
    h1 {
      font-size: 70px;
      font-weight: 700;
      margin-bottom: 20px;
      text-transform: uppercase;
      color: white;
    }
  
    h2 {
      font-size: 34px;
      margin-bottom: 80px;
      font-weight: 500;
    }
  
    button {
      width: 180px;
      height: 80px;
      background: #1DB954;     
      color: #fff;
      border: none;
      cursor: pointer;
      font-weight: bold;
      font-size: 24px;
      border: 2px solid transparent;
      border-radius: 5px;
      font-family: 'Montserrat';
      transition: all 0.28s ease-in-out;
    }
 
    button:hover {
      background-color: #B037B6;
   }
  
 
  </style>
  