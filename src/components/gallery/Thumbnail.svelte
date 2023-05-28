<script>
	export let thumbImg;
	export let altTag;
	export let titleLink;
	export let id;
	export let selected;
</script>

<style>
.thumbnail-cont {
  width: 16.66%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #ddd;
}

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


<div class="thumbnail-cont">
	<img class="sample cursor" 
			class:active={selected} 
			{id} src={thumbImg} 
			alt={altTag} 
			title="Image from {titleLink}" 
			on:click />
</div>