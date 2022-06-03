<template >
    <div>
        <b-navbar v-if="user" id="navbar" type="light" variant="success" toggleable="sm">
            <b-navbar-toggle class="ml-auto" target="collapse-navbar" />
            <b-collapse id="collapse-navbar" is-nav>
            <b-navbar-nav>
                <b-nav-item to="/wishlist">
                    <font-awesome-icon icon="fa-solid fa-star"/>
                    Wish List
                </b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav>
                <b-nav-item to="/purchasedlist">
                <font-awesome-icon icon="fa-solid fa-receipt"/>
                Purchased List
                </b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav>
                <b-nav-item to="/budgeting">
                    <font-awesome-icon icon="fa-solid fa-circle-dollar-to-slot"/>
                    Budgeting
                </b-nav-item> 
                <b-nav-item to="/upload">
                    <font-awesome-icon icon="fa-solid fa-circle-plus"/>
                    Add Product
                </b-nav-item> 
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item>
                <login-button/>
                </b-nav-item>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <b-navbar v-else id="navbar" type="light" variant="success">
            <b-navbar-nav class="ml-auto">
                <b-nav-item>
                    <login-button/>
                </b-nav-item>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>
<script>
import { auth } from "@/firebaseConfig";

import  LoginButton  from './LoginButton.vue'

export default {
    components: {LoginButton},
    data() {
        return {
            user: auth.currentUser
        }
    },
}
</script>
<style scoped>

</style>