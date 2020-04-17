<template>
  <v-app light>
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      permanent
      app
      width="300"
    >
      <v-list-item class="pa-8">
        <v-img :src="require('~/assets/aerlux-bilete-online.573e0028.svg')" />
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-spacer />
      <v-toolbar-title class="font-weight-bold" v-text="title" />
      <v-spacer />
      <div v-if="$auth.loggedIn">
        {{ $auth.user.username }}
        <v-btn text>Logout</v-btn>
      </div>
      <div v-else>
        <v-btn text to="/login">Login</v-btn>
        <v-btn text to="/register">Register</v-btn>
      </div>
      <v-chip>
        <v-icon left color="black">mdi-account-circle</v-icon>John Leider
      </v-chip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn text icon color="black" v-on="on">
            <v-icon>mdi-cogs</v-icon>
          </v-btn>
        </template>
        <span>Change password</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn text icon color="black" v-on="on">
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </template>
        <span>Exit</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn text icon color="black" v-on="on" class="mr-1">
            <v-icon>mdi-exit-to-app</v-icon>
          </v-btn>
        </template>
        <span>Exit</span>
      </v-tooltip>
    </v-app-bar>
    <v-content class="grey lighten-4">
      <v-container class="pa-0">
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-currency-usd",
          title: "Exchange Rates",
          to: "/exchange"
        },
        {
          icon: "mdi-city-variant",
          title: "Countries",
          to: "/countries"
        },
        {
          icon: "mdi-home-city",
          title: "Cities",
          to: "/cities"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Categories",
          to: "/categories"
        },
        {
          icon: "mdi-offer",
          title: "Offers",
          to: "/offers"
        },
        {
          icon: "mdi-account-group",
          title: "Users",
          to: "/users"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Dashboard"
    };
  }
};
</script>