const defaults = {
  colorPallete: [
    "#f87171",
    "#fb923c",
    "#facc15",
    "#a3e635",
    "#4ade80",
    "#22d3ee",
    "#60a5fa",
    "#818cf8",
    "#e879f9",
    "#fb7185",
  ],
  textColorPallete: [
    "#000000"
  ]
}

export const useSettings = defineStore("settings", ()=>{
  const settings = ref({
    colorPallete: [] as string[],
    textColorPallete: [] as string[],
  })


  function _getColorProperty(index: number[], property: "colorPallete" | "textColorPallete"){
    let colors = getColorPallete(property);
    let colorIndex = index.length % colors.length
    return colors[colorIndex];
    
  }

  function getColorPallete(property: "colorPallete" | "textColorPallete") {
    if (settings.value[property] == undefined || settings.value[property]?.length == 0) {
      return defaults[property]
    } else {
      return settings.value[property]
    }
  }

  function getColor(index: number[]) {
    return _getColorProperty(index, "colorPallete")
  }

  function getTextColor(index: number[]){
    return _getColorProperty(index, "textColorPallete");
  }

  function deleteBackgroundColor(index: number) {
    
    if (settings.value.colorPallete == undefined || settings.value.colorPallete.length == 0) {
      console.log(true)
      settings.value.colorPallete = defaults.colorPallete
    }

    settings.value.colorPallete.splice(index,1);

  }

  return {
    settings,
    getColor,
    getTextColor,
    getColorPallete,
    deleteBackgroundColor
  }
})