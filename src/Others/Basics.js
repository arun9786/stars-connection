const getColorCode = () => {
    const colors = ['#f53b4d', '#f53b85', '#f53ba7', '#f53bd9', '#f53bd9', '#ef3bf5', '#ef3bf5', '#ca3bf5', '#ca3bf5', '#ab3bf5', '#ab3bf5', '#893bf5', '#893bf5', '#473bf5',
        '#473bf5', '#3b70f5', '#3b70f5', '#3b95f5', '#3b95f5', '#3bd6f5', '#3bf5f2', '#3bf5f2', '#3bf5d0', '#3bf5b1', '#3bf5b1', '#3bf570', '#3bf570', '#3bf547', '#3bf547',
        '#79f53b', '#79f53b', '#98f53b', '#98f53b', '#e6f53b', '#f5dc3b', '#f5b73b', '#f5b73b', '#f5b73b', '#f5923b', '#f5923b', '#f5703b', '#f5703b'];
    const number = Math.floor(Math.random() * (colors.length - 1));
    return colors[number];
}

const getColorCodeDark=()=>{
    const colors=[
        "#045c1b", "#5c2304", "#5c040c","#5c0423", "#5c043a", "#5c0457", "#44045c", "#27045c", "#11045c", "#11045c", "#04275c",
        "#04275c", "#044a5c", "#044a5c", "#045c49", "#045c2d", "#045c2d", "#045c2d", "#175c04", "#535c04", "#5c0404", "#524c02",
        "#522802", "#524a02", "#024f52", "#023c52", "#021b52", "#520248"
    ]

    const number = Math.floor(Math.random() * (colors.length - 1));
    return colors[number];
}


export { getColorCode, getColorCodeDark };