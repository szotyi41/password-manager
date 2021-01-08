<template>
    <div class="service">

        <!-- Toolbar -->
        <div class="service-toolbar">

            <!-- Edit -->
            <button class="service-toolbar-button" @click="editService(currentService)" v-show="!edit">
                <md-create class="service-toolbar-button-icon"></md-create>
                <span class="service-toolbar-button-title">{{ $t('Service.Edit') }}</span>
            </button>

            <!-- Save -->
            <button class="service-toolbar-button button-accept" @click="saveService(currentService)" v-show="edit">
                <md-checkmark class="service-toolbar-button-icon"></md-checkmark>
                <span class="service-toolbar-button-title">{{ $t('Service.Save') }}</span>
            </button>

            <!-- Cancel -->
            <button class="service-toolbar-button button-decline" @click="revertService(currentService)" v-show="edit">
                <md-close class="service-toolbar-button-icon"></md-close>
                <span class="service-toolbar-button-title">{{ $t('Service.Cancel') }}</span>
            </button>

            <!-- Delete -->
            <button class="service-toolbar-button" @click="removeService(currentService)">
                <md-trash class="service-toolbar-button-icon"></md-trash>
                <span class="service-toolbar-button-title">{{ $t('Service.Delete') }}</span>
            </button>
        </div>

        <transition name="fade" mode="out-in">
            
            <keep-alive max="2">
                <div :key="$route.params.serviceId">

                    <!-- Header -->
                    <div class="service-header">
                        <div class="service-header-icon">
                            <img :src="'/icons/' + currentService.icon + '.png'" alt="">
                        </div>

                        <div class="service-header-title-section">
                            <div class="service-header-title">{{ currentService.title }}</div>
                            <div class="service-header-type">{{ currentService.type }}</div>
                        </div>

                        <div class="service-header-favorite" @click="favoriteService(currentService)">
                            <md-star v-if="currentService.favorite" class="service-header-favorite-icon on-click-animation" w="32px" h="32px"></md-star>
                            <md-star-outline v-else class="service-header-favorite-icon" w="32px" h="32px"></md-star-outline>
                        </div>
                    </div>

                    <!-- Body -->
                    <div class="service-body">

                        <!-- Title -->
                        <div class="input-block hover">
                            <div class="input-section">
                                <label>{{ $t('Service.Service Title') }}</label>
                                <div class="input">
                                    <input type="text" 
                                        v-model="currentService.title"
                                        placeholder="domain.com"
                                        :disabled="!edit">
                                </div>
                            </div>

                            <div class="input-actions" v-show="!edit">
                                <md-copy class="input-action" w="20px" h="20px"></md-copy>
                            </div>
                        </div>
                        
                        <!-- Type -->
                        <div class="input-block hover">
                            <div class="input-section">
                                <label>{{ $t('Service.Service Type') }}</label>
                                <div class="input-section">
                                    <Multiselect v-model="currentService.type" 
                                        :placeholder="$t('Service.Select service type')"
                                        :options="types.map(type => ({ value: type.name, label: type.name }))"
                                        :disabled="!edit"/>
                                </div>
                            </div>
                        </div>

                        <!-- Username -->
                        <div class="input-block hover">

                            <div class="input-section">
                                <label>{{ $t('Service.Username') }}</label>
                                <div class="input">
                                    <input type="text" 
                                        v-model="currentService.username"
                                        placeholder="username@username.com"
                                        :disabled="!edit">
                                </div>
                            </div>

                            <div class="input-actions" v-show="!edit">
                                <md-copy class="input-action" w="20px" h="20px"></md-copy>
                            </div>
                        </div>

                        <!-- Password -->
                        <div class="input-block hover">

                            <div class="input-section">
                                <label>{{ $t('Service.Password') }}</label>
                                <div class="input">
                                    <input type="password" 
                                        v-model="currentService.password"
                                        placeholder="password"
                                        :disabled="!edit">
                                </div>
                            </div>

                            <div class="input-actions" v-show="!edit">
                                <md-eye class="input-action" w="20px" h="20px"></md-eye>
                                <md-copy class="input-action" 
                                    w="20px" 
                                    h="20px" 
                                    v-clipboard:success="success"
                                    v-clipboard:copy="'password'">
                                </md-copy>
                            </div>
                        </div>

                        <!-- Add Field -->
                        <div class="input-block" :class="{hover: !addingFieldToggle}" v-if="edit">

                        
                            <!-- Select type -->
                            <div class="add-field input-section" v-if="addingFieldToggle">

                                <label>{{ $t('Service.Field Type') }}</label>

                                <Multiselect v-model="addingFieldType" 
                                    :placeholder="$t('Service.Select field type')"
                                    :options="fieldTypes.map(type => ({ value: type, label: type }))"/>

                            </div>

                            <!-- Add -->
                            <div class="add-field" v-else @click="addingFieldToggle = true">
                                <md-add w="18" h="18"></md-add>
                                <span>{{ $t('Service.Add Field') }}</span>
                            </div>
                        </div>

                    </div>

                </div>
            </keep-alive>

        </transition>

    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import Multiselect from '@vueform/multiselect'

