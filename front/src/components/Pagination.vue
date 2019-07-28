<template>
    <div>
        <Button v-show='isNotFirstPage' type='button' @click='$emit("previous-page")'>Previous</Button>
        <span>{{ activePage }} / {{ lastPage }}</span>
        <Button v-show='isNotLastPage' @click='$emit("next-page")' type='button'>Next</Button>
    </div>
</template>

<script>
    export default {
        props: {
            firstPage: {
                type: Number,
                default: () => 0,
            },

            lastPage: {
                type: Number,
                default: () => 0,
            },

            activePage: {
                type: Number,
                default: () => 0,
            },
        },

        computed: {
            isNotFirstPage() {
                return this.activePage !== this.firstPage;
            },

            isNotLastPage() {
                return this.activePage !== this.lastPage;
            },
        },
    }
</script>