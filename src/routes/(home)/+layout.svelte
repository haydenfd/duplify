<script>
    import Navbar from "../../Components/navbar.svelte"
    import { fade, fly } from 'svelte/transition';
    // import Footer from "../../components/footer.svelte";
</script>

<Navbar></Navbar>
<div in:fly="{{ y: -200, duration: 2200 }}" out:fade="{{delay: 500,duration: 800}}">
    <slot></slot>
    <!-- <div class="footer-div">
        <Footer/>
    </div> -->
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
        width: 100%;
        height: 100%;
        overflow: scroll;
    }

    /* .footer-div {
        margin-top: 20px;
    } */
</style>