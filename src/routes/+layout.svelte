<script>
    import 'bootstrap/dist/css/bootstrap.css';
    import scriptSrc from 'bootstrap/dist/js/bootstrap.bundle.js?url';
</script>
<svelte:head>
  <script src={scriptSrc}></script>
</svelte:head>
<slot />