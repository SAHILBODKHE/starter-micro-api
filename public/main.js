

	function isSubsetSum(set, n, sum)
	{
		
		if (sum == 0)
			return true;
		if (n == 0)
			return false;

	
		if (set[n - 1] > sum)
			return isSubsetSum(set, n - 1, sum);

	
		return isSubsetSum(set, n - 1, sum)
		|| isSubsetSum(set, n - 1, sum - set[n - 1]);
	}
	
	let set = [ 3, 34, 4, 12, 5, 2 ];
	let sum = 9;
	let n = set.length;
	if (isSubsetSum(set, n, sum) == true)
	document.write("Found a subset with given sum");
	else
	document.write("No subset with given sum");
	

/*Output
Found a subset with given sum */