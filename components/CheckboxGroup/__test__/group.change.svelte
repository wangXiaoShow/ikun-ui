<script>
	import { KCheckbox } from '@ikun-ui/checkbox';
	import { KCheckboxGroup } from '@ikun-ui/checkbox-group';
	let value = ['3'];
	const handleUpdated = (e) => {
		value = e.detail;
	};
</script>

<div class="h-full" style="width: 600px">
	<button id='group_change_btn' on:click={() => value = [1]}></button>
	<KCheckboxGroup {value} on:updateValue={handleUpdated}>
		<KCheckbox uid="1">1</KCheckbox>
		<KCheckbox uid="2">2</KCheckbox>
		<KCheckbox uid="3">3</KCheckbox>
	</KCheckboxGroup>
</div>
