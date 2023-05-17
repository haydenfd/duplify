<script>
    import PlaylistForm from "./playlistForm.svelte";
    import AboutPlaylist from "./aboutPlaylist.svelte";

</script>

<div class="container">
    <div class="about-playlist">
        <AboutPlaylist />
    </div>

    <div class="form">
        <PlaylistForm />
    </div>
</div>

<style>
    .container {
        background-color: black;
        display: flex;
        width: 70%;
        color: white;
        display: flex;
        flex-direction: row;
        align-items: stretch;
        margin-left: auto;
        margin-right: auto;
        margin-top: 75px;
        border-radius: 16px;
        box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    }

    .about-playlist {
        flex: 1;
        text-align: center;
    }

    .form {
        flex: 1;
        text-align: center;
        border-radius: 16px;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        border-left: 2px solid #4A4A4A;
    }
</style>