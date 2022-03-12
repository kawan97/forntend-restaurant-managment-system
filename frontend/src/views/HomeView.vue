<template>
  <div class="pt-4 text-white">
    <h1>Tables</h1>
    <div class="container text-black">
      <div class="row">
        <Card tablename='aaaaa' status="empty" id='1' />
        <Card tablename='aaaaa' status="reserved" id='1' />
        <Card tablename='aaaaa' status="empty" id='1' />
        <Card tablename='aaaaa' status="reserved" id='1' />
        <Card tablename='aaaaa' status="reserved" id='1' />
        <Card tablename='aaaaa' status="empty" id='1' />
        <Card tablename='aaaaa' status="reserved" id='1' />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Card from '@/components/Card.vue'

export default {
  name: 'HomeView',
  components: {
    Navbar,
    Card
  }
}
</script>
