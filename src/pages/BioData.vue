<template>
  <q-page>
    <div v-if="loading" class="loader flex flex-center bg-teal">
      <q-spinner-cube color="white" size="5.5em" />
    </div>
    <div class="flex flex-center items-center q-mt-lg bg-teal q-pa-sm" expand position="top">
      <q-img
        style="width: 70px"
        :ratio="1"
        class="rounded-borders q-ma-sm"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWo-CvZsOSr3zYgZx8VucyVl_w4XA4eeBFJg&s"
      />

      <q-input
        rounded
        outlined
        v-model="query"
        class="q-gutter-xs"
        placeholder="Search User"
        @keypress="filterUsers"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-btn class="q-ma-sm" color="dark" @click="refresh"> Refresh </q-btn>
    </div>
    <div class="q-pa-md">
      <q-markup-table flat bordered>
        <thead class="bg-teal">
          <tr>
            <th class="text-left">First Name</th>
            <th class="text-right">Age</th>
            <th class="text-right">Date Of Birth</th>
            <th class="text-right">Address</th>
            <th class="text-right">Gender</th>
            <th class="text-right">Weight</th>
            <th class="text-right">Coins/Crypto</th>

            <th class="text-right">Network/Crypto</th>

            <th class="text-right">IP</th>
            <th class="text-right">MAC Address</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody
          :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
          v-for="(item, index) in allData"
          :key="index"
        >
          <tr v-if="!item.deleted">
            <td class="text-right">{{ item.firstName }}</td>
            <td class="text-right">{{ item.age }}</td>
            <td class="text-right">{{ item.birthDate }}</td>
            <td class="text-right">{{ item.address.address }}</td>
            <td class="text-right">{{ item.gender }}</td>
            <td class="text-right">{{ item.weight }}</td>
            <td class="text-right">{{ item.crypto.coin }}</td>
            <td class="text-right">{{ item.crypto.network }}</td>
            <td class="text-right">{{ item.ip }}</td>
            <td class="text-right">{{ item.macAddress }}</td>
            <td>
              <q-btn color="red" @click="Delete(item.id)"> Delete {{ item.id }}</q-btn>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
      <div class="q-pa-lg flex flex-center bg-teal text-white">
        <q-pagination v-model="current" :max="total" color="white" input input-class="text-white" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue'
import store from 'src/store/store'

export default {
  name: 'IndexPage',
  setup() {
    const query = ref('')
    const current = ref(1)
    onMounted(() => {
      store.commit('loading', true)
      store.dispatch('getData')
    })
    watch(current, (newCurrent) => {
      store.dispatch('getData', newCurrent)
    })
    const filterUsers = () => {
      store.dispatch('filterUsers', query.value)
    }
    const refresh = () => {
      store.dispatch('getData')
    }
    const allData = computed(() => store.getters.getterData)
    const total = computed(() => store.getters.total)
    const loading = computed(() => store.getters.loading)
    const Delete = (id) => {
      const item = allData.value.find((item) => item.id === id)
      if (item) {
        item.deleted = true
      }
      store.dispatch('delData', id)
    }
    return {
      query,
      allData,
      filterUsers,
      Delete,
      loading,
      refresh,
      current,
      total,
    }
  },
}
</script>
