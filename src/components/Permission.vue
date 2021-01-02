<template>
  <div class="dialog">
    <div class="dialog-header">
        <h1>{{ $t('Permission.Do you need access to edit this service?') }}</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { IService } from '@/store/service'

export default {
    methods: {
        openModal(service: IService) {

        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/_variables.scss';

.dialog {
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: all $transition-time;
    min-width: 400px;
    min-height: 220px;

    background-color: $color-menu;
    border-radius: $border-radius;
    box-shadow: $box-shadow;

    .dialog-header {
        width: 100%;
        height: 48px;
        border-bottom: 1px solid $color-border;

        h1 {
            color: $color-text-prm;
            font-size: $font-size-h1;
        }
    }
}
</style>
