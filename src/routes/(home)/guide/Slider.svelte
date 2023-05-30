<script>	
	export let slideNo;
	export let totalSlides;
	export let image;
	export let altTag;
	export let attr;
</script>

<style>	
.numbertext {
  color: #B037B6;
  font-size: 1.5rem;
  padding: 8px 12px;
  text-shadow: 1px 1px black;
  position: absolute;
  font-weight: 600;
  top: 0;
  right: 0;
}
	
img {
	width: 100%
}	

</style>


<div class="mySlides">
	<div class="numbertext">{slideNo} / {totalSlides}</div>
	<img src={image} alt={altTag} title={attr}>
</div>