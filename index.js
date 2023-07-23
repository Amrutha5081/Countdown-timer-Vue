Vue.component('date-input', {
    template: `
      <div class="mb-3">
        <label for="dateInput" class="form-label">Please enter a Date:</label>
        <input type="date" class="form-control" id="dateInput" v-model="targetDate">
      </div>
    `,
    data() {
      const currentDate = new Date();
      const targetDate = new Date(currentDate.getTime() + (2 * 24 * 60 * 60 * 1000));
      return {
        targetDate: targetDate.toISOString().split('T')[0]
      };
    },
    watch: {
      targetDate() {
        this.$emit('date-updated', this.targetDate);
      }
    }
  });
  const helperMixin = {
      methods: {
          computeValue(value, unit) {
              return (value || 0)  + unit;
          },
      },
  };
  //Vue.mixin(helperMixin);
  
  Vue.component('days-component', {
      mixins: [helperMixin],
    props: {
      days: {
        type: Number,
        required: true,
          
      },
    },
    template: `
      <div class="countdown-value-box days-component">
            <div class="countdown-value-label">Days</div>
            <div class="countdown-value-number">{{ computeValue(computedDays, 'd') }}</div>
          </div>
    `,
    computed: {
      computedDays() {
        return Math.floor(this.days);
      },
    },
  });
  
  Vue.component('hours-component', {
      mixins:[helperMixin],
    props: {
      hours: {
        type: Number,
        required: true,
      },
    },
      template: `
          <div class="countdown-value-box hours-component">
            <div class="countdown-value-label">Hours</div>
            <div class="countdown-value-number">{{ computeValue(computedHours, 'h') }}</div>
          </div>
        `,
    computed: {
      computedHours() {
        return Math.floor(this.hours);
      },
    },
  });
  
  Vue.component('minutes-component', {
      mixins:[helperMixin],
    props: {
      minutes: {
        type: Number,
        required: true,
      },
    },
    template: `
       <div class="countdown-value-box minutes-component">
            <div class="countdown-value-label">Minutes</div>
            <div class="countdown-value-number">{{ computeValue(computedMinutes, 'm') }}</div>
          </div>
    `,
    computed: {
      computedMinutes() {
        return Math.floor(this.minutes);
      },
    },
  });
  Vue.component('seconds-component', {
      mixins:[helperMixin],
    props: {
      seconds: {
        type: Number,
        required: true,
      },
    },
    template: `
      <div class="countdown-value-box seconds-component">
            <div class="countdown-value-label" style="color:black;">Seconds</div>
            <div class="countdown-value-number" style="color: red;">{{ computeValue(computedSeconds, 's') }}</div>
          </div>
    `,
    computed: {
      computedSeconds() {
        return Math.floor(this.seconds);
      },
    },
  }); 
  Vue.component('countdown-timer', {
    template: `
    <div class="text-center">
      <div class="countdown-display">
        <div v-if="remainingTime <= 0" class="countdown-message" style="color: white;">
          Countdown has ended.
        </div>
        <div v-else class="countdown-values">
          <days-component :days="countdownValues.days"></days-component>
          <hours-component :hours="countdownValues.hours"></hours-component>
          <minutes-component :minutes="countdownValues.minutes"></minutes-component>
          <seconds-component :seconds="countdownValues.seconds"></seconds-component>
        </div>
      </div>
    </div>
  `,
    props: {
      targetDate: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        remainingTime: 0,
        countdownValues: {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        }
      };
    },
    mounted() {
      this.startCountdown();
    },
        watch: {
      remainingTime(newValue) {
        this.updateCountdownValues(newValue);
      }
    },
    methods: {
      startCountdown() {
        setInterval(() => {
          const currentDate = new Date().getTime();
          this.remainingTime = new Date(this.targetDate).getTime() - currentDate;
          this.updateCountdownValues(this.remainingTime);
        }, 1000);
      },
      updateCountdownValues(newValue) {
        this.countdownValues.days = Math.floor(newValue / (1000 * 60 * 60 * 24));
        this.countdownValues.hours = Math.floor((newValue % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.countdownValues.minutes = Math.floor((newValue % (1000 * 60 * 60)) / (1000 * 60));
        this.countdownValues.seconds = Math.floor((newValue % (1000 * 60)) / 1000);
      }
    }
  });
  new Vue({
    el: '#app',
    data() 
      {
          return {
              targetDate: ''
          }
    },
    methods: {
      updateTargetDate(date) {
        this.targetDate = date;
      }
    }
  });
  