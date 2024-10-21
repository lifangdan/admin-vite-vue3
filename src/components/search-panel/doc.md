### 搜索表单
#### 用法示例
``` html
<template>
    <search-form-panel
		:formList="formList"
		v-model:searchForm="searchForm"
		@search="handleSearch"
		@reset="handleReset"
	>
		<template v-slot:slot>
			<el-input v-model="searchForm.slot" placeholder="我是插槽" />
		</template>
	</search-form-panel>
</template>
```
``` js
<script setup>
import { ref } from 'vue';

const formList = ref([
	{
		type: 'select',
		field: 'taskStatus',
		options: [{dictValue:'待接收',dictCode:'wait-receiving'}],
		placeholder: '任务状态',
	},
	{
		type: 'date',
		field: 'time',
	},
	{
		type: 'date',
		field: 'time2',
		noSlice: true, //不切割时间参数
	},
	{
		type: 'date',
		field: 'date',
		dateType: 'daterange',
		timeParamas: ['start', 'end'], //自定义切割的时间参数
	},
	{
		type: 'input',
		field: 'title',
		placeholder: '任务标题关键字模糊搜索',
	},
	{
		type: 'select',
		field: 'taskLevel',
		options: [{dictValue:'一般',dictCode:'tlv1'}],,
		placeholder: '任务等级',
	},
	{
	 	type: 'slot',
	 	field: 'slot',
	},
]);

const searchForm = ref(null);
// 查询
const handleSearch = (data) => {
};
//重置
const handleReset = () => {
};
</script>

```

#### Props说明
 
属性 | 说明 | 类型 | 是否必传 | 默认值
:--- | :--- | :--- | :--- | :---
formList | 表单渲染元素列表，详细说明如下文 | array | 是
searchForm | 搜索条件 | object / null | 否 | 
xl | ≥1920px 响应式栅格数或者栅格属性对象 | Number, Object | 否 | 6，栅格总数24，默认6，则是分辨率≥1920px时一行显示4个
lg | ≥1200px 响应式栅格数或者栅格属性对象 | Number, Object | 否 | 8，分辨率≥1200px，≤1920px时一行显示3个
md | ≥992px 响应式栅格数或者栅格属性对象 | Number, Object | 否 | 12，分辨率≥992px，≤1200px时一行显示2个
isResetForm | 是否要重置表单,解决部分弹窗关闭的时候没有销毁表单，再次打开还保留查询条件 | boolean | 否
isShowBtn | 是否显示查询和重置按钮 | boolean | 否 | true


#### formList属性
属性 | 说明 | 类型 | 是否必传 | 可选值
:--- | :--- | :--- | :--- | :---
type | 表单域类型 | string | 是 | 'input'：输入框，<br> 'select'：下拉框，<br>'cascader'：级联选择器，<br>'date'：日期，<br>'time'：时间，<br>'slot'：自定义插槽，<br>
field | 表单域绑定的参数 | string | 是 |
placeholder | 占位文本 | string | 否 |
label | 表单域标签 | string | 否 | 默认不显示
initVal | 初始值设置 | string/array | 否 |
disabled | 表单域是否可编辑 | boolean | 否 |
options | 下拉框/级联选择器的列表数据,<br>每一项的数据项默认是dictValue和dictCode两个参数,<br>如若不是可以设置props | array | 否 |
props | 设置options的label和value对应的参数 | object | 否 |
dateType | 日期类型<br>日期范围参数默认切割成“startTime”和“endTime”两个参数返回<br>如若想切割成别的参数，可设置timeParamas参数 | string | 否 | 默认datetimerange，<br>year/month/date/dates/ week/datetime/datetimerange/ daterange/monthrange
timeParamas | 设置日期范围切割的参数 | array | 否 | ['startTime','endTime']
noSlice | 设置是否要切割日期 | boolean | 否 | 默认切割，不想切割传true,
timeType | 时间类型 | string | 否 | 默认time，<br>time/timeRange

##### tip
formList中每一个表单类型可配置的属性还有很多，与elementUi中的组件的属性配置基本相同，后期会根据需求扩展

#### 表单事件
事件名称 | 说明 | 回调参数 
:--- | :--- | :--- | 
search | 点击搜索按钮时触发 | 表单的值 
reset | 点击重置按钮时触发 | 表单的值