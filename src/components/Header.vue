<template>
  <div class="header">
    <header>
      <div class="header-left">
        <h1 class="logo">
          <a href="javascript:void(0);">
            <img src="../assets/logo.png" alt="Logo" width="45" height="45" />
          </a>
        </h1>
        <ul>
          <li>
            <a class="active" href="javascript:void(0);">Control Center</a>
          </li>
        </ul>
      </div>
      <div class="header-right">
        <ul>
          <li class="settings-sec">
            <a href="javascript:void(0);">
              <span class="settings-icon"></span>
            </a>
          </li>
          <li class="profile-sec">
            <a href="javascript:void(0);">
              <img src="../assets/profile.png" alt="Profile" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped>
header {
  overflow: hidden;
  background: #222;
  padding: 0 12px;
}

header,
.header-left,
.header-right ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header a {
  color: #fff;
  text-decoration: none;
  padding: 12px;
}

header a:hover {
  text-decoration: none;
}

.header-left a {
  text-transform: uppercase;
  opacity: 0.5;
}

.profile-sec {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #fff;
  background: #000;
  margin: 12px;
  cursor: pointer;
  overflow: hidden;
}

.profile-sec a {
  padding: 0;
  display: block;
}

.profile-sec img {
  width: 100%;
}

.settings-icon {
  background: url("../assets/menu.svg") #fff;
  width: 20px;
  height: 20px;
  display: block;
  color: #fff;
  margin: 12px;
}
</style>
