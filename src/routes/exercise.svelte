<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	import { enhance } from '$app/forms';
	export let exercise;
	export let currentWeights;
	export let i;
	export let weightPercentagesAndReps;
	export let selectedWeek;
	export let showDeleteButton;
</script>

<div
	class="flex relative overflow-hidden gap-3 border border-gray-200 rounded-xl"
	style="box-shadow:0px 2px 2px #00000008"
>
	<div class="flex w-full flex-col gap-4">
		<div class="w-full flex justify-between items-center p-4 pb-0">
			<div class="text-[18px] font-bold truncate">
				{exercise.name}
			</div>
			<div class="left-0 gap-3 flex justify-center items-center text-center font-semibold">
				<div class="flex items-center">
					<form
						method="post"
						action="?/upateMaxWeight"
						use:enhance={({ formData }) => {
							formData.set('max_weight', String(exercise.max_weight - 2.5));
							formData.set('id', exercise.id);
							return ({ result }) => {
								if (result.type === 'success') {
									exercise.max_weight -= 2.5;
								} else {
									alert('ERROR!');
								}
							};
						}}
					>
						<button
							class="rounded border bg-gray-100 border-gray-200 flex p-1.5 rounded-br-none rounded-tr-none"
						>
							<span class="material-symbols-outlined m-auto text-[22px]"> Remove </span>
						</button>
					</form>

					<div
						class="min-w-[80px] gap-1 font-bold flex items-center justify-center border-t border-b border-gray-200 py-0.5 h-[36px]"
						style="font-variant-numeric:tabular-nums;line-height:15px;"
					>
						{exercise.max_weight} <span class="mt-[3px] text-gray-500 font-normal text-xs">KG</span>
					</div>
					<form
						method="post"
						action="?/upateMaxWeight"
						use:enhance={({ formData }) => {
							formData.set('max_weight', String(exercise.max_weight + 2.5));
							formData.set('id', exercise.id);
							return ({ result }) => {
								if (result.type === 'success') {
									exercise.max_weight += 2.5;
								} else {
									alert('ERROR!');
								}
							};
						}}
					>
						<button
							class=" rounded bg-gray-100 border border-gray-200 flex p-1.5 rounded-bl-none rounded-tl-none"
						>
							<span class="material-symbols-outlined m-auto text-[22px]"> Add </span>
						</button>
					</form>
				</div>
				{#if showDeleteButton}
					<form
						method="post"
						action="?/deleteExercise"
						use:enhance={({ formData }) => {
							formData.set('id', exercise.id);
							return ({ result }) => {
								if (result.type === 'success') {
									dispatch('deletedExerciseId', { id: result.data });
								} else {
									alert('ERROR!');
								}
							};
						}}
					>
						<button type="submit" class="p-1.5 bg-opacity-10 border rounded">
							<span class="text-red-600 material-symbols-outlined text-[20px]"> delete </span>
						</button>
					</form>
				{/if}
			</div>
		</div>
		<div class="flex font-medium divide-x divide-gray-300 border-t py-4">
			{#each currentWeights[i] as weight, i}
				<div class="flex items-center flex-1 justify-center">
					<div class="flex gap-1.5 items-center flex-col">
						<div
							class="w-[22px] h-[22px] justify-center items-center text-[#18181b] bg-[#18181b] bg-opacity-10 text-[13px] font-semibold flex rounded-full"
							style="line-height:15px"
						>
							{weightPercentagesAndReps[selectedWeek].reps[i]}
						</div>
						<div class="flex gap-1 items-end text-2xl" style="font-weight:800;">
							{weight}
							<span class="text-sm pb-[4px] block font-[500] text-gray-500 tracking-wider">KG</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
