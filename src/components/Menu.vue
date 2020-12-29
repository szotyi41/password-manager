<template>

    <div class="menu">

        <div class="menu-actions">
        </div>

        <div class="menu-section">

            <!-- All Items -->
            <div class="menu-item">
                <md-albums class="menu-icon" w="18" h="18"></md-albums>
                <div class="menu-title">{{ $t('Menu.All Items') }}</div>
                <div class="menu-label" :class="{hidden: !allServicesNumber}">{{ allServicesNumber }}</div>
            </div>

            <!-- Favorites -->
            <div class="menu-item">
                <md-star class="menu-icon" w="18" h="18"></md-star>
                <div class="menu-title">{{ $t('Menu.Favorites') }}</div>
                <div class="menu-label" :class="{hidden: !favoriteServicesNumber}">{{ favoriteServicesNumber }}</div>
            </div>
        
        </div>

        <div class="menu-section">

            <div class="menu-section-title">{{ $t('Menu.Folders') }}</div>

            <!-- Folders -->
            <div class="menu-item folder" 
                :class="{'drag-start': dragService}" 
                v-for="(folder, folderIndex) in foldersFiltered"
                :key="folderIndex"
                :folder-id="folder.id"
                @dragover="onDragOver($event)"
                @dragenter="onDragEnter($event)" 
                @dragleave="onDragLeave($event)"
                @drop="onDrop($event)">
                <md-folder class="menu-icon" w="18" h="18"></md-folder>
                <div class="menu-title">{{ folder.title }}</div>
                <div class="menu-label">{{ folder.items }}</div>
            </div>

            <!-- Add folder -->
            <div class="menu-item">
                <md-add class="menu-icon" w="18" h="18"></md-add>
                <div class="menu-title">{{ $t('Menu.Create Folder') }}</div>
            </div>

        </div>
    
    </div>

</template>

<script>
import { mapState } from 'vuex';

import MdStar from 'vue-ionicons/dist/md-star.vue'
import MdAlbums from 'vue-ionicons/dist/md-albums.vue';
import MdFolder from 'vue-ionicons/dist/md-folder.vue';
import MdAdd from 'vue-ionicons/dist/md-add.vue';

export default {
    components: {
        MdStar,
        MdAlbums,
        MdFolder,
        MdAdd
    },
    computed: {
        ...mapState('service', ['services', 'folders', 'dragService']),

        allServicesNumber() {
            return this.services.length;
        },
        favoriteServicesNumber() {
            return this.services.reduce((count, service) => count + service.favorite, 0);
        },
        foldersFiltered() {
            return this.folders.map(folder => {
                return { 
                    ...folder, 
                    items: this.services.reduce((count, service) => count + service.infolder.includes(folder.id), 0)
                };
            });
        }
    },
    methods: {
        onDragEnter(event) {
            event.target.classList.add('drag-enter');
        },
        onDragLeave(event) {
            event.target.classList.remove('drag-enter');
        },
        onDragOver(event) {
            event.preventDefault();
        },
        onDrop(event) {
            event.target.classList.remove('drag-enter');
            const folderId = event.target.getAttribute('folder-id');
            this.$store.dispatch('service/putServiceToFolder', folderId);
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/_variables.scss';

.menu {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 16px;
    width: 300px;
    height: calc(100vh - 32px);
    background-color: $color-menu;
    border-right: 1px solid $color-border;

    /* Actions on osx */
    .menu-actions {
        height: 64px;
    }

    .menu-section {
        display: flex;
        flex-direction: column;

        .menu-section-title {
            margin: 24px 0 8px 0;
            font-size: $font-size-p1;
            font-family: $font-prm-bold;
            color: $color-text-sec;
        }

        .menu-item {
            display: flex;
            border-radius: $border-radius;
            align-items: center;
            padding: 2px 6px;
            margin: 2px 0; 
            width: calc(100% - 16px);
            height: 24px;
            transition: all $transition-time;
            box-shadow: $box-shadow-none;
            border: 2px solid transparent;

            &.drag-start {
                border: 2px dashed $color-background;
            }

            &.drag-enter {
                border: 2px solid $color-background;
            }

            &:hover:not(.drag-start):not(.drag-enter) {
                background-color: $color-prm;
                color: $color-hover-text;
                box-shadow: $box-shadow;
                cursor: pointer;

                .menu-label {
                    box-shadow: $box-shadow-none;
                }
            }

            .menu-icon {
                margin-top: 2px;
                color: $color-text-prm;
            }

            .menu-title {
                flex: 1;
                font-size: $font-size-p1;
                font-family: $font-prm-bold;
                line-height: 24px;
                margin-left: 8px;
                color: $color-text-prm;
                @extend .text-overflow
            }

            .menu-label {
                border-radius: 50%;
                background-color: $color-prm;
                width: 16px;
                height: 16px;
                line-height: 16px;
                text-align: center;
                color: $color-text-prm;
                font-size: $font-size-p2;
                font-family: $font-prm;
                box-shadow: $box-shadow;
                transition: all $transition-time;
                opacity: 1;

                &.hidden {
                    opacity: 0;
                }
            }

        }
    }
}
</style>