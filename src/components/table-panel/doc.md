### 基础表格

#### 用法示例
``` html
<template>
	<h4>用法1，传url</h4>
	<base-table-panel
		:tableProps="tableProps"
		:tableBtns="tableBtns"
		:url="proxy.api.queryTask"
		:params="searchForm">
		<template #name="{ row }">
			<span>
				{{ row.name }}
			</span>
		</template>
	</base-table-panel>

	<h4>用法2，传data</h4>
	<base-table-panel
		:tableProps="tableProps"
		:tableBtns="tableBtns"
		:data="tableData"
		:total="total"
		@currentChange="currentChange">
		<template v-slot:name="{ row }">
			<span>
			  {{ row.name }}
			</span>
		</template>
	</base-table-panel>
</template>
```
```js
<script setup>
import { ref , getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();
// 表单搜索条件
const searchForm = ref({title:''});
// 表格属性
const tableProps = [
	{ label: '标题', prop: 'title', },
	{ label: '时间', prop: 'time', width: '160px' },
	{ label: '插槽', slotName: 'name'},
];
// 表格操作按钮
const tableBtns = [
	{
		label: '详情',
		icon: 'xiangqing',
		handle(row,index) {
			// 详情相关事件
		},
	},
	{
		label: '删除',
		icon: 'xiangqing',
		//按钮是否显示的条件，即列表数据中的type===1时才显示删除按钮
		type: [{ key: 'type', value: 1 }],
		handle(row,index) {
			// 删除相关事件
		},
	},
];

const tableData = ref([]);
const total = ref(0);
const getTaskList = (val) => {
	proxy.api.queryTask({
		size: 10,
		current: val,
		...searchForm.value,
	}).then((res) => {
		tableData.value = res.records;
		total.value = res.total;
	});
};
const currentChange = (val) => {
	getTaskList(val);
};
</script>
```

#### Props说明
属性 | 说明 | 类型 | 是否必传 | 默认值
:--- | :--- | :--- | :--- | :---
tableProps | 表格渲染元素列表，详细说明在下文 | array | 是 | []
url | 列表接口地址 | function / boolean | 否 | false
params | 列表接口请求参数 | object | 否 | null
data | 表格列表数据，则需传total参数，还需额外在父组件单独处理分页搜索等功能 | array | 否 | []
tableBtns | 列表操作按钮，详细说明在下文 | array | 否 | []
isRefresh | 刷新列表数据，参数变化了就会刷新 | boolean | 否 | 
showIndex | 是否显示序号 | boolean | 否 | true
showSelection | 是否显示多选框 | boolean | 否 | false
total | 列表总条目数 | number | 否 | 0
current | 当前页数 | number | 否 | 1
size | 每页显示条目数 | number | 否 | 10
isShowPagination | 是否显示分页 | boolean | 否 | true
height | 表格高度 | string/number | 否 | 
maxHeight | 表格最大高度 | string/number | 否 | 
highlightCurrentRow | 是否开启表格行单选高亮效果 | boolean | 否 | false
selectable | 仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选 | Function | 否 | 
customWidth | 表格操作按钮列的宽度 | string | 否 | 
immediateRequest | 是否立即请求接口 | boolean | 否 | | true


#### tableProps属性
属性 | 说明 | 类型 | 是否必传 | 默认值
:--- | :--- | :--- | :--- | :---
label | 显示的标题 | string | 是 | 
prop | 对应列内容的字段名 | string | 是 |
slotName | 插槽使用slotName，不传prop | string | 否 |
width | 列的宽度 | string | 否 |
minWidth | 列的最小宽度 | string | 否 |
showOverflowTooltip | 当内容过长是否隐藏显示 tooltip | boolean | 否 | true
formatter | 用来格式化内容 | Function(row, column, cellValue, index) | 否 | 

#### tableBtns属性
属性 | 说明 | 类型 | 是否必传 | 默认值
:--- | :--- | :--- | :--- | :---
label | 按钮文字 | string | 是 | 
icon | 按钮图标 | string | fou |
type | 按钮是否显示的条件,<br>例如 [{key:'type',value:1}]，列表中type===1时才显示改按钮;<br>例如 [{key:'type',value:1,reverse:true}]，列表中type!==1时才显示改按钮| array | 否 | 不传默认显示
reverse | type数组中条件之间的判断是`||`还是’&&‘ | function | 否 | 默认是`||`，传true则是&&
handle | 按钮相关事件 | function | 否 | 回调参数有scope.row, scope.$index
permission | 按钮权限 | boolean | 否 | 不传默认有权限，false 没权限



#### 表格事件
事件名称 | 说明 | 回调参数 
:--- | :--- | :--- | 
sizeChange | size 改变时会触发 | 每页条数
currentChange | current 改变时时触发 | 当前页
selectionChange | 多选框发生变化时会触发 | selection
getTableData | 列表接口请求时触发 | 列表数据
rowClick | 当某一行被点击时会触发该事件 | row