 <script>
   import { goto } from '$app/navigation';
   import { onMount } from 'svelte';
   let pageTitle = "Duplify";
   let pageSubtitle = "Clone the contents of other Spotify playlists to a personal playlist!";
   function handleLogin() 
   {
     goto('api/auth')
   }

   onMount(() => {
    startColorAnimation();
  });

  function startColorAnimation() 
  {
    const title = document.querySelector('.text-title');

    let currentColor = 0;
    const colors = ["#1DB954", "white", "#B037B6"];

    setInterval(() =>
   {
      title.style.color = colors[currentColor];
      currentColor = (currentColor + 1) % colors.length;
    }, 1200);
  }

 </script>
 

 <div>
   <h1 class="text-title">{pageTitle}</h1>
   <h2 class="text-subtitle">{pageSubtitle}</h2>
   <button on:click={handleLogin} class="button-login">Login</button>
 </div>
 

 <style>
 
   div {
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
     height: 80vh;
   }
 
   h1 {
     font-size: 70px;
     font-weight: 700;
     margin-bottom: 20px;
     text-transform: uppercase;
     transition: color 0.28s ease-in-out;
     color: #1DB954;
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
 