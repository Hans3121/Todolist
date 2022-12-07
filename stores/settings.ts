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
  // State
  const settings = ref({
    colorPallete: [] as string[],
    textColorPallete: [] as string[],
  })
  const longestLength = computed(()=>{
    let bgColor = settings.value.colorPallete? settings.value.colorPallete : defaults.colorPallete;
    let textColor = settings.value.textColorPallete? settings.value.textColorPallete : defaults.textColorPallete;

    if (bgColor.length > textColor.length) {
      return bgColor.length
    } else {
      return textColor.length
    }
  })


  function setSettings(setting: any) {
    if (setting) {
      settings.value = setting
    } else {
      settings.value = defaults
    }
  }


  // Getting Specific Color 
  function _getColorProperty(index: number, property: "colorPallete" | "textColorPallete"){
    let colors = getColorPallete(property);
    let colorIndex = index % colors.length;
    return colors[colorIndex];
    
  }
  function getColor(index: number) {
    return _getColorProperty(index, "colorPallete")
  }
  function getTextColor(index: number){
    return _getColorProperty(index, "textColorPallete");
  }


  function getColorPallete(property: "colorPallete" | "textColorPallete") {
    if (settings.value[property] == undefined || settings.value[property]?.length == 0) {
      return defaults[property]
    } else {
      return settings.value[property]
    }
  }


  // Modifying State
  function _setup(property: "colorPallete" | "textColorPallete") {
    if (settings.value[property] == undefined || settings.value[property].length == 0) {
      settings.value[property] = defaults[property]
    }
  }
  function deleteColor(index: number, property: "colorPallete" | "textColorPallete") {
    _setup(property);
    settings.value[property].splice(index,1);

  }
  function addColor(color: string, property: "colorPallete" | "textColorPallete") {
    _setup(property);
    settings.value[property].push(color);
  }

  return {
    settings,
    longestLength,
    
    setSettings,

    getColor,
    getTextColor,
    
    getColorPallete,
    
    deleteColor,
    addColor,
  }
})