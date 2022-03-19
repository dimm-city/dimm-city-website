<script>
    import { closeModal } from "svelte-modals";
    import { showModal, modalComponent, showModalFullscreen } from "./ShellStore";

    import { fly } from "svelte/transition";
    // provided by Modals
    export let isOpen;

    $: isOpen = $showModal;

    function dismiss() {
        closeModal();
        $showModal = false;
    }
</script>

{#if isOpen}
    <div role="dialog" class="modal" transition:fly={{ y: -600, delay: 0, duration: 350 }} on:introstart on:outroend>
        <div
            class="contents"
            class:fullscreen={$showModalFullscreen}
            data-augmented-ui="tl-2-clip-xy tr-2-clip-xy br-2-clip-y bl-2-clip-y both"
        >
            <div class="actions">
                <div on:click={dismiss}><i class="bi bi-x-octagon" /></div>
            </div>
            <div class="content-wrapper">
                <svelte:component this={$modalComponent} />
            </div>
        </div>
    </div>
{/if}

<style>
    [data-augmented-ui]::before {
        background-color: rgb(128 128 128 / 25%);
    }
    .modal {        
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        z-index: 2000;
        /* allow click-through to backdrop */
        pointer-events: none;
    }

    .contents {
        min-width: 20rem;
        margin: 5rem;
        min-height: 10rem;
        /* border-radius: 2em; */
        padding: 2.5rem;
        background: rgba(0, 0, 0, 0.9);
        /* display: flex;
        flex-direction: column;
        justify-content: space-between; */
        pointer-events: auto;

        color: var(--third-accent);
    }
    .contents.fullscreen {
        width: 100vw;
        min-height: 80%;
        margin: 2em;
    }
    @media only screen and (min-width: 320px) and (max-width: 767px) {
        .contents.fullscreen {
            transform: translateY(10em);
        }
    }
    .actions {
        display: flex;
        justify-content: flex-end;
        font-size: 1.25em;
        min-height: 1.2rem;
        position: absolute;
        right:2rem;
        top: 1rem;
    }

    .actions i {
        cursor: pointer;
    }
</style>
