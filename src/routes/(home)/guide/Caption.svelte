<script>
	import { createEventDispatcher } from 'svelte';
  export let caption;
	
	const dispatch = createEventDispatcher();
</script>

<style>
/* Container for image text */
.caption-container {
	display: flex;
	align-items: center;
	justify-content: space-between;
  text-align: center;
  background-color: #222;
	font-size: 1.2rem;
  padding: 2px 20px;
  color: white;
  font-weight: 600;
}
	
/* Next & previous buttons */
.prev,
.next {
  cursor: pointer;
/*   position: absolute;
  top: 50%; */
  width: auto;
/*   padding: 16px;
  margin-top: -50px; */
  color: #1DB954;
  font-weight: bold;
  font-size: 2.8rem;
  border-radius: 0 3px 3px 0;
  user-select: none;
  -webkit-user-select: none;
  text-decoration: none;
}

/* Position the "next button" to the right */
.next {
  /* right: 15vw; */
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover,
.next:hover {
  color: #B037B6;
  transform: scale(1.3);
}	
	
.prev:active,
.next:active {
  color: #1DB954;
	text-decoration: none;
}		
	
</style>


<div class="caption-container">

	<!-- svelte-ignore a11y-invalid-attribute -->
	<a href="javascript:void(0)" class="arrow prev" on:click={() => dispatch('prevClick')}>&#10094;</a>
	<p id="caption">{caption}</p>
		<!-- svelte-ignore a11y-invalid-attribute -->
	<a href="javascript:void(0)" class="arrow next" on:click={() => dispatch('nextClick')}>&#10095;</a>
</div>