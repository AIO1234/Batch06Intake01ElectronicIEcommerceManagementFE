<template>
  <div class="cartel-sidebar-wrapper">
    <!-- Mobile Hamburger Trigger -->
    <v-btn
      v-if="isMobile"
      icon
      variant="text"
      class="mobile-menu-trigger"
      @click.stop="drawer = !drawer"
    >
      <v-icon color="#111827">mdi-menu</v-icon>
    </v-btn>

    <!-- Main CARTEL Navigation Drawer (Figma Design) -->
    <v-navigation-drawer
      v-model="drawer"
      :rail="!isMobile && isCollapsed"
      :permanent="!isMobile"
      :temporary="isMobile"
      :width="265"
      :rail-width="76"
      class="cartel-sidebar"
      elevation="0"
    >
      <!-- Top Brand Header with Uploaded CARTEL Logo & Collapse Toggle -->
      <div class="sidebar-header" :class="{ 'is-collapsed': !isMobile && isCollapsed }">
        <div
          class="brand-logo-box"
          title="Click to toggle sidebar"
          @click="toggleSidebar"
        >
          <img
            v-if="isMobile || !isCollapsed"
            :src="fullLogoDark"
            alt="CARTEL Inventory Management"
            class="brand-full-logo"
          />
          <img
            v-else
            :src="iconLogoDark"
            alt="CARTEL"
            class="brand-icon-logo"
          />
        </div>

        <!-- Exact Figma Sidebar Toggle Button [ | ] -->
        <button
          v-if="!isMobile && !isCollapsed"
          type="button"
          class="sidebar-collapse-btn"
          title="Collapse Sidebar"
          @click.stop="toggleSidebar"
        >
          <span class="collapse-box-icon"></span>
        </button>
      </div>

      <!-- Header Bottom Divider Line -->
      <div class="sidebar-header-divider"></div>

      <!-- Scrollable Navigation Menu Sections Matching Figma -->
      <div class="sidebar-scroll-area">
        <div
          v-for="(group, gIndex) in menuGroups"
          :key="gIndex"
          class="sidebar-section"
        >
          <!-- Section Subheader (Hidden when collapsed to icons) -->
          <div
            v-if="group.section && (isMobile || !isCollapsed)"
            class="sidebar-section-title"
          >
            {{ group.section }}
          </div>

          <v-list density="compact" nav class="sidebar-nav-list pa-0">
            <v-tooltip
              v-for="item in group.items"
              :key="item.title"
              :text="item.title"
              location="end"
              :disabled="isMobile || !isCollapsed"
            >
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  :prepend-icon="item.icon"
                  :title="isMobile || !isCollapsed ? item.title : ''"
                  :value="item.value"
                  :active="isActiveRoute(item.path)"
                  class="sidebar-nav-item"
                  :class="{
                    'active-nav-item': isActiveRoute(item.path),
                    'rail-nav-item': !isMobile && isCollapsed,
                  }"
                  @click="navigateTo(item.path)"
                />
              </template>
            </v-tooltip>
          </v-list>
        </div>

        <!-- Bottom Divider + Employees / Users Item (Matching Figma Bottom Section) -->
        <div class="sidebar-bottom-section">
          <div class="sidebar-bottom-divider"></div>
          <v-list density="compact" nav class="sidebar-nav-list pa-0">
            <v-tooltip
              text="Employees"
              location="end"
              :disabled="isMobile || !isCollapsed"
            >
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-account-group-outline"
                  :title="isMobile || !isCollapsed ? 'Employees' : ''"
                  value="Employees"
                  :active="isActiveRoute('/admin/users')"
                  class="sidebar-nav-item"
                  :class="{
                    'active-nav-item': isActiveRoute('/admin/users'),
                    'rail-nav-item': !isMobile && isCollapsed,
                  }"
                  @click="navigateTo('/admin/users')"
                />
              </template>
            </v-tooltip>
          </v-list>
        </div>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import fullLogoDark from "@/assets/images/cartel-logo-dark.png";
import iconLogoDark from "@/assets/images/cartel-icon-dark.png";

export default {
  name: "SideBar",
  emits: ["toggle-collapse"],
  data() {
    return {
      drawer: true,
      isCollapsed: false,
      isMobile: false,
      fullLogoDark,
      iconLogoDark,
      menuGroups: [
        {
          section: "MENU",
          items: [
            {
              title: "Dashboard",
              value: "Dashboard",
              icon: "mdi-view-dashboard-outline",
              path: "/admin/dashboard",
            },
            {
              title: "Inventory",
              value: "Inventory",
              icon: "mdi-cube-outline",
              path: "/admin/inventory",
            },
          ],
        },
        {
          section: "SALES & CUSTOMERS",
          items: [
            {
              title: "Customers",
              value: "Customers",
              icon: "mdi-account-multiple-outline",
              path: "/admin/customers",
            },
            {
              title: "Customer Orders",
              value: "CustomerOrders",
              icon: "mdi-cart-outline",
              path: "/admin/customer-orders",
            },
          ],
        },
        {
          section: "CATALOG",
          items: [
            {
              title: "Categories",
              value: "Categories",
              icon: "mdi-shape-outline",
              path: "/admin/categories",
            },
            {
              title: "Product & SKUs",
              value: "Products",
              icon: "mdi-package-variant-closed",
              path: "/admin/products",
            },
          ],
        },
        {
          section: "PROCUREMENT",
          items: [
            {
              title: "Suppliers",
              value: "Suppliers",
              icon: "mdi-truck-delivery-outline",
              path: "/admin/suppliers",
            },
            {
              title: "Purchase Orders",
              value: "PurchaseOrders",
              icon: "mdi-clipboard-text-outline",
              path: "/admin/purchase-orders",
            },
            {
              title: "Good Received",
              value: "GoodReceived",
              icon: "mdi-package-check",
              path: "/admin/grn",
            },
          ],
        },
        {
          section: "INVENTORY & WAREHOUSE",
          items: [
            {
              title: "Stock & Movements",
              value: "StockMovements",
              icon: "mdi-warehouse",
              path: "/admin/stock-movements",
            },
          ],
        },
        {
          section: "FINANCE & ANALYTICS",
          items: [
            {
              title: "Invoices & Payments",
              value: "Payments",
              icon: "mdi-credit-card-check-outline",
              path: "/admin/payments",
            },
            {
              title: "Promotions",
              value: "Promotions",
              icon: "mdi-tag-multiple-outline",
              path: "/admin/promotions",
            },
            {
              title: "Business Reports",
              value: "Reports",
              icon: "mdi-chart-box-outline",
              path: "/admin/reports",
            },
          ],
        },
      ],
    };
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
  methods: {
    checkScreenSize() {
      this.isMobile = window.innerWidth < 960;
      if (this.isMobile) {
        this.drawer = false;
      } else {
        this.drawer = true;
      }
    },
    toggleSidebar() {
      if (this.isMobile) {
        this.drawer = !this.drawer;
      } else {
        this.isCollapsed = !this.isCollapsed;
        this.$emit("toggle-collapse", this.isCollapsed);
      }
    },
    isActiveRoute(path) {
      return this.$route && this.$route.path === path;
    },
    navigateTo(path) {
      this.$router.push(path);
      if (this.isMobile) {
        this.drawer = false;
      }
    },
  },
};
</script>
