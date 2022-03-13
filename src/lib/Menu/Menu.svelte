<script>    
    // document.documentElement.style.setProperty('--menu-col', '1');
    export let columns = "2";
</script>
<div class="menu">
    <div class="menu-items col-{columns}" data-augmented-ui-reset>
        <slot />
    </div>
</div>
