<!-- 搜索表单组件 -->
<template>
	<section class="search-form-panel">
		<div class="left">
			<el-form :inline="true" :model="form" :label-width="labelWidth" ref="formRef">
				<el-row class="flex">
					<el-col
						:xl="item.xl ? item.xl : xl"
						:lg="item.lg ? item.lg : lg"
						:md="item.md ? item.md : md"
						:sm="12"
						:xs="24"
						v-for="(item, index) in formList"
						:key="index"
						class="flex-item col"
					>
						<el-form-item
							v-bind="item">
							<!-- 输入框-->
							<el-input
								style="width: 100%"
								v-if="item.type === 'input'"
								v-model.trim="form[item.prop]"
								:clearable="item.clearable || true"
								:disabled="item.disabled"
								:placeholder="item.placeholder || '请输入'"
							>
							</el-input>
							<!-- 下拉框 -->
							<el-select
								style="width: 100%"
								v-if="item.type === 'select'"
								v-model.trim="form[item.prop]"
								:clearable="item.clearable || true"
								:disabled="item.disabled"
								:placeholder="item.placeholder || '请选择'"
								:multiple="item.multiple"
								:multiple-limit="item.multipleLimit || 0"
							>
								<el-option
									v-for="(opt, index) in item.options"
									:key="index"
									:label="
										(item.props && opt[item.props.label]) ||
										opt.label
									"
									:value="
										(item.props && opt[item.props.value]) ||
										opt.value
									"
								>
								</el-option>
							</el-select>
							<!-- 级联选择器-->
							<el-cascader
								style="width: 100%"
								v-if="item.type === 'cascader'"
								v-model.trim="form[item.prop]"
								:clearable="item.clearable || true"
								:disabled="item.disabled"
								:placeholder="item.placeholder || '请选择'"
								:options="item.options"
								:show-all-levels="item.showAllLevels"
								:props="{
									label: 'dictValue',
									value: 'dictCode',
									...(item.props || {}),
								}"
								:collapse-tags="item.collapseTags"
								:filterable="item.filterable"
							>
							</el-cascader>
							<!-- 日期 -->
							<template v-if="item.type === 'date'">
								<!-- 日期范围且选择切割参数 -->
								<DateTimeRange
									v-if="
										(!item.dateType && !item.noSlice) ||
										([
											'datetimerange',
											'daterange',
											'monthrange',
										].includes(item.dateType) &&
											!item.noSlice)
									"
									:item="item"
									@change="dateTimeChange"
									:isReset="isReset"
								/>
								<el-date-picker
									v-else
									style="width: 100%"
									v-model.trim="form[item.prop]"
									:clearable="item.clearable || true"
									:disabled="item.disabled"
									:placeholder="
										item.placeholder || '选择时间'
									"
									:rangeSeparator="
										item.rangeSeparator || '至'
									"
									:type="item.dateType || 'datetimerange'"
									:value-format="
										item.valueFormat ||
										'YYYY-MM-DD HH:mm:ss'
									"
									:end-placeholder="
										item.endPlaceholder || '结束时间'
									"
									:start-placeholder="
										item.startPlaceholder || '开始时间'
									"
									:picker-options="item.pickerOptions"
								>
								</el-date-picker>
							</template>
							<!-- 时间 -->
							<el-time-picker
								style="width: 100%"
								v-if="item.type === 'time'"
								:is-range="item.dateType === 'timerange'"
								v-model.trim="form[item.prop]"
								:clearable="item.clearable || true"
								:disabled="item.disabled"
								:placeholder="item.placeholder || '选择时间'"
								:rangeSeparator="item.rangeSeparator || '至'"
								:value-format="item.valueFormat || 'HH:mm:ss'"
								:end-placeholder="
									item.endPlaceholder || '开始时间'
								"
								:start-placeholder="
									item.startPlaceholder || '结束时间'
								"
								:picker-options="item.pickerOptions"
							>
							</el-time-picker>
							<!-- 插槽 -->
							<slot
								style="width: 100%"
								v-if="item.type === 'slot'"
								:name="item.prop"
							></slot>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<div class="right" v-if="isShowBtn">
			<el-button type="primary" @click="handleSearch">搜索</el-button>
			<el-button @click="handleReset">重置</el-button>
		</div>
	</section>
</template>
<script setup>
import { ref, watch } from 'vue';
import DateTimeRange from './components/datetimerange.vue';

const props = defineProps({
	/**
	 * formList参数说明
	 * type,表单类型(必传);
	 * field: 表单域绑定的参数(必传),
	 */
	formList: {
		type: Array,
		required: true,
	},
	searchForm: {
		// 表单初始值，不必传
		type: Object,
	},
	labelWidth:{
		type: String,
		default: 'auto'
	},
	xl: {
		// ≥1920px 响应式栅格数或者栅格属性对象
		type: [Number, Object],
		default: 6,
	},
	lg: {
		// ≥1200px 响应式栅格数或者栅格属性对象
		type: [Number, Object],
		default: 8,
	},
	md: {
		// ≥992px 响应式栅格数或者栅格属性对象
		type: [Number, Object],
		default: 12,
	},
	isResetForm: {
		// 是否要重置表单,解决部分弹窗关闭的时候没有销毁表单，再次打开还保留查询条件
		type: Boolean,
		default: false,
	},
	isShowBtn: {
		// 是否显示搜索和重置按钮
		type: Boolean,
		default: true,
	},
});

const emits = defineEmits(['search', 'reset', 'update:searchForm']);
const formRef = ref();
const form = ref({});
const isReset = ref(false);

// 查询
const handleSearch = () => {
	emits('search', form.value);
};
// 重置
const handleReset = () => {
	isReset.value = !isReset.value;
	formRef.value.resetFields();
	Object.keys(form.value).forEach((key) => {
		if (form.value[key]) {
			form.value[key] = '';
		}
	});
	emits('reset', form.value);
};

// 将时间范围数组切割成startTime和endTime
const dateTimeChange = (val) => {
	Object.assign(form.value, val);
};

watch(
	() => props.formList,
	(val) => {
		if (!val || val.length < 1) {
			return false;
		}
		form.value = {};
		val.forEach((i) => {
			if (!i.field) return false;
			form.value[i.field] = i.initVal || '';
		});
	},
	{
		immediate: true,
		deep: true,
	},
);
watch(
	form,
	(val) => {
		if (!val || val.length < 1) {
			return false;
		}
		emits('update:searchForm', val);
	},
	{
		immediate: true,
		deep: true,
	},
);
watch(
	() => props.isResetForm,
	(val) => {
		handleReset();
	},
);
</script>
<style scoped lang="scss">
.search-form-panel {
	border-bottom: 1px solid #eeeeee;
	margin-bottom: $base_padding;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	.left {
		flex: 4;
		.flex-item {
			padding: 0 12px 12px 0;
		}
	}
	.right {
		flex: 1;
		min-width: 194px;
		max-width: 194px;
		justify-content: flex-end;
		display: inline-flex;
		flex-wrap: wrap;
		padding-bottom: 12px;
		.el-button {
			margin: 0 0 0 12px;
		}
	}
}
</style>

<style lang="scss">
.search-form-panel {
	.left {
		// :deep(.el-form-item) {
		// 	margin: 0 !important;
		// 	width: 100% !important;
		// }

		// .el-form-item {
		// 	margin: 0 !important;
		// 	width: 100% !important;
		// }

		.el-form .el-form-item {
			margin: 0 !important;
			width: 100% !important;
		}
	}
	.el-date-editor .el-range-input {
		width: 41%;
	}
}
</style>
