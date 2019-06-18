const Post = {
	author(parent, args, ctx, info) {
		const { db } = ctx
		return db.users.find(user => user.id === parent.author)
	},
	comment(parent, args, ctx, info) {
		const { db } = ctx
		return db.comments.filter(comment => comment.post === parent.id)
	}
}

export { Post as default }
