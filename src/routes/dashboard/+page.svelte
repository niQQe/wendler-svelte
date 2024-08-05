<script lang="ts">
	import { enhance } from '$app/forms';
	import Exercise from './exercise.svelte';
	import { tick } from 'svelte';
	export let data;

	console.log(data);

	type ExerciseInfoType = {
		id?: string;
		name: string;
		max_weight: number;
	};

	type WeekType = 'light' | 'medium' | 'heavy';

	let selectedWeek: WeekType = 'light';
	let showNewExerciseForm = false;
	let showDeleteButton = false;
	let exerciseForm: ExerciseInfoType = {
		name: '',
		max_weight: 0
	};
	let inputElement: HTMLElement;

	const weeks: WeekType[] = ['light', 'medium', 'heavy'];

	const weightPercentagesAndReps = {
		light: {
			reps: [5, 5, 5],
			percentages: [0.65, 0.7, 0.75]
		},
		medium: {
			reps: [3, 3, 3],
			percentages: [0.75, 0.8, 0.85]
		},
		heavy: {
			reps: [5, 3, 1],
			percentages: [0.85, 0.9, 0.95]
		}
	};

	const handleAddExercise = async (id: any) => {
		const newExercise = { ...exerciseForm, max_weight: +exerciseForm.max_weight, id };
		exercises = [...exercises, newExercise];
	};

	const handleDeleteExercise = (id: string) => {
		const index = exercises.findIndex((exercise) => exercise.id === id);
		exercises.splice(index, 1);
		if (index !== -1) {
			exercises = [...exercises];
		}
	};

	const handleShowExerciseForm = async () => {
		showNewExerciseForm = true;
		await tick();
		inputElement.focus();
	};

	let exercises: ExerciseInfoType[] = [];

	exercises = data.exercises;

	$: currentWeights = exercises.map((exercise) =>
		weightPercentagesAndReps[selectedWeek].percentages.map(
			(percentage: number) => Math.round((+exercise.max_weight * percentage) / 2.5) * 2.5
		)
	);
</script>

<div class="p-3">
	
	{#if showNewExerciseForm}
		<div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex z-[999]">
			<div class="m-auto p-6 rounded-lg bg-white w-[350px]">
				<div class="flex flex-col gap-3">
					<div class="font-bold text-xl">Add new exercise</div>
					<div class="flex gap-3">
						<form
							action="?/addExercise"
							class="flex flex-col gap-6"
							method="post"
							use:enhance={({ formData }) => {
								formData.set('name', exerciseForm.name);
								formData.set('max_weight', String(exerciseForm.max_weight));
								return ({ result }) => {
									if (result.type === 'success') {
										handleAddExercise(result.data);
										showNewExerciseForm = false;
									} else {
										alert('ERROR!');
									}
								};
							}}
						>
							<div class="flex gap-3">
								<div class="flex flex-col gap-1 flex-1">
									<label for="exerciseName" class="text-sm font-medium">Exercise name</label>
									<input
										id="exerciseName"
										bind:this={inputElement}
										placeholder="Benchpress"
										bind:value={exerciseForm.name}
										type="text"
										class="w-full"
									/>
								</div>
								<div class="flex flex-col gap-1">
									<label for="maxWeight" class="text-sm font-medium">Max(kg)</label>
									<input
										id="maxWeight"
										placeholder="Max weight"
										bind:value={exerciseForm.max_weight}
										type="number"
										step="0.01"
										class="max-w-[60px]"
									/>
								</div>
							</div>
							<div class="flex justify-end gap-3 text-sm">
								<button
									class="rounded border py-2.5 px-6"
									on:click={() => (showNewExerciseForm = false)}>Cancel</button
								>
								<button
									class="bg-[#18181b] py-2.5 px-6 rounded text-white font-medium text-sm"
									type="submit">Add</button
								>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	{/if}
	<div class="flex flex-col gap-3">
		<div class="w-full">
			<div class="flex flex-col gap-5">
				<div class="flex justify-between items-center border-b pb-3 border-gray-200">
					<div class="font-bold text-2xl">Wendler</div>
					{data?.user?.email}
					<a
						href="/auth/logout"
						class="p-1.5 w-[44px] h-[44px] flex justify-center items-center rounded border"
						><span class="material-symbols-outlined"> logout </span></a
					>
				</div>
				<div class="flex flex-col">
					<div class="grid grid-cols-1 gap-3">
						<div class="flex">
							<div class="flex gap-3 items-center w-full justify-between">
								<div class="flex gap-3">
									{#each weeks as week}
										<button
											class="capitalize flex
											 items-center justify-center h-[44px] font-normal border text-sm rounded {week === selectedWeek
												? 'bg-[#18181b] text-white border-[#18181b]'
												: 'border'}"
											on:click={() => (selectedWeek = week)}
										>
											{week}
										</button>
									{/each}
								</div>
								<div class="flex gap-3">
									<button
										class="capitalize flex items-center justify-center w-[44px] h-[44px] text-sm rounded border border-gray-200 {showDeleteButton
											? 'bg-gray-100 text-white'
											: ''}"
										on:click={() => (showDeleteButton = !showDeleteButton)}
									>
										<span class="text-gray-700 m-auto text-[22px] material-symbols-outlined">
											settings
										</span>
									</button>
									<button
										type="submit"
										class="capitalize flex items-center justify-center w-[44px] h-[44px] text-sm rounded bg-[#18181b]"
										on:click={() => handleShowExerciseForm()}
									>
										<span class="text-white m-auto text-[24px] material-symbols-outlined">
											Add
										</span>
									</button>
								</div>
							</div>
						</div>
						{#if data.exercises.length === 0}
							<div class="flex justify-center items-center h-[200px]">
								<div class="text-gray-500">No exercises added</div>
							</div>
						{:else}
							<div class="flex flex-col gap-3">
								{#each exercises as exercise, i}
									<Exercise
										{i}
										{showDeleteButton}
										on:deletedExerciseId={({ detail: { id } }) => handleDeleteExercise(id)}
										bind:exercise
										{currentWeights}
										{weightPercentagesAndReps}
										{selectedWeek}
									/>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
</style>
