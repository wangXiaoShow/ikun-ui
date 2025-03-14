import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KCheckboxGroup from '../src';
import KGroupBase from './group.base.svelte';
import KGroupChange from './group.change.svelte';
import KGroupTrigger from './group.trigger.svelte';
import KGroupBaseDisabled from './group.base.disabled.svelte';
import KGroupChangeDisabled from './group.change.disabled.svelte';
import KGroupTriggerDisabled from './group.trigger.disabled.svelte';
import KGroupModelDisabled from './group.model.disabled.svelte';
import { tick } from 'svelte';
let host: HTMLElement;

const initHost = () => {
	host = document.createElement('div');
	host.setAttribute('id', 'host');
	document.body.appendChild(host);
};
beforeEach(() => {
	initHost();
});
afterEach(() => {
	host.remove();
});

describe('Test: KCheckboxGroup', () => {
	test('props: cls', async () => {
		const instance = new KCheckboxGroup({
			target: host,
			props: {
				cls: 'k-checkbox-group--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-checkbox-group--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('When it is not disabled, the value of the checkbox can be initialized.', async () => {
		const instance = new KGroupBase({
			target: host
		});
		await tick();
		expect(instance).toBeTruthy();
		const inputEls = host.querySelectorAll('input');
		expect(inputEls[0].value === 'true').toBeTruthy();
		expect(inputEls[1].value === 'false').toBeTruthy();
		expect(inputEls[2].value === 'true').toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('When it is not disabled, the value changes and the status of the checkbox changes.', async () => {
		const instance = new KGroupChange({
			target: host
		});
		await tick();
		expect(instance).toBeTruthy();
		const inputEls = host.querySelectorAll('input');
		expect(inputEls[0].value === 'false').toBeTruthy();
		expect(inputEls[1].value === 'false').toBeTruthy();
		expect(inputEls[2].value === 'true').toBeTruthy();
		const btn = host.querySelector('#group_change_btn');
		btn.click(); // or btn.dispatchEvent(new window.Event('click', { bubbles: true }))
		await tick();
		expect(inputEls[0].value === 'true').toBeTruthy();
		expect(inputEls[1].value === 'false').toBeTruthy();
		expect(inputEls[2].value === 'false').toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('When it is not disabled, when a value of the checkbox changes, the group value is triggered.', async () => {
		const instance = new KGroupTrigger({
			target: host
		});
		await tick();
		expect(instance).toBeTruthy();
		const inputEls = host.querySelectorAll('input');
		expect(inputEls[0].value === 'false').toBeTruthy();
		expect(inputEls[1].value === 'false').toBeTruthy();
		expect(inputEls[2].value === 'true').toBeTruthy();
		const divEl = host.querySelector('#group_trigger_value');
		expect(divEl?.innerHTML).toBe('3');
		inputEls[0].click();
		await tick();
		expect(divEl?.innerHTML).toBe('3,1');
		expect(inputEls[0].value === 'true').toBeTruthy();
		expect(inputEls[1].value === 'false').toBeTruthy();
		expect(inputEls[2].value === 'true').toBeTruthy();
		inputEls[1].click();
		await tick();
		expect(divEl?.innerHTML).toBe('3,1,2');
		inputEls[0].click();
		await tick();
		inputEls[1].click();
		await tick();
		inputEls[2].click();
		await tick();
		expect(divEl?.innerHTML).toBe('');
		expect(host.innerHTML).matchSnapshot();
	});

	test('When it is disabled, the value of the checkbox can be initialized.', async () => {
		const instance = new KGroupBaseDisabled({
			target: host
		});
		await tick();
		expect(instance).toBeTruthy();
		const inputEls = host.querySelectorAll('input');
		expect(inputEls[0].value === 'true').toBeTruthy();
		expect(inputEls[1].value === 'false').toBeTruthy();
		expect(inputEls[2].value === 'true').toBeTruthy();
		expect(host.innerHTML.includes('k-checkbox--box__disabled')).toBeTruthy();
		expect(host.innerHTML.match(/k-checkbox--box__disabled/g)?.length === 3).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('When it is disabled, the value changes and the status of the checkbox not changes.', async () => {
		const instance = new KGroupChangeDisabled({
			target: host
		});
		await tick();
		expect(instance).toBeTruthy();
		const inputEls = host.querySelectorAll('input');
		expect(inputEls[0].value === 'false').toBeTruthy();
		expect(inputEls[1].value === 'false').toBeTruthy();
		expect(inputEls[2].value === 'true').toBeTruthy();
		const btn = host.querySelector('#group_change_disabled_btn');
		btn.click(); // or btn.dispatchEvent(new window.Event('click', { bubbles: true }))
		await tick();
		expect(inputEls[0].value === 'false').toBeTruthy();
		expect(inputEls[1].value === 'false').toBeTruthy();
		expect(inputEls[2].value === 'true').toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('When it is disabled, when a value of the checkbox changes, the group value is not triggered.', async () => {
		const instance = new KGroupTriggerDisabled({
			target: host
		});
		await tick();
		expect(instance).toBeTruthy();
		const inputEls = host.querySelectorAll('input');
		expect(inputEls[0].value === 'false').toBeTruthy();
		expect(inputEls[1].value === 'false').toBeTruthy();
		expect(inputEls[2].value === 'true').toBeTruthy();
		const divEl = host.querySelector('#group_trigger_value');
		expect(divEl?.innerHTML).toBe('3');
		inputEls[0].click();
		await tick();
		expect(divEl?.innerHTML).toBe('3');
		expect(inputEls[0].value === 'false').toBeTruthy();
		expect(inputEls[1].value === 'false').toBeTruthy();
		expect(inputEls[2].value === 'true').toBeTruthy();
		inputEls[1].click();
		await tick();
		expect(divEl?.innerHTML).toBe('3');
		inputEls[0].click();
		await tick();
		inputEls[1].click();
		await tick();
		inputEls[2].click();
		await tick();
		expect(divEl?.innerHTML).toBe('3');
		expect(host.innerHTML).matchSnapshot();
	});

	test('When the disabled value changes, the checkbox value can be synchronized.', async () => {
		const instance = new KGroupModelDisabled({
			target: host
		});
		await tick();
		expect(instance).toBeTruthy();
		const inputEls = host.querySelectorAll('input');
		expect(inputEls[0].value === 'false').toBeTruthy();
		expect(inputEls[1].value === 'false').toBeTruthy();
		expect(inputEls[2].value === 'true').toBeTruthy();
		const btn = host.querySelector('#group_change_value_btn');
		btn.click(); // or btn.dispatchEvent(new window.Event('click', { bubbles: true }))
		await tick();
		expect(inputEls[0].value === 'false').toBeTruthy();
		expect(inputEls[1].value === 'false').toBeTruthy();
		expect(inputEls[2].value === 'true').toBeTruthy();

		const btn2 = host.querySelector('#group_change_disabled_btn');
		btn2.click(); // or btn.dispatchEvent(new window.Event('click', { bubbles: true }))
		await tick();
		expect(inputEls[0].value === 'true').toBeTruthy();
		expect(inputEls[1].value === 'false').toBeTruthy();
		expect(inputEls[2].value === 'false').toBeTruthy();

		expect(host.innerHTML).matchSnapshot();
	});
});
