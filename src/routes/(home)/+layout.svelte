<script>
    import Navbar from "../../Components/navbar.svelte"
</script>

<Navbar></Navbar>
<div>
    <slot></slot>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
        width: 100%;
        height: 100%;
    }
</style>