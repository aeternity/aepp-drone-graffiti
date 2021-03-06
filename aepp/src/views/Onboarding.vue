<template>
  <div ref="onboardingWrapper">
    <OnboardingStep
      v-if="view === 1"
      key="v1"
      image="0_DGP_lockup_white_1.svg"
      headline="Upload an image and make an artwork out of it"
      text="Your image will be vectorized, get creative with editing">
    </OnboardingStep>
    <OnboardingStep
      v-if="view === 2"
      key="v1"
      image="0_DGP_lockup_white_1.svg"
      headline="Bid enough AE to win the required painting time"
      text="The aeternity smart contract shows the artworks of all successful bids">
    </OnboardingStep>
    <OnboardingStep
      v-if="view === 3"
      key="v1"
      image="0_DGP_lockup_white_1.svg"
      headline="Be part of the first collaborative artwork on the aeternity blockchain"
      text="Checkout the canvas and get creative">
    </OnboardingStep>

    <footer class="w-full fixed bottom-0">
      <div class="w-full flex flex-row p-4 justify-between">
        <div @click="quit" class="p-2">
          <ae-text face="uppercase-base" weight=700>SKIP</ae-text>
        </div>
        <div class="flex flex-row justify-center p-2 items-center">
          <div v-for="step in MAX_VIEW" :class="step !== view ? 'ae-step-indicator' : 'ae-step-indicator-active'"
               :key="step">
          </div>
        </div>
        <div class="flex justify-end p-2" @click="next" v-if="nextText">
          <ae-text face="uppercase-base" weight=700>{{nextText}}</ae-text>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  import OnboardingStep from '~/components/OnboardingStep'
  import { AeText } from '@aeternity/aepp-components/src/components'

  export default {
    name: 'Onboarding',
    data () {
      return {
        view: 1,
        MIN_VIEW: 1,
        MAX_VIEW: 3,
        currentlyTouching: false,
        touchStartPos: {
          x: 0,
          y: 0
        }
      }
    },
    components: {
      OnboardingStep,
      AeText
    },
    computed: {
      nextText () {
        if (this.view === 3) return 'START'
        else return 'NEXT'
      }
    },
    methods: {
      quit () {
        this.$router.push('/')
      },
      next () {
        if (this.view === this.MAX_VIEW) {
          return this.$router.push('/')
        }
        this.view += 1
      },
      prev () {
        if (this.view !== this.MIN_VIEW) this.view -= 1
      },
      onTouchStartEvent (event) {
        if (event.touches.length === 1) {
          this.touchStartPos = {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY
          }
          this.currentlyTouching = true
        }
      },
      onTouchMoveEvent (event) {
        if (this.currentlyTouching) {
          let dist = event.touches[0].clientX - this.touchStartPos.x
          if (dist > 200) {
            this.prev()
            this.currentlyTouching = false
          } else if (dist < -200) {
            this.next()
            this.currentlyTouching = false
          }
        }
      },
      onTouchEndEvent () {
        this.currentlyTouching = false
      }
    },
    mounted () {
      this.$store.dispatch('setFirstTimeOpenedFalse')

      this.$refs.onboardingWrapper.addEventListener('touchstart', this.onTouchStartEvent)
      this.$refs.onboardingWrapper.addEventListener('touchmove', this.onTouchMoveEvent)
      this.$refs.onboardingWrapper.addEventListener('touchend', this.onTouchEndEvent)
    },
    beforeDestroy () {
      this.$refs.onboardingWrapper.removeEventListener('touchstart', this.onTouchStartEvent)
      this.$refs.onboardingWrapper.removeEventListener('touchmove', this.onTouchMoveEvent)
      this.$refs.onboardingWrapper.removeEventListener('touchend', this.onTouchEndEvent)
    }
  }
</script>

<style type="scss">
  .onboarding-logo {
    margin-top: 20px;
    height: 200px;
  }

  .ae-step-indicator {
    background: #bbb;
    border-radius: 10px;
    height: 10px;
    width: 10px;
    margin-left: 3px;
    margin-right: 3px;
  }

  .ae-step-indicator-active {
    background: #FF0D6A;
    border-radius: 10px;
    height: 10px;
    width: 10px;
    margin-left: 2px;
    margin-right: 2px;
  }
</style>
