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
