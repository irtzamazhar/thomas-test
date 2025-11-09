<template>
  <header class="app-header">
    <div class="header-container">
      <div class="logo">
        <span class="logo-icon">J</span>
        <div class="logo-text">
          <span class="logo-main">GEORGIA</span>
          <span class="logo-sub">FORECLOSURE</span>
        </div>
      </div>
      
      <nav class="nav-menu">
        <a href="#" class="nav-link active">Foreclosure List</a>
        <a href="#" class="nav-link">Custom List</a>
        <a href="#" class="nav-link">Contact</a>
      </nav>
      
      <div class="profile-section">
        <span class="plan-text">Professional Plan</span>
        <div class="profile-avatar">PP</div>
        <svg class="dropdown-icon" width="12" height="8" viewBox="0 0 12 8" fill="none">
          <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
.app-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 0;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  padding: 0 2rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-icon {
  background: #1f2937;
  color: white;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
  border-radius: 4px;
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.logo-main {
  font-weight: bold;
  font-size: 16px;
  color: #1f2937;
  letter-spacing: 0.5px;
}

.logo-sub {
  font-weight: 600;
  font-size: 14px;
  color: #1f2937;
  letter-spacing: 0.5px;
}

.nav-menu {
  display: flex;
  gap: 2rem;
  flex: 1;
  justify-content: center;
}

.nav-link {
  text-decoration: none;
  color: #6b7280;
  font-size: 15px;
  font-weight: 500;
  padding: 0.5rem 0;
  border-bottom: 3px solid transparent;
  transition: all 0.2s;
}

.nav-link.active {
  color: #1f2937;
  border-bottom-color: #1f2937;
}

.nav-link:hover {
  color: #1f2937;
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.plan-text {
  font-size: 14px;
  color: #374151;
  font-weight: 500;
}

.profile-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #1f2937;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
}

.dropdown-icon {
  color: #6b7280;
}
</style>