import MdCreate from 'vue-ionicons/dist/md-create.vue';
import MdTrash from 'vue-ionicons/dist/md-trash.vue';
import MdStar from 'vue-ionicons/dist/md-star.vue';
import MdStarOutline from 'vue-ionicons/dist/md-star-outline.vue';
import MdCopy from 'vue-ionicons/dist/md-copy.vue';
import MdEye from 'vue-ionicons/dist/md-eye.vue';
import MdCheckmark from 'vue-ionicons/dist/md-checkmark.vue';
import MdClose from 'vue-ionicons/dist/md-close.vue';
import MdAdd from 'vue-ionicons/dist/md-add.vue';

import Permission from './Permission.vue';

export default {
    components: {
        MdCreate,
        MdTrash,
        MdStar,
        MdStarOutline,
        MdCopy,
        MdEye,
        MdCheckmark,
        MdClose,
        MdAdd,
        Permission,
        Multiselect
    },
    data() {
        return {
            edit: false,
            addingFieldToggle: false,
            addingFieldType: '',
            serviceSaving: false,
        }
    },
    computed: {
        ...mapState('service', ['currentService', 'types'])
    },
    methods: {
        ...mapActions('service', ['favoriteService', 'removeService']),

        editService(service) {
            this.oldService = Object.assign({}, service);
            this.edit = true;
        },
        success(event) {
            event.trigger.classList.add('success');
        },
        saveService(service) {
            this.serviceSaving = true;
            this.$store.dispatch('service/saveService', service).then(response => {

            }).finally(() => {
                this.serviceSaving = false;
            });
        },
        revertService(service) {
            this.edit = false;
            //this.$store.commit('service/setService', this.oldservice);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/_variables.scss';

/* Animation */
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateX(4em);
}

.fade-enter-active, .fade-leave-active {
  transition: all .3s ease-in;
}

.service {
    flex: 1;
    width: 100%;
    background-color: $color-background;
    padding: 0 32px;

    /* Toolbar */
    .service-toolbar {
        display: flex;
        justify-content: flex-end;
        padding: 16px 0;

        .service-toolbar-button {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 31px;
            outline: none;
            border: 0;
            margin-left: 8px;
            padding: 0 8px;
            cursor: pointer;

            .service-toolbar-button-icon {
                font-size: 16px;
                line-height: 31px;
            }

            .service-toolbar-button-title {
                margin-left: 4px;
                font-size: 14px;
                line-height: 31px;
                padding-top: 2px;
            }

        }
    }

    /* Header */
    .service-header {
        display: flex;
        padding: 24px 16px;
        border-bottom: 1px solid $color-border-sec;
        margin-bottom: 16px;

        .service-header-icon {
            width: 64px;
            height: 64px;
            text-align: center;
            justify-content: center;

            img {
                width: 100%;
                height: 100%;
                background-color: yellow;
                border-radius: $border-radius;
                box-shadow: $box-shadow;
            }
        }

        .service-header-title-section {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-left: 32px;

            .service-header-title {
                font-size: $font-size-h1;
                color: $color-text-prm;
                transition: all $transition-time;
            }

            .service-header-type {
                font-size: $font-size-p1;
                color: $color-text-sec;
                margin-top: 4px;
            }
        }

        .service-header-favorite {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 48px;
            
            .service-header-favorite-icon {
                color: $color-favorite;
                transition: all $transition-time;
                border-radius: 50%;
                padding: 2px;

                &:hover {
                    background-color: $color-input-background;
                    cursor: pointer;               
                }
            }
        }
    }
}

.input-block {
    display: flex;
    width: calc(100% - 28px);
    transition: all $transition-time;
    border-radius: $border-radius;
    padding: 12px 8px;
    margin-bottom: 8px;

    .input-section {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }

    .input-actions {
        display: flex;
        justify-content: center;
        align-items: center;

        .input-action {
            color: $color-text-sec;
            margin: 4px;
            padding: 8px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            transition: all $transition-time;

            &:hover, &:focus {
                background-color: $color-input-background;
                cursor: pointer;
            }
        }
    }

    &.hover:hover {
        background-color: $color-menu;
    }

    label {
        display: block;
        color: $color-text-sec;
        font-size: $font-size-h3;
        margin: 6px 8px;
    }

    .input {
        display: flex;
        flex: 1;
        color: $color-text-prm;
        font-size: $font-size-h3;
        font-family: $font-prm-bold;



        .input-icon {
            background-color: $color-input-background;
            border-top-left-radius: $border-radius;
            border-bottom-left-radius: $border-radius;
            color: $color-text-sec;
            line-height: 31px;
            align-items: center;
            padding: 0 4px 0 12px;
        }

        input {
            flex: 1;
            border: 0;
            padding: 8px;
            max-height: 31px;
            color: $color-text-prm;
            outline: none;
            border-radius: $border-radius;
            background-color: $color-input-background;
            transition: all $transition-time;

            &:disabled {
                background-color: transparent;
            }
        }

    }

    /* Add field */
    .add-field {
        display: flex;
        width: 100%;
        height: 100%;
        text-align: left;
        justify-content: left;
        color: $color-text-sec;
        cursor: pointer;

        span {
            margin-left: 8px;
            color: $color-text-sec;
            font-size: $font-size-p1;
        }
    }
}
</style>