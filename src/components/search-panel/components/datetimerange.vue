<template>
	<el-date-picker
		style="width: 100%"
		v-model.trim="obj[item.field]"
		:clearable="item.clearable || true"
		:disabled="item.disabled"
		:placeholder="item.placeholder || '选择时间'"
		:rangeSeparator="item.rangeSeparator || '至'"
		:type="item.dateType || 'datetimerange'"
		:value-format="item.valueFormat || 'YYYY-MM-DD HH:mm:ss'"
		:end-placeholder="item.endPlaceholder || '结束时间'"
		:start-placeholder="item.startPlaceholder || '开始时间'"
		:picker-options="item.pickerOptions"
		@change="handleChange"
	>
	</el-date-picker>
</template>
<script setup>
import { defineEmits, watch, ref } from 'vue';

const props = defineProps({
	item: {
		type: Object,
		required: true,
	},
	isReset: {
		type: Boolean,
		default: false,
	},
});
const emits = defineEmits(['change']);
const obj = ref({});
const handleChange = (val) => {
	/**
	 * 默认将时间范围切割成startTime和endTime两个参数返回;
	 * 自定义参数,item中加参数 timeParamas,例如:timeParamas:['start','end']
	 * 不需要切割,item中加参数 noSlice,并设置为true
	 */
	let data = null;
	if (val && val.length > 0) {
		if (props.item.timeParamas && props.item.timeParamas.length > 0) {
			data = {
				[props.item.timeParamas[0]]: val[0],
				[props.item.timeParamas[1]]: val[1],
			};
		} else {
			data = { startTime: val[0], endTime: val[1] };
		}
	} else if (props.item.timeParamas && props.item.timeParamas.length > 0) {
		data = {
			[props.item.timeParamas[0]]: '',
			[props.item.timeParamas[1]]: '',
		};
	} else {
		data = { startTime: '', endTime: '' };
	}
	emits('change', data);
};

watch(
	() => props.item,
	(val) => {
		if (!val) {
			return false;
		}

		obj.value[val.field] = val.initVal || '';
	},
	{
		immediate: true,
		deep: true,
	},
);
watch(
	() => props.isReset,
	(val) => {
		obj.value[props.item.field] = '';
	},
	{
		immediate: true,
	},
);
</script>
