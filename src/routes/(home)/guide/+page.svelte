<script>

import { images } from './imageData.js';
import Slider from './Slider.svelte';
import Thumbnail from './Thumbnail.svelte';
import Caption from './Caption.svelte';
/* IMAGE TO SHOW */
let imageShowingIndex = 0;
	$: console.log(imageShowingIndex);
	$: image = images[imageShowingIndex];
	
	const nextSlide = () => {
		if (imageShowingIndex === images.length-1) {
			imageShowingIndex = 0;
		} else {
			imageShowingIndex += 1;
		}
	}
	
	const prevSlide = () => {
		if (imageShowingIndex === 0) {
			imageShowingIndex = images.length-1;
		} else {
			imageShowingIndex -= 1;
		}
	}
	
	const goToSlide = (number) => imageShowingIndex = number;
</script>


<style>

.wrapper {
	width: 40vw;
	display: flex;
	flex-direction: column;
	margin: 4% auto;
	background-color: #222;
	box-shadow: 0 0 10px black;
}	
	
/* Position the image container (needed to position the left and right arrows) */
.container {
  position: relative;
}

.thumbnails-row {
	width: 100%;
	display: flex;
	align-self: flex-end;
}	

p {
    width: 80vw;
    line-height: 150%;
    font-size: 1.2rem;
    font-weight: 500;

}
</style>

<h1>How to use</h1>
<p>This annotated slideshow guides you on how to use Duplify. I'm actively trying to improve the instructions and layout of the slide images. If you have any feedback on how I can improve this guide, please feel free to reach out!</p>
<div class="wrapper">

	<!-- image gallery -->
    <div class="container">
		  <Slider image={image.imgurl} 
						 altTag={image.name} 
						 attr={image.attribution} 
						 slideNo={image.id+1} 
						 totalSlides={images.length} 
						 />
	</div>

	<!-- Image text -->
	<Caption caption={images[imageShowingIndex].name}
					 on:prevClick={prevSlide}
					 on:nextClick={nextSlide}/>

	<!-- Thumbnail images -->
	<div class="thumbnails-row">
			{#each images as {id, imgurl, name}}
				<Thumbnail thumbImg={imgurl} 
									 altTag={name} 
									 {id} 
									 selected={imageShowingIndex === id}
									 on:click={() => goToSlide(id)} />
			{/each}
    </div>
</div>