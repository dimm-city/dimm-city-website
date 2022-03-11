<script lang="ts">
    export let icon = "bi bi-missing";
    export let title = "Title";
    export let url = "#";
</script>

<a href={url} on:click>
    <div class="menu-item" data-augmented-ui>
        <p><i class={icon} />{title}</p>
        <small><slot /></small>
    </div>
</a>

<style>
    a {
        animation: slideUp 300ms both ease-in;
    }

    @keyframes slideUp {
        0% {
            opacity: 0;
            transform: translateY(200vh);
        }
        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }
</style>