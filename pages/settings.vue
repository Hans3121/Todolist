<script setup>
const settings = useSettings();
const backgroundColorPallete = ref(settings.getColorPallete("colorPallete"));
const textColorPallete = ref(settings.getColorPallete("textColorPallete"));

const arrLength = computed(()=>{
    if (backgroundColorPallete.value.length > textColorPallete.value.length) {
        return backgroundColorPallete.value.length
    } else {
        return textColorPallete.value.length
    }
});


</script>

<template>
    <NuxtLayout>
        <div class="flex gap-16">
            <div class="flex flex-col items-start gap-1">
                <h2 class="text-3xl font-bold mt-20">Colors</h2>
                <div v-for="backgroundColor, i in backgroundColorPallete" class="flex items-center gap-2 border border-black ">
                    <div :style="{ backgroundColor }" class="w-4 h-4 border border-black"></div>
                    {{ backgroundColor }}
                    <button class="hover:rotate-12 focus:rotate-12" @click="settings.deleteBackgroundColor(i)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em"
                            preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                        </svg>
                    </button>
                </div>
            </div>

            <div class="flex flex-col items-start gap-1">
                <h2 class="text-3xl font-bold mt-20">Text Colors</h2>
                <div v-for="color in textColorPallete" class="flex items-center gap-2">
                    <div :style="{ backgroundColor: color }" class="w-4 h-4 border border-black"></div>
                    {{ color }}
                </div>
            </div>
        </div>

        <div class="flex flex-col items-center">
            <h2 class="text-3xl font-bold my-4">Result</h2>
            <div v-for="i in arrLength" :style="{
                backgroundColor: backgroundColorPallete[i-1 % backgroundColorPallete.length],
                color: textColorPallete[i-1 % textColorPallete.length]
            }" class="p-1 px-2">
                Test
            </div>
        </div>

    </NuxtLayout>
</template>

<style>

</style>