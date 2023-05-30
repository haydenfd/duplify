<script>
	export let thumbImg;
	export let altTag;
	export let id;
	export let selected;
</script>

<style>
/* Six columns side by side */
.thumbnail-cont {
  width: 20%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #ddd;
}

.thumbnail-cont-active {
	background-color: #1DB954;
}
/* Add a transparency effect for thumnbail images */
.sample {
  opacity: 0.4;
}
	
.sample:hover {
  opacity: 1;
}
	
img {
	width: 100%;
	height: 100%;
	transition: all .1s ease-in-out;
}	
	
/* Add a pointer when hovering over the thumbnail images */
.cursor {
  cursor: pointer;
}	

.active {
  opacity: 1;
	padding: 5px;
	width: 85%;
	height: 85%;
}


</style>


<div class="thumbnail-cont {selected? 'thumbnail-cont-active':''}">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<img class="sample cursor" 
			class:active={selected} 
			{id} src={thumbImg} 
			alt={altTag} 
			on:click />
</div>