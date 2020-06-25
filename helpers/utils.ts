export
function generatePosts(data: any) {
	return data?.documents?.map((post: any) => {
				return {
					pid: post.name.split("/").pop(),
					title: post.fields.title.stringValue,
					blurb: post.fields.blurb.stringValue,
				};
			}) || [];
}


export
function chunk<T>(list: T[], size: number) {
	return new Array(Math.ceil(list.length / size))
		.fill([])
		.map(
			(_,i) => list.slice(i*size,i*size+size)
		);
}

export
function notNull<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}

export
function notFalsy<TValue>(value: TValue | null | undefined): value is TValue {
    return !!value;
}
