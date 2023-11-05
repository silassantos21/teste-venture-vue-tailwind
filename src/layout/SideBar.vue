<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'

let store = useStore()

onMounted(() => {
    window.addEventListener('resize', handleWindowResize)
})
// beforeDestroy
onBeforeUnmount(() => {
    window.removeEventListener('resize', handleWindowResize)
})

let handleWindowResize = () => {
  if (window.innerWidth <= 1200) {
    if (store.state.largeSidebar.sidebarToggleProperties.isSideNavOpen) {
      store.commit('largeSidebar/toggleSidebarProperties')
    }
  } else {
    if (!store.state.largeSidebar.sidebarToggleProperties.isSideNavOpen) {
      store.commit('largeSidebar/toggleSidebarProperties')
    }
  }
}
</script>
<template>
  <div class="side-content-wrap">
    <div class="side-content-wrap">
      <div :class="store.state.largeSidebar.sidebarToggleProperties.isSideNavOpen === true ? 'open' : ''" class="sidebar-left">
        <perfect-scrollbar>
          <ul class="navigation-left">
            <router-link to="/contador" tag="li" class="nav-item">
              <div class="nav-item-hold">
                <p>Contador</p>
              </div>
            </router-link>
            <router-link to="/conversor-temperatura" tag="li" class="nav-item">
              <div class="nav-item-hold">
                <p>Conversor de temperatura</p>
              </div>
            </router-link>
            <router-link to="/reserva-voo" tag="li" class="nav-item">
              <div class="nav-item-hold">
                <p>Reserva de voo</p>
              </div>
            </router-link>
            <router-link to="/cronometro" tag="li" class="nav-item">
              <div class="nav-item-hold">
                <p>Cronômetro</p>
              </div>
            </router-link>
            <router-link to="/crud-acoes" tag="li" class="nav-item">
              <div class="nav-item-hold">
                <p>Funcionamento CRUD</p>
              </div>
            </router-link>
            <router-link to="/marcar-circulo" tag="li" class="nav-item">
              <div class="nav-item-hold">
                <p>Desenho de círculos</p>
              </div>
            </router-link>
            <router-link to="/tabela" tag="li" class="nav-item">
              <div class="nav-item-hold">
                <p>Cédulas de tabela</p>
              </div>
            </router-link>
          </ul>
        </perfect-scrollbar>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav-item.router-link-exact-active {
  @apply text-green-500;

  &:after {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    bottom: -15px;
    right: -15px;
    transform: rotate(45deg);
    @apply bg-green-500;
  }
}
.submenuLi {
  &:hover {
    .submenuli-icon {
      color: #00ad51;
    }
  }
  .submenuli-icon {
    color: #9ca3af;
  }
}
.submneu-nested-link {
  padding: 0 !important;
  color: #000 !important;
  &:hover {
    background-color: transparent !important;
    color: #00ad51 !important;
  }
}
.side-content-wrap {
  .sidebar-left {
    position: fixed;
    top: 80px;
    left: -120px;
    width: 120px;

    background: #fff;
    box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.06),
        0 1px 4px rgba(0, 0, 0, 0.08);
    z-index: 90;
    transition: all 0.24s ease-in-out;
    &.open {
      left: 0;
      transition: all 0.24s ease-in-out;
    }
    .ps {
      height: calc(100vh - 80px);
    }
    .navigation-left {
      list-style: none;
      text-align: center;
      width: 120px;
      height: 100%;
      margin: 0;
      padding: 0;
      .nav-item,
      .nav-item-single {
        position: relative;
        display: block;
        width: 100%;
        overflow: hidden;
        cursor: pointer;
        &:hover {
          .nav-item-hold {
            @apply text-green-500;
          }
          &:after {
            content: '';
            position: absolute;
            width: 30px;
            height: 30px;
            bottom: -15px;
            right: -15px;
            transform: rotate(45deg);
            @apply bg-green-500;
          }
        }

        &.active {
          @apply text-green-500;

          &:after {
            content: '';
            position: absolute;
            width: 30px;
            height: 30px;
            bottom: -15px;
            right: -15px;
            transform: rotate(45deg);
            @apply bg-green-500;
          }
        }
        border-bottom: 1px solid #dee2e6;
        .nav-item-hold {
          display: block;
          width: 100%;
          padding: 26px 0;
          span.material-icons {
            font-size: 2rem;
          }
        }
      }
    }
  }
  .sidebar-left-secondary {
    position: fixed;
    top: 80px;
    left: calc(-220px - 20px);
    z-index: 89;
    height: calc(100vh - 80px);
    width: 220px;
    padding: 0.75rem 0;
    transition: all 0.24s ease-in-out;
    background: #fff;

    &.open {
      left: 120px;
      transition: all 0.24s ease-in-out;
    }
    ul.childNav {
      li {
        &.dropdown-sidemenu {
          display: block;
          transition: all 0.3s ease-in;
          &.open {
            a {
              .dd-arrow {
                transform: rotate(90deg);
                transition: all 0.3s ease-in;
              }
            }
            ul.submenu {
              display: block;
              max-height: 1000px;
              transition: all 0.3s ease-in;
            }
          }

          a {
            .dd-arrow {
              margin-left: auto !important;
              transition: all 0.3s ease-in;
            }
          }
        }
        a {
          text-transform: capitalize;
          display: flex;
          align-items: center;
          font-size: 13px;
          cursor: pointer;
          padding: 12px 24px;
          transition: 0.15s all ease-in;
          &:hover {
            background-color: #f3f4f6;
            @apply text-green-500;
          }
          &.router-link-active.router-link-exact-active {
            @apply text-green-500;
          }
        }
        ul.submenu {
          @apply bg-gray-50;
          display: none;
          max-height: 0px;
          transition: all 0.3s ease-in;

          &.open {
            display: block;
            transition: all 0.3s ease-in;
          }
          li {
            a {
              padding-left: 48px;
            }
          }
        }
      }
    }
  }
  .sidebar-overlay {
    display: none;
    position: fixed;
    width: calc(100% - 120px - 220px);
    height: calc(100vh - 80px);
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0);
    z-index: 101;
    cursor: w-resize;
    &.open {
      display: block;
    }
  }
}
</style>
