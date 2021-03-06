<template>
  <div>
    <!-- HEADER -->
    <div class="ae-white-header relative bg-gray-800">
      <div @click="goBack" class="ae-back">
        <ae-icon v-if="back" name="back"></ae-icon>
      </div>
      <div class="ae-title">
        <img src="../assets/graffiti_logo.svg" class="logo" @click="$router.push('/')" alt="Logo"/>
        <span>{{title}}</span>
      </div>
      <ae-dropdown class="ae-menu">
        <ae-icon name="more" class="ae-back" slot="button"/>
        <li>
          <ae-button @click="$router.push('onboarding')">
            Show Onboarding
          </ae-button>
        </li>
        <li v-if="!staticClient">
          <ae-button @click="$router.push('overview')">
            My Bids
          </ae-button>
        </li>
        <li v-if="staticClient">
          <ae-button @click="$router.push('landingpage')">
            Landingpage
          </ae-button>
        </li>
        <li>
          <ae-button @click="$router.push('/')">
            Main Screen
          </ae-button>
        </li>
        <li v-if="hasDefaultSlot">
          <ae-button @click="showBackdrop">
            Help
          </ae-button>
        </li>
      </ae-dropdown>
    </div>

    <!-- HELP OVERLAY -->
    <ae-backdrop class="p-6" v-show="backDropVisible" @click.native.self="showBackdrop">
      <DarkCard>
        <div class="flex justify-center items-center flex-col pt-4">
          <slot></slot>
          <ae-button fill="primary" class="mt-8" face="round" @click.native.self="showBackdrop">
            Close
          </ae-button>
        </div>
      </DarkCard>
    </ae-backdrop>
  </div>

</template>

<script>
  import { AeBackdrop, AeButton, AeCard, AeDropdown, AeIcon } from '@aeternity/aepp-components/src/components'
  import DarkCard from './DarkCard'
  import aeternity from '../utils/aeternityNetwork'

  export default {
    name: 'WhiteHeader',
    components: {DarkCard, AeDropdown, AeIcon, AeButton, AeBackdrop, AeCard },
    props: {
      'back': {
        type: Function,
        default: null
      },
      'title': {
        type: String,
      }
    },
    data () {
      return {
        backDropVisible: false,
        staticClient: aeternity.static
      }
    },
    computed: {
      hasDefaultSlot () {
        return !!this.$slots.default
      }
    },
    methods: {
      goBack () {
        if (this.back) this.back()
      },
      showBackdrop () {
        this.backDropVisible = !this.backDropVisible
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ae-white-header {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.10);
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: relative;
    font-family: "Inter UI", sans-serif;
    z-index: 10;
  }

  .logo {
    height: 2.5rem;
    margin-right: 0.4rem
  }

  .ae-back {
    padding: 0.75rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    min-width: 3rem;
  }

  .ae-title {
    display: flex;
    align-items: center;
    font-size: 1.1rem;
    line-height: 1rem;
    margin: auto;
  }

  .ae-back {
    margin-right: auto;
  }

  .ae-menu {
    margin-left: auto;
  }

</style>
