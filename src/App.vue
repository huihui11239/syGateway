<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
    export default {
        name:'App',
    }
</script>

<style lang="less">
  * {
    margin: 0;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
}


div, ul {
    padding: 0;
    margin: 0;
}

ul li {
    list-style: none;
}

/*清除火狐的默认选择框样式*/
select {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background: #fcfcfc url("../static/img/select_normal.png") no-repeat scroll right center;
    padding-right: 14px;
}

/*清除ie的默认选择框样式清除，隐藏下拉箭头*/
select::-ms-expand {
    display: none;
}

select:hover {
    background: #fcfcfc url("../static/img/select_hover.png") no-repeat scroll right center;
}

/*清除火狐的input[type=number]的默认样式*/
input[type='number'] {
    -moz-appearance: textfield;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
