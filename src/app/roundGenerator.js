const generateRounds = function(participantIds) {

	participantIds = (participantIds instanceof Array ? participantIds : [participantIds]).sort();

	let rounds = [];
	let availableCombinations = [];

	for (var i = 0; i < participantIds.length; i++) {
		let p = participantIds[i];
		for (var z = 0; z < participantIds.length; z++) {
			let p2 = participantIds[z];
			if (p2 > p) {	
				availableCombinations.push({ id1: p, id2: p2 });
			}
		}
	}

	console.log('start', availableCombinations);

	for (var r = 0; r < (participantIds.length - 1); r++) {
		let round = {
			groups: []
		};

		let first = availableCombinations.splice(0, 1)[0];
		round.groups.push(first);

		let usedIds = [];
		usedIds.push(first.id1);
		usedIds.push(first.id2);

		let remainers = [];
		for (var a = 0; a < availableCombinations.length; a++ ) {
			let combo = availableCombinations[a];
			let comboIds = [ combo.id1, combo.id2 ];

			if (comboIds.filter(c => usedIds.indexOf(c) > -1).length === 0) {
				round.groups.push(combo);
				usedIds.push(combo.id1);
				usedIds.push(combo.id2);

				console.log(availableCombinations.splice(a, 1));
				console.log('remaining', availableCombinations);
			}
		}

		rounds.push(round);
	}

	return rounds;
}

export default generateRounds;


// int arr[] = {1, 2, 3, 4, 5};
// int r = 3;
// int n = sizeof(arr)/sizeof(arr[0]);
// printCombination(arr, n, r);

// // The main function that prints all combinations of size r
// // in arr[] of size n. This function mainly uses combinationUtil()
// void printCombination(int arr[], int n, int r)
// {
//     // A temporary array to store all combination one by one
//     int data[r];
 
//     // Print all combination using temprary array 'data[]'
//     combinationUtil(arr, data, 0, n-1, 0, r);
// }
 
// /* arr[]  ---> Input Array
//    data[] ---> Temporary array to store current combination
//    start & end ---> Staring and Ending indexes in arr[]
//    index  ---> Current index in data[]
//    r ---> Size of a combination to be printed */
// void combinationUtil(int arr[], int data[], int start, int end, int index, int r)
// {
//     // Current combination is ready to be printed, print it
//     if (index == r)
//     {
//         for (int j=0; j<r; j++)
//             printf("%d ", data[j]);
//         printf("\n");
//         return;
//     }
 
//     // replace index with all possible elements. The condition
//     // "end-i+1 >= r-index" makes sure that including one element
//     // at index will make a combination with remaining elements
//     // at remaining positions
//     for (int i=start; i<=end && end-i+1 >= r-index; i++)
//     {
//         data[index] = arr[i];
//         combinationUtil(arr, data, i+1, end, index+1, r);
//     }
// }
