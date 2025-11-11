<template>
  <header class="h-[70px] mb-[10px] bg-white border-b-2 border-[#eee]" style="box-shadow: rgba(201, 201, 201, 0.4) 0 2px 4px 2px;">
    <div class="flex items-center justify-between h-full px-4 md:px-6 lg:px-8">
      <div class="flex items-center gap-4 md:gap-6 lg:gap-8">
        <button 
          @click="toggleMenu"
          class="md:hidden flex flex-col gap-1.5 w-6 h-6 justify-center items-center"
          aria-label="Toggle menu"
        >
          <span class="w-6 h-0.5 bg-gray-800 transition-all"></span>
          <span class="w-6 h-0.5 bg-gray-800 transition-all"></span>
          <span class="w-6 h-0.5 bg-gray-800 transition-all"></span>
        </button>

        <img 
          src="https://www.georgiaforeclosure.com/assets/img/georgia_logo.png" 
          alt="Georgia Foreclosure Logo" 
          class="h-6 md:h-7 lg:h-8 w-auto"
        />
        
        <nav class="hidden md:flex gap-3 lg:gap-4">
          <a href="#" class="no-underline text-gray-800 text-sm lg:text-[15px] font-medium py-2 border-b-[3px] border-gray-800 transition-all">Foreclosure List</a>
          <a href="#" class="no-underline text-gray-500 text-sm lg:text-[15px] font-medium py-2 border-b-[3px] border-transparent hover:text-gray-800 transition-all">Custom List</a>
          <a href="#" class="no-underline text-gray-500 text-sm lg:text-[15px] font-medium py-2 border-b-[3px] border-transparent hover:text-gray-800 transition-all">Contact</a>
        </nav>
      </div>
      
      <div class="flex items-center gap-2 md:gap-3 cursor-pointer">
        <span class="hidden sm:block text-xs md:text-sm text-gray-700 font-medium">Professional Plan</span>
        <div class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-800 text-white flex items-center justify-center font-semibold text-xs md:text-sm">PP</div>
        <svg class="text-gray-500 hidden sm:block" width="12" height="8" viewBox="0 0 12 8" fill="none">
          <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
    </div>

    <div 
      v-if="isMenuOpen"
      class="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
      @click="toggleMenu"
    ></div>

    <transition name="slide">
      <nav 
        v-if="isMenuOpen"
        class="md:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 flex flex-col"
      >
        <div class="flex items-center justify-between p-4 border-b border-gray-200">
          <img 
            src="https://www.georgiaforeclosure.com/assets/img/georgia_logo.png" 
            alt="Logo" 
            class="h-6 w-auto"
          />
          <button @click="toggleMenu" class="text-gray-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div class="flex flex-col p-4 gap-2">
          <a href="#" class="no-underline text-gray-800 text-base font-medium py-3 px-4 rounded-md bg-gray-100">Foreclosure List</a>
          <a href="#" class="no-underline text-gray-600 text-base font-medium py-3 px-4 rounded-md hover:bg-gray-50">Custom List</a>
          <a href="#" class="no-underline text-gray-600 text-base font-medium py-3 px-4 rounded-md hover:bg-gray-50">Contact</a>
        </div>
      </nav>
    </transition>
  </header>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'AppHeader',
  setup() {
    const isMenuOpen = ref(false)

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value
    }

    return {
      isMenuOpen,
      toggleMenu
    }
  }
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(-100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}
</style>

