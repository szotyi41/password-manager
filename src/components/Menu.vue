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
                :class="{'drag-start': dragService !== null}" 
                v-for="(folder, folderIndex) in foldersFiltered"
                :key="folderIndex"
                :folder-id="folder.id"
                @dragover="onDragOver($event)"
                @dragenter="onDragEnter($event)" 
                @dragleave="onDragLeave($event)"
                @drop="onDrop($event)">
                <md-folder class="menu-icon" w="18" h="18"></md-folder>
                <div class="menu-title">{{ folder.name }}</div>
                <div class="menu-label" v-if="folder.items">{{ folder.items }}</div>
            </div>

            <!-- Add folder -->
            <div class="menu-item create-folder" :class="{'folder-creating': createFolderToggle}">

                <md-add class="menu-icon" w="18" h="18"></md-add>
                <div class="menu-title" 
                    @click="createFolderToggle = true; $refs.createFolder.focus()" 
                    v-show="!createFolderToggle">
                    {{ $t('Menu.Create Folder') }}
                </div>

                <!-- Create Folder -->
                <div class="menu-create-folder" v-show="createFolderToggle">
                    <input type="text" 
                        v-model="folderName"
                        ref="createFolder"
                        class="menu-create-folder-input"
                        :placeholder="$t('Menu.Folder Name')"/>

                    <!-- Save button -->
                    <button class="menu-create-folder-button button-accept" @click="createFolder(folderName)">
                        <md-checkmark class="menu-create-folder-button-icon"></md-checkmark>
                    </button>

                    <!-- Close button -->
                    <button class="menu-create-folder-button button-decline" @click="createFolderToggle = false">
                        <md-close class="menu-create-folder-button-icon"></md-close>
                    </button>
                </div>

            </div>

        </div>
    
    </div>

</template>

<script>
import { mapState } from 'vuex';
import { IFolder, IService } from '@/store/service';

import MdCheckmark from 'vue-ionicons/dist/md-checkmark.vue';
import MdClose from 'vue-ionicons/dist/md-close.vue';
import MdStar from 'vue-ionicons/dist/md-star.vue'
import MdAlbums from 'vue-ionicons/dist/md-albums.vue';
import MdFolder from 'vue-ionicons/dist/md-folder.vue';
import MdAdd from 'vue-ionicons/dist/md-add.vue';

export default {
    components: {
        MdStar,
        MdAlbums,
        MdFolder,
        MdAdd,
        MdCheckmark,
        MdClose
    },
    data() {
        return {
            createFolderToggle: false,
            folderName: ''
        }
    },
    computed: {
        ...mapState('service', ['services', 'folders', 'dragService']),

        allServicesNumber() {
            return this.services.length;
        },
        favoriteServicesNumber() {
            return this.services.reduce((count, service) => count + (service.favorite), 0);
        },
        foldersFiltered() {
            return this.folders.map((folder) => {
                return { 
                    ...folder, 
                    items: this.services.reduce((count, service) => count + service.infolder.includes(folder.id), 0)
                }
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

        createFolder(folderName) {
            this.folderName = '';
            this.createFolderToggle = false;
            this.$store.dispatch('service/createFolder', folderName);
        }
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

            &:hover:not(.drag-start):not(.drag-enter):not(.folder-creating) {
                background-color: $color-prm;
                color: $color-text-hover;
                box-shadow: $box-shadow;
                cursor: pointer;

                .menu-label {
                    box-shadow: $box-shadow-none;
                }
            }

            .menu-icon {
                margin-top: 0px;
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

            .menu-create-folder {
                display: flex;
                width: 100%;

                .menu-create-folder-input {
                    flex: 1;
                    background-color: #404040;
                    font-size: $font-size-p1;
                    border-radius: 6px;
                    border-radius: 6px;
                    margin-left: 4px;
                    border: 0;
                    padding: 4px;
                    color: #fff;
                    outline: none;
                }

                .menu-create-folder-button {
                    width: 32px;
                    margin-left: 8px;

                    .menu-create-folder-button-icon {
                        font-size: 12px;
                    }
                }
            }

        }
    }
}
</style>