<script>

</script>


<footer>
    <div class="flex-child">
        <h1 class="footer-text">Footer</h1>
    </div>
    <div class="flex-child two-way-border">
        <h1 class="footer-text">Footer</h1>
    </div>
    <div class="flex-child">
        <h1 class="footer-text">Footer</h1>
    </div>
    <!-- <h1 class="duplify-footer-text"> -->
        <!-- | A Hayden D'Souza production | <a href="#" class="a-tag">GitHub</a> |  <a href="#" class="a-tag">Email</a> | -->
    <!-- </h1> -->
</footer>

<style>

    footer {
        padding: 15px;
        text-align: center; 
        width: 50vw;
        position: absolute;
        bottom: 0;
        display: inline-flex;
        flex-direction: row;
        justify-content: space-around;
        margin-top: 20px;
        flex-wrap: nowrap;
    }
    
    .flex-child {
        flex: 1;
        transform: scale(0.87);
        height: 3rem;
    }

    .two-way-border {
        border-right: 1px solid white;
        border-left: 1px solid white;
    }

    .footer-text {
        color: #aaa;
        font-size: 1rem;
    }

    .a-tag {
        font-weight: 500;
        font-size: 1rem;
        text-decoration: none;
    }

</style>