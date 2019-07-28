<template>
    <table class='Table'>
        <thead>
            <slot name='thead'></slot>
        </thead>
        <tbody class='Table__Body'>
            <slot name='tbody'></slot>
        </tbody>
    </table>
</template>

<style lang='scss' scoped>
    .Table {
        &__Body {
            &__Row {
                &--active {
                    background-color: green;
                }
            }
        }
    }
</style>