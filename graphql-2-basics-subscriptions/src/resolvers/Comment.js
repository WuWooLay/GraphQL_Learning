const Comment = {
	author(parent, args, ctx, info) {
		const { db } = ctx
		return db.users.find(user => parent.author === user.id)
	},
	post(parent, args, ctx, info) {
		const { db } = ctx
		return db.posts.find(post => post.id === parent.post)
	}
}

export { Comment as default }
