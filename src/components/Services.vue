<template>
    <div class="services">

        <!-- Header -->
        <div class="services-header">
            <div class="services-search">
                <md-search class="services-search-icon" w="18" h="18"></md-search>
                <input type="text" 
                    class="services-search-input"
                    v-model="searchText"
                    :placeholder="$t('Services.Search in Services')">
            </div>

            <div class="services-add">
                <button class="services-add-button" @click="createService()">
                    <md-add w="18" h="18"></md-add>
                </button>
            </div>
        </div>

        <!-- List -->
        <div class="services-list" v-if="services && services.length" v-animated-filter="searchText">

            <div class="service-card draggable" 
                :class="{show: service.show, opened: service.opened}" 
                v-for="(service, serviceIndex) in servicesFiltered" 
                :key="serviceIndex"
                @click="openService(service)"
                draggable="true"
                @dragstart="serviceDragStart(service)"
                @dragend="serviceDragEnd()">

                <div class="service-icon">
                    <img :src="'/icons/' + service.icon + '.png'" alt="">
                </div>
                <div class="service">
                    <div class="service-title">
                        {{ service.title }}
                    </div>
                    <div class="service-subtitle">
                        {{ service.type }}
                    </div>
                </div>
            </div>

        </div>

        <!-- No added -->
        <div class="services-empty" v-if="!services || !services.length">
            <h1>{{ $t('Services.There are no services added yet') }}</h1>
        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex';

import MdSearch from 'vue-ionicons/dist/md-search.vue';
import MdAdd from 'vue-ionicons/dist/md-add.vue';

export default {
    components: {
        MdSearch,
        MdAdd
    },
    data() {
        return {
            searchText: ''
        }
    },
    computed: {
        ...mapState('service', ['services']),

        servicesFiltered: function() {
            const searchText = this.searchText.toLowerCase();
            return this.services.map(service => {
                return {
                    ...service,
                    show: service.title.toLowerCase().includes(searchText)
                }
            });
        }
    },
    mounted() {
        this.getServices();
    },
    methods: {
        getServices() {
            this.$store.dispatch('service/getServices');
        },
        openService(service) {
            this.$router.push('/' + service.id);
            this.$store.commit('service/setCurrentService', service);
        },
        createService() {
            const service = {
                _id: 1,
                title: '',
                type: 'apache2'
            };
            this.$store.commit('service/setCurrentService', service);
        },

        // Drag
        serviceDragStart(service) {
            this.$store.commit('service/setDragService', service);
        },
        serviceDragEnd() {
            this.$nextTick(() => this.$store.commit('service/setDragService', null));
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/_variables.scss';

$services-width: 350px;
$services-header-height: 64px;

.services {
    position: relative;
    display: flex;
    flex-direction: column;
    width: $services-width;
    height: 100vh;
    background-color: $color-background;
    border-right: 1px solid $color-border;

    /* Header */
    .services-header {
        display: flex;
        height: 31px;
        padding: 16px 8px;
        width: calc(100% - 16px);
        z-index: 1;

        .services-search {
            display: flex;
            flex: 1;
            box-shadow: $box-shadow;

            .services-search-icon {
                background-color: $color-input-background;
                border-top-left-radius: $border-radius;
                border-bottom-left-radius: $border-radius;
                color: $color-text-sec;
                line-height: 31px;
                align-items: center;
                padding: 0 4px 0 12px;
            }

            .services-search-input {
                flex: 1;
                background-color: $color-input-background;
                border-top-right-radius: $border-radius;
                border-bottom-right-radius: $border-radius;
                border: 0;
                padding: 8px;
                color: $color-text-prm;
                outline: none;

                @extend .on-click-animation;
            }
        }

        .services-add {
            width: 48px;
            height: 31px;
            margin-left: 8px;

            .services-add-button {
                background-color: $color-prm;
                outline: none;
                border: 0;
                width: 100%;
                height: 100%;
                border-radius: $border-radius;
                transition: all $transition-time;
                color: $color-text-prm;
                line-height: 38px;
                align-items: center;

                &:hover {
                    background-color: $color-prm-hover;
                    color: $color-text-prm;
                    box-shadow: $box-shadow;
                    cursor: pointer;
                } 

                &:focus {
                    background-color: $color-prm-hover;
                    color: $color-text-prm;
                }
            }
        }
    }

    /* List */
    .services-empty {
        h1 {
            text-align: center;
            color: $color-text-thr;
            font-family: $font-prm;
            font-weight: 300;
            font-size: $font-size-p1;
        }
    }

    .services-list {
        flex: 1;
        width: calc(100% - 16px);
        padding: 8px;
        overflow-y: auto;

        .service-card {
            display: flex;
            border-radius: $border-radius;
            width: calc(100% - 16px);
            height: 64px;
            transition: all $transition-time;
            margin-bottom: 8px;
            opacity: 0;

            &:hover, &.opened {
                background-color: $color-prm;
                box-shadow: $box-shadow;
                cursor: pointer;
            }

            .service-icon {
                display: flex;
                width: 64px;
                align-items: center;
                text-align: center;
                justify-content: center;

                img {
                    border-radius: $border-radius;
                    width: 48px;
                    height: 48px;
                    background-color: yellow;
                    box-shadow: $box-shadow;
                }
            }

            .service {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin-left: 8px;

                .service-title {
                    font-size: $font-size-h2;
                    color: $color-text-prm;
                    margin-bottom: 4px;
                    @extend .text-overflow;
                }

                .service-subtitle {
                    font-size: $font-size-p1;
                    color: $color-text-sec;
                    font-weight: 100;
                }
            }

        }
    }
}
</style>